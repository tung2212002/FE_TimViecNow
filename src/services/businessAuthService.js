import * as request from '@utils/axios';

export const loginBusinessService = async (body) => {
    const response = await request.api.post('/business/login', body);
    return response;
};

export const refreshTokenBusinessService = async (body) => {
    const response = await request.apiBusinessAuth.post('/business/refresh_token', body);
    return response;
};

export const logoutBusinessService = async (body) => {
    const response = await request.apiBusinessAuth.post('/business/logout', body);
    return response;
};

export const registerBusinessService = async (body) => {
    const response = await request.apiBusinessAttach.post('/business/register', body);
    return response;
};

export const verifyTokenBusinessService = async () => {
    const response = await request.apiBusinessAuth.post('/business/verify_token');
    return response;
};

export const changePasswordBusinessService = async (body) => {
    const response = await request.apiBusinessAuth.post('/business/change_password', body);
    return response;
};
