import * as request from '@utils/axios';

export const getJobSerivce = async (id) => {
    const response = await request.api.get('/job/' + id);
    return response;
};

export const getListJobSerivce = async (params) => {
    const response = await request.api.get('/job', { params });
    return response;
};

export const getCountJobByCategoryService = async () => {
    const response = await request.api.get('/job/count_job_by_category');
    return response;
};

export const getCountJobBySalaryService = async () => {
    const response = await request.api.get('/job/count_job_by_salary');
    return response;
};

export const getJobCruitmentDemandService = async () => {
    const response = await request.api.get('/job/cruitment_demand');
    return response;
};

export const searchJobService = async (params) => {
    const response = await request.api.get('/job/search', { params });
    return response;
};
