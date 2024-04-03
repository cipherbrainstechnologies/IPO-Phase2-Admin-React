import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  chatTab: false,
};
const chatSlice = createSlice({
  name: "chatSlice",
  initialState,
  reducers: {
    setChatTab: (state, action) => {
      state.chatTab = action.payload;
    },
  },
});

export const { setChatTab } = chatSlice.actions;
export default chatSlice.reducer;
