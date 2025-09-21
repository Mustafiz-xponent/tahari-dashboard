import { baseQuery } from "@/redux/services/baseApi";
import { createApi } from "@reduxjs/toolkit/query/react";

export const categoriesApi = createApi({
  reducerPath: "categoriesApi",
  baseQuery,
  tagTypes: ["CATEGORY"],
  endpoints: (builder) => ({
    createCategory: builder.mutation({
      query: (bodyData) => ({
        url: "/api/categories",
        method: "POST",
        body: JSON.stringify(bodyData),
      }),
      invalidatesTags: ["CATEGORY"],
    }),

    getCategory: builder.query({
      query: (categoryId) => ({
        url: `/api/categories/${categoryId}`,
        method: "GET",
      }),
      providesTags: ["CATEGORY"],
    }),

    getAllCategories: builder.query({
      query: ({ search, limit, page }) => {
        const params = new URLSearchParams();
        if (search) params.append("search", search);
        if (limit) params.append("limit", limit);
        if (page) params.append("page", page);

        return {
          url: `/api/categories`,
          params: params,
          method: "GET",
        };
      },
      providesTags: ["CATEGORY"],
    }),

    updateCategory: builder.mutation({
      query: ({ categoryId, bodyData }) => ({
        url: `/api/categories/${categoryId}`,
        method: "PUT",
        body: JSON.stringify(bodyData),
      }),
      invalidatesTags: ["CATEGORY"],
    }),

    deleteCategory: builder.mutation({
      query: (categoryId) => ({
        url: `/api/categories/${categoryId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["CATEGORY"],
    }),
  }),
});

export const {
  useCreateCategoryMutation,
  useGetCategoryQuery,
  useGetAllCategoriesQuery,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoriesApi;
