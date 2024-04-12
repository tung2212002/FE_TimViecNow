import * as request from '../utils/axios';

export const getCampaignByIdService = async (id) => {
    const response = await request.apiAuth.get('/business/campaign/' + id);
    return response;
};

export const getListCampaignService = async (params) => {
    const response = await request.apiAuth.get('/business/campaign', { params });
    return response;
};

export const createCampaignService = async (body) => {
    const response = await request.apiAuth.post('/business/campaign', body);
    return response;
};

export const updateCampaignService = async (id, body) => {
    const response = await request.apiAuth.put(`/business/campaign/${id}`, body);
    return response;
};

export const deleteCampaignService = async (id) => {
    const response = await request.apiAuth.delete(`/business/campaign/${id}`);
    return response;
};
