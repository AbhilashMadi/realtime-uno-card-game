import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { UserSchema } from "@/types/auth-types";

interface IInitialState {
  user: UserSchema | null;
}

const initialState: IInitialState = {
  user: null,
};

const authSlice = createSlice({
  name: "auth_slice",
  initialState,
  reducers: {
    updateUser: (state, action: PayloadAction<UserSchema | null>) => {
      state.user = action.payload;
    },
  },
});

export const { updateUser } = authSlice.actions;
export default authSlice;
