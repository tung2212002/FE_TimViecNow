import * as request from '../utils/axios';

export const getBusinessCompanyByIdSerivce = async (id) => {
    const response = await request.apiBusinessAuth.get('/business/company/' + id);
    return response;
};

export const getListCompanySerivce = async (params) => {
    const response = await request.apiBusinessAuth.get('/business/company', { params });
    return response;
};

export const createCompanyService = async (body) => {
    const response = await request.apiAuthBusinessAttach.post('/business/company', body);
    return response;
};

export const updateCompanyService = async (id, body) => {
    const response = await request.apiAuthBusinessAttach.put(`/business/company/${id}`, body);
    return response;
};

export const deleteCompanyService = async (id) => {
    const response = await request.apiAuthBusinessAttach.delete(`/business/company/${id}`);
    return response;
};
