import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://backend.buffrides.com/api/",
  }),
  tagTypes: [
    "Book"
  ],
  endpoints: (builder) => ({}),
});

export default apiSlice;
