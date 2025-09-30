import { baseQuery } from "@/redux/services/baseApi";
import { createApi } from "@reduxjs/toolkit/query/react";

export const promotionApi = createApi({
  reducerPath: "promotionApi",
  baseQuery,
  tagTypes: ["PROMOTION"],
  endpoints: (builder) => ({
    createPromotion: builder.mutation({
      query: (formData: FormData) => ({
        url: "/api/promotions",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["PROMOTION"],
    }),

    getPromotion: builder.query({
      query: (promotionId) => ({
        url: `/api/promotions/${promotionId}`,
        method: "GET",
      }),
      providesTags: ["PROMOTION"],
    }),

    getAllPromotions: builder.query({
      query: ({ search, limit, page, status }) => {
        const params = new URLSearchParams();
        if (search) params.append("search", search);
        if (limit) params.append("limit", limit);
        if (page) params.append("page", page);
        params.append("status", status ? status : "all");

        return {
          url: `/api/promotions`,
          params: params,
          method: "GET",
        };
      },
      providesTags: ["PROMOTION"],
    }),

    updatePromotion: builder.mutation({
      query: ({ promotionId, formData }) => ({
        url: `/api/promotions/${promotionId}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["PROMOTION"],
    }),

    deletePromotion: builder.mutation({
      query: (promotionId) => ({
        url: `/api/promotions/${promotionId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["PROMOTION"],
    }),
  }),
});

export const {
  useCreatePromotionMutation,
  useGetPromotionQuery,
  useGetAllPromotionsQuery,
  useUpdatePromotionMutation,
  useDeletePromotionMutation,
} = promotionApi;
