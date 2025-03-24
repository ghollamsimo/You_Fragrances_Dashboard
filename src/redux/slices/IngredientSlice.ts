import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import IngredientService from "../../services/IngredientService.ts";
import {initialState} from "../initialisation.ts";
import {Ingredient} from "../../constant.ts";

export const allIngredients = createAsyncThunk(
    "notes/index",
    async (_ , {rejectWithValue}) => {
        try {
            return await IngredientService.index()
        }catch (err) {
            return rejectWithValue(err.response?.data || 'Something went wrong.');
        }
    }
)

export const addMultipleIngredients = createAsyncThunk(
    "notes/ingredient",
    async (data: Ingredient[], {rejectWithValue}) => {
        try {
            return await IngredientService.addMultipleIngredients(data)
        }catch (err) {
            return rejectWithValue(err.response?.data || 'Something went wrong.');
        }
    }
)

export const destroyIngredient = createAsyncThunk(
    "notes/delete",
    async (id: string, {rejectWithValue}) => {
        try {
            return await IngredientService.delete(id)
        }catch (err) {
            return rejectWithValue(err.response?.data || 'Something went wrong.');
        }
    }
)


const ingredientSlice = createSlice({
    name: 'ingredients',
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


            .addCase(allIngredients.pending, (state) => {
                state.loading = true;
            })
            .addCase(allIngredients.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.notesData = action.payload;
                state.errorMessage = null;
            })
            .addCase(allIngredients.rejected, (state, action: PayloadAction<string | undefined>) => {
                state.loading = false;
                state.errorMessage = action.payload || "index failed";
            })
            .addCase(addMultipleIngredients.pending, (state) => {
                state.loading = true;
            })
            .addCase(addMultipleIngredients.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.notesData = action.payload;
                state.errorMessage = null;
            })
            .addCase(addMultipleIngredients.rejected, (state, action: PayloadAction<string | undefined>) => {
                state.loading = false;
                state.errorMessage = action.payload || "index failed";
            })
            .addCase(destroyIngredient.pending, (state) => {
                state.loading = true;
            })
            .addCase(destroyIngredient.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.notesData = action.payload;
                state.errorMessage = null;
            })
            .addCase(destroyIngredient.rejected, (state, action: PayloadAction<string | undefined>) => {
                state.loading = false;
                state.errorMessage = action.payload || "index failed";
            })
    }
});

export default ingredientSlice.reducer;