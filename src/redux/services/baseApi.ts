import CONFIG from "@/config/envConfig";
import type { RootState } from "@/redux/store";
// import { clearUser } from "@/redux/slices/userSlice";
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// import type {
//   BaseQueryFn,
//   FetchArgs,
//   FetchBaseQueryError,
// } from "@reduxjs/toolkit/query";

export const baseQuery = fetchBaseQuery({
  baseUrl: `${CONFIG.SERVER_URL}`,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as RootState;
    const token = state.userReducer?.token;

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    headers.set("Content-Type", "application/json");
    return headers;
  },
});

// export const baseQuery: BaseQueryFn<
//   string | FetchArgs,
//   unknown,
//   FetchBaseQueryError
// > = async (args, api, extraOptions) => {
//   const result = await rawBaseQuery(args, api, extraOptions);

//   if (result.error && result.error.status === 401) {
//     // Clear user from store
//     api.dispatch(clearUser());

//     // Optionally redirect to login page
//     if (typeof window !== "undefined") {
//       window.location.href = "/login";
//     }
//   }
//   return result;
// };
