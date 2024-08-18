import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentConversation: "",
  new: false,
  starterMessage: "",
  isWriting: false,
};

export const chatSlice = createSlice({
  name: "chat",
  initialState: {
    title: "",
    message: "",
    show: "",
    currentConversation: "",
    new: false,
  },
  reducers: {
    setCurrentConversation: (state, action) => {
      state.currentConversation = action.payload;
    },
    setNew: (state, action) => {
      state.new = action.payload;
    },
    setStarterMessage: (state, action) => {
      state.starterMessage = action.payload;
    },
    setIsWriting: (state, action) => {
      state.isWriting = action.payload;
    },
    setTitle: (state, action) => {
      state.title = action.payload;
    },
    setShow: (state, action) => {
      state.show = action.payload;
    },
    setMessage: (state, action) => {
      state.message = action.payload;
    },
    clearChat: (state) => {
      state.title = "";
      state.message = "";
      state.show = "";
    },
  },
});

export const {
  setCurrentConversation,
  setIsWriting,
  setNew,
  setStarterMessage,
  setTitle,
  setShow,
  setMessage,
  clearChat,
} = chatSlice.actions;

export const selectTitle = (state) => state.chat.title;
export const selectMessage = (state) => state.chat.message;
export const selectShow = (state) => state.chat.show;
export const selectCurrentConversation = (state) =>
  state.chat.currentConversation;
export const selectNew = (state) => state.chat.new;

export default chatSlice.reducer;
