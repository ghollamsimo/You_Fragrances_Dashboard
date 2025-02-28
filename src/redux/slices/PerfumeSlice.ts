import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import PerfumeService from "../../services/PerfumeService.ts";
import {initialState} from "../initialisation.ts";

export const allPerfumes = createAsyncThunk(
    "perfumes/index",
    async (_ , {rejectWithValue}) => {
        try {
            return await PerfumeService.index()
        }catch (err) {
            return rejectWithValue(err.response?.data || 'Something went wrong.');
        }
    }
)

export const destroy = createAsyncThunk(
    "perfumes/delete",
    async (id: string , {rejectWithValue}) => {
        try {
            return await PerfumeService.delete(id)
        }catch (err) {
            return rejectWithValue(err.response?.data || 'Something went wrong.');
        }
    }
)
const perfumeSlice = createSlice({
    name: 'perfumes',
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


            .addCase(allPerfumes.pending, (state) => {
                state.loading = true;
            })
            .addCase(allPerfumes.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.perfumesData = action.payload;
                // console.log('wach jat data ? :', action.payload)
                state.errorMessage = null;
            })
            .addCase(allPerfumes.rejected, (state, action: PayloadAction<string | undefined>) => {
                state.loading = false;
                state.errorMessage = action.payload || "index failed";
            })
            .addCase(destroy.pending, (state) => {
                state.loading = true;
            })
            .addCase(destroy.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.perfumesData = action.payload;
                // console.log('wach jat data ? :', action.payload)
                state.errorMessage = null;
            })
            .addCase(destroy.rejected, (state, action: PayloadAction<string | undefined>) => {
                state.loading = false;
                state.errorMessage = action.payload || "delete failed";
            })
    }
})

export default perfumeSlice.reducer;