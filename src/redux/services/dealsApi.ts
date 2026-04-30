// import { baseQuery } from "@/redux/services/baseApi";
// import { createApi } from "@reduxjs/toolkit/query/react";

// export const dealsApi = createApi({
//   reducerPath: "dealsApi",
//   baseQuery,
//   tagTypes: ["DEALS"],
//   endpoints: (builder) => ({
//     createDeal: builder.mutation({
//       query: (bodyData) => ({
//         url: "/api/deals",
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(bodyData),
//       }),
//       invalidatesTags: ["DEALS"],
//     }),
//     getDeal: builder.query({
//       query: (dealId) => ({
//         url: `/api/deals/${dealId}`,
//         method: "GET",
//       }),
//       providesTags: ["DEALS"],
//     }),

//     getAllDeals: builder.query({
//       query: ({ search, limit, page }) => {
//         const params = new URLSearchParams();
//         if (search) params.append("search", search);
//         if (limit) params.append("limit", limit);
//         if (page) params.append("page", page);

//         return {
//           url: `/api/deals`,
//           params: params,
//           method: "GET",
//         };
//       },
//       providesTags: ["DEALS"],
//     }),

//     updateDeal: builder.mutation({
//       query: ({ dealId, bodyData }) => ({
//         url: `/api/deals/${dealId}`,
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(bodyData),
//       }),
//       invalidatesTags: ["DEALS"],
//     }),

//     deleteDeal: builder.mutation({
//       query: (dealId) => ({
//         url: `/api/deals/${dealId}`,
//         method: "DELETE",
//       }),
//       invalidatesTags: ["DEALS"],
//     }),
//   }),
// });

// export const {
//   useCreateDealMutation,
//   useGetDealQuery,
//   useGetAllDealsQuery,
//   useUpdateDealMutation,
//   useDeleteDealMutation,
// } = dealsApi;

// ----------------------------- 22222222222222222222222222 -----------------------------
import { baseQuery } from "@/redux/services/baseApi";
import { createApi } from "@reduxjs/toolkit/query/react";
import { Deal, DealResponse } from "@/types/deal";

export interface GetAllDealsParams {
  page?: number;
  limit?: number;
  sort?: "asc" | "desc";
  isActive?: boolean;
  search?: string;
}

export interface CreateDealPayload {
  title: string;
  description?: string;
  discountType: "PERCENTAGE" | "FLAT";
  discountValue: number;
  startDate: string;
  endDate: string;
  isGlobal: boolean;
  productIds?: string[]; // ✅ Changed to string[]
}

export interface UpdateDealPayload {
  dealId: string;
  title?: string;
  description?: string;
  discountType?: "PERCENTAGE" | "FLAT";
  discountValue?: number;
  startDate?: string;
  endDate?: string;
  isGlobal?: boolean;
  productIds?: string[]; // ✅ Changed to string[]
}

export const dealsApi = createApi({
  reducerPath: "dealsApi",
  baseQuery,
  tagTypes: ["DEALS"],
  endpoints: (builder) => ({
    getAllDeals: builder.query<DealResponse, GetAllDealsParams>({
      query: (params) => ({
        url: "/api/deals",
        params,
      }),
      providesTags: ["DEALS"],
    }),

    getDealById: builder.query<DealResponse, string>({
      query: (dealId) => `/api/deals/${dealId}`,
      providesTags: ["DEALS"],
    }),

    createDeal: builder.mutation<DealResponse, CreateDealPayload>({
      query: (data) => ({
        url: "/api/deals",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["DEALS"],
    }),

    updateDeal: builder.mutation<DealResponse, UpdateDealPayload>({
      query: ({ dealId, ...data }) => ({
        url: `/api/deals/${dealId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["DEALS"],
    }),

    deleteDeal: builder.mutation<DealResponse, string>({
      query: (dealId) => ({
        url: `/api/deals/${dealId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["DEALS"],
    }),
  }),
});

export const {
  useGetAllDealsQuery,
  useGetDealByIdQuery,
  useCreateDealMutation,
  useUpdateDealMutation,
  useDeleteDealMutation,
} = dealsApi;
