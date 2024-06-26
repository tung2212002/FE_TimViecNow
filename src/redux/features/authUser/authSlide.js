import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import functionLocal from '../../../utils/function/functionLocal';
import functionService from '../../../utils/function/functionService';
import getSide from '../../../utils/getSide';
const initialState = {
    user: null,
    token: null,
    isAuth: false,
    role: null,
    loading: false,
    error: null,
};

export const login = createAsyncThunk('login', async (data) => {
    const { user, access_token, refresh_token } = data;
    if (!user) {
        throw new Error('User not found');
    }
    const side = getSide();
    const { setLocalToken, setLocalUser } = functionLocal(side);
    setLocalToken({ access_token, refresh_token });
    setLocalUser(user);
    return { user, token: { access_token, refresh_token }, role: user.role };
});

export const logout = createAsyncThunk('logout', async () => {
    const side = getSide();
    try {
        const { removeLocalToken, removeLocalUser } = functionLocal(side);
        const { logoutService } = functionService(side);
        removeLocalToken();
        removeLocalUser();
        await logoutService();
        window.location.reload();
    } catch (error) {
        console.log('Error:', error);
        return null;
    }
    return null;
});

export const updateInfo = createAsyncThunk('updateInfo', async (data) => {
    const { user, token } = data;
    const side = getSide();
    const { updateLocalUserInfo, setLocalToken, setLocalUser, updateLocalToken } = functionLocal(side);
    if (user) {
        updateLocalUserInfo(user);
        setLocalUser(user);
    }
    if (token) {
        updateLocalToken(token);
        setLocalToken(token);
    }
    return { user, token };
});

export const updateSubInfo = createAsyncThunk('updateSubInfo', async (data) => {
    return data;
});

export const setLoading = createAsyncThunk('loading', async (loading) => {
    return loading;
});

const authUserSlice = createSlice({
    name: 'authUser',
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
                state.role = action.payload.user?.role;
            })
            .addCase(login.rejected, (state) => {
                state.loading = false;
                state.user = null;
                state.isAuth = false;
                state.token = null;
                state.role = null;
            })
            .addCase(logout.pending, (state) => {
                state.loading = true;
            })
            .addCase(logout.fulfilled, (state) => {
                state.loading = false;
                state.user = null;
                state.isAuth = false;
                state.token = null;
                state.role = null;
            })
            .addCase(logout.rejected, (state) => {
                state.loading = false;
                state.user = null;
                state.isAuth = false;
                state.token = null;
                state.role = null;
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
            .addCase(updateInfo.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateInfo.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload?.user || state.user;
                state.isAuth = true;
                state.token = action.payload?.token || state.token;
                state.role = action.payload?.user?.role || state.role;
            })
            .addCase(updateInfo.rejected, (state) => {
                state.loading = false;
            })
            .addCase(updateSubInfo.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateSubInfo.fulfilled, (state, action) => {
                state.loading = false;
                state.user = { ...state.user, ...action.payload };
            });
    },
});

export default authUserSlice.reducer;

export const selectUser = (state) => state.authUser.user;

export const selectIsAuthUser = (state) => state.authUser.isAuth;

export const selectAuthUser = (state) => state.authUser;

export const selectUserToken = (state) => state.authUser.token;

export const selectUserRole = (state) => state.authUser.role;
