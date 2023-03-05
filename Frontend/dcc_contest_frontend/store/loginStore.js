import { createSlice } from "@reduxjs/toolkit";

const initialState = { loggedIn: false, isLoading: true, role: undefined };

const login = createSlice({
  name: "login",
  initialState,
  reducers: {
    loginUser(state, actions) {
      state.loggedIn = true;
      state.isLoading = false;
      state.role = actions.payload;
    },
    logoutUser(state) {
      state.loggedIn = false;
      localStorage.removeItem("token");
    },
  },
});

export const { loginUser, logoutUser } = login.actions;
export default login.reducer;
