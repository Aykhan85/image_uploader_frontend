import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://image-uploader-api.onrender.com/api/image",
  }),
  tagTypes: ["Img"],
  endpoints: (builder) => ({}),
});
