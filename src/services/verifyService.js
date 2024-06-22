import * as request from '@utils/axios';

export const sendVerifyService = async (body) => {
    const response = await request.apiAuth.post('/verify/send_verify_code', body);
    return response;
};

export const verifyCodeService = async (body) => {
    const response = await request.apiAuth.post('/verify/verify_code', body);
    return response;
};
