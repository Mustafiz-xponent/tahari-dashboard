"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@/hooks/use-query";

const SearchInput = () => {
  const searchParams = useSearchParams();
  const [value, setValue] = useState<string>(searchParams.get("search") ?? "");

  const query = React.useMemo(() => ({ search: value }), [value]);
  useQuery({
    query,
  });

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
