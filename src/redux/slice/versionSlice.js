import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import {
  
    BASE_URL_FOR_ADMIN,
    GETALL_VERSION,
    GETSINGLE_VERSION,
    UPDATE_SINGLE_VERSION,
   
} from "../../UrlConfig";
import { toast } from "react-toastify";


const initialState = {
  isLoading: false,
  getAllVersionData: [],
  getSingleVersion:[],
  editVersionData: [],
 
};


export const getSingleVersion = createAsyncThunk(
  "admin/GETSINGLE_VERSION",
  async ({ payload }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BASE_URL_FOR_ADMIN + GETSINGLE_VERSION}``${payload.id}`,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        }
      );
      console.log("response get version by id",response.data.data)
      return response?.data?.data;
    } catch (error) {
      console.log("error" , error)
      toast.error("Somthing went wrong");
      return rejectWithValue(error.response.data);
    }
  }
);
export const getAllVersion = createAsyncThunk(
    "admin/GETALL_VERSION",
    async ({ payload }, { rejectWithValue }) => {
      try {
        const response = await axios.get(
          `${BASE_URL_FOR_ADMIN + GETALL_VERSION}`,
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json",
            },
          }
        );
        console.log("response get all version",response.data.data)
        return response?.data?.data;
      } catch (error) {
        console.log("error" , error)
        toast.error("Somthing went wrong");
        return rejectWithValue(error.response.data);
      }
    }
  );

export const updateSingleversion = createAsyncThunk(
  "admin/UPDATE_SINGLE_VERSION",
  async ({ payload }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        BASE_URL_FOR_ADMIN + UPDATE_SINGLE_VERSION +payload.id,
        payload,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": 'application/json',
          },
        }
      );
      toast.success("Version updated successfully");
      return response?.data?.data;
    } catch (error) {
      console.log("error in Version update" , error)
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
      state.getAllVersionData = action.payload;
    })
    .addCase(getAllVersion.rejected, (state) => {
      state.isLoading = false;
    })


      .addCase(getSingleVersion.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSingleVersion.fulfilled, (state, action) => {
        state.isLoading = false;
        state.getSingleVersion = action.payload;
      })
      .addCase(getSingleVersion.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(updateSingleversion.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateSingleversion.fulfilled, (state, action) => {
        state.isLoading = false;
        state.editVersionData = action.payload;
      })
      .addCase(updateSingleversion.rejected, (state) => {
        state.isLoading = false;
      })
      
      
  },
});

export default popcardsSlice.reducer;
