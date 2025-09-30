"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { useDebouncedCallback } from "use-debounce";
import { parseAsInteger, parseAsString, useQueryState } from "nuqs";
import { twMerge } from "tailwind-merge";

const SearchInput = ({
  className,
  queryName = "search",
}: {
  className?: string;
  queryName?: string;
}) => {
  const [query, setQuery] = useQueryState(
    queryName,
    parseAsString.withDefault("")
  );

  const [, setPage] = useQueryState("page", parseAsInteger.withDefault(1));

  // Local state for immediate input feedback
  const [inputValue, setInputValue] = React.useState(query);

  // Sync local state with URL changes
  React.useEffect(() => {
    setInputValue(query);
  }, [query]);

  // Debounced update
  const debouncedUpdate = useDebouncedCallback((value: string) => {
    setQuery(value.trim() || null); // remove if empty
    setPage(1); // reset to first page
  }, 500); // 0.5 seconds

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    debouncedUpdate(newValue);
  };

  return (
    <Input
      placeholder="Search Farm's..."
      value={inputValue}
      onChange={handleChange}
      className={twMerge(
        "max-w-sm h-10 text-sm mb-4 border-border focus-visible:border-border focus-visible:ring-0 font-secondary",
        className
      )}
    />
  );
};

export default SearchInput;
