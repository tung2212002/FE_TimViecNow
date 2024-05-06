import * as request from '../utils/axios';

export const getInfoBusinessService = async () => {
    const response = await request.apiBusinessAuth.get('/business/me');
    return response;
};

export const getListBusinessService = async (params) => {
    const response = await request.apiBusinessAuth.get('/business', { params });
    return response;
};

export const getBusinessService = async (id) => {
    const response = await request.apiBusinessAuth.get(`/business/${id}`);
    return response;
};

export const creatBusinessService = async (body) => {
    const response = await request.apiBusinessAuth.post('/business', body);
    return response;
};

export const updateBusinessService = async (id, body) => {
    const response = await request.apiAuthBusinessAttach.put(`/business/${id}`, body);
    return response;
};

export const deleteBusinessService = async (id) => {
    const response = await request.apiBusinessAuth.delete(`/business/${id}`);
    return response;
};
