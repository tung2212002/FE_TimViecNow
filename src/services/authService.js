import * as request from '../utils/axios';

export const loginService = async (body) => {
    const response = await request.api.post('/user/login', body);
    return response;
};

export const loginGoogleService = async (body) => {
    const response = await request.api.post('/user/login_google', body);
    return response;
};

export const refreshTokenService = async (body) => {
    const response = await request.apiAuth.post('/user/refresh_token', body);
    return response;
};

export const logoutService = async (body) => {
    const response = await request.apiAuth.post('/user/logout', body);
    return response;
};

export const registerService = async (body) => {
    const response = await request.apiAttach.post('/user/register', body);
    return response;
};

export const verifyTokenService = async () => {
    const response = await request.apiAuth.post('/user/verify_token');
    return response;
};
