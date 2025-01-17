import { createSlice } from "@reduxjs/toolkit";

type OverlayState = {
  data: {
    isOverlayVisible: boolean;
  };
};

const initialState: OverlayState = {
  data: {
    isOverlayVisible: false,
  },
};

export const overlaySlice = createSlice({
  name: "overlay",
  initialState,
  reducers: {
    openOverlay: (state) => {
      state.data.isOverlayVisible = true;
    },
    closeOverlay: (state) => {
      state.data.isOverlayVisible = false;
    },
  },
});

export const { openOverlay, closeOverlay } = overlaySlice.actions;

export default overlaySlice.reducer;
