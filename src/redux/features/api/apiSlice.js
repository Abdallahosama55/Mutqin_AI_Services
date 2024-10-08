import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL, BEARER_TOKEN } from "@/helpers/constants";
import showdown from "showdown";
import { adjustColor } from "../../../helpers/changeColor";

export const createDocument = createAsyncThunk(
  "checker/createDocument",
  async (isEditor) => {
    const url = !isEditor
      ? "/grammmer-checker/documents/"
      : "/writing-assistant/generate-id/";

    const response = await axios({
      method: isEditor ? "get" : "post",
      url: `${API_URL}${url}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${BEARER_TOKEN}`,
      },
    });

    if (isEditor) {
      await axios.post(
        `${API_URL}/writing-assistant/create-document/${response.data.uuid}/`,
        { content: "ad" },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${BEARER_TOKEN}`,
          },
        }
      );
    }

    return isEditor ? response.data.uuid : response.data.unique_id;
  }
);

export const getDocument = createAsyncThunk(
  "checker/getDocument",
  async ({ docId, isEditor }) => {
    const url = !isEditor
      ? "/grammmer-checker/documents/"
      : "/writing-assistant/document/";
    const response = await axios.get(`${API_URL}${url}${docId}/`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${BEARER_TOKEN}`,
      },
    });
    return response.data;
  }
);

export const checkMistakes = createAsyncThunk(
  "checker/checkMistakes",
  async ({ content }, { getState }) => {
    const { checker } = getState();
    if (checker.currentDoc === "") throw new Error("No document ID");
    const response = await axios.post(
      `${API_URL}/grammmer-checker/check-mistakes/${checker.currentDoc}/`,
      { content },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${BEARER_TOKEN}`,
        },
      }
    );

    const mistakes = response.data.mistakes.map((mistake) => ({
      ...mistake,
      color: adjustColor(mistake.color, 40),
    }));
    return mistakes;
  }
);

export const correctMistake = createAsyncThunk(
  "checker/correctMistake",
  async ({ mistake, content }, { getState }) => {
    const { checker } = getState();
    if (checker.currentDoc === "") throw new Error("No document ID");
    const response = await axios.post(
      `${API_URL}/grammmer-checker/correct-mistakes/${checker.currentDoc}/`,
      {
        content,
        mistakes_to_correct: [mistake],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${BEARER_TOKEN}`,
        },
      }
    );

    const updatedMistakes =
      response.data.mistakes.map((mistake) => ({
        ...mistake,
        color: adjustColor(mistake.color, 40),
      })) || [];

    return {
      corrected_text: response.data.corrected_text,
      mistakes: updatedMistakes,
    };
  }
);

export const correctMistakes = createAsyncThunk(
  "checker/correctMistakes",
  async ({ mistakes_to_correct, content }, { getState }) => {
    const { checker } = getState();
    if (checker.currentDoc === "") throw new Error("No document ID");

    const response = await axios.post(
      `${API_URL}/grammmer-checker/correct-mistakes/${checker.currentDoc}/`,
      {
        content,
        mistakes_to_correct,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${BEARER_TOKEN}`,
        },
      }
    );

    const updatedMistakes =
      response.data.mistakes.map((mistake) => ({
        ...mistake,
        color: adjustColor(mistake.color, 40),
      })) || [];

    return {
      corrected_text: response.data.corrected_text,
      mistakes: updatedMistakes,
    };
  }
);

export const rephraseText = createAsyncThunk(
  "checker/rephraseText",
  async (_, { getState }) => {
    const { checker } = getState();
    if (checker.currentDoc === "") throw new Error("No document ID");

    const response = await axios.post(
      `${API_URL}/text-rephrase/create/${checker.currentDoc}/`,
      { original_text: checker.content },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${BEARER_TOKEN}`,
        },
      }
    );

    const converter = new showdown.Converter();
    return converter.makeHtml(response.data.rephrased_text);
  }
);

export const editorAskAi = createAsyncThunk(
  "editor/askAi",
  async ({ content }, { getState }) => {
    const { checker } = getState();

    if (checker.currentDoc === "") throw new Error("No document ID");
    const response = await axios.post(
      `${API_URL}/writing-assistant/send-message-to-ai/`,
      { message: content },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${BEARER_TOKEN}`,
        },
      }
    );

    const converter = new showdown.Converter();

    return converter.makeHtml(response.data.response);
  }
);

export const checkerAskAi = createAsyncThunk(
  "checker/askAi",
  async ({ content }, { getState }) => {
    const { checker } = getState();

    if (checker.currentDoc === "") throw new Error("No document ID");
    const response = await axios.post(
      `${API_URL}/writing-assistant/send-message-to-ai/`,
      { message: content },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${BEARER_TOKEN}`,
        },
      }
    );
    const converter = new showdown.Converter();

    return converter.makeHtml(response.data.response);
  }
);

export const updateDocument = createAsyncThunk(
  "checker/updateDocument",
  async ({ content, isEditor, title }, { getState }) => {
    const { checker } = getState();
    const url = !isEditor
      ? "/grammmer-checker/documents/"
      : "/writing-assistant/document/";
    if (checker.currentDoc === "") throw new Error("No document ID");
    const response = await axios.patch(
      `${API_URL}${url}${checker.currentDoc}/`,
      { title: title || checker.title, content },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${BEARER_TOKEN}`,
        },
      }
    );
    return response.data;
  }
);

export const checkerSlice = createSlice({
  name: "checker",
  initialState: {
    currentDoc: "",
    mistakes: [],
    status: "idle",
    error: "",
    ai: {
      aiResponse: "",
      aiStatus: "idle",
    },
    checkerAi: {
      aiResponse: "",
      aiStatus: "idle",
    },
    title: "مستند جديد",
    content: "",
    text: "",
  },
  reducers: {
    setCurrentDoc: (state, { payload }) => {
      state.currentDoc = payload;
    },
    setContent: (state, { payload }) => {
      state.content = payload;
    },
    setMistakes: (state, { payload }) => {
      state.mistakes = payload;
    },
    setTitle: (state, { payload }) => {
      state.title = payload;
    },
    setText: (state, { payload }) => {
      state.text = payload;
    },
    updateContent: (state, { payload }) => {
      state.content = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createDocument.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createDocument.fulfilled, (state, { payload }) => {
        state.status = "succeeded";
        state.currentDoc = payload;
      })
      .addCase(createDocument.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(checkMistakes.rejected, (state) => {
        state.status = "failed";
        state.error =
          "يتعذر التحقق من الأخطاء الآن. يرجى المحاولة مرة أخرى لاحقًا.";
      })
      .addCase(checkMistakes.fulfilled, (state, { payload }) => {
        state.mistakes = payload;
      })
      .addCase(correctMistake.fulfilled, (state, { payload }) => {
        state.content = payload.corrected_text;
        state.mistakes = payload.mistakes;
      })
      .addCase(correctMistakes.fulfilled, (state, { payload }) => {
        state.content = payload.corrected_text;
        state.mistakes = payload.mistakes; // تحديث الأخطاء بعد التصحيح
      })
      .addCase(rephraseText.fulfilled, (state, { payload }) => {
        state.content = payload;
      });
  },
});

export const {
  setCurrentDoc,
  setContent,
  setTitle,
  setText,
  updateContent,
  setMistakes,
} = checkerSlice.actions;
export default checkerSlice.reducer;
