import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import {
     ADMIN_GET_ALL_BANNERS,
     ADMIN_CREATE_BANNERS,
     ADMIN_UPDATE_BANNER,
     ADMIN_UPDATE_BANNER_IMAGE,
     ADMIN_GET_BANNER_BY_ID,
     ADMIN_BANNER_DELETE,
  BASE_URL_FOR_ADMIN,
} from "../../UrlConfig";
import { toast } from "react-toastify";

const initialState = {
  isLoading: false,
  getAllBannersData: [],
  // offerData: null,
  deleteBanner: [],
  addBannerData: [],
  editBannerData: [],
  bannerImage: null,
};

export const getAllBanners = createAsyncThunk(
  "admin/getAllBanners",
  async ({ payload }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL_FOR_ADMIN + ADMIN_GET_ALL_BANNERS}?page=${payload?.page
        }&limit=${payload?.limit}`,
        // BASE_URL_FOR_ADMIN + ADMIN_GET_ALL_BANNERS,
        payload,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        }
      );
      console.log("================================",response?.data);
      return response?.data?.data;
    } catch (error) {
      toast.error("Somthing went wrong");
      return rejectWithValue(error);
    }
  }
);

export const createBanner = createAsyncThunk(
  "admin/createBanner",
  async ({ payload }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        BASE_URL_FOR_ADMIN + ADMIN_CREATE_BANNERS,
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

export const getBannerById = createAsyncThunk(
  "user/getBannerById",
  async ({ payload }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${BASE_URL_FOR_ADMIN + ADMIN_GET_BANNER_BY_ID}${payload.id}`,
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

export const updateBanner = createAsyncThunk(
  "user/updateBanner",
  async ({ payload }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${BASE_URL_FOR_ADMIN + ADMIN_UPDATE_BANNER}${payload.id}`,
        payload,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("Banner updated successfully");
      return response?.data?.data;
    } catch (error) {
      toast.error("Somthing went wrong");
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteBannerApi = createAsyncThunk(
  "user/deleteBanner",
  async ({ payload }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL_FOR_ADMIN + ADMIN_BANNER_DELETE}`,
        payload,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("Banner deleted successfully");
      console.log("================================",response?.data);
      return response?.data;
      // return payload.bannerId;
    } catch (error) {
      toast.error("Somthing went wrong");
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateBannerImage = createAsyncThunk(
  "admin/updateBannerImage",
  async ({ payloadImage }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${BASE_URL_FOR_ADMIN + ADMIN_UPDATE_BANNER_IMAGE}${payloadImage?.payloadId?.id
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

const bannersSlice = createSlice({
  name: "bannersSlice",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(createBanner.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBanner.fulfilled, (state, action) => {
        state.isLoading = false;
        state.addBannerData = action.payload;
      })
      .addCase(createBanner.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getAllBanners.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllBanners.fulfilled, (state, action) => {
        state.isLoading = false;
        state.getAllBannersData = action.payload;
      })
      .addCase(getAllBanners.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(updateBanner.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateBanner.fulfilled, (state, action) => {
        state.isLoading = false;
        state.editBannerData = action.payload;
      })
      .addCase(updateBanner.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(updateBannerImage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateBannerImage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.bannerImage = action.payload;
      })
      .addCase(updateBannerImage.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteBannerApi.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteBannerApi.fulfilled, (state, action) => {
        state.isLoading = true;
        state.deleteBanner = action.payload;
      })
      .addCase(deleteBannerApi.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default bannersSlice.reducer;
