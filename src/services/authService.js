import * as request from '../utils/axios';

export const loginService = async (body) => {
    const response = await request.api.post('/login', body);
    return response;
};

export const refreshTokenService = async (body) => {
    const response = await request.apiAuth.post('/refresh_token', body);
    return response;
};

export const logoutService = async (body) => {
    const response = await request.apiAuth.post('/logout', body);
    return response;
};

export const registerService = async (body) => {
    const response = await request.apiAttach.post('/register', body);
    return response;
};
