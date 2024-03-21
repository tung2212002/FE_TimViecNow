import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    show: false,
};

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        showModal: (state) => {
            state.show = true;
        },
        hideModal: (state) => {
            state.show = false;
        },
    },
});
export default modalSlice.reducer;

export const selectModal = (state) => state.modal.show;

export const { showModal, hideModal } = modalSlice.actions;
