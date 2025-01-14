import { createSlice } from "@reduxjs/toolkit";

type OverlayState = {
  isOverlayVisible: boolean;
};

const initialState: OverlayState = {
  isOverlayVisible: false,
};

export const overlaySlice = createSlice({
  name: "overlay",
  initialState,
  reducers: {
    open: (state) => {
      state.isOverlayVisible = true;
    },
    close: (state) => {
      state.isOverlayVisible = false;
    },
  },
});

export const { open, close } = overlaySlice.actions;

export default overlaySlice.reducer;
