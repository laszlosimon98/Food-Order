import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AuthState = {
  data: {
    accessToken: string | null;
    isAuthenticated: boolean;
  };
};

const initialState: AuthState = {
  data: {
    accessToken: null,
    isAuthenticated: false,
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    saveToken: (
      state,
      action: PayloadAction<{ accessToken: string | null }>
    ) => {
      state.data.accessToken = action.payload.accessToken;
      state.data.isAuthenticated = true;
    },
    removeToken: (state) => {
      state.data.accessToken = null;
      state.data.isAuthenticated = false;
    },
  },
});

export const { saveToken, removeToken } = authSlice.actions;

export default authSlice.reducer;
