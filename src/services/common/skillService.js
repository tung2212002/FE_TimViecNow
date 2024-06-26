import * as request from '@utils/axios';

export const getSkillByIdService = async (id) => {
    const response = await request.api.get('/skill/' + id);
    return response;
};

export const getListSkillService = async (params) => {
    const response = await request.api.get('/skill', { params });
    return response;
};

export const createSkillService = async (body) => {
    const response = await request.apiAuth.post('/skill', body);
    return response;
};
