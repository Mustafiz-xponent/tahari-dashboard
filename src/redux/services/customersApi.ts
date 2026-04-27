import { baseQuery } from "@/redux/services/baseApi";
import { createApi } from "@reduxjs/toolkit/query/react";

export const customersApi = createApi({
  reducerPath: "customersApi",
  baseQuery,
  tagTypes: ["CUSTOMERS"],
  endpoints: (builder) => ({
    getAllCustomers: builder.query({
      query: (params) => ({
        url: "/customers",
        params,
      }),
      providesTags: ["CUSTOMERS"],
    }),
    getCustomer: builder.query({
      query: (id) => `/customers/${id}`,
      providesTags: ["CUSTOMERS"],
    }),
    createCustomer: builder.mutation({
      query: (data) => ({
        url: "/customers",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["CUSTOMERS"],
    }),
    updateCustomer: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/customers/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["CUSTOMERS"],
    }),
    deleteCustomer: builder.mutation({
      query: (id) => ({
        url: `/customers/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["CUSTOMERS"],
    }),
  }),
});

export const {
  useGetAllCustomersQuery,
  useGetCustomerQuery,
  useCreateCustomerMutation,
  useUpdateCustomerMutation,
  useDeleteCustomerMutation,
} = customersApi;