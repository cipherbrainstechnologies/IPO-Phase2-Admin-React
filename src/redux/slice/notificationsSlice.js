import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import {
  ADMIN_CREATE_NOTIFICATIONS,
  ADMIN_GETALL_NOTIFICATIONS,
  ADMIN_GET_SINGLE_USER,
  ADMIN_UPDATE_USER,
  BASE_URL_FOR_ADMIN,
} from "../../UrlConfig";

const initialState = {
  isLoading: false,
  createData: [],
  getAllData: [],
};

export const createNotification = createAsyncThunk(
  "admin/createNotification",
  async ({ payload }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        BASE_URL_FOR_ADMIN + ADMIN_CREATE_NOTIFICATIONS,
        payload,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        }
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const getAllNotifications = createAsyncThunk(
  "admin/getAllNotifications",
  async ({ payload }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL_FOR_ADMIN + ADMIN_GETALL_NOTIFICATIONS}?page=${
          payload?.page
        }&limit=${payload?.limit}`,
        payload,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        }
      );
      return response?.data?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

const notificationsSlice = createSlice({
  name: "notificationsSlice",
  initialState,
  extraReducers: (builder) => {
    builder
      //CREATE
      .addCase(createNotification.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createNotification.fulfilled, (state, action) => {
        state.isLoading = false;
        state.createData = action.payload;
      })
      .addCase(createNotification.rejected, (state) => {
        state.isLoading = false;
      })
      //READ
      .addCase(getAllNotifications.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllNotifications.fulfilled, (state, action) => {
        state.isLoading = false;
        state.getAllData = action.payload;
      })
      .addCase(getAllNotifications.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default notificationsSlice.reducer;
