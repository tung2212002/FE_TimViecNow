import * as request from '@utils/axios';

export const getPronviceService = async (id) => {
    const response = await request.api.get(`/location/province/${id}`);
    return response;
};

export const getDistrictService = async (id) => {
    const response = await request.api.get(`/location/district/${id}`);
    return response;
};

export const getListProvinceService = async () => {
    const response = await request.api.get('/location/province');
    return response;
};

export const getListDistrictService = async (params) => {
    const response = await request.api.get('/location/district', { params });
    return response;
};
