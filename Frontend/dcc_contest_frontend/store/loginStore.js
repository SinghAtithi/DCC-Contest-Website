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
      state.loggedIn= false
      state.isLoading= false
      state.role= undefined
      localStorage.removeItem("token");
    },
    setLoading(state,actions){
      state.isLoading = actions.payload;
      console.log(state.isLoading);
    }
  },
});

export const { loginUser, logoutUser, setLoading } = login.actions;
export default login.reducer;
