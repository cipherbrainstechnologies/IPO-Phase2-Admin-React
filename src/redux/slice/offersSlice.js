import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import {
  ADMIN_CREATE_OFFERS,
  ADMIN_GET_ALL_OFFERS,
  ADMIN_GET_OFFER_BY_ID,
  ADMIN_OFFER_DELETE,
  ADMIN_UPDATE_OFFER,
  ADMIN_UPDATE_OFFER_IMAGE,
  BASE_URL_FOR_ADMIN,
} from "../../UrlConfig";
import { toast } from "react-toastify";

const initialState = {
  isLoading: false,
  getAllOffersData: [],
  // offerData: null,
  deleteOffer: [],
  addOfferData: [],
  editOfferData: [],
  offerImage: null,
};

export const getAllOffers = createAsyncThunk(
  "admin/getAllOffers",
  async ({ payload }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL_FOR_ADMIN + ADMIN_GET_ALL_OFFERS}?page=${payload?.page
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
      toast.error("Somthing went wrong");
      return rejectWithValue(error);
    }
  }
);

export const createOffer = createAsyncThunk(
  "admin/createOffer",
  async ({ payload }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        BASE_URL_FOR_ADMIN + ADMIN_CREATE_OFFERS,
        payload,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("Offer created successfully");
      return response?.data;
    } catch (error) {
      toast.error("Somthing went wrong");
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);

export const getOfferById = createAsyncThunk(
  "user/getOfferById",
  async ({ payload }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${BASE_URL_FOR_ADMIN + ADMIN_GET_OFFER_BY_ID}${payload.id}`,
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
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateOffer = createAsyncThunk(
  "user/updateOffer",
  async ({ payload }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${BASE_URL_FOR_ADMIN + ADMIN_UPDATE_OFFER}${payload.id}`,
        payload,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("Offer updated successfully");
      return response?.data?.data;
    } catch (error) {
      toast.error("Somthing went wrong");
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteOfferApi = createAsyncThunk(
  "user/deleteOffer",
  async ({ payload }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL_FOR_ADMIN + ADMIN_OFFER_DELETE}`,
        payload,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("offer deleted successfully");
      return response?.data?.data;
    } catch (error) {
      toast.error("Somthing went wrong");
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateOfferImage = createAsyncThunk(
  "admin/updateOfferImage",
  async ({ payloadImage }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${BASE_URL_FOR_ADMIN + ADMIN_UPDATE_OFFER_IMAGE}${payloadImage?.payloadId?.id
        }`,
        payloadImage?.payload,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

const offersSlice = createSlice({
  name: "offersSlice",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(createOffer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createOffer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.addOfferData = action.payload;
      })
      .addCase(createOffer.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getAllOffers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllOffers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.getAllOffersData = action.payload;
      })
      .addCase(getAllOffers.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(updateOffer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateOffer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.editOfferData = action.payload;
      })
      .addCase(updateOffer.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(updateOfferImage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateOfferImage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.offerImage = action.payload;
      })
      .addCase(updateOfferImage.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteOfferApi.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteOfferApi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.deleteOffer = action.payload;
      })
      .addCase(deleteOfferApi.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default offersSlice.reducer;
