import * as request from '@utils/axios';

export const getListMessageService = async (id, params) => {
    const response = await request.apiAuth.get(`/message/${id}/messages`, { params });
    return response;
};
