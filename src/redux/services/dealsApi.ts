import { baseQuery } from "@/redux/services/baseApi";
import { createApi } from "@reduxjs/toolkit/query/react";

export const dealsApi = createApi({
  reducerPath: "dealsApi",
  baseQuery,
  tagTypes: ["DEALS"],
  endpoints: (builder) => ({
    createDeal: builder.mutation({
      query: (bodyData) => ({
        url: "/api/deals",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyData),
      }),
      invalidatesTags: ["DEALS"],
    }),
    getDeal: builder.query({
      query: (dealId) => ({
        url: `/api/deals/${dealId}`,
        method: "GET",
      }),
      providesTags: ["DEALS"],
    }),

    getAllDeals: builder.query({
      query: ({ search, limit, page }) => {
        const params = new URLSearchParams();
        if (search) params.append("search", search);
        if (limit) params.append("limit", limit);
        if (page) params.append("page", page);

        return {
          url: `/api/deals`,
          params: params,
          method: "GET",
        };
      },
      providesTags: ["DEALS"],
    }),

    updateDeal: builder.mutation({
      query: ({ dealId, bodyData }) => ({
        url: `/api/deals/${dealId}`,
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyData),
      }),
      invalidatesTags: ["DEALS"],
    }),

    deleteDeal: builder.mutation({
      query: (dealId) => ({
        url: `/api/deals/${dealId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["DEALS"],
    }),
  }),
});

export const {
  useCreateDealMutation,
  useGetDealQuery,
  useGetAllDealsQuery,
  useUpdateDealMutation,
  useDeleteDealMutation,
} = dealsApi;
