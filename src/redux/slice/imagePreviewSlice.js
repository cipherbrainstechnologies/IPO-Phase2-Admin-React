import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  file: null,
  fileDataURL: null,
};

const imagePreviewSlice = createSlice({
  name: "imagePreviewSlice",
  initialState,
  reducers: {
    imageFile: (state, action) => {
      state.action = action.payload;
    },
    imageFileDataURL: (state, action) => {
      state.action = action.payload;
    },
  },
});

export const { imageFile, imageFileDataURL } = imagePreviewSlice.actions;
export default imagePreviewSlice.reducer;
