import { storeApi } from "@/store/api/storeApi";
import { configureStore } from "@reduxjs/toolkit";
import overlayReducer from "@/features/overlay/slice/overlaySlice";
import authReducer from "@/features/auth/slice/authSlice";
import cartReducer from "@/features/cart/slice/cartSlice";
import filterReducer from "@/features/filter-order-limit/slice/filterOrderLimitSlice";
import orderReducer from "@/features/order/slice/orderSlice";
import promotionReducer from "@/features/dashboard/components/promotion/promotionSlice";

export const store = configureStore({
  reducer: {
    overlay: overlayReducer,
    auth: authReducer,
    cart: cartReducer,
    filter: filterReducer,
    order: orderReducer,
    promotion: promotionReducer,
    [storeApi.reducerPath]: storeApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(storeApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
