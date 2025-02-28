import {configureStore} from "@reduxjs/toolkit";
import authSlice from "./slices/AuthSlice.ts";
import perfumeSlice from "./slices/PerfumeSlice.ts";


export const store = configureStore({
    reducer: {
        users: authSlice,
        perfumes: perfumeSlice,
    }
})
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;