import { baseQuery } from "@/redux/services/baseApi";
import { createApi } from "@reduxjs/toolkit/query/react";

export const farmerApi = createApi({
  reducerPath: "farmerApi",
  baseQuery,
  tagTypes: ["FARMER"],
  endpoints: (builder) => ({
    createFarmer: builder.mutation({
      query: (bodyData) => ({
        url: "/api/farmers",
        method: "POST",
        body: JSON.stringify(bodyData),
      }),
    }),
  }),
});

export const { useCreateFarmerMutation } = farmerApi;
