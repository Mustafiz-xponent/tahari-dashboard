import { baseQuery } from "@/redux/services/baseApi";
import { createApi } from "@reduxjs/toolkit/query/react";
import {
  CustomersApiResponse,
  SingleCustomerApiResponse,
} from "@/types/customer";

export interface GetAllCustomersParams {
  page?: number;
  limit?: number;
  sort?: "asc" | "desc";
  search?: string;
}

export interface UpdateCustomerPayload {
  id: string;
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  password?: string;
}

export const customersApi = createApi({
  reducerPath: "customersApi",
  baseQuery,
  tagTypes: ["CUSTOMERS"],
  endpoints: (builder) => ({
    getAllCustomers: builder.query<CustomersApiResponse, GetAllCustomersParams>(
      {
        query: (params) => ({
          url: "/api/customers", // ✅ Changed: Added /api
          params,
        }),
        providesTags: ["CUSTOMERS"],
      },
    ),

    getCustomer: builder.query<SingleCustomerApiResponse, string>({
      query: (id) => `/api/customers/${id}`, // ✅ Changed: Added /api
      providesTags: ["CUSTOMERS"],
    }),

    updateCustomer: builder.mutation<
      SingleCustomerApiResponse,
      UpdateCustomerPayload
    >({
      query: ({ id, ...data }) => ({
        url: `/api/customers/${id}`, // ✅ Changed: Added /api
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["CUSTOMERS"],
    }),

    deleteCustomer: builder.mutation<
      { success: boolean; message: string },
      string
    >({
      query: (id) => ({
        url: `/api/customers/${id}`, // ✅ Changed: Added /api
        method: "DELETE",
      }),
      invalidatesTags: ["CUSTOMERS"],
    }),
  }),
});

export const {
  useGetAllCustomersQuery,
  useGetCustomerQuery,
  useUpdateCustomerMutation,
  useDeleteCustomerMutation,
} = customersApi;
