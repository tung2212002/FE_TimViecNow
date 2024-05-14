import { configureStore } from '@reduxjs/toolkit';

import authReducer from './features/auth/authSlide';
import modalSlice from './features/modal/modalSlice';
import authBusinessSlice from './features/authBusiness/authSlide';
import toastSlice from './features/toast/toastSlice';
import postJobSlide from './features/postJob/postJobSlide';
import campaignSilde from './features/campaign/campaignSilde';
import configSilde from './features/config/configSilde';

const store = configureStore({
    reducer: {
        auth: authReducer,
        modal: modalSlice,
        authBusiness: authBusinessSlice,
        toast: toastSlice,
        postJob: postJobSlide,
        campaign: campaignSilde,
        config: configSilde,
    },
});

export default store;
