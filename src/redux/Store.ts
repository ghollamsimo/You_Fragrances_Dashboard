import {configureStore} from "@reduxjs/toolkit";
import authSlice from "./slices/AuthSlice.ts";
import perfumeSlice from "./slices/PerfumeSlice.ts";
import ingredientSlice from "./slices/IngredientSlice.ts";
import brandSlice from "./slices/BrandSlice.ts";


export const store = configureStore({
    reducer: {
        users: authSlice,
        perfumes: perfumeSlice,
        ingredients: ingredientSlice,
        brands: brandSlice
    }
})
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;