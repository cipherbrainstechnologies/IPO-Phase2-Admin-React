import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import React from "react";
import {
  ADMIN_CREATE_FAQS,
  ADMIN_GETALL_FAQS,
  ADMIN_UPDATE_FAQS,
  BASE_URL_FOR_ADMIN,
} from "../../UrlConfig";
import { toast } from "react-toastify";

const initialState = {
  createFaqData: [],
  updateFaqData: [],
  getAllFaqData: [],
};

export const createFaq = createAsyncThunk(
  "admin/createFaq",
  async ({ payload }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        BASE_URL_FOR_ADMIN + ADMIN_CREATE_FAQS,
        payload,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("Faq created successfully");
      return response?.data;
    } catch (error) {
      toast.success("Somthing went wrong");
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const getAllFaqs = createAsyncThunk(
  "admin/getAllFaqs",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(BASE_URL_FOR_ADMIN + ADMIN_GETALL_FAQS, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      });
      return response?.data?.data;
    } catch (error) {
      toast.error("Somthing went wrong");
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const updateFaq = createAsyncThunk(
  "admin/updateFaq",
  async ({ payload }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${BASE_URL_FOR_ADMIN + ADMIN_UPDATE_FAQS}${payload?.id}`,
        payload,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("Faq updated successfully");
      return response?.data;
    } catch (error) {
      toast.error("Somthing went wrong");
      return rejectWithValue(error?.response?.data);
    }
  }
);

const faqsSlice = createSlice({
  name: "admin/faqsSlice",
  initialState,
  extraReducers: (builder) => {
    builder
      //CREATE
      .addCase(createFaq.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createFaq.fulfilled, (state, action) => {
        state.isLoading = false;
        state.createFaqData = action.payload;
      })
      .addCase(createFaq.rejected, (state) => {
        state.isLoading = false;
      })
      //READ
      .addCase(getAllFaqs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllFaqs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.getAllFaqData = action.payload;
      })
      .addCase(getAllFaqs.rejected, (state) => {
        state.isLoading = false;
      })
      //UPDATE
      .addCase(updateFaq.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateFaq.fulfilled, (state, action) => {
        state.isLoading = false;
        state.updateFaqData = action.payload;
      })
      .addCase(updateFaq.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default faqsSlice.reducer;
