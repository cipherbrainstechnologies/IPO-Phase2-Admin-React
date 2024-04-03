import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import {
  ADMIN_CREATE_MAIN_IPO,
  ADMIN_DELETE_IPO,
  ADMIN_GET_ALL_MAIN_IPO,
  ADMIN_GET_IPO_BY_ID,
  ADMIN_IMG_UPLOAD,
  uploadMETAIMG,
  ADMIN_META_IMAGE,
  ADMIN_UPDATE_IPO,
  BASE_URL_FOR_ADMIN,
} from "../../UrlConfig";
import { toast } from "react-toastify";

const initialState = {
  isLoading: false,
  getIPODataById: [],
  ID: "",
  ALGOLIAID: "",
  getAllMainLineIpoData: [],
  updatedIpo: [],
  createIpo: [],
  uploadImage: "",
  deleteIpo: [],
};

export const getAllMainLineIpo = createAsyncThunk(
  "admin/getAllMainLineIpo",
  async ({ payload }, { rejectWithValue }) => {
    // const { setId } = useContext(IDContext);
    try {
      const response = await axios.post(
        `${BASE_URL_FOR_ADMIN + ADMIN_GET_ALL_MAIN_IPO}?page=${
          payload?.page ? payload?.page : 1
        }&limit=${payload?.limit ? payload?.limit : 10}`,
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
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);
export const getIpoById = createAsyncThunk(
  "admin/getIpoById",
  async ({ payload }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL_FOR_ADMIN + ADMIN_GET_IPO_BY_ID}${payload.id}`,
        payload,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        }
      );
      return response?.data?.IPODetails;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);

export const deleteIpoApi = createAsyncThunk(
  "admin/deleteIpoApi",
  async ({ payload }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL_FOR_ADMIN + ADMIN_DELETE_IPO}`,
        payload,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("IPO deleted successfully");
      return response?.data?.data;
    } catch (error) {
      toast.error("Somthing went wrong");
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);

export const updateIPO = createAsyncThunk(
  "admin/UpdateMainLineIpo",
  async ({ payload }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL_FOR_ADMIN + ADMIN_UPDATE_IPO}${payload.id}`,
        payload,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("IPO updated Successfully");
      return response?.data.data;
    } catch (error) {
      toast.error("Somthing went wrong try again");
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);

//ADMIN_IMG_UPLOAD
export const uploadIMG = createAsyncThunk(
  "admin/uploadIMG",
  async ({ payload }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL_FOR_ADMIN + ADMIN_IMG_UPLOAD}${payload?.id?.id}`,
        payload?.payload,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response?.data?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);
export const META_IMAGE = createAsyncThunk(
  "admin/uploadMetaImage",
  async ({ payload }, { rejectWithValue }) => {
    console.log("payload====>" , payload , "url" , `${BASE_URL_FOR_ADMIN + ADMIN_META_IMAGE}${payload?.id}` )
    try {
      const response = await axios.post(
        `${BASE_URL_FOR_ADMIN + ADMIN_META_IMAGE}${payload?.id}`,
        payload?.payload,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("Meta Image Save Sucessfull");
      return response?.data?.data;
    } catch (error) {
      toast.success("Error while upload Meta Image");
      console.log("error in metaimage" , error)
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);

export const createMainLineIpo = createAsyncThunk(
  "admin/createMainLineIpo",
  async ({ payload }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL_FOR_ADMIN + ADMIN_CREATE_MAIN_IPO}${
          payload.id ? payload.id : null
        }`,
        payload,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("Changes Has Been Saved");
      return response?.data?.data;
    } catch (error) {
      toast.success("Somthing went wrong");

      return rejectWithValue(error?.response?.data?.message);
    }
  }
);

const mainLineIpoSlice = createSlice({
  name: "mainLineIpoSlice",
  initialState,
  reducers: {
    setClearId: (state, action) => {
      state.ID = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllMainLineIpo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllMainLineIpo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.getAllMainLineIpoData = action.payload;
      })
      .addCase(getAllMainLineIpo.rejected, (state) => {
        state.isLoading = false;
      })
      //Fetch By ID
      .addCase(getIpoById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getIpoById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.getIPODataById = action.payload;
      })
      .addCase(getIpoById.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(uploadIMG.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(uploadIMG.fulfilled, (state, action) => {
        state.ID = action.payload?.id;
        state.ALGOLIAID = action.payload?.algoliaID;
        state.uploadImage = action.payload;
        state.isLoading = false;
      })
      .addCase(uploadIMG.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(createMainLineIpo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createMainLineIpo.fulfilled, (state, action) => {
        state.ID = action.payload?.id;
        state.ALGOLIAID = action.payload?.algoliaID;
        state.createIpo = action.payload;
        state.isLoading = false;
      })
      .addCase(createMainLineIpo.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(updateIPO.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateIPO.fulfilled, (state, action) => {
        state.isLoading = false;
        state.updatedIpo = action.payload;
      })
      .addCase(updateIPO.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteIpoApi.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteIpoApi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.deleteIpo = action.payload;
      })
      .addCase(deleteIpoApi.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { setClearId } = mainLineIpoSlice.actions;
export default mainLineIpoSlice.reducer;
