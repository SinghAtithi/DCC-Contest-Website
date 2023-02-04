import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./loginStore";

const store = configureStore({
  reducer: {
    login: loginReducer,
  },
});

export default store;
