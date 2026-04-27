// import { baseQuery } from "@/redux/services/baseApi";
// import { createApi } from "@reduxjs/toolkit/query/react";

// interface OrderTrackingResponse {
//   trackingId: number;
//   orderId: number;
//   status: string;
//   location?: string;
//   latitude?: number;
//   longitude?: number;
//   estimatedDelivery?: string;
//   actualDelivery?: string | null;
//   carrier?: string;
//   trackingNumber?: string;
//   notes?: string | null;
//   createdAt?: string;
//   updatedAt?: string;
//   [key: string]: unknown;
// }

// interface OrderTrackingListResponse {
//   data?: OrderTrackingResponse[];
//   orderTrackings?: OrderTrackingResponse[];
//   items?: OrderTrackingResponse[];
//   pagination?: {
//     totalPages: number;
//     currentPage: number;
//     total: number;
//   };
//   [key: string]: unknown;
// }

// export interface TransformedOrderTracking {
//   trackingId: number;
//   orderId: number;
//   status: string;
//   location: string;
//   latitude: number;
//   longitude: number;
//   estimatedDelivery?: string;
//   actualDelivery?: string | null;
//   carrier: string;
//   trackingNumber: string;
//   notes?: string | null;
// }

// export const orderTrackingsApi = createApi({
//   reducerPath: "orderTrackingsApi",
//   baseQuery,
//   tagTypes: ["ORDER_TRACKING"],
//   endpoints: (builder) => ({
//     getAllOrderTrackings: builder.query({
//       query: (params) => ({
//         url: "/order-trackings",
//         params,
//       }),
//       transformResponse: (response: OrderTrackingListResponse) => {
//         // Ensure consistent response format
//         const data = response?.data ?? response?.orderTrackings ?? response?.items ?? [];
//         const items = Array.isArray(data) ? data : [data];

//         // Transform to include only necessary fields
//         const transformedItems = items.map((item: OrderTrackingResponse) => ({
//           trackingId: item.trackingId,
//           orderId: item.orderId,
//           status: item.status,
//           location: item.location || "",
//           latitude: item.latitude || 0,
//           longitude: item.longitude || 0,
//           estimatedDelivery: item.estimatedDelivery,
//           actualDelivery: item.actualDelivery,
//           carrier: item.carrier || "",
//           trackingNumber: item.trackingNumber || "",
//           notes: item.notes || "",
//         }));

//         return {
//           data: transformedItems,
//           pagination: response?.pagination || { totalPages: 1, currentPage: 1, total: transformedItems.length },
//         };
//       },
//       providesTags: ["ORDER_TRACKING"],
//     }),
//     getOrderTracking: builder.query({
//       query: (id) => `/order-trackings/${id}`,
//       transformResponse: (response: OrderTrackingResponse | OrderTrackingResponse[]) => {
//         // Extract only necessary fields for editing
//         const data = Array.isArray(response) ? response[0] : response;
//         if (!data) return null;

//         return {
//           trackingId: data.trackingId,
//           orderId: data.orderId,
//           status: data.status,
//           location: data.location || "",
//           latitude: data.latitude || 0,
//           longitude: data.longitude || 0,
//           estimatedDelivery: data.estimatedDelivery,
//           actualDelivery: data.actualDelivery,
//           carrier: data.carrier || "",
//           trackingNumber: data.trackingNumber || "",
//           notes: data.notes || "",
//         };
//       },
//       providesTags: ["ORDER_TRACKING"],
//     }),
//     getOrderTrackingsByOrderId: builder.query({
//       query: (orderId) => `/order-trackings/${orderId}`,
//       providesTags: ["ORDER_TRACKING"],
//     }),
//     createOrderTracking: builder.mutation({
//       query: (data) => ({
//         url: "/order-trackings",
//         method: "POST",
//         body: data,
//       }),
//       invalidatesTags: ["ORDER_TRACKING"],
//     }),
//     updateOrderTracking: builder.mutation({
//       query: ({ id, ...data }) => ({
//         url: `/order-trackings/${id}`,
//         method: "PUT",
//         body: data,
//       }),
//       invalidatesTags: ["ORDER_TRACKING"],
//     }),
//     deleteOrderTracking: builder.mutation({
//       query: (id) => ({
//         url: `/order-trackings/${id}`,
//         method: "DELETE",
//       }),
//       invalidatesTags: ["ORDER_TRACKING"],
//     }),
//   }),
// });

// export const {
//   useGetAllOrderTrackingsQuery,
//   useGetOrderTrackingQuery,
//   useGetOrderTrackingsByOrderIdQuery,
//   useCreateOrderTrackingMutation,
//   useUpdateOrderTrackingMutation,
//   useDeleteOrderTrackingMutation,
// } = orderTrackingsApi;

// ----------------------------- 2222222222222222222222222222222 -----------------------------
import { baseQuery } from "@/redux/services/baseApi";
import { createApi } from "@reduxjs/toolkit/query/react";
import { OrderTracking, OrderTrackingStatus } from "@/types/orderTracking";

interface OrderTrackingResponse {
  trackingId: number;
  orderId: number;
  status: string;
  description?: string;
  createdAt?: string;
  updateDate?: string;
  [key: string]: unknown;
}

interface OrderTrackingListResponse {
  data?: OrderTrackingResponse[];
  orderTrackings?: OrderTrackingResponse[];
  items?: OrderTrackingResponse[];
  pagination?: {
    totalPages: number;
    currentPage: number;
    total: number;
  };
  [key: string]: unknown;
}

interface QueryParams {
  search?: string;
  limit?: number;
  page?: number;
}

type OrderStatusValue =
  | "PENDING"
  | "CONFIRMED"
  | "PROCESSING"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED";

interface CreateOrderTrackingInput {
  orderId: number;
  status: OrderStatusValue | OrderTrackingStatus;
  description?: string;
}

interface UpdateOrderTrackingInput {
  id: number | string;
  orderId?: number;
  status?: OrderStatusValue | OrderTrackingStatus;
  description?: string;
}

type GetOrderTrackingResponse =
  | OrderTrackingResponse
  | OrderTrackingResponse[]
  | { data: OrderTrackingResponse };

export const orderTrackingsApi = createApi({
  reducerPath: "orderTrackingsApi",
  baseQuery,
  tagTypes: ["ORDER_TRACKING"],
  endpoints: (builder) => ({
    getAllOrderTrackings: builder.query<
      {
        data: OrderTracking[];
        pagination: {
          totalPages: number;
          currentPage: number;
          total: number;
        };
      },
      QueryParams
    >({
      query: (params) => ({
        url: "/order-trackings",
        params,
      }),
      transformResponse: (response: OrderTrackingListResponse) => {
        const data =
          response?.data ??
          response?.orderTrackings ??
          response?.items ??
          [];
        const items = Array.isArray(data) ? data : [data];

        const transformedItems: OrderTracking[] = items.map(
          (item: OrderTrackingResponse) => ({
            trackingId: item.trackingId,
            orderId: item.orderId,
            status: item.status as OrderTrackingStatus,
            description: item.description || "",
            createdAt: item.createdAt,
            updateDate: item.updateDate,
          })
        );

        return {
          data: transformedItems,
          pagination: response?.pagination || {
            totalPages: 1,
            currentPage: 1,
            total: transformedItems.length,
          },
        };
      },
      providesTags: ["ORDER_TRACKING"],
    }),
    getOrderTracking: builder.query<OrderTracking | null, number>({
      query: (id) => `/order-trackings/${id}`,
      transformResponse: (response: GetOrderTrackingResponse): OrderTracking | null => {
        // Handle different response formats
        let data: OrderTrackingResponse | undefined;

        if (Array.isArray(response)) {
          data = response[0];
        } else if ("data" in response && response.data) {
          data = response.data as OrderTrackingResponse;
        } else if ("trackingId" in response) {
          data = response as OrderTrackingResponse;
        }

        if (!data) return null;

        return {
          trackingId: data.trackingId,
          orderId: data.orderId,
          status: data.status as OrderTrackingStatus,
          description: data.description || "",
          createdAt: data.createdAt,
          updateDate: data.updateDate,
        };
      },
      providesTags: ["ORDER_TRACKING"],
    }),
    getOrderTrackingsByOrderId: builder.query<OrderTracking[], number>({
      query: (orderId) => `/order-trackings/${orderId}`,
      transformResponse: (
        response: OrderTrackingResponse[] | { data?: OrderTrackingResponse[] }
      ): OrderTracking[] => {
        const data = Array.isArray(response) ? response : response?.data ?? [];

        return data.map((item: OrderTrackingResponse) => ({
          trackingId: item.trackingId,
          orderId: item.orderId,
          status: item.status as OrderTrackingStatus,
          description: item.description || "",
          createdAt: item.createdAt,
          updateDate: item.updateDate,
        }));
      },
      providesTags: ["ORDER_TRACKING"],
    }),
    createOrderTracking: builder.mutation<
      { success: boolean; message: string },
      CreateOrderTrackingInput
    >({
      query: (data) => ({
        url: "/order-trackings",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["ORDER_TRACKING"],
    }),
    updateOrderTracking: builder.mutation<
      { success: boolean; message: string },
      UpdateOrderTrackingInput
    >({
      query: ({ id, ...data }) => ({
        url: `/order-trackings/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["ORDER_TRACKING"],
    }),
    deleteOrderTracking: builder.mutation<
      { success: boolean; message: string },
      number
    >({
      query: (id) => ({
        url: `/order-trackings/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ORDER_TRACKING"],
    }),
  }),
});

export const {
  useGetAllOrderTrackingsQuery,
  useGetOrderTrackingQuery,
  useGetOrderTrackingsByOrderIdQuery,
  useCreateOrderTrackingMutation,
  useUpdateOrderTrackingMutation,
  useDeleteOrderTrackingMutation,
} = orderTrackingsApi;