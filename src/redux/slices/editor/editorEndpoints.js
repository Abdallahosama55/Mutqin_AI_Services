// import mutqinApi from "@/redux/api/mutqinApi";

import mutqinApi from "../../api/mutqinApi";

const endpoints = {
  createDoc: "writing-assistant/create-document",
  get_upDoc: "writing-assistant/document",
  getDocs: "writing-assistant/get_user_documents",
  askAi: "writing-assistant/send-message-to-ai",
  getDocFromWeb: "text-rephrase/create",
  exportFileAs: "grammmer-checker/convert-to-",
  addImageToDoc: "writing-assistant/add_image_to_document/",
};

const editorEndpoints = mutqinApi.injectEndpoints({
  endpoints: (builder) => ({
    createDoc: builder.mutation({
      query: ({ id, content, title }) => ({
        url: `${endpoints.createDoc}/${id}/`,
        body: { content, title },
        method: "POST",
      }),
      invalidatesTags: ["documents"],
    }),
    getDoc: builder.query({
      query: ({ id }) => `${endpoints.get_upDoc}/${id}/`,
    }),
    getDocs: builder.query({
      query: (query) =>
        `${endpoints.getDocs}${query ? "?search=" + query : "/"}`,
      providesTags: ["documents"],
    }),
    updateDoc: builder.mutation({
      query: ({ content, title, id }) => ({
        url: `${endpoints.get_upDoc}/${id}/`,
        body: { content, title },
        method: "PATCH",
      }),
    }),
    askAi: builder.mutation({
      query: (message) => ({
        url: `${endpoints.askAi}/`,
        body: { message },
        method: "POST",
      }),
    }),
    //////////////////////////////////////
    getDocFromWeb: builder.mutation({
      query: ({ id, URL }) => ({
        url: `${endpoints.getDocFromWeb}/${id}/`,
        body: { URL },
        method: "POST",
      }),
    }),
    exportFileAs: builder.mutation({
      query: ({ rich_text, type }) => ({
        url: `${endpoints.exportFileAs}-${type}/`,
        body: { rich_text },
        method: "POST",
      }),
    }),
    addImageToDoc: builder.mutation({
      query: ({ body, id }) => ({
        url: `${endpoints.addImageToDoc}${id}/`,
        body: body,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useCreateDocMutation,
  useLazyGetDocQuery,
  useUpdateDocMutation,
  useAskAiMutation,
  useLazyGetDocsQuery,
  useGetDocFromWebMutation,
  useExportFileAsMutation,
  useAddImageToDocMutation,
} = editorEndpoints;
