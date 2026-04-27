import { authApi } from "@/redux/services/authApi";
import userReducer from "@/redux/slices/userSlice";
import { dealsApi } from "@/redux/services/dealsApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import { farmersApi } from "@/redux/services/farmersApi";
import { productsApi } from "@/redux/services/productsApi";
import { dashboardApi } from "@/redux/services/dashboardApi";
import { promotionApi } from "@/redux/services/promotionApi";
import { categoriesApi } from "@/redux/services/categoriesApi";
import { subscriptionsApi } from "@/redux/services/subscriptionsApi";
import { inventoriesApi } from "@/redux/services/inventoriesApi";
import { customersApi } from "@/redux/services/customersApi";
import { ordersApi } from "@/redux/services/ordersApi";
import { orderTrackingsApi } from "@/redux/services/orderTrackingsApi";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import { PersistConfig, persistReducer, persistStore } from "redux-persist";

// Fallback no-op storage for non-browser environments
const createNoopStorage = () => {
  return {
    getItem() {
      return Promise.resolve(null);
    },
    setItem(_key: string, value: string) {
      return Promise.resolve(value);
    },
    removeItem() {
      return Promise.resolve(null);
    },
  };
};

const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();

// Combine reducers
const rootReducer = combineReducers({
  userReducer,
  [authApi.reducerPath]: authApi.reducer,
  [dashboardApi.reducerPath]: dashboardApi.reducer,
  [farmersApi.reducerPath]: farmersApi.reducer,
  [categoriesApi.reducerPath]: categoriesApi.reducer,
  [productsApi.reducerPath]: productsApi.reducer,
  [promotionApi.reducerPath]: promotionApi.reducer,
  [dealsApi.reducerPath]: dealsApi.reducer,
  [subscriptionsApi.reducerPath]: subscriptionsApi.reducer,
  [inventoriesApi.reducerPath]: inventoriesApi.reducer,
  [customersApi.reducerPath]: customersApi.reducer,
  [ordersApi.reducerPath]: ordersApi.reducer,
  [orderTrackingsApi.reducerPath]: orderTrackingsApi.reducer,
});

// Define the persist config type
const persistConfig: PersistConfig<ReturnType<typeof rootReducer>> = {
  key: "root",
  storage,
  whitelist: ["userReducer"],
};

// Apply the persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      authApi.middleware,
      dashboardApi.middleware,
      farmersApi.middleware,
      categoriesApi.middleware,
      productsApi.middleware,
      promotionApi.middleware,
      dealsApi.middleware,
      subscriptionsApi.middleware,
      inventoriesApi.middleware,
      customersApi.middleware,
      ordersApi.middleware,
      orderTrackingsApi.middleware
    ),
});

// Set up listeners for cache invalidation/refetching
setupListeners(store.dispatch);

// Export store types
export const persistor = persistStore(store);
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;
