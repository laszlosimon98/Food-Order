import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FoodType } from "utils/types/food.type";

type CartState = {
  data: {
    isCartVisible: boolean;
    cartItems: FoodType[];
  };
};

const initializeCart = () => {
  const savedCart: string | null = localStorage.getItem("cart");
  return savedCart ? JSON.parse(savedCart) : [];
};

const saveCartToLocalstorage = (items: FoodType[]) => {
  localStorage.setItem("cart", JSON.stringify(items));
};

const initialState: CartState = {
  data: {
    isCartVisible: false,
    cartItems: initializeCart(),
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
    saveItem: (state, action: PayloadAction<FoodType>) => {
      state.data.cartItems.push(action.payload);
      saveCartToLocalstorage(state.data.cartItems);
    },
    removeItem: (state, action: PayloadAction<FoodType>) => {
      const index = state.data.cartItems.findIndex(
        (food) => food === action.payload
      );

      if (index === -1) return;

      const updatedCart = [
        ...state.data.cartItems.slice(0, index),
        ...state.data.cartItems.slice(index + 1),
      ];

      state.data.cartItems = updatedCart;
      saveCartToLocalstorage(state.data.cartItems);
    },
    clearCart: (state) => {
      state.data.cartItems = [];
      saveCartToLocalstorage(state.data.cartItems);
    },
  },
});

export const { toogleCart, closeCart, saveItem, removeItem, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
