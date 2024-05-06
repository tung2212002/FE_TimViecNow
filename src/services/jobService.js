import * as request from '../utils/axios';

export const getJobSerivce = async (id) => {
    const response = await request.api.get('/job/' + id);
    return response;
};

export const getListJobSerivce = async (params) => {
    const response = await request.api.get('/job', { params });
    return response;
};

export const searchJobService = async (params) => {
    const response = await request.api.get('/job/search', { params });
    return response;
};
