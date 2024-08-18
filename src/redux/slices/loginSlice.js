// apiSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseURL } from "../api/url";

const initialState = {
  data: null,
  loading: false,
  error: null,
};

export const fetchData = createAsyncThunk(
  "login/fetchData",
  async ({ endpoint, params }) => {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${baseURL}${endpoint}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: params, // Pass pagination parameters here
    });
    return response.data;
  }
);

export const updateData = createAsyncThunk(
  "login/updateData",
  async (endpoint, data) => {
    const response = await axios.put(`${baseURL}${endpoint}`, data);
    return response.data;
  }
);

export const deleteData = createAsyncThunk(
  "login/deleteData",
  async (endpoint) => {
    const token = localStorage.getItem("token");

    await axios.delete(`${baseURL}${endpoint}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return 0;
  }
);

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        state.data = null;
        state.error = action.error.message;
      })
      .addCase(updateData.fulfilled, (state, action) => {
        // Handle update data success
      })
      .addCase(deleteData.fulfilled, (state, action) => {
        // Handle delete data success
      });
  },
});

export default loginSlice.reducer;
