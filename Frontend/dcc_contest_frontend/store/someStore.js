import { createSlice } from "@reduxjs/toolkit";

const initialState = { abc: false };

const something = createSlice({
  name: "something",
  initialState,
});

export default something.reducer;
