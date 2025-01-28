import { createSlice } from "@reduxjs/toolkit";

type OrderState = {};

const initialState: OrderState = {};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
});

export const {} = orderSlice.actions;
export default orderSlice.reducer;
