// chatSlice.js
import { createSlice } from "@reduxjs/toolkit";

export const chatSlice = createSlice({
  name: "chat",
  initialState: {
    title: "",
    message: "",
  },
  reducers: {
    setTitle: (state, action) => {
      state.title = action.payload;
    },
    setMessage: (state, action) => {
      state.message = action.payload;
    },
    clearChat: (state) => {
      state.title = "";
      state.message = "";
    },
  },
});

export const { setTitle, setMessage, clearChat } = chatSlice.actions;

export const selectTitle = (state) => state.chat.title;
export const selectMessage = (state) => state.chat.message;

export default chatSlice.reducer;
