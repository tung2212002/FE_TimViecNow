import * as request from '../utils/axios';

export const getInfoService = async () => {
    const response = await request.apiAuth.get('/users/me');
    return response;
};

export const createUserService = async (body) => {
    const response = await request.apiAuth.post('/users', body);
    return response;
};

export const getListUserService = async (body) => {
    const response = await request.apiAuth.post('/users', body);
    return response;
};
