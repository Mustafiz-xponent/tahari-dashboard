import { baseQuery } from "@/redux/services/baseApi";
import { createApi } from "@reduxjs/toolkit/query/react";

export const dashboardApi = createApi({
  reducerPath: "dashboardApi", // Unique reducerPath
  baseQuery,
  endpoints: (builder) => ({
    getDashboardSummary: builder.query({
      query: () => ({
        url: `/api/dashboard/summary`,
        method: "GET",
      }),
    }),
    getSalesOverview: builder.query({
      query: (year) => ({
        url: `/api/dashboard/sales-overview?year=${year}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetDashboardSummaryQuery, useGetSalesOverviewQuery } =
  dashboardApi;
