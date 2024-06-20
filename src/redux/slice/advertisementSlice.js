import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import {
  
    BASE_URL_FOR_ADMIN,
    GetAllAD,
    GetSingleAD,
    UpdateSingleAD,
   
} from "../../UrlConfig";
import { toast } from "react-toastify";


const initialState = {
  isLoading: false,
  getAllAdData: [],
  getSingleAd:[],
  editAdId: [],
 
};


export const getSingleAd = createAsyncThunk(
  "admin/GetSingleAD",
  async ({ payload }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BASE_URL_FOR_ADMIN + GetSingleAD}``${payload.id}`,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        }
      );
      console.log("response get Ad by id",response.data.data)
      return response?.data?.data;
    } catch (error) {
      console.log("error" , error)
      toast.error("Somthing went wrong");
      return rejectWithValue(error.response.data);
    }
  }
);
export const getAllVersion = createAsyncThunk(
    "admin/GetAllAD",
    async ({ payload }, { rejectWithValue }) => {
      try {
        const response = await axios.get(
          `${BASE_URL_FOR_ADMIN + GetAllAD}`, 
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json",
            },
          }
        );
        console.log("response get all Ad",response.data.data)
        return response?.data?.data;
      } catch (error) {
        console.log("error" , error)
        toast.error("Somthing went wrong");
        return rejectWithValue(error.response.data);
      }
    }
  );

export const updateSingleversion = createAsyncThunk(
  "admin/UpdateSingleAD",
  async ({ payload }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        BASE_URL_FOR_ADMIN + UpdateSingleAD +payload.id,
        payload,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": 'application/json',
          },
        }
      );
      toast.success("Ad updated successfully");
      return response?.data?.data;
    } catch (error) {
      console.log("error in Ad update" , error)
      toast.error("Somthing went wrong");
      return rejectWithValue(error.response.data);
    }
  }
);




const popcardsSlice = createSlice({
  name: "popcardsSlice",
  initialState,
  extraReducers: (builder) => {
    builder
    .addCase(getAllVersion.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(getAllVersion.fulfilled, (state, action) => {
      state.isLoading = false;
      state.getAllAdData = action.payload;
    })
    .addCase(getAllVersion.rejected, (state) => {
      state.isLoading = false;
    })


      .addCase(getSingleAd.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSingleAd.fulfilled, (state, action) => {
        state.isLoading = false;
        state.getSingleAd = action.payload;
      })
      .addCase(getSingleAd.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(updateSingleversion.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateSingleversion.fulfilled, (state, action) => {
        state.isLoading = false;
        state.editAdId = action.payload;
      })
      .addCase(updateSingleversion.rejected, (state) => {
        state.isLoading = false;
      })
      
      
  },
});

export default popcardsSlice.reducer;
