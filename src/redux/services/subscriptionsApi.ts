import { baseQuery } from "@/redux/services/baseApi";
import { createApi } from "@reduxjs/toolkit/query/react";

export const subscriptionsApi = createApi({
  reducerPath: "subscriptionsApi",
  baseQuery,
  tagTypes: ["SUBSCRIPTION"],
  endpoints: (builder) => ({
    createSubscription: builder.mutation({
      query: (bodyData) => ({
        url: "/api/subscriptions",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyData),
      }),
      invalidatesTags: ["SUBSCRIPTION"],
    }),

    getSubscription: builder.query({
      query: (subscriptionId) => ({
        url: `/api/subscriptions/${subscriptionId}`,
        method: "GET",
      }),
      providesTags: ["SUBSCRIPTION"],
    }),

    getAllSubscriptions: builder.query({
      query: ({ search, limit, page }) => {
        const params = new URLSearchParams();
        if (search) params.append("search", search);
        if (limit) params.append("limit", limit);
        if (page) params.append("page", page);

        return {
          url: `/api/subscriptions`,
          params: params,
          method: "GET",
        };
      },
      providesTags: ["SUBSCRIPTION"],
    }),

    updateSubscription: builder.mutation({
      query: ({ subscriptionId, bodyData }) => ({
        url: `/api/subscriptions/${subscriptionId}`,
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyData),
      }),
      invalidatesTags: ["SUBSCRIPTION"],
    }),

    deleteSubscription: builder.mutation({
      query: (subscriptionId) => ({
        url: `/api/subscriptions/${subscriptionId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["SUBSCRIPTION"],
    }),
  }),
});

export const {
  useCreateSubscriptionMutation,
  useGetSubscriptionQuery,
  useGetAllSubscriptionsQuery,
  useUpdateSubscriptionMutation,
  useDeleteSubscriptionMutation,
} = subscriptionsApi;
