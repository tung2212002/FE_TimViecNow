import { configureStore } from '@reduxjs/toolkit';

import authReducer from './features/auth/authSlide';
import modalSlice from './features/modal/modalSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        modal: modalSlice,
    },
});

export default store;
