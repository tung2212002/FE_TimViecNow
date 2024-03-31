import axios from 'axios';

import { API_URL } from '../configs';
import { getLocalAccessToken, getLocalRefreshToken, updateLocalAccessToken } from './authLocalStorage';
import useSide from '../hooks/useSIde';
import { getLocalBusinessAccessToken, getLocalBusinessRefreshToken, updateLocalBusinessAccessToken } from './authBusinessStorage';

const getAuthHeader = () => {
    const path = window.location.pathname;
    const newSide = path.startsWith('/tuyen-dung/app') ? 'employer' : 'candidate';
    return newSide === 'candidate' ? getLocalAccessToken() : getLocalBusinessAccessToken();
};

const getAuthHeaderRefresh = () => {
    const path = window.location.pathname;
    const newSide = path.startsWith('/tuyen-dung/app') ? 'employer' : 'candidate';
    return newSide === 'candidate' ? getLocalRefreshToken() : getLocalBusinessRefreshToken();
};

const instance = (config = {}, auth = false, side = 'candidate') => {
    const request = axios.create(config);
    request.interceptors.request.use(
        async (requestConfig) => {
            if (auth) {
                const token = getAuthHeader();
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
                const refreshToken = getAuthHeaderRefresh();
                side = window.location.pathname.startsWith('/tuyen-dung/app') ? 'business' : 'candidate';
                if (refreshToken) {
                    if (side === 'candidate') {
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
                    } else if (side === 'business') {
                        return axios
                            .post(
                                `${API_URL}/business/refresh_token`,
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
                                    updateLocalBusinessAccessToken(token, 'business');
                                    originalRequest.headers.Authorization = `Bearer ${token}`;
                                    return axios(originalRequest);
                                }
                            })
                            .catch((error) => {
                                return Promise.resolve({ status: error.response.status, data: error.response.data });
                            });
                    }
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

export const apiBusiness = instance({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
        Accept: '*/*',
    },
});

export const apiBusinessAuth = instance(
    {
        baseURL: API_URL,
        headers: {
            'Content-Type': 'application/json',
            Accept: '*/*',
        },
    },
    true,
);

export const apiBusinessAttach = instance({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'multipart/form-data',
        Accept: '*/*',
    },
});

export const apiAuthBusinessAttach = instance(
    {
        baseURL: API_URL,
        headers: {
            'Content-Type': 'multipart/form-data',
            Accept: '*/*',
        },
    },
    true,
    'business',
);
