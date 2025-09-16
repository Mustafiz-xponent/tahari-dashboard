import { User } from "@/types/user";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthPayload {
  user: User;
  token: string;
}
interface InitialState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  resetPasswordPhone: string | null;
  otpResendCooldown: number;
}

const initialState: InitialState = {
  isAuthenticated: false,
  user: null,
  token: null,
  resetPasswordPhone: null,
  otpResendCooldown: 0,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<AuthPayload>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },
    clearUser: (state) => {
      state.user = null;
      state.token = null;
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
