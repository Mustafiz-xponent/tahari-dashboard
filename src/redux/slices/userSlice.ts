import { User } from "@/types/user";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
  isAuthenticated: boolean | null;
  user: User | null;
}
const initialState: InitialState = {
  isAuthenticated: false,
  user: null,
};

const userReducer = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUserToStore: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    removeUserFromStore: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { addUserToStore, removeUserFromStore } = userReducer.actions;

export default userReducer.reducer;
