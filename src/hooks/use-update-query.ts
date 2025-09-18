"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export function useUpdateQuery() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateQuery = useCallback(
    (updates: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString());

      for (const key in updates) {
        const value = updates[key];
        if (value === null || value === "") {
          params.delete(key); // remove empty values
        } else {
          params.set(key, value);
        }
      }

      router.replace(`?${params.toString()}`);
    },
    [router, searchParams]
  );

  return updateQuery;
}
