import * as request from '@utils/axios';

export const getJobPositionByIdService = async (id) => {
    const response = await request.api.get('/position/job_position/' + id);
    return response;
};

export const getListJobPositionService = async (params) => {
    const response = await request.api.get('/position/job_position', { params });
    return response;
};

export const createJobPositionService = async (body) => {
    const response = await request.apiAuth.post('/position/job_position', body);
    return response;
};

export const getGroupPositionByIdService = async (id) => {
    const response = await request.api.get('/position/group_position/' + id);
    return response;
};

export const getListGroupPositionService = async (params) => {
    const response = await request.api.get('/position/group_position', { params });
    return response;
};

export const createGroupPositionService = async (body) => {
    const response = await request.apiAuth.post('/position/group_position', body);
    return response;
};
