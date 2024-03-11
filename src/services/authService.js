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

export const testLogin = async (body) => {
  const response = await request.api.post('/auth/test_login', body);
  return response;
};

export const testLogout = async (body) => {
  const response = await request.apiAuth.post('/auth/test_logout', body);
  return response;
};
