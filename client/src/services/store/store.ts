import { storeApi } from "@/storeTypes/api/storeApi";
import { configureStore } from "@reduxjs/toolkit";
import overlayReducer from "features/overlay/slice/overlaySlice";
import authReducer from "@/auth/slice/authSlice";

export const store = configureStore({
  reducer: {
    overlay: overlayReducer,
    auth: authReducer,
    [storeApi.reducerPath]: storeApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(storeApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
