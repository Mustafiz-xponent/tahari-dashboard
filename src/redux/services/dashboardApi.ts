import { baseQuery } from "@/redux/services/baseApi";
import { createApi } from "@reduxjs/toolkit/query/react";

export const dashboardApi = createApi({
  reducerPath: "dashboardApi", // Unique reducerPath
  baseQuery,
  tagTypes: ["DashboardSummary", "SalesOverview"],
  refetchOnMountOrArgChange: true,
  refetchOnFocus: true,
  refetchOnReconnect: true,

  endpoints: (builder) => ({
    getDashboardSummary: builder.query({
      query: () => ({
        url: `/api/dashboard/summary`,
        method: "GET",
      }),
      providesTags: ["DashboardSummary"],
      extraOptions: { pollingInterval: 60000 }, // refetch data every 60 seconds
    }),
    getSalesOverview: builder.query({
      query: (year) => ({
        url: `/api/dashboard/sales-overview?year=${year}`,
        method: "GET",
      }),
      providesTags: ["SalesOverview"],
      extraOptions: { pollingInterval: 60000 }, // refetch data every 60 seconds
    }),
  }),
});

export const { useGetDashboardSummaryQuery, useGetSalesOverviewQuery } =
  dashboardApi;
