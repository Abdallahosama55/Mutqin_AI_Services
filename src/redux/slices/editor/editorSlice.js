import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  docId: "",
  askAi: "",
  title: "",
  content: "",
  text: "",
  showHistory: false,
  isDocFromWeb: false,
  docIsCreated: false,
};

const editorSlice = createSlice({
  initialState,
  name: "editor",
  reducers: {
    toggleDocIsCreated(state, { payload }) {
      state.docIsCreated = payload;
    },
    toggleIsDocFromWeb(state, { payload }) {
      state.isDocFromWeb = payload;
    },
    setDocId(state, { payload }) {
      state.docId = payload;
    },
    toggleShowHistory(state, { payload }) {
      state.showHistory = payload;
    },
    setTitle(state, { payload }) {
      state.title = payload;
    },
    setContent(state, { payload }) {
      state.content = payload;
    },
    setText(state, { payload }) {
      state.text = payload;
    },
  },
});

export default editorSlice.reducer;
export const {
  toggleShowHistory,
  setTitle,
  setContent,
  setText,
  setDocId,
  toggleIsDocFromWeb,
  toggleDocIsCreated,
} = editorSlice.actions;
