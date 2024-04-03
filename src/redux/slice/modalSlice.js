import { createSlice } from "@reduxjs/toolkit";
import React from "react";

const initialState = {
  modalIsOpen: false,
  modalType: "",
};

const modalSlice = createSlice({
  name: "modalSlice",
  initialState,
  reducers: {
    setModalType: (state, action) => {
      state.modalType = action.payload;
    },
    setModalIsOpen: (state, action) => {
      state.modalIsOpen = action.payload;
    },
  },
});

export const { setModalType, setModalIsOpen } = modalSlice.actions;
export default modalSlice.reducer;
