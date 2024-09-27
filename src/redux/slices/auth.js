import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';


export const fetchAuth = createAsyncThunk('posts/fetchAuth', async (params) => {
    const { data } = await axios.post('/auth/login', params);
    return data;
});

export const fetchRegister = createAsyncThunk('posts/fetchRegister', async (params) => {
    const { data } = await axios.post('/auth/register', params);
    return data;
});

export const fetchAuthMe = createAsyncThunk('posts/fetchAuthMe', async () => {
    const { data } = await axios.get('/auth/me');
    return data;
});

export const fetchAuthAll = createAsyncThunk('users', async () => {
    const { data } = await axios.get('/users');
    return data;
});

const initialState = {
    data: null,
    users: [],
    status: 'loading',
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.data = null;
        },
        setUserData: (state, action) => {
            state.data = action.payload;
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchAuth.pending, (state) => {
                state.status = 'loading';
                state.data = null;
            })
            .addCase(fetchAuth.fulfilled, (state, action) => {
                state.status = 'loaded';
                state.data = action.payload;
            })
            .addCase(fetchAuth.rejected, (state) => {
                state.status = 'error';
                state.data = null;
            })

            .addCase(fetchAuthAll.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAuthAll.fulfilled, (state, action) => {
                state.status = 'loaded';
                state.users = action.payload;
            })
            .addCase(fetchAuthAll.rejected, (state) => {
                state.status = 'error';
                state.users = [];
            });
        builder
            .addCase(fetchAuthMe.pending, (state) => {
                state.status = 'loading';
                state.data = null;
            })
            .addCase(fetchAuthMe.fulfilled, (state, action) => {
                state.status = 'loaded';
                state.data = action.payload;
            })
            .addCase(fetchAuthMe.rejected, (state) => {
                state.status = 'error';
                state.data = null;
            })

            .addCase(fetchRegister.pending, (state) => {
                state.status = 'loading';
                state.data = null;
            })
            .addCase(fetchRegister.fulfilled, (state, action) => {
                state.status = 'loaded';
                state.data = action.payload;
            })
            .addCase(fetchRegister.rejected, (state) => {
                state.status = 'error';
                state.data = null;
            });


    },

});

export const selectIsAuth = (state) => Boolean(state.auth.data);


export const authReducer = authSlice.reducer;

export const { logout, setUserData } = authSlice.actions;

export const selectUsers = (state) => state.users.users;

