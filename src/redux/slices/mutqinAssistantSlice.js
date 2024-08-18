// apiSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseURL } from "../api/url";

const initialState = {
  data: null,
  loading: false,
  error: null,
  singleTemplate: null,
  // selectedTemplate: null,
};
export const getAllUserTemplate = createAsyncThunk(
  "getAllUserTemplate",
  async () => {
    const token = localStorage.getItem("token");
    const { data } = await axios.get(
      `${baseURL}/v1/mutqin_assistant/all_templates/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data.results;
  }
);

export const createMutqinAssistant = createAsyncThunk(
  "createMutqinAssistant",
  async ({ document_id, template_name, template_id, question, language }) => {
    const token = localStorage.getItem("token");
    const { data } = await axios.post(
      `${baseURL}/v1/mutqin_assistant/${document_id}/`,
      {
        question: question,
        language: language,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          template_name,
          h_i: template_id,
        },
      }
    );

    return data;
  }
);

export const editMutqinAssistant = createAsyncThunk(
  "mutqin_assistant/edit",
  async ({ document_id, template_name, template_id, question, language }) => {
    const token = localStorage.getItem("token");
    const { data } = await axios.put(
      `${baseURL}/v1/mutqin_assistant/${document_id}/detail/`,
      {
        template_name,
        template_id,
        question,
        language,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data.results.id;
  }
);

// Delete template
export const deleteMutqinAssistant = createAsyncThunk(
  "mutqin_assistant/delete",
  async (document_id) => {
    const token = localStorage.getItem("token");
    await axios.delete(
      `${baseURL}/v1/mutqin_assistant/${document_id}/detail/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return document_id;
  }
);

const mutqinAssistantSlice = createSlice({
  name: "mutqin_assistant",
  initialState,
  reducers: {
    addNewTemplate: (state, action) => {
      return;
      state.loading = false;
      state.data = { ...action.payload };
    },
    deleteOneTemplate: (state, action) => {
      state.loading = false;
      state.data = state.data.filter(
        (template) => template.id !== action.payload.id
      );
    },
    selectedTemplate: (state, action) => {
      state.singleTemplate = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllUserTemplate.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllUserTemplate.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(getAllUserTemplate.rejected, (state, action) => {
        state.loading = false;
        state.data = null;
        state.error = action.error.message;
      })
      .addCase(createMutqinAssistant.pending, (state) => {
        state.loading = true;
      })
      .addCase(createMutqinAssistant.fulfilled, (state, action) => {
        state.loading = false;
        state.singleTemplate = action.payload;
        state.data.push(action.payload);
        state.error = null;
      })
      .addCase(createMutqinAssistant.rejected, (state, action) => {
        state.loading = false;
        state.data = null;
        state.error = action.error.message;
      })
      .addCase(editMutqinAssistant.pending, (state) => {
        state.loading = true;
      })
      // Edit Mutqin Assistant
      .addCase(editMutqinAssistant.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.data.findIndex(
          (item) => item.id === action.payload.id
        );
        if (index !== -1) {
          state.data[index] = action.payload;
        }
        state.error = null;
      })
      .addCase(editMutqinAssistant.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Delete Mutqin Assistant
      .addCase(deleteMutqinAssistant.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteMutqinAssistant.fulfilled, (state, action) => {
        state.loading = false;
        state.data = state.data.filter((item) => item.id !== action.payload);
        state.error = null;
      })
      .addCase(deleteMutqinAssistant.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});
export const { addNewTemplate, deleteOneTemplate, selectedTemplate } =
  mutqinAssistantSlice.actions;
export default mutqinAssistantSlice.reducer;
