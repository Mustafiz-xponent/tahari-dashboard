import React from "react";
import { debounce } from "lodash";
import { useRouter, useSearchParams } from "next/navigation";

interface URLParamsConfig {
  defaultPage?: number;
  defaultLimit?: number;
  debounceMs?: number;
}

export const useURLParams = (config: URLParamsConfig = {}) => {
  const { defaultPage = 1, defaultLimit = 10, debounceMs = 300 } = config;

  const router = useRouter();
  const searchParams = useSearchParams();

  // Get current values from URL
  const currentSearch = searchParams.get("search") || "";
  const currentPage = parseInt(searchParams.get("page") || String(defaultPage));
  const currentLimit = parseInt(
    searchParams.get("limit") || String(defaultLimit)
  );

  // Single update function
  const updateParams = React.useCallback(
    (updates: {
      search?: string;
      page?: number;
      limit?: number;
      resetPage?: boolean;
    }) => {
      const params = new URLSearchParams(searchParams.toString());

      if (updates.search !== undefined) {
        if (updates.search.trim()) {
          params.set("search", updates.search.trim());
        } else {
          params.delete("search");
        }
      }

      if (updates.resetPage) {
        params.set("page", String(defaultPage));
      } else if (updates.page !== undefined) {
        params.set("page", String(updates.page));
      }

      if (updates.limit !== undefined) {
        params.set("limit", String(updates.limit));
      }

      router.replace(`?${params.toString()}`);
    },
    [router, searchParams, defaultPage]
  );

  // Debounced version for search
  const debouncedUpdateParams = React.useMemo(
    () => debounce(updateParams, debounceMs),
    [updateParams, debounceMs]
  );

  // Search handler
  const setSearch = React.useCallback(
    (search: string) => {
      debouncedUpdateParams({
        search,
        resetPage: true,
      });
    },
    [debouncedUpdateParams]
  );

  // Pagination handlers
  const setPage = React.useCallback(
    (page: number) => {
      updateParams({ page });
    },
    [updateParams]
  );

  const setLimit = React.useCallback(
    (limit: number) => {
      updateParams({
        limit,
        resetPage: true, // Usually reset to page 1 when changing limit
      });
    },
    [updateParams]
  );

  // Cleanup debounced function
  React.useEffect(() => {
    return () => {
      debouncedUpdateParams.cancel();
    };
  }, [debouncedUpdateParams]);

  return {
    // Current values
    search: currentSearch,
    page: currentPage,
    limit: currentLimit,

    // Setters
    setSearch,
    setPage,
    setLimit,

    // Raw update function for complex updates
    updateParams,

    // Cleanup
    cleanup: () => debouncedUpdateParams.cancel(),
  };
};
