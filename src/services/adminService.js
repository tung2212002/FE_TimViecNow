import * as request from '../utils/axios';

export const getListAdminService = async (params) => {
    const response = await request.apiAuth.get('/admin', { params });
    return response;
};

export const getAdminService = async (id) => {
    const response = await request.apiAuth.get(`/admin/${id}`);
    return response;
};

export const creatAdminService = async (body) => {
    const response = await request.apiAuth.post('/admin', body);
    return response;
};

export const updateAdminService = async (id, body) => {
    const response = await request.apiAuth.put(`/admin/${id}`, body);
    return response;
};

export const deleteAdminService = async (id) => {
    const response = await request.apiAuth.delete(`/admin/${id}`);
    return response;
};
