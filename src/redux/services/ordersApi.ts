// import { baseQuery } from "@/redux/services/baseApi";
// import { createApi } from "@reduxjs/toolkit/query/react";

// export const ordersApi = createApi({
//   reducerPath: "ordersApi",
//   baseQuery,
//   tagTypes: ["ORDER"],
//   endpoints: (builder) => ({
//     createOrder: builder.mutation({
//       query: (bodyData) => ({
//         url: "/api/orders",
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(bodyData),
//       }),
//       invalidatesTags: ["ORDER"],
//     }),

//     // getOrder: builder.query({
//     //   query: (orderId) => ({
//     //     url: `/api/orders/${orderId}`,
//     //     method: "GET",
//     //   }),
//     //   providesTags: ["ORDER"],
//     // }),
//     getOrder: builder.query({
//       query: (orderId) => ({
//         url: `/api/orders/${orderId}`,
//         method: "GET",
//       }),
//       providesTags: (result, error, orderId) => [
//         { type: "ORDER", id: orderId },
//       ],
//     }),

//     getAllOrders: builder.query({
//       query: ({ search, limit, page, status }) => {
//         const params = new URLSearchParams();
//         if (search) params.append("search", search);
//         if (limit) params.append("limit", limit);
//         if (page) params.append("page", page);
//         if (status) params.append("status", status);

//         return {
//           url: `/api/orders`,
//           params: params,
//           method: "GET",
//         };
//       },
//       providesTags: ["ORDER"],
//     }),

//     updateOrder: builder.mutation({
//       query: ({ orderId, bodyData }) => ({
//         url: `/api/orders/${orderId}`,
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(bodyData),
//       }),
//       invalidatesTags: ["ORDER"],
//     }),

//     deleteOrder: builder.mutation({
//       query: (orderId) => ({
//         url: `/api/orders/${orderId}`,
//         method: "DELETE",
//       }),
//       invalidatesTags: ["ORDER"],
//     }),
//   }),
// });

// export const {
//   useCreateOrderMutation,
//   useGetOrderQuery,
//   useGetAllOrdersQuery,
//   useUpdateOrderMutation,
//   useDeleteOrderMutation,
// } = ordersApi;

// ---------------------------- 2222222222222222222222222222222 ----------------------------
// redux/services/ordersApi.ts

import { baseQuery } from "@/redux/services/baseApi";
import { createApi } from "@reduxjs/toolkit/query/react";

export const ordersApi = createApi({
  reducerPath: "ordersApi",
  baseQuery,
  tagTypes: ["ORDER"],
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (bodyData) => ({
        url: "/api/orders",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyData),
      }),
      invalidatesTags: ["ORDER"],
    }),

    getOrder: builder.query({
      query: (orderId) => ({
        url: `/api/orders/${orderId}`,
        method: "GET",
      }),
      providesTags: (result, error, orderId) => [
        { type: "ORDER", id: orderId },
      ],
    }),

    getAllOrders: builder.query({
      query: ({ search, limit, page, status, startDate, endDate }) => {
        const params = new URLSearchParams();
        if (search) params.append("search", search);
        if (limit) params.append("limit", String(limit));
        if (page) params.append("page", String(page));
        if (status) params.append("status", status);
        if (startDate) params.append("startDate", startDate);
        if (endDate) params.append("endDate", endDate);

        return {
          url: `/api/orders`,
          params: params,
          method: "GET",
        };
      },
      providesTags: ["ORDER"],
    }),

    updateOrder: builder.mutation({
      query: ({ orderId, bodyData }) => ({
        url: `/api/orders/${orderId}`,
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyData),
      }),
      invalidatesTags: ["ORDER"],
    }),

    deleteOrder: builder.mutation({
      query: (orderId) => ({
        url: `/api/orders/${orderId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ORDER"],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrderQuery,
  useGetAllOrdersQuery,
  useUpdateOrderMutation,
  useDeleteOrderMutation,
} = ordersApi;