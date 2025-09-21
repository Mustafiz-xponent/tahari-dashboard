import * as React from "react";
import { debounce, isEqual } from "lodash";
import { useRouter } from "next/navigation";

interface UseQueryOptions {
  query: Record<string, string>;
  debounceMs?: number;
  resetPageOn?: string[];
}

export function useQuery({
  query,
  debounceMs = 300,
  resetPageOn = ["search"],
}: UseQueryOptions) {
  const router = useRouter();
  const prevQuery = React.useRef<Record<string, string>>(query);

  const updateUrl = React.useMemo(
    () =>
      debounce(
        (query: Record<string, string>, prevQuery: Record<string, string>) => {
          if (isEqual(query, prevQuery)) return;

          const params = new URLSearchParams(window.location.search);

          Object.entries(query).forEach(([key, value]) => {
            if (value == null || value === "") {
              params.delete(key);
            } else {
              params.set(key, String(value));
            }
          });

          // Reset page if special fields changed
          for (const field of resetPageOn) {
            if (query[field] !== prevQuery[field]) {
              params.set("page", "1");
              break;
            }
          }

          const newUrl = `?${params.toString()}`;
          const currentUrl = window.location.search;

          if (newUrl !== currentUrl) {
            router.replace(newUrl);
          }
        },
        debounceMs
      ),
    [router, debounceMs, resetPageOn]
  );

  React.useEffect(() => {
    updateUrl(query, prevQuery.current);
    prevQuery.current = query;
    return () => updateUrl.cancel();
  }, [query, updateUrl]);
}
