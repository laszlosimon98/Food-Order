import { createSlice } from "@reduxjs/toolkit";

type CartState = {
  data: {
    isCartVisible: boolean;
  };
};

const initialState: CartState = {
  data: {
    isCartVisible: false,
  },
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    toogleCart: (state) => {
      state.data.isCartVisible = !state.data.isCartVisible;
    },
    closeCart: (state) => {
      state.data.isCartVisible = false;
    },
  },
});

export const { toogleCart, closeCart } = cartSlice.actions;

export default cartSlice.reducer;
