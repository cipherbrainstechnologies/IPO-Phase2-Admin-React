import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  activeClass: false,
  anim: null,
  mobileActive: false,
};
const sidebarToggleSlice = createSlice({
  name: "sidebarToggleSlice",
  initialState,
  reducers: {
    setActiveClass: (state, action) => {
      state.activeClass = action.payload;
    },
    setAnim: (state, action) => {
      state.anim = action.payload;
    },
    mobileActiveClass: (state, action) => {
      state.mobileActive = action.payload;
    },
  },
});

export const { setActiveClass, setAnim, mobileActiveClass } =
  sidebarToggleSlice.actions;
export default sidebarToggleSlice.reducer;
