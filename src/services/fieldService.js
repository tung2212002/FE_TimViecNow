import * as request from '../utils/axios';

export const getFieldByIdService = async (id) => {
    const response = await request.api.get('/field/' + id);
    return response;
};

export const getListFieldService = async (params) => {
    const response = await request.api.get('/field', { params });
    return response;
};

export const createFieldService = async (body) => {
    const response = await request.apiAuth.post('/field', body);
    return response;
};
