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
      invalidatesTags: ["FARMER"],
    }),

    getFarmer: builder.query({
      query: (farmerId) => ({
        url: `/api/farmers/${farmerId}`,
        method: "GET",
      }),
      providesTags: ["FARMER"],
    }),

    getAllFarmers: builder.query({
      query: ({ search, limit, page }) => {
        const params = new URLSearchParams();
        if (search) params.append("search", search);
        if (limit) params.append("limit", limit);
        if (page) params.append("page", page);

        return {
          url: `/api/farmers`,
          params: params,
          method: "GET",
        };
      },
      providesTags: ["FARMER"],
    }),

    updateFarmer: builder.mutation({
      query: ({ farmerId, bodyData }) => ({
        url: `/api/farmers/${farmerId}`,
        method: "POST",
        body: JSON.stringify(bodyData),
      }),
      invalidatesTags: ["FARMER"],
    }),

    deleteFarmer: builder.mutation({
      query: (farmerId) => ({
        url: `/api/farmers/${farmerId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["FARMER"],
    }),
  }),
});

export const {
  useCreateFarmerMutation,
  useGetFarmerQuery,
  useGetAllFarmersQuery,
  useUpdateFarmerMutation,
  useDeleteFarmerMutation,
} = farmerApi;
