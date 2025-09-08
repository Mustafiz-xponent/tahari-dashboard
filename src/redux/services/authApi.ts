import { baseQuery } from "@/redux/services/baseApi";
import { createApi } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery,
  tagTypes: ["USER"],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (bodyData) => ({
        url: "/api/auth/admin/login",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyData),
      }),
    }),
  }),
});

export const { useLoginMutation } = authApi;
