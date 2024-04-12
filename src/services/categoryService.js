import * as request from '../utils/axios';

export const getCategoryByIdService = async (id) => {
    const response = await request.apiAuth.get('/category/' + id);
    return response;
};

export const getListCategoryService = async (params) => {
    const response = await request.apiAuth.get('/category', { params });
    return response;
};

export const createCategoryService = async (body) => {
    const response = await request.apiAuth.post('/category', body);
    return response;
};
