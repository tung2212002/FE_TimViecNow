import * as request from '@utils/axios';

export const getListConversationService = async (params) => {
    const response = await request.apiBusinessAuth.get('/conversation', { params });
    return response;
};

export const getListContactableService = async (params) => {
    const response = await request.apiBusinessAuth.get('/contact/contactables', { params });
    return response;
};

export const createConversationService = async (body) => {
    const response = await request.apiBusinessAuth.post('/conversation', body);
    return response;
};

export const updateConversationService = async (id, body) => {
    const response = await request.apiBusinessAuth.put(`/conversation/${id}`, body);
    return response;
};
