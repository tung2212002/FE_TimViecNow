import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    show: false,
    toast: [],
};

const toastSlice = createSlice({
    name: 'toast',
    initialState,
    reducers: {
        showToast: (state) => {
            state.show = true;
        },
        hideToast: (state) => {
            state.show = false;
        },
        addToast: (state, action) => {
            state.toast.push(action.payload);
        },
        removeToast: (state, action) => {
            state.toast = state.toast.filter((item) => item.id !== action.payload);
        },
        setToast: (state, action) => {
            state.toast = action.payload;
        },
    },
});
export default toastSlice.reducer;

export const selectToast = (state) => state.toast.show;

export const selectToastList = (state) => state.toast.toast;

export const { showToast, hideToast, addToast, removeToast, setToast } = toastSlice.actions;
