import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../slices/loginSlice";
import apiReducer from "../slices/apiSlice";
import apiSlice from "../features/api/apiSlice";
import userSlice from "../features/api/userSlice";
import { actionsTypes } from "@/helpers/constants";
import articleReducer from "../slices/createArticle/articleSlice";
import editorReducer from "../slices/editor/editorSlice";
import mutqinApi from "../api/mutqinApi";
import chatReducer from "../slices/chatSlice";
import mutqinAssistantSlice from "../slices/mutqinAssistantSlice";
import contentSectionsSlice from "../slices/contentSections/contentSectionsSlice";
import { templateSlice } from "../api/templateSlice";
import { isRejected } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const rtkQueryErrorLogger = (api) => (next) => (action) => {

  if (isRejected()(action)) {

  }
  return next(action);
};

export const createSliceMiddleware =
  (sliceName) =>
  ({ dispatch }) =>
  (next) =>
  (action) => {
    if (action.type.startsWith(sliceName) && isRejected()(action)) {
      try {
        if (action.payload.error?.status === "FETCH_ERROR")
          throw Error("حدث خطأ: من فضلك تحقق من إتصال الإنترنت");
        else {
          if (action.payload.error === "Aborted")
            throw Error(
              "يبدو أن الخادم يستغرق وقتًا طويلاً للرد، يرجى المحاولة مرة أخرى في وقت لاحق"
            );
          throw Error("حدث خطأ أثناء محاولة جلب البيانات");
        }
      } catch (error) {
        toast.error(
          typeof error === "string"
            ? error
            : error?.message || "حدث خطأ أثناء محاولة جلب البيانات",
          {
            style: { direction: "rtl" },
          }
        );
      }
    }

    return next(action);
  };

// Create middleware for apiSlice2
const middlewareForApiSlice2 = createSliceMiddleware("templateSlice");

const store = configureStore({
  reducer: {
    login: loginReducer,
    api: apiReducer,
    mutqinAssistant: mutqinAssistantSlice,
    checker: apiSlice,
    chat: chatReducer,
    user: userSlice,
    article: articleReducer,
    editor: editorReducer,

    contentSections: contentSectionsSlice,
    [mutqinApi.reducerPath]: mutqinApi.reducer,
    [templateSlice.reducerPath]: templateSlice.reducer,
    isOpenHistoryPanel: (state = false, action) => {
      if (action.type === actionsTypes.TOGGLE_HISTORY_PANEL) {
        return !state;
      }
      if (action.type === actionsTypes.TOGGLE_HISTORY_PANEL_FALSE) {
        return false;
      }
      return state;
    },
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware()
      .concat(mutqinApi.middleware)
      .concat(templateSlice.middleware),
    middlewareForApiSlice2,
  ],
});

export default store;
