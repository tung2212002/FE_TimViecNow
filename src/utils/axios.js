import axios from 'axios';

import { API_URL } from '../configs';
import functionLocal from './function/functionLocal';
import { sideType } from '../constants';
import getSide from './getSide';

const instance = (config = {}, auth = false, side = sideType.USER) => {
    const { getLocalAccessToken, getLocalRefreshToken, updateLocalAccessToken, removeAll } = functionLocal(side);
    const request = axios.create(config);
    request.interceptors.request.use(
        async (requestConfig) => {
            if (auth) {
                const token = getLocalAccessToken();
                if (token) {
                    requestConfig.headers.Authorization = `Bearer ${token}`;
                }
            }
            requestConfig.timeout = 100000;
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
            if (
                error.response &&
                error.response.status === 401 &&
                !originalRequest._retry &&
                error.response?.config?.url === `/${side == sideType.USER ? 'auth' : 'business'}/me`
            ) {
                originalRequest._retry = true;
                const refreshToken = getLocalRefreshToken();
                side = getSide();
                const url = `${API_URL}/${side == sideType.USER ? 'auth' : 'business'}/refresh_token`;
                if (refreshToken) {
                    return axios
                        .post(
                            url,
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
                            removeAll();
                            return Promise.resolve({ status: error.response.status, data: error.response.data });
                        });
                } else {
                    return Promise.resolve({ status: error.response.status, data: error.response.data });
                }
            }
            return Promise.resolve({ status: error.response?.status || 500, data: error.response?.data || {} });
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

export const apiBusiness = instance(
    {
        baseURL: API_URL,
        headers: {
            'Content-Type': 'application/json',
            Accept: '*/*',
        },
    },
    true,
    sideType.BUSINESS,
);

export const apiBusinessAuth = instance(
    {
        baseURL: API_URL,
        headers: {
            'Content-Type': 'application/json',
            Accept: '*/*',
        },
    },
    true,
    sideType.BUSINESS,
);

export const apiBusinessAttach = instance(
    {
        baseURL: API_URL,
        headers: {
            'Content-Type': 'multipart/form-data',
            Accept: '*/*',
        },
    },
    true,
    sideType.BUSINESS,
);

export const apiAuthBusinessAttach = instance(
    {
        baseURL: API_URL,
        headers: {
            'Content-Type': 'multipart/form-data',
            Accept: '*/*',
        },
    },
    true,
    sideType.BUSINESS,
);
