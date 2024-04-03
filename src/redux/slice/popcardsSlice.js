import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import {
    ADMIN_CREATE_POPUPCARD,
    ADMIN_UPDATE_POPUPCARD,
    ADMIN_GET_POPUPCARD_BY_ID,
    BASE_URL_FOR_ADMIN,
    ADMIN_POPUPCARD_UPDATE_IMAGE
} from "../../UrlConfig";
import { toast } from "react-toastify";


const initialState = {
  isLoading: false,
  getAllPopupcardsData: [],
  addPopupcardData: [],
  editPopupcardData: [],
 
};



export const createPopupCard = createAsyncThunk(
  "admin/createPopupCard",
  async ({ payload }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        BASE_URL_FOR_ADMIN + ADMIN_CREATE_POPUPCARD,
        payload,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("Banner created successfully");
      return response?.data;
    } catch (error) {
      toast.error("Somthing went wrong");
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);

export const getPopupcardsById = createAsyncThunk(
  "admin/card/getPopUP",
  async ({ payload }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BASE_URL_FOR_ADMIN + ADMIN_GET_POPUPCARD_BY_ID}`,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        }
      );
      console.log("res========>>>>>>>>>",response.data.data)
      return response?.data?.data;
    } catch (error) {
      console.log("error" , error)
      toast.error("Somthing went wrong");
      return rejectWithValue(error.response.data);
    }
  }
);

export const updatePopupcard = createAsyncThunk(
  "admin/updatePopUP",
  async ({ payload }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        BASE_URL_FOR_ADMIN + ADMIN_UPDATE_POPUPCARD,
        payload,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("popup updated successfully");
      return response?.data?.data;
    } catch (error) {
      console.log("error in popupcard" , error)
      toast.error("Somthing went wrong");
      return rejectWithValue(error.response.data);
    }
  }
);

// export const updatePOPUpImage1 = createAsyncThunk(
//   "admin/updatePopUP",
//   async ({ payloadImage }, { rejectWithValue }) => {
//     try {
//       const response = await axios.put(
//         `${BASE_URL_FOR_ADMIN + ADMIN_POPUPCARD_UPDATE_IMAGE}${payloadImage?.id
//         }`,
//         payloadImage?.payload,
//         {
//           headers: {
//             "Access-Control-Allow-Origin": "*",
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );
//       return response?.data;
//     } catch (error) {
//       return rejectWithValue(error?.response?.data);
//     }
//   }
// );
// export const updatePOPUpImage = createAsyncThunk(
//   "admin/updatePopUP",
//   async ({ payloadImage }, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(
//         `${BASE_URL_FOR_ADMIN + ADMIN_POPUPCARD_UPDATE_IMAGE}`,
//        payloadImage.payload,
//         {
//           headers: {
//             "Access-Control-Allow-Origin": "*",
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );
//       return response?.data;
//     } catch (error) {
//       return rejectWithValue(error?.response?.data);
//     }
//   }
// );


const popcardsSlice = createSlice({
  name: "popcardsSlice",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(createPopupCard.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createPopupCard.fulfilled, (state, action) => {
        state.isLoading = false;
        state.addPopupcardData = action.payload;
      })
      .addCase(createPopupCard.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getPopupcardsById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPopupcardsById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.getAllPopupcardsData = action.payload;
      })
      .addCase(getPopupcardsById.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(updatePopupcard.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatePopupcard.fulfilled, (state, action) => {
        state.isLoading = false;
        state.editPopupcardData = action.payload;
        

      })
      .addCase(updatePopupcard.rejected, (state) => {
        state.isLoading = false;
      })
      
      
  },
});

export default popcardsSlice.reducer;
