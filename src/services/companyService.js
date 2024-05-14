import * as request from '../utils/axios';

export const getCompanyByIdSerivce = async (id) => {
    const response = await request.apiAuth.get('/company/' + id);
    return response;
};

export const getListCompanySerivce = async (params) => {
    const response = await request.apiAuth.get('/company', {
        params,
        paramsSerializer: {
            indexes: null,
        },
    });
    return response;
};
