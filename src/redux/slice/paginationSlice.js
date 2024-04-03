import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  currentPage: 1,
  totalPageLimit: 10,
  totalPage: 10,
  filter: "",
};
const paginationSlice = createSlice({
  name: "pagination",
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setLimit: (state, action) => {
      state.totalPageLimit = action.payload;
    },
    setTotalPage: (state, action) => {
      state.totalPage = action.payload;
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
});

export const { setCurrentPage, setFilter, setLimit, setTotalPage } =
  paginationSlice.actions;
export default paginationSlice.reducer;
