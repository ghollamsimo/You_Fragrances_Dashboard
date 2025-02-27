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
// export const show = createAsyncThunk(
//     "auth/show",
//     async (id , {rejectWithValue}) => {
//         try {
//             const res = await AuthService.show(id)
//             return res.data
//         }catch (err) {
//             return rejectWithValue(err.response?.data || err.message);
//         }
//     }
// )

export const indexUsers = createAsyncThunk(
    "auth/indexUsers",
    async (_ , {rejectWithValue}) => {
        try {
            const res = await AuthService.index()
            return res.data
        }catch (err) {
            return rejectWithValue(err.response?.data || err.message);
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
            // .addCase(show.pending, (state) => {
            //     state.loading = true;
            // })
            // .addCase(show.fulfilled, (state, action: PayloadAction<any>) => {
            //     state.loading = false;
            //     state.dataObj = action.payload;
            //     state.errorMessage = null;
            // })
            // .addCase(show.rejected, (state, action: PayloadAction<string | undefined>) => {
            //     state.loading = false;
            //     state.errorMessage = action.payload || "Login failed";
            // })
            .addCase(indexUsers.pending, (state) => {
                state.loading = true;
            })
            .addCase(indexUsers.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.datalist = action.payload;
                state.errorMessage = null;
            })
            // .addCase(indexUsers.rejected, (state, action: PayloadAction<string | undefined>) => {
            //     state.loading = false;
            //     state.errorMessage = action.payload || "index failed";
            // })
    }
})

export default authSlice.reducer;