import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./mutqinApi";

const endpoints = {
  getTemplates: "templates/templates/",
  getDocuments: "templates/user-template/",
  getUserDocument: ({ request_id }) =>
    `templates/user-templates-info/${request_id}/`,
  documentSearcher: ({ token }) => `templates/user-template/?search=${token}`,
  getCategories: "templates/categories/",
  toggleFavoriteTemplates: ({ id }) => `templates/favorite-templates/${id}/`,
  createUserTemplate: ({ document_id }) =>
    `templates/user-template/${document_id}/`,
  updateUserTemplate: ({ request_id }) =>
    `templates/user-templates-info/${request_id}/`,
};

export const templateSlice = createApi({
  baseQuery: baseQuery,
  reducerPath: "templateSlice",
  endpoints: (builder) => ({
    getTemplates: builder.query({
      query: () => endpoints.getTemplates,
    }),
    getCategories: builder.query({
      query: () => endpoints.getCategories,
    }),
    favoriteTemplates: builder.mutation({
      query: (id) => ({
        url: endpoints.toggleFavoriteTemplates({ id }),
        method: "POST",
      }),
      async onQueryStarted(id, { queryFulfilled, dispatch }) {
        try {
          const { data: favoriteState } = await queryFulfilled;

          dispatch(
            templateSlice.util.updateQueryData(
              "getTemplates",
              undefined,
              (draft) => {
                let template = draft?.find((item) => item?.id === id);

                template.is_favorite = favoriteState.curr_state;
              }
            )
          );
        } catch (error) {}
      },
    }),
    createUserTemplate: builder.mutation({
      query: ({ template_id, document_id, request_id, form_data }) => ({
        url: endpoints.createUserTemplate({ document_id }),
        method: "POST",
        params: {
          t_i: template_id,
          h_i: request_id,
        },

        mimeType: "multipart/form-data",
        body: form_data,
      }),
    }),
    updateUserTemplate: builder.mutation({
      query: ({ request_id, title, content }) => ({
        url: endpoints.updateUserTemplate({ request_id }),
        method: "PATCH",
        mimeType: "multipart/form-data",
        body: { title, content },
      }),
    }),
    getUserDocument: builder.query({
      query: ({ request_id }) => endpoints.getUserDocument({ request_id }),
      onError: (error) => {
        // Handle the error here
        console.error("An error occurred while fetching data:", error);
        // Return a default value or handle the error in a custom way
        return { data: null }; // Returning a default value
      },
    }),

    getDocuments: builder.query({
      query: () => endpoints.getDocuments,
    }),
    documentSearcher: builder.query({
      query: (token) => endpoints.documentSearcher({ token }),
    }),
  }),
});

templateSlice.reducerPath = "templateSlice";

export const {
  useGetTemplatesQuery,
  useGetCategoriesQuery,
  useFavoriteTemplatesMutation,
  useCreateUserTemplateMutation,
  useUpdateUserTemplateMutation,
  useLazyGetUserDocumentQuery,
  useLazyGetDocumentsQuery,
  useLazyDocumentSearcherQuery,
} = templateSlice;
