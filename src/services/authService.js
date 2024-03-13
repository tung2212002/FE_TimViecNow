import * as request from '../utils/axios';

export const loginService = async (body) => {
  const response = await request.api.post('/auth/login', body);
  return response;
};

export const refreshTokenService = async (body) => {
  const response = await request.apiAuth.post('/auth/refresh_token', body);
  return response;
};

export const logoutService = async (body) => {
  const response = await request.apiAuth.post('/auth/logout', body);
  return response;
};

export const registerService = async (body) => {
  const response = await request.apiAttach.post('/auth/register', body);
  return response;
};
