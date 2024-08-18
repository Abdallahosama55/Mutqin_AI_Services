import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseURL } from "./url";

const token = localStorage.getItem("token");
export const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_MUTQIN_API,
  timeout: 60000 * 6,
  prepareHeaders: (headers) => {
    token && headers.set("authorization", `Bearer ${token}`);
    return headers;
  },
});
const mutqinApi = createApi({
  reducerPath: "mutqinApi",
  baseQuery,
  tagTypes: [],
  endpoints: (builder) => ({
    getNextHistory: builder.query({
      query: (url) => url,
    }),
    deleteTableItem: builder.query({
      query: (url) => ({url,method:"DELETE"}),
      invalidatesTags: ["articles","documents"],
      
    }),
  }),
});

export default mutqinApi;
export const { useLazyGetNextHistoryQuery,useLazyDeleteTableItemQuery } = mutqinApi;
