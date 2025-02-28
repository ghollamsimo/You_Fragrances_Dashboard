import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import AuthService from "../../services/AuthService.ts";
import {initialState} from "../initialisation.ts";


export const login = createAsyncThunk(
    "users/login",
    async (
        { email, password }: { email: string; password: string },
        { rejectWithValue }
    ) => {
        try {
            return await AuthService.login({email, password})
        } catch (error: any) {
            const errorMessage = error.response?.data || error.message || "Something went wrong.";
            return rejectWithValue(errorMessage);
        }
    }
);

export const stats = createAsyncThunk("users/count", async (_) => {
    try {
        return await AuthService.stats()
    }  catch (error) {
        return error.response?.data || error.message || "Something went wrong.";
    }
})

export const bestPerfume = createAsyncThunk("users/bestPerfume", async (_) => {
    try {
        return await AuthService.bestPerfume()
    }  catch (error) {
        return error.response?.data || error.message || "Something went wrong.";
    }
})


export const indexUsers = createAsyncThunk(
    "users/index",
    async (_ , {rejectWithValue}) => {
        try {
            return await AuthService.index()
        }catch (err) {
            return rejectWithValue(err.response?.data || 'Something went wrong.');
        }
    }
)


const authSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        changeStateTrue: (state) => {
            state.updateState = true;
        },
        changeStateFalse: (state) => {
            state.updateState = false;
        },
        clearResponse: (state) => {
            state.response = "";
        },
    },
    extraReducers: (builder) => {
        builder

            .addCase(login.pending, (state) => {
                state.loading = true;
            })
            .addCase(login.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.dataObj = action.payload;
                state.errorMessage = null;
                state.token = action.payload.token;
                // console.log('helloHabibi', action.payload.token);
                localStorage.setItem('token', action.payload.token);
            })
            .addCase(login.rejected, (state, action: PayloadAction<string | undefined>) => {
                state.loading = false;
                state.errorMessage = action.payload || "login failed";
            })

            .addCase(indexUsers.pending, (state) => {
                state.loading = true;
            })
            .addCase(indexUsers.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.usersData = action.payload;
                state.errorMessage = null;
            })
            .addCase(indexUsers.rejected, (state, action: PayloadAction<string | undefined>) => {
                state.loading = false;
                state.errorMessage = action.payload || "index failed";
            })
        .addCase(stats.pending, (state) => {
            state.loading = true;
        })
        .addCase(stats.fulfilled, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.dataObj = action.payload;
            state.errorMessage = null;
        })
        .addCase(stats.rejected, (state, action: PayloadAction<string | undefined>) => {
            state.loading = false;
            state.errorMessage = action.payload || "Getting stats failed";
        })
            .addCase(bestPerfume.pending, (state) => {
                state.loading = true;
            })
            .addCase(bestPerfume.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.datalist = action.payload;
                state.errorMessage = null;
            })
            .addCase(bestPerfume.rejected, (state, action: PayloadAction<string | undefined>) => {
                state.loading = false;
                state.errorMessage = action.payload || "Getting best Perfumes failed";
            })
    }
})

export default authSlice.reducer;