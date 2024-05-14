import * as request from '../utils/axios';

export const getInfoService = async () => {
    const response = await request.apiAuth.get('/user/users/me');
    return response;
};

export const getListUserService = async (params) => {
    const response = await request.apiAuth.get('/user/users', { params });
    return response;
};

export const getUserService = async (id) => {
    const response = await request.apiAuth.get(`/user/users/${id}`);
    return response;
};

export const createUserService = async (body) => {
    const response = await request.apiAuth.post('/user/users', body);
    return response;
};

export const updateUserService = async (id, body) => {
    const response = await request.apiAuth.put(`/user/users/${id}`, body);
    return response;
};

export const deleteUserService = async (id) => {
    const response = await request.apiAuth.delete(`/user/users/${id}`);
    return response;
};
