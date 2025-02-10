import { FoodType } from "@/utils/types/food.type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type PromotionState = {
  data: {
    foods: FoodType[];
  };
};

const initialState: PromotionState = {
  data: {
    foods: [],
  },
};

export const promotionSlice = createSlice({
  name: "promotion",
  initialState,
  reducers: {
    addFood: (state, action: PayloadAction<FoodType>) => {
      state.data.foods.push(action.payload);
    },
    removeFood: (state, action: PayloadAction<FoodType>) => {
      state.data.foods = state.data.foods.filter(
        (food) => food.foodId !== action.payload.foodId
      );
    },
    clearFoods: (state) => {
      state.data.foods = [];
    },
    addAllFoods: (state, action: PayloadAction<FoodType[]>) => {
      action.payload.forEach((food) => {
        state.data.foods.push(food);
      });
    },
  },
});

export const { addFood, removeFood, clearFoods, addAllFoods } =
  promotionSlice.actions;

export default promotionSlice.reducer;
