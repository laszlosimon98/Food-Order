import { FoodType } from "@/utils/types/food.type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type CartItemsType = {
  [key: number]: {
    amount: number;
  };
};

type CartType = {
  isCartVisible: boolean;
  cartItems: CartItemsType;
  totalItems: number;
  totalPrice: number;
};

type CartState = {
  data: CartType;
};

const getCart = (): string | null => {
  const savedCart: string | null = localStorage.getItem("cart");
  return savedCart;
};

const initializeCart = () => {
  const savedCart = getCart();
  return savedCart ? JSON.parse(savedCart)["cartItems"] : {};
};

const initializePrice = () => {
  const savedCart = getCart();
  return savedCart ? parseInt(JSON.parse(savedCart)["totalPrice"]) : 0;
};

const initializeItems = () => {
  const savedCart = getCart();
  return savedCart ? parseInt(JSON.parse(savedCart)["totalItems"]) : 0;
};

const saveCartToLocalstorage = (cart: CartType) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

const initialState: CartState = {
  data: {
    isCartVisible: false,
    cartItems: initializeCart(),
    totalItems: initializeItems(),
    totalPrice: initializePrice(),
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
      const { foodId: key } = action.payload;

      if (!state.data.cartItems[key]) {
        state.data.cartItems[key] = {
          amount: 1,
        };
      } else {
        state.data.cartItems[key].amount += 1;
      }

      state.data.totalItems++;
      state.data.totalPrice += action.payload.price;

      saveCartToLocalstorage(state.data);
    },
    removeItem: (state, action: PayloadAction<FoodType>) => {
      const { foodId: key } = action.payload;

      if (state.data.cartItems[key] && state.data.cartItems[key].amount >= 1) {
        state.data.cartItems[key].amount -= 1;

        if (state.data.cartItems[key].amount === 0) {
          delete state.data.cartItems[key];
        }
      }

      state.data.totalItems--;
      state.data.totalPrice -= action.payload.price;
      saveCartToLocalstorage(state.data);
    },
    clearCart: (state) => {
      state.data.cartItems = {};
      state.data.totalItems = 0;
      state.data.totalPrice = 0;

      saveCartToLocalstorage(state.data);
    },
  },
});

export const { toogleCart, closeCart, saveItem, removeItem, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
