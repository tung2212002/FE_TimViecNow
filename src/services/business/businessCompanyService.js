import * as request from '@utils/axios';

export const getCompanyByIdSerivce = async (id) => {
    const response = await request.apiBusinessAuth.get('/business/business_company/' + id);
    return response;
};

export const getListCompanySerivce = async (params) => {
    const response = await request.apiBusinessAuth.get('/business/business_company', {
        params,
        paramsSerializer: {
            indexes: null,
        },
    });
    return response;
};

export const createCompanyService = async (body) => {
    const response = await request.apiAuthBusinessAttach.post('/business/business_company', body);
    return response;
};

export const updateCompanyService = async (id, body) => {
    const response = await request.apiAuthBusinessAttach.put(`/business/business_company/${id}`, body);
    return response;
};

export const deleteCompanyService = async (id) => {
    const response = await request.apiBusinessAuth.delete(`/business/business_company/${id}`);
    return response;
};
