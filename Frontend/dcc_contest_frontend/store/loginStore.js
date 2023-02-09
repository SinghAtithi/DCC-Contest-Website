import { createSlice } from "@reduxjs/toolkit";
import checkToken from "../utils/checkToken";

const initialState = { loggedIn: false, userName: "" };

const login = createSlice({
  name: "login",
  initialState,
  reducers: {
    loginUser(state,actions) {
      console.log("Inside Login user");
      console.log(actions)
      state.loggedIn = true;
      state.userName = actions.payload;
    },
    logoutUser(state) {
      alert("Logged Out");
      state.loggedIn = false;
      localStorage.removeItem('token');
      state.userName = "";
      localStorage.removeItem('userName');
    },
  },
});

export const { loginUser, logoutUser } = login.actions;
export default login.reducer;
