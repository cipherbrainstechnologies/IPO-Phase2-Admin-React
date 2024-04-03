import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import {
  ADMIN_CREATE_PRIVACY_POLICY,
  BASE_URL_FOR_ADMIN,
  ADMIN_UPDATE_PRIVACY_POLICY,
  ADMIN_GETALL_PRIVACY_POLICY,
} from "../../UrlConfig";
import { toast } from "react-toastify";

const initialState = {
  isLoading: false,
  createPrivacyPolicyData: [],
  updatePrivacyPolicyData: [],
  getAllPrivacyPolicyData: [],
};

export const createPrivacyPolicy = createAsyncThunk(
  "admin/createPrivacyPolicy",
  async ({ payload }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        BASE_URL_FOR_ADMIN + ADMIN_CREATE_PRIVACY_POLICY,
        payload,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("Privacy policy  tip created successfully");
      return response?.data;
    } catch (error) {
      toast.error("Somthing went wrong");
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const getAllPrivacyPolicy = createAsyncThunk(
  "admin/getAllPrivacyPolicy",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        BASE_URL_FOR_ADMIN + ADMIN_GETALL_PRIVACY_POLICY,
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

export const updatePrivacyPolicy = createAsyncThunk(
  "admin/updatePrivacyPolicy",
  async ({ payload }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${BASE_URL_FOR_ADMIN + ADMIN_UPDATE_PRIVACY_POLICY}${payload?.id}`,
        payload,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("Privacy policy  tip updated successfully");
      return response?.data;
    } catch (error) {
      toast.error("Somthing went wrong");
      return rejectWithValue(error?.response?.data);
    }
  }
);

const privacyPolicySlice = createSlice({
  name: "admin/privacyPolicySlice",
  initialState,
  extraReducers: (builder) => {
    builder
      //CREATE
      .addCase(createPrivacyPolicy.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createPrivacyPolicy.fulfilled, (state, action) => {
        state.isLoading = false;
        state.createPrivacyPolicyData = action.payload;
      })
      .addCase(createPrivacyPolicy.rejected, (state) => {
        state.isLoading = false;
      })
      //READ
      .addCase(getAllPrivacyPolicy.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllPrivacyPolicy.fulfilled, (state, action) => {
        state.isLoading = false;
        state.getAllPrivacyPolicyData = action.payload;
      })
      .addCase(getAllPrivacyPolicy.rejected, (state) => {
        state.isLoading = false;
      })
      //UPDATE
      .addCase(updatePrivacyPolicy.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatePrivacyPolicy.fulfilled, (state, action) => {
        state.isLoading = false;
        state.updatePrivacyPolicyData = action.payload;
      })
      .addCase(updatePrivacyPolicy.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default privacyPolicySlice.reducer;
