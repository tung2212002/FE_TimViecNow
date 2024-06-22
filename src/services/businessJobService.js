import * as request from '@utils/axios';

export const getBusinessJobSerivce = async (id) => {
    const response = await request.apiBusinessAuth.get('/business/job/' + id);
    return response;
};

export const getListBusinessJobSerivce = async (params) => {
    const response = await request.apiBusinessAuth.get('/business/job', { params });
    return response;
};

export const createBusinessJobService = async (body) => {
    const response = await request.apiBusinessAuth.post('/business/job', body);
    return response;
};

export const updateBusinessJobService = async (id, body) => {
    const response = await request.apiBusinessAuth.put(`/business/job/${id}`, body);
    return response;
};

export const deleteBusinessJobService = async (id) => {
    const response = await request.apiBusinessAuth.delete(`/business/job/${id}`);
    return response;
};
