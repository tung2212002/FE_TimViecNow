import * as request from '@utils/axios';

export const getCVApplicationService = async (id) => {
    const response = await request.apiAuth.get('/user/cv_applications' + id);
    return response;
};

export const getListCVApplicationsService = async (params) => {
    const response = await request.apiAuth.get('/user/cv_applications', { params });
    return response;
};

export const createCVApplicationService = async (data) => {
    const response = await request.apiAuthAttach.post('/user/cv_applications', data);
    return response;
};
