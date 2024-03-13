import axios from 'axios';

import { API_URL } from '../configs';
import { getLocalAccessToken, getLocalRefreshToken, updateLocalAccessToken } from './authLocalStorage';

const instance = (config = {}, auth = false) => {
    const request = axios.create(config);
    request.interceptors.request.use(
        async (requestConfig) => {
            if (auth) {
                const token = getLocalAccessToken();
                if (token) {
                    requestConfig.headers.Authorization = `Bearer ${token}`;
                }
            }
            requestConfig.timeout = 10000;
            return requestConfig;
        },
        (error) => {
            return Promise.reject(error);
        },
    );
    request.interceptors.response.use(
        (response) => {
            return response;
        },
        async (error) => {
            const originalRequest = error.config;
            if (error.response && error.response.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;
                const refreshToken = getLocalRefreshToken();
                if (refreshToken) {
                    return axios
                        .post(
                            `${API_URL}/auth/refresh_token`,
                            {},
                            {
                                headers: {
                                    Authorization: `Bearer ${refreshToken}`,
                                    'Content-Type': 'application/json',
                                },
                            },
                        )
                        .then((res) => {
                            if (res.status === 200) {
                                const token = res.data.data.access_token;
                                updateLocalAccessToken(token);
                                originalRequest.headers.Authorization = `Bearer ${token}`;
                                return axios(originalRequest);
                            }
                        })
                        .catch((error) => {
                            return Promise.resolve({ status: error.response.status, data: error.response.data });
                        });
                } else {
                    return Promise.resolve({ status: error.response.status, data: error.response.data });
                }
            }
            return Promise.resolve({ status: error.response.status, data: error.response.data });
        },
    );

    return request;
};

export const api = instance({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
        Accept: '*/*',
    },
});

export const apiAuth = instance(
    {
        baseURL: API_URL,
        headers: {
            'Content-Type': 'application/json',
            Accept: '*/*',
        },
    },
    true,
);

export const apiAttach = instance({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'multipart/form-data',
        Accept: '*/*',
    },
});

export const apiAuthAttach = instance(
    {
        baseURL: API_URL,
        headers: {
            'Content-Type': 'multipart/form-data',
            Accept: '*/*',
        },
    },
    true,
);
