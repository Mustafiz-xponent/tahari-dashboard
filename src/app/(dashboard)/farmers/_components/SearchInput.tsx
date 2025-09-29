"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { useDebouncedCallback } from "use-debounce";
import { parseAsInteger, parseAsString, useQueryStates } from "nuqs";

const SearchInput = () => {
  // Get current filters from URL
  const [filters, setFilters] = useQueryStates({
    search: parseAsString.withDefault(""),
    page: parseAsInteger.withDefault(1),
  });

  // Local state for immediate input feedback (better UX)
  const [inputValue, setInputValue] = React.useState(filters.search);

  // Sync local state with URL when URL changes externally
  React.useEffect(() => {
    setInputValue(filters.search);
  }, [filters.search]);

  // Debounced function to update URL (prevents too many updates while typing)
  const debouncedUpdate = useDebouncedCallback((value: string) => {
    setFilters({
      search: value.trim() || null, // Remove from URL if empty
      page: 1, // Reset to page 1 when searching
    });
  }, 500); // 500ms delay

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue); // Update immediately for smooth typing
    debouncedUpdate(newValue); // Update URL after delay
  };

  return (
    <div className="flex items-center pb-4">
      <Input
        placeholder="Search Farm's..."
        value={inputValue}
        onChange={handleChange}
        className="max-w-sm h-10 text-sm border-border focus-visible:border-border focus-visible:ring-0 font-secondary "
      />
    </div>
  );
};

export default SearchInput;
