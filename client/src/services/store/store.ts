import { storeApi } from "@/store/api/storeApi";
import { configureStore } from "@reduxjs/toolkit";
import overlayReducer from "@/features/overlay/slice/overlaySlice";
import authReducer from "@/features/auth/slice/authSlice";
import cartReducer from "@/features/cart/slice/cartSlice";
import filterReducer from "@/features/fitler-order-limit/slice/filterOrderLimitSlice";
import orderReducer from "@/features/order/slice/orderSlice";

export const store = configureStore({
  reducer: {
    overlay: overlayReducer,
    auth: authReducer,
    cart: cartReducer,
    filter: filterReducer,
    order: orderReducer,
    [storeApi.reducerPath]: storeApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(storeApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
