import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { logoutBusinessService } from '../../../services/businessAuthService';
import {
    setLocalBusinessToken,
    removeLocalBusinessToken,
    removeLocalBusiness,
    updateLocalBusinessToken,
    updateLocalBusinessInfo,
    setLocalBusiness,
} from '../../../utils/authBusinessStorage';

const initialState = {
    user: null,
    token: null,
    isAuth: false,
    loading: false,
    error: null,
};

export const login = createAsyncThunk('authBusiness/login', async (data) => {
    const { user, access_token, refresh_token } = data;
    if (!user) {
        throw new Error('User not found');
    }
    setLocalBusinessToken({ access_token, refresh_token });
    setLocalBusiness(user);
    return { user, token: { access_token, refresh_token } };
});

export const logout = createAsyncThunk('authBusiness/logout', async () => {
    try {
        removeLocalBusinessToken();
        removeLocalBusiness();
        await logoutBusinessService();
    } catch (error) {
        console.log('Error:', error);
        return null;
    }
    return null;
});

export const updateBusinessInfo = createAsyncThunk('authBusiness/updateBusinessInfo', async (data) => {
    const { user, token } = data;
    if (user) {
        updateLocalBusinessInfo(user);
    }
    if (token) {
        updateLocalBusinessToken(token);
    }
    return { user, token };
});

export const updateBusinessSubInfo = createAsyncThunk('authBusiness/updateBusinessSubInfo', async (data) => {
    return data;
});

export const setLoading = createAsyncThunk('authBusiness/loading', async (loading) => {
    return loading;
});

const authBusinessSlice = createSlice({
    name: 'authBusiness',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.isAuth = true;
                state.token = action.payload.token;
            })
            .addCase(login.rejected, (state) => {
                state.loading = false;
                state.user = null;
                state.isAuth = false;
                state.token = null;
            })
            .addCase(logout.pending, (state) => {
                state.loading = true;
            })
            .addCase(logout.fulfilled, (state) => {
                state.loading = false;
                state.user = null;
                state.isAuth = false;
                state.token = null;
            })
            .addCase(logout.rejected, (state) => {
                state.loading = false;
                state.user = null;
                state.isAuth = false;
                state.token = null;
            })
            .addCase(setLoading.pending, (state) => {
                state.loading = true;
            })
            .addCase(setLoading.fulfilled, (state, action) => {
                state.loading = action.payload;
            })
            .addCase(setLoading.rejected, (state) => {
                state.loading = false;
            })
            .addCase(updateBusinessInfo.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateBusinessInfo.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload?.user || state.user;
                state.isAuth = true;
                state.token = action.payload?.token || state.token;
            })
            .addCase(updateBusinessInfo.rejected, (state) => {
                state.loading = false;
            })
            .addCase(updateBusinessSubInfo.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateBusinessSubInfo.fulfilled, (state, action) => {
                state.loading = false;
                state.user = { ...state.user, ...action.payload };
            });
    },
});

export default authBusinessSlice.reducer;

export const selectBusiness = (state) => state.authBusiness.user;

export const selectIsAuthBusiness = (state) => state.authBusiness.isAuth;

export const selectAuthBusiness = (state) => state.authBusiness;

export const selectBusinessToken = (state) => state.authBusiness.token;
