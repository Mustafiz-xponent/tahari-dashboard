// import { baseQuery } from "@/redux/services/baseApi";
// import { createApi } from "@reduxjs/toolkit/query/react";

// export const inventoriesApi = createApi({
//   reducerPath: "inventoriesApi",
//   baseQuery,
//   tagTypes: ["INVENTORY"],
//   endpoints: (builder) => ({
//     createInventory: builder.mutation({
//       query: (bodyData) => ({
//         url: "/api/inventories",
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(bodyData),
//       }),
//       invalidatesTags: ["INVENTORY"],
//     }),

//     getInventory: builder.query({
//       query: (inventoryId) => ({
//         url: `/api/inventories/${inventoryId}`,
//         method: "GET",
//       }),
//       providesTags: ["INVENTORY"],
//     }),

//     getAllInventories: builder.query({
//       query: ({ search, limit, page }) => {
//         const params = new URLSearchParams();
//         if (search) params.append("search", search);
//         if (limit) params.append("limit", limit);
//         if (page) params.append("page", page);

//         return {
//           url: `/api/inventories`,
//           params: params,
//           method: "GET",
//         };
//       },
//       providesTags: ["INVENTORY"],
//     }),

//     updateInventory: builder.mutation({
//       query: ({ inventoryId, bodyData }) => ({
//         url: `/api/inventories/${inventoryId}`,
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(bodyData),
//       }),
//       invalidatesTags: ["INVENTORY"],
//     }),

//     deleteInventory: builder.mutation({
//       query: (inventoryId) => ({
//         url: `/api/inventories/${inventoryId}`,
//         method: "DELETE",
//       }),
//       invalidatesTags: ["INVENTORY"],
//     }),
//   }),
// });

// export const {
//   useCreateInventoryMutation,
//   useGetInventoryQuery,
//   useGetAllInventoriesQuery,
//   useUpdateInventoryMutation,
//   useDeleteInventoryMutation,
// } = inventoriesApi;


// ------------------------------ 222222222222222222222222222 -------------------------------------
import { baseQuery } from "@/redux/services/baseApi";
import { createApi } from "@reduxjs/toolkit/query/react";
import {
  CreateInventoryPurchaseDto,
  UpdateInventoryPurchaseDto,
  InventoryFilters,
  InventoryPaginationResponse,
  SingleInventoryResponse,
} from "@/types/inventory";

export const inventoriesApi = createApi({
  reducerPath: "inventoriesApi",
  baseQuery,
  tagTypes: ["INVENTORY"],
  endpoints: (builder) => ({
    createInventory: builder.mutation<
      SingleInventoryResponse,
      CreateInventoryPurchaseDto
    >({
      query: (bodyData) => ({
        url: "/api/inventory-purchases",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyData),
      }),
      invalidatesTags: [{ type: "INVENTORY", id: "LIST" }],
    }),

    getInventory: builder.query<
      SingleInventoryResponse,
      string | number
    >({
      query: (inventoryId) => ({
        url: `/api/inventory-purchases/${inventoryId}`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [
        { type: "INVENTORY", id: String(id) },
      ],
    }),

    getAllInventories: builder.query<
      InventoryPaginationResponse,
      Partial<InventoryFilters>
    >({
      query: ({ search = "", limit = 10, page = 1 }) => {
        const params = new URLSearchParams();
        if (search) params.append("search", search);
        params.append("limit", limit.toString());
        params.append("page", page.toString());

        return {
          url: `/api/inventory-purchases`,
          params,
          method: "GET",
        };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ purchaseId }) => ({
                type: "INVENTORY" as const,
                id: String(purchaseId),
              })),
              { type: "INVENTORY", id: "LIST" },
            ]
          : [{ type: "INVENTORY", id: "LIST" }],
    }),

    updateInventory: builder.mutation<
      SingleInventoryResponse,
      { inventoryId: string | number; bodyData: UpdateInventoryPurchaseDto }
    >({
      query: ({ inventoryId, bodyData }) => ({
        url: `/api/inventory-purchases/${inventoryId}`,
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyData),
      }),
      invalidatesTags: (_result, _error, { inventoryId }) => [
        { type: "INVENTORY", id: String(inventoryId) },
        { type: "INVENTORY", id: "LIST" },
      ],
    }),

    deleteInventory: builder.mutation<
      { success: boolean; message: string },
      string | number
    >({
      query: (inventoryId) => ({
        url: `/api/inventory-purchases/${inventoryId}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "INVENTORY", id: "LIST" }],
    }),
  }),
});

export const {
  useCreateInventoryMutation,
  useGetInventoryQuery,
  useGetAllInventoriesQuery,
  useUpdateInventoryMutation,
  useDeleteInventoryMutation,
} = inventoriesApi;