import { configureStore } from "@reduxjs/toolkit";
import chatReducer from "./reducers/chatSlice";

const store = configureStore({
  reducer: {
    chat: chatReducer,
  },
});

export default store;
