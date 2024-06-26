import { configureStore } from '@reduxjs/toolkit';

import modalSlice from './features/modal/modalSlice';
import toastSlice from './features/toast/toastSlice';
import postJobSlide from './features/postJob/postJobSlide';
import campaignSilde from './features/campaign/campaignSilde';
import configSilde from './features/config/configSilde';
import authSlide from './features/authUser/authSlide';
import businessJobSilde from './features/businessJob/businessJobSilde';

const store = configureStore({
    reducer: {
        authUser: authSlide,
        modal: modalSlice,
        toast: toastSlice,
        postJob: postJobSlide,
        campaign: campaignSilde,
        config: configSilde,
        businessJob: businessJobSilde,
    },
});

export default store;
