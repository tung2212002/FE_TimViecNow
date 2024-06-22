import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { logoutService } from '@services/authService';
import { setLocalToken, removeLocalToken, removeLocalUser, updateLocalToken, updateLocalUserInfo, setLocalUser } from '@utils/authLocalStorage';

const initialState = {
    user: null,
    token: null,
    isAuth: false,
    loading: false,
    error: null,
};

export const login = createAsyncThunk('auth/login', async (data) => {
    const { user, access_token, refresh_token } = data;
    if (!user) {
        throw new Error('User not found');
    }
    setLocalToken({ access_token, refresh_token });
    setLocalUser(user);
    return { user, token: { access_token, refresh_token } };
});

export const logout = createAsyncThunk('auth/logout', async () => {
    try {
        removeLocalToken();
        removeLocalUser();
        await logoutService();
    } catch (error) {
        console.log('Error:', error);
        return null;
    }
    return null;
});

export const updateUserInfo = createAsyncThunk('auth/updateUserInfo', async (data) => {
    const { user, token } = data;
    if (user) {
        updateLocalUserInfo(user);
    }
    if (token) {
        updateLocalToken(token);
    }
    return { user, token };
});

export const setLoading = createAsyncThunk('auth/loading', async (loading) => {
    return loading;
});

const authSlice = createSlice({
    name: 'auth',
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
            .addCase(updateUserInfo.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateUserInfo.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload?.user || state.user;
                state.isAuth = true;
                state.token = action.payload?.token || state.token;
            })
            .addCase(updateUserInfo.rejected, (state) => {
                state.loading = false;
            });
    },
});

export default authSlice.reducer;

export const selectUser = (state) => state.auth.user;

export const selectIsAuth = (state) => state.auth.isAuth;

export const selectAuth = (state) => state.auth;

export const selectToken = (state) => state.auth.token;
