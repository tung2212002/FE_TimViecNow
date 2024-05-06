import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    province: [],
    job_position: null,
    category: null,
    skill: null,
    field: null,
    loading: false,
    error: null,
};

const configSilde = createSlice({
    name: 'config',
    initialState: initialState,
    reducers: {
        setProvince: (state, action) => {
            state.province = action.payload;
        },
        setJobPosition: (state, action) => {
            state.job_position = action.payload;
        },
        setCategory: (state, action) => {
            state.category = action.payload;
        },
        setSkill: (state, action) => {
            state.skill = action.payload;
        },
        setField: (state, action) => {
            state.field = action.payload;
        },
    },
});

export default configSilde.reducer;

export const selectProvince = (state) => state.config.province;
export const selectJobPosition = (state) => state.config.job_position;
export const selectCategory = (state) => state.config.category;
export const selectSkill = (state) => state.config.skill;
export const selectField = (state) => state.config.field;

export const { setProvince, setJobPosition, setCategory, setSkill, setField } = configSilde.actions;
