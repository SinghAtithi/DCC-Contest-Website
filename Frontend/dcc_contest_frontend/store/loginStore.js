import { createSlice } from "@reduxjs/toolkit";

const initialState = { loggedIn: false, isLoading: true, role: undefined, profile_pic: "https://ik.imagekit.io/pqymxdgbi/avtar.png"};

const login = createSlice({
  name: "login",
  initialState,
  reducers: {
    loginUser(state, actions) {
      state.loggedIn = true;
      state.isLoading = false;
      state.role = actions.payload.role;
      state.username = actions.payload.username;
      if(actions.payload.profile_pic)
        state.profile_pic = actions.payload.profile_pic
    },
    logoutUser(state) {
      state.loggedIn= false;
      state.isLoading= false;
      state.role= undefined;
      state.username = undefined;
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
