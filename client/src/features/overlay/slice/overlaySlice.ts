import { createSlice } from "@reduxjs/toolkit";

type OverlayState = {
  data: {
    isMenuOverlayOpen: boolean;
  };
};

const initialState: OverlayState = {
  data: {
    isMenuOverlayOpen: false,
  },
};

export const overlaySlice = createSlice({
  name: "overlay",
  initialState,
  reducers: {
    openMenuOverlay: (state) => {
      state.data.isMenuOverlayOpen = true;
    },
    closeOverlays: (state) => {
      state.data.isMenuOverlayOpen = false;
    },
  },
});

export const { openMenuOverlay, closeOverlays } = overlaySlice.actions;

export default overlaySlice.reducer;
