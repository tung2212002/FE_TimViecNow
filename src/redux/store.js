import { configureStore } from '@reduxjs/toolkit';

import authReducer from './features/auth/authSlide';
import modalSlice from './features/modal/modalSlice';
import authBusinessSlice from './features/authBusiness/authSlide';
import toastSlice from './features/toast/toastSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        modal: modalSlice,
        authBusiness: authBusinessSlice,
        toast: toastSlice,
    },
});

export default store;
