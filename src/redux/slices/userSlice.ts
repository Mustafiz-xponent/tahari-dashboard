import { User } from "@/types/user";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
  isAuthenticated: boolean;
  user: User | null;
  resetPasswordPhone: string | null;
  otpResendCooldown: number;
}

const initialState: InitialState = {
  isAuthenticated: false,
  user: null,
  resetPasswordPhone: null,
  otpResendCooldown: 0,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.resetPasswordPhone = null;
      state.otpResendCooldown = 0;
    },
    setForgotPasswordPhone: (state, action: PayloadAction<string>) => {
      state.resetPasswordPhone = action.payload;
    },
    clearForgotPasswordPhone: (state) => {
      state.resetPasswordPhone = null;
    },
    setOtpResendCooldown: (state, action: PayloadAction<number>) => {
      state.otpResendCooldown = action.payload;
    },
  },
});

export const {
  setUser,
  clearUser,
  setForgotPasswordPhone,
  clearForgotPasswordPhone,
  setOtpResendCooldown,
} = userSlice.actions;
export default userSlice.reducer;
