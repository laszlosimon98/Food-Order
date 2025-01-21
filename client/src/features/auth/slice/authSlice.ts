import { UserType } from "@/utils/types/user.type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AuthState = {
  data: {
    accessToken: string | null;
    isAuthenticated: boolean;
    currentUser: UserType | undefined;
  };
};

type PayloadType = {
  accessToken: string | null;
};

const initialState: AuthState = {
  data: {
    accessToken: null,
    isAuthenticated: false,
    currentUser: undefined,
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    saveToken: (state, action: PayloadAction<PayloadType>) => {
      const { accessToken } = action.payload;
      state.data.accessToken = accessToken;
      state.data.isAuthenticated = true;
    },
    removeToken: (state) => {
      state.data.accessToken = null;
      state.data.isAuthenticated = false;
      state.data.currentUser = undefined;
    },
  },
});

export const { saveToken, removeToken } = authSlice.actions;

export default authSlice.reducer;
