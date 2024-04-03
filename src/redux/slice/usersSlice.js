import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import {
  ADMIN_GETALL_USERS,
  ADMIN_GET_SINGLE_USER,
  ADMIN_UPDATE_USER,
  BASE_URL_FOR_ADMIN,
} from "../../UrlConfig";
import { toast } from "react-toastify";

const initialState = {
  isLoading: false,
  createData: [],
  updateData: [],
  getAllData: [],
  getDataByIdData: [],
};

export const getAllUsers = createAsyncThunk(
  "admin/getAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL_FOR_ADMIN + ADMIN_GETALL_USERS}`,
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

export const updateUsers = createAsyncThunk(
  "admin/updateUsers",
  async ({ payload }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL_FOR_ADMIN + ADMIN_UPDATE_USER}`,
        payload?.payload,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("User updated successfully");
      return response?.data?.data;
    } catch (error) {
      toast.error(
        error?.response?.data.msg
          ? error?.response?.data.msg
          : "Somthing went wrong"
      );
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const getUserById = createAsyncThunk(
  "admin/getUserById",
  async ({ payload }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BASE_URL_FOR_ADMIN + ADMIN_GET_SINGLE_USER}${payload?.id}`,
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

const usersSlice = createSlice({
  name: "usersSlice",
  initialState,
  extraReducers: (builder) => {
    builder
      //READ
      .addCase(getAllUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.getAllData = action.payload;
      })
      .addCase(getAllUsers.rejected, (state) => {
        state.isLoading = false;
      })
      //UPDATE
      .addCase(updateUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.updateData = action.payload;
      })
      .addCase(updateUsers.rejected, (state) => {
        state.isLoading = false;
      });
    // .addCase(getUserById.pending, (state) => {
    //   state.isLoading = true;
    // })
    // .addCase(getUserById.fulfilled, (state, action) => {
    //   state.isLoading = false;
    //   state.getDataByIdData = action.payload;
    // })
    // .addCase(getUserById.rejected, (state) => {
    //   state.isLoading = false;
    // });
  },
});

export default usersSlice.reducer;
