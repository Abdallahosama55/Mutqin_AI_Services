// apiSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseURL } from "../api/url";
import toast from "react-hot-toast";

const initialState = {
  data: null,
  loading: false,
  error: null,
  post: { data: null, loading: false, error: null },
  rephrasePost: { data: null, loading: false, error: null, id: null },
  rephraseimport: { data: null, loading: false, error: null },
  delete: { data: null, loading: false, error: null },
  userImage: null, // Add a new state for the user image
  userName: null, // Add a new state for the user name
  userWordsRemain: null,
  userWordsSubscription: null,
  userSubscriptionPlan: null,
  userSubscriptionPlanEn: null,
  experiedDatePlan: null,
  createdDatePlan: null,
  userSubscriptionPriceUsd: null,
  userSubscriptionPriceEG: null,
};

export const fetchData = createAsyncThunk(
  "api/fetchData",
  async ({ endpoint, params }) => {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${baseURL}${endpoint}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: params,
    });
    return response.data;
  }
);
export const updateData = createAsyncThunk(
  "api/updateData",
  async ({ endpoint, title }) => {
    const token = localStorage.getItem("token");
    const response = await axios.put(
      `${baseURL}${endpoint}`,
      { title: title },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  }
);
export const patchData = createAsyncThunk(
  "api/patchData",
  async ({ endpoint, title }) => {
    const token = localStorage.getItem("token");
    const response = await axios.patch(
      `${baseURL}${endpoint}`,
      { title: title },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  }
);

export const deleteData = createAsyncThunk(
  "api/deleteData",
  async ({ endpoint }) => {
    const token = localStorage.getItem("token");

    await axios.delete(`${baseURL}${endpoint}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return 0;
  }
);

export const postData = createAsyncThunk(
  "api/postData",
  async ({ endpoint, data }) => {
    const token = localStorage.getItem("token");
    // const response = await axios.post(`${baseURL}${endpoint}`, data, {
    const response = await axios.post(
      `${baseURL}${endpoint}`,
      { prompt: data },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  }
);
export const postRephrase = createAsyncThunk(
  "api/postRephrase",
  async ({ endpoint, data, language, setbar }) => {
    const token = localStorage.getItem("token");
    // const response = await axios.post(`${baseURL}${endpoint}`, data, {
    const response = await axios.post(
      `https://backend.mutqinai.com/api/${endpoint}`,
      { original_text: data, language },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        onUploadProgress: () => {
          setbar(Math.floor(Math.random() * (80 - 50 + 1)) + 50);
        },
      }
    );

    return response.data;
  }
);
export const importRephrase = createAsyncThunk(
  "api/importRephrase",
  async ({ endpoint, URL }) => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        `${baseURL}${endpoint}`,
        { URL: URL },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      if (error?.response?.data?.error?.ar)
        toast.error(error?.response?.data?.error?.ar + ", يمكنك ترقية حسابك.", {
          style: {
            direction: "rtl",
          },
        });
    }
  }
);

const apiSlice = createSlice({
  name: "api",
  initialState,
  reducers: {
    removeRephraseData: (state, action) => {
      state.rephrasePost.data = null;
    },
    getuniqeId: (state, action) => {
      state.rephrasePost.id = action.payload;
    },
    // Existing reducer actions...
    setUserImage: (state, action) => {
      state.userImage = action.payload;
    },
    setUserName: (state, action) => {
      state.userName = action.payload;
    },
    setUserWordsRemain: (state, action) => {
      state.userWordsRemain = action.payload;
    },
    setUserWordsSubscription: (state, action) => {
      state.userWordsSubscription = action.payload;
    },
    setUserSubscriptionPlan: (state, action) => {
      state.userSubscriptionPlan = action.payload;
    },
    setUserSubscriptionPlanEn: (state, action) => {
      state.userSubscriptionPlanEn = action.payload;
    },
    
    setExperiedDatePlan: (state, action) => {
      state.experiedDatePlan = action.payload;
    },

    setCreatedDatePlan: (state, action) => {
      state.createdDatePlan = action.payload;
    },
    setUserSubscriptionPriceEG: (state, action) => {
      state.userSubscriptionPriceEG = action.payload;
    },
    setUserSubscriptionPriceUsd: (state, action) => {
      state.userSubscriptionPriceUsd = action.payload;
    },
  },
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
        state.delete.loading = false;
        state.delete.error = null;
      })
      .addCase(deleteData.rejected, (state, action) => {
        state.delete.loading = false;
        state.delete.data = null;
        state.delete.error = action.error.message;
      })
      .addCase(deleteData.pending, (state) => {
        state.delete.loading = true;
      })
      .addCase(postData.fulfilled, (state, action) => {
        state.post.loading = false;
        state.post.error = null;
      })
      .addCase(postData.rejected, (state, action) => {
        state.post.loading = false;
        state.post.data = null;
        state.post.error = action.error.message;
      })
      .addCase(postData.pending, (state) => {
        state.post.loading = true;
      })
      //
      //Reformulate
      //
      .addCase(postRephrase.fulfilled, (state, action) => {
        state.rephrasePost.data = { ...action.payload, paraphrase: true };
        state.rephrasePost.loading = false;
        state.rephrasePost.error = null;
      })
      .addCase(postRephrase.rejected, (state, action) => {
        state.rephrasePost.loading = false;
        state.rephrasePost.data = null;
        state.rephrasePost.error = action.error.message;
      })
      .addCase(postRephrase.pending, (state) => {
        state.rephrasePost.loading = true;
      })
      .addCase(importRephrase.fulfilled, (state, action) => {
        state.rephrasePost.data = { ...action.payload, paraphrase: false };

        state.rephrasePost.loading = false;
        state.rephrasePost.error = null;
      })
      .addCase(importRephrase.rejected, (state, action) => {
        state.rephrasePost.loading = false;
        state.rephrasePost.data = null;
        state.rephrasePost.error = action.error.message;
      })
      .addCase(importRephrase.pending, (state) => {
        state.rephrasePost.loading = true;
      });
  },
});
export const {
  setUserImage,
  setUserName,
  setUserSubscriptionPriceEG,
  setUserSubscriptionPriceUsd,
  setUserWordsRemain,
  setCreatedDatePlan,
  setUserSubscriptionPlanEn,
  setExperiedDatePlan,
  setUserWordsSubscription,
  setUserSubscriptionPlan,
} = apiSlice.actions;
export const { removeRephraseData, getuniqeId } = apiSlice.actions;
export default apiSlice.reducer;