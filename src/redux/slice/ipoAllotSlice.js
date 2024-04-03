import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import {
  ADMIN_CREATE_IPO_ALLOTMENT_TIPS,
  ADMIN_GET_ALL_IPO_ALLOTMENT_TIPS,
  ADMIN_UPDATE_IPO_ALLOTMENT_TIPS,
  BASE_URL_FOR_ADMIN,
} from "../../UrlConfig";
import { toast } from "react-toastify";

const initialState = {
  createIpoAllotData: [],
  updateIpoAllotData: [],
  getAllIpoAllotData: [],
};

export const createAllotment = createAsyncThunk(
  "admin/createAllotment",
  async ({ payload }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        BASE_URL_FOR_ADMIN + ADMIN_CREATE_IPO_ALLOTMENT_TIPS,
        payload,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("IPOAllotment tip created successfully");
      return response?.data;
    } catch (error) {
      toast.error("Somthing went wrong");
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const getAllAllotment = createAsyncThunk(
  "admin/getAllAllotment",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        BASE_URL_FOR_ADMIN + ADMIN_GET_ALL_IPO_ALLOTMENT_TIPS,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        }
      );
      return response?.data?.data;
    } catch (error) {
      toast.error("Somthing went wrong");

      return rejectWithValue(error?.response?.data);
    }
  }
);

export const updateAllotment = createAsyncThunk(
  "admin/updateAllotment",
  async ({ payload }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${BASE_URL_FOR_ADMIN + ADMIN_UPDATE_IPO_ALLOTMENT_TIPS}${payload?.id}`,
        payload,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("IPOAllotment tip updated successfully");
      return response?.data;
    } catch (error) {
      toast.error("Somthing went wrong");
      return rejectWithValue(error?.response?.data);
    }
  }
);

const ipoAllotSlice = createSlice({
  name: "admin/ipoAllotSlice",
  initialState,
  extraReducers: (builder) => {
    builder
      //CREATE
      .addCase(createAllotment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createAllotment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.createIpoAllotData = action.payload;
      })
      .addCase(createAllotment.rejected, (state) => {
        state.isLoading = false;
      })
      //READ
      .addCase(getAllAllotment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllAllotment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.getAllIpoAllotData = action.payload;
      })
      .addCase(getAllAllotment.rejected, (state) => {
        state.isLoading = false;
      })
      //UPDATE
      .addCase(updateAllotment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAllotment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.updateIpoAllotData = action.payload;
      })
      .addCase(updateAllotment.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default ipoAllotSlice.reducer;
