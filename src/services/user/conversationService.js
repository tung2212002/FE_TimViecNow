import * as request from '@utils/axios';

export const getListConversationService = async (params) => {
    const response = await request.apiAuth.get('/conversation', { params });
    return response;
};

export const getListContactableService = async (params) => {
    const response = await request.apiAuth.get('/contact/contactables', { params });
    return response;
};

export const getConversationExistService = async (params) => {
    const response = await request.apiAuth.get('/conversation/existing', {
        params,
        paramsSerializer: {
            indexes: null,
        },
    });
    return response;
};

export const createConversationService = async (body) => {
    const response = await request.apiAuth.post('/conversation', body);
    return response;
};

export const updateConversationService = async (id, body) => {
    const response = await request.apiAuth.put(`/conversation/${id}`, body);
    return response;
};
