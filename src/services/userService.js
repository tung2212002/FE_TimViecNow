import * as request from '../utils/axios';

export const getInfoService = async () => {
  const response = await request.apiAuth.get('/user/me');
  return response;
};

export const createUserService = async (body) => {
  const response = await request.apiAuth.post('/user/create', body);
  return response;
};

export const getListUserService = async (body) => {
  const response = await request.apiAuth.post('/user/get', body);
  return response;
};
