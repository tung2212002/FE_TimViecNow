import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    jobs: null,
    campaigns: null,
    numberJobPush: 0,
    numberCampaignPush: 0,
    numberCVApply: 0,
    numberNewCV: 0,
    loadingNumberJobPush: false,
    loadingNumberCampaignPush: false,
    loadingNumberCVApply: false,
    loadingNumberNewCV: false,
    loading: false,
    error: null,
};

const businessJobSilde = createSlice({
    name: 'businessJob',
    initialState: initialState,
    reducers: {
        setJobs: (state, action) => {
            state.jobs = action.payload;
        },
        addJob: (state, action) => {
            state.jobs.push(action.payload);
        },
        removeJob: (state, action) => {
            state.jobs = state.jobs.filter((item) => item.id !== action.payload);
        },
        updateJob: (state, action) => {
            state.jobs = state.jobs.map((item) => {
                if (item.id === action.payload.id) {
                    return action.payload;
                }
                return item;
            });
        },
        setCampaigns: (state, action) => {
            state.campaigns = action.payload;
        },
        addCampaign: (state, action) => {
            state.campaigns.push(action.payload);
        },
        removeCampaign: (state, action) => {
            state.campaigns = state.campaigns.filter((item) => item.id !== action.payload);
        },
        updateCampaign: (state, action) => {
            state.campaigns = state.campaigns.map((item) => {
                if (item.id === action.payload.id) {
                    return action.payload;
                }
                return item;
            });
        },
        setNumberJobPush: (state, action) => {
            state.numberJobPush = action.payload;
            state.loadingNumberJobPush = true;
        },
        setNumberCampaignPush: (state, action) => {
            state.numberCampaignPush = action.payload;
            state.loadingNumberCampaignPush = true;
        },
        setNumberCVApply: (state, action) => {
            state.numberCVApply = action.payload;
            state.loadingNumberCVApply = true;
        },
        setNumberNewCV: (state, action) => {
            state.numberNewCV = action.payload;
            state.loadingNumberNewCV = true;
        },
    },
});

export default businessJobSilde.reducer;

export const selectJobs = (state) => state.businessJob.jobs;
export const selectCampaigns = (state) => state.businessJob.campaigns;
export const selectNumberJobPush = (state) => state.businessJob.numberJobPush;
export const selectNumberCampaignPush = (state) => state.businessJob.numberCampaignPush;
export const selectNumberCVApply = (state) => state.businessJob.numberCVApply;
export const selectNumberNewCV = (state) => state.businessJob.numberNewCV;
export const selectBusinessJob = (state) => state.businessJob;

export const {
    setJobs,
    addJob,
    removeJob,
    updateJob,
    setCampaigns,
    addCampaign,
    removeCampaign,
    updateCampaign,
    setNumberJobPush,
    setNumberCampaignPush,
    setNumberCVApply,
    setNumberNewCV,
} = businessJobSilde.actions;
