import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import {
  
    BASE_URL_FOR_ADMIN,
    GetAll_AD,
    GetSingle_AD,
    UpdateSingle_AD,
   
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
        `${BASE_URL_FOR_ADMIN + GetSingle_AD}``${payload.id}`,
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
      toast.error("Somthing went wrong while getting single ad");
      return rejectWithValue(error.response.data);
    }
  }
);
export const getAllAd = createAsyncThunk(
    "admin/GetAllAD",
    async ({ payload }, { rejectWithValue }) => {
      try {
        const response = await axios.get(
          `${BASE_URL_FOR_ADMIN + GetAll_AD}`, 
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

export const updateSingleAd = createAsyncThunk(
  "admin/UpdateSingleAD",
  async ({ payload }, { rejectWithValue }) => {
    console.log("url while update ad" , BASE_URL_FOR_ADMIN + UpdateSingle_AD +payload.id )
    try {
      const response = await axios.put(
        BASE_URL_FOR_ADMIN + UpdateSingle_AD +payload.id,
        payload,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": 'application/json',
          },
        }
      );
      console.log("payload while update" ,payload)

      console.log("data" ,response?.data?.data)
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
    .addCase(getAllAd.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(getAllAd.fulfilled, (state, action) => {
      state.isLoading = false;
      state.getAllAdData = action.payload;
    })
    .addCase(getAllAd.rejected, (state) => {
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
      .addCase(updateSingleAd.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateSingleAd.fulfilled, (state, action) => {
        state.isLoading = false;
        state.editAdId = action.payload;
      })
      .addCase(updateSingleAd.rejected, (state) => {
        state.isLoading = false;
      })
      
      
  },
});

export default popcardsSlice.reducer;
