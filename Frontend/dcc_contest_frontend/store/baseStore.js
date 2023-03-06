import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./loginStore";
import somethingReducer from "./someStore";

const store = configureStore({
  reducer: {
    login: loginReducer,
    something: somethingReducer
  },
});

export default store;
