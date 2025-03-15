import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {initialState} from "../initialisation.ts";
import BrandService from "../../services/BrandService.ts";

export const allBrands = createAsyncThunk(
    "brand/index",
    async (_ , {rejectWithValue}) => {
        try {
            return await BrandService.index()
        }catch (err) {
            return rejectWithValue(err.response?.data || 'Something went wrong.');
        }
    }
)

export const destroyBrand = createAsyncThunk(
    "brand/delete",
    async (id: string , {rejectWithValue}) => {
        try {
            return await BrandService.delete(id)
        }catch (err) {
            return rejectWithValue(err.response?.data || 'Something went wrong.');
        }
    }
)

export const storeBrand = createAsyncThunk(
    "brand/store",
    async (data: any , {rejectWithValue}) => {
        try {
            return await BrandService.storeBrand(data)
        }catch (err) {
            return rejectWithValue(err.response?.data || 'Something went wrong.');
        }
    }
)

export const updateBrand = createAsyncThunk(
    "brand/update",
    async ({id, data} , {rejectWithValue}) => {
        try {
            return await BrandService.updateBrand(id, data)
        }catch (err) {
            return rejectWithValue(err.response?.data || 'Something went wrong.');
        }
    }
)

const brandSlice = createSlice({
    name: 'brands',
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


            .addCase(allBrands.pending, (state) => {
                state.loading = true;
            })
            .addCase(allBrands.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.brandsData = action.payload;
                state.errorMessage = null;
            })
            .addCase(allBrands.rejected, (state, action: PayloadAction<string | undefined>) => {
                state.loading = false;
                state.errorMessage = action.payload || "index failed";
            })
            .addCase(storeBrand.pending, (state) => {
                state.loading = true;
            })
            .addCase(storeBrand.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.brandsData = action.payload;
                state.errorMessage = null;
            })
            .addCase(storeBrand.rejected, (state, action: PayloadAction<string | undefined>) => {
                state.loading = false;
                state.errorMessage = action.payload || "storing failed";
            })
            .addCase(updateBrand.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateBrand.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.brandsData = action.payload;
                state.errorMessage = null;
            })
            .addCase(updateBrand.rejected, (state, action: PayloadAction<string | undefined>) => {
                state.loading = false;
                state.errorMessage = action.payload || "update failed";
            })
            .addCase(destroyBrand.pending, (state) => {
                state.loading = true;
            })
            .addCase(destroyBrand.fulfilled, (state, action: PayloadAction<{ id: string }>) => {
                state.loading = false;
                state.brandsData = state.brandsData.filter(
                    (brand) => brand._id !== action.payload.id
                );
                state.errorMessage = null;
            })
            .addCase(destroyBrand.rejected, (state, action: PayloadAction<string | undefined>) => {
                state.loading = false;
                state.errorMessage = action.payload || "delete failed";
            })
    }
})

export default brandSlice.reducer;