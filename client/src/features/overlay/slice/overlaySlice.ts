import { createSlice } from "@reduxjs/toolkit";

type OverlayState = {
  data: {
    isMenuOverlayOpen: boolean;
    isFoodOverlayOpen: boolean;
  };
};

const initialState: OverlayState = {
  data: {
    isMenuOverlayOpen: false,
    isFoodOverlayOpen: false,
  },
};

export const overlaySlice = createSlice({
  name: "overlay",
  initialState,
  reducers: {
    openMenuOverlay: (state) => {
      state.data.isMenuOverlayOpen = true;
    },
    openFoodOverlay: (state) => {
      state.data.isFoodOverlayOpen = true;
    },
    closeOverlays: (state) => {
      state.data.isMenuOverlayOpen = false;
      state.data.isFoodOverlayOpen = false;
    },
  },
});

export const { openMenuOverlay, openFoodOverlay, closeOverlays } =
  overlaySlice.actions;

export default overlaySlice.reducer;
