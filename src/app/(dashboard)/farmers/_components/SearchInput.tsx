"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { debounce } from "lodash";

const SearchInput = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [value, setValue] = useState<string>(searchParams.get("search") ?? "");

  const handleSearch = React.useMemo(
    () =>
      debounce((val: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("search", val.trim());
        params.set("page", "1"); // reset page on new search
        router.replace(`?${params.toString()}`);
      }, 300),
    [router, searchParams]
  );

  React.useEffect(() => {
    handleSearch(value);
    return () => handleSearch.cancel();
  }, [value, handleSearch]);

  return (
    <div className="flex items-center pb-4">
      <Input
        placeholder="Search Farm's..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="max-w-sm h-10 text-sm border-border focus-visible:border-border focus-visible:ring-0 font-secondary "
      />
    </div>
  );
};

export default SearchInput;
