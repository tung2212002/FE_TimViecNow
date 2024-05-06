import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    campaign: null,
    loading: false,
    error: null,
};

const campaignSilde = createSlice({
    name: 'campaign',
    initialState: initialState,
    reducers: {
        setCampaign: (state, action) => {
            state.campaign = action.payload;
        },
        addCampaign: (state, action) => {
            state.campaign.push(action.payload);
        },
        removeCampaign: (state, action) => {
            state.campaign = state.campaign.filter((item) => item.id !== action.payload);
        },
        updateCampaign: (state, action) => {
            state.campaign = state.campaign.map((item) => {
                if (item.id === action.payload.id) {
                    return action.payload;
                }
                return item;
            });
        },
    },
});

export default campaignSilde.reducer;

export const selectCampaign = (state) => state.campaign.campaign;

export const { setCampaign, addCampaign, removeCampaign, updateCampaign } = campaignSilde.actions;
