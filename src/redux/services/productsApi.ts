import { baseQuery } from "@/redux/services/baseApi";
import { createApi } from "@reduxjs/toolkit/query/react";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery,
  tagTypes: ["PRODUCT"],
  endpoints: (builder) => ({
    createProduct: builder.mutation({
      query: (formData: FormData) => ({
        url: "/api/products",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["PRODUCT"],
    }),

    getProduct: builder.query({
      query: (productId) => ({
        url: `/api/products/${productId}`,
        method: "GET",
      }),
      providesTags: ["PRODUCT"],
    }),

    getAllProducts: builder.query({
      query: ({ search, limit, page }) => {
        const params = new URLSearchParams();
        if (search) params.append("search", search);
        if (limit) params.append("limit", limit);
        if (page) params.append("page", page);

        return {
          url: `/api/products`,
          params: params,
          method: "GET",
        };
      },
      providesTags: ["PRODUCT"],
    }),

    updateProduct: builder.mutation({
      query: ({ productId, formData }) => ({
        url: `/api/products/${productId}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["PRODUCT"],
    }),

    deleteProduct: builder.mutation({
      query: (productId) => ({
        url: `/api/products/${productId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["PRODUCT"],
    }),
  }),
});

export const {
  useCreateProductMutation,
  useGetProductQuery,
  useGetAllProductsQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productsApi;
