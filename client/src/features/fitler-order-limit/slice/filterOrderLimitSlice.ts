import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type FilterOrderLimitState = {
  data: {
    isOnPromotion?: boolean;
    minValue: number;
    maxValue: number;
    isSpice?: boolean;
    isVegetarian?: boolean;
    categoryId?: number;
    hasRating?: boolean;
    orderByPrice?: "asc" | "desc";
    orderByRating?: "asc" | "desc";
    page?: number;
    limit?: number;
  };
};

const initialState: FilterOrderLimitState = {
  data: {
    minValue: 0,
    maxValue: 3000,
  },
};

const filterOrderLimitSlice = createSlice({
  name: "filterOrderLimit",
  initialState,
  reducers: {
    setPromotion: (state, action: PayloadAction<boolean | undefined>) => {
      if (action.payload) {
        state.data.isOnPromotion = true;
      } else {
        state.data.isOnPromotion = undefined;
      }
    },
    setMinvalue: (state, action: PayloadAction<number>) => {
      state.data.minValue = action.payload;
    },
    setMaxValue: (state, action: PayloadAction<number>) => {
      state.data.maxValue = action.payload;
    },
    setSpice: (state, action: PayloadAction<boolean | undefined>) => {
      if (action.payload) {
        state.data.isSpice = true;
      } else {
        state.data.isSpice = undefined;
      }
    },
    setVegetarian: (state, action: PayloadAction<boolean | undefined>) => {
      if (action.payload) {
        state.data.isVegetarian = true;
      } else {
        state.data.isVegetarian = undefined;
      }
    },
    setCategoryId: (state, action: PayloadAction<string | undefined>) => {
      const id = action.payload ? parseInt(action.payload) : undefined;
      state.data.categoryId = id;
    },
    setRating: (state, action: PayloadAction<boolean | undefined>) => {
      if (action.payload) {
        state.data.hasRating = true;
      } else {
        state.data.hasRating = undefined;
      }
    },
    setOrderByPrice: (state, action: PayloadAction<"asc" | "desc">) => {
      state.data.orderByPrice = action.payload;
      state.data.orderByRating = undefined;
    },
    setOrderByRating: (state, action: PayloadAction<"asc" | "desc">) => {
      state.data.orderByRating = action.payload;
      state.data.orderByPrice = undefined;
    },
    setOrderToDefault: (state, action: PayloadAction<undefined>) => {
      state.data.orderByPrice = action.payload;
      state.data.orderByRating = action.payload;
    },
    setLimit: (state, action: PayloadAction<number | undefined>) => {
      state.data.limit = action.payload;
    },
    setPage: (state, action: PayloadAction<number | undefined>) => {
      state.data.page = action.payload;
    },
  },
});

export const {
  setCategoryId,
  setSpice,
  setVegetarian,
  setMaxValue,
  setMinvalue,
  setPromotion,
  setRating,
  setOrderByPrice,
  setOrderByRating,
  setOrderToDefault,
  setLimit,
  setPage,
} = filterOrderLimitSlice.actions;
export default filterOrderLimitSlice.reducer;
