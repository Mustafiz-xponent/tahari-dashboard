// "use client";
// import * as React from "react";
// import {
//   flexRender,
//   getCoreRowModel,
//   useReactTable,
// } from "@tanstack/react-table";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { useGetAllOrdersQuery } from "@/redux/services/ordersApi";
// import { DataTablePagination } from "@/components/common/DataTablePagination";
// import { Columns } from "@/app/(dashboard)/orders/_components/Columns";
// import { DataTableSkeleton } from "@/components/common/DataTableSkeleton";
// import { parseAsInteger, parseAsString, useQueryStates } from "nuqs";
// import SearchInput from "@/components/common/SearchInput";

// export function DataTable() {
//   const [filters, setFilters] = useQueryStates({
//     search: parseAsString.withDefault(""),
//     limit: parseAsInteger.withDefault(10),
//     page: parseAsInteger.withDefault(1),
//   });

//   // Build query for API
//   const query = React.useMemo(
//     () => ({
//       search: filters.search.trim(),
//       limit: filters.limit,
//       page: filters.page,
//     }),
//     [filters]
//   );

//   const { data, isLoading, isFetching } = useGetAllOrdersQuery(query);

//   const orders = data?.data ?? [];
//   const pageCount = data?.pagination?.totalPages ?? 0;

//   const table = useReactTable({
//     data: orders,
//     columns: Columns,
//     pageCount,
//     manualPagination: true,
//     getCoreRowModel: getCoreRowModel(),
//   });

//   if (isLoading) {
//     return <DataTableSkeleton columnCount={Columns.length} />;
//   }

//   return (
//     <div className="w-full">
//       <div className="flex items-center py-4">
//         <SearchInput placeholder="Search orders..." />
//       </div>
//       <div className="rounded-md border">
//         <Table>
//           <TableHeader>
//             {table.getHeaderGroups().map((headerGroup) => (
//               <TableRow key={headerGroup.id}>
//                 {headerGroup.headers.map((header) => {
//                   return (
//                     <TableHead key={header.id}>
//                       {header.isPlaceholder
//                         ? null
//                         : flexRender(
//                             header.column.columnDef.header,
//                             header.getContext()
//                           )}
//                     </TableHead>
//                   );
//                 })}
//               </TableRow>
//             ))}
//           </TableHeader>
//           <TableBody>
//             {table.getRowModel().rows?.length ? (
//               table.getRowModel().rows.map((row) => (
//                 <TableRow
//                   key={row.id}
//                   data-state={row.getIsSelected() && "selected"}
//                 >
//                   {row.getVisibleCells().map((cell) => (
//                     <TableCell key={cell.id}>
//                       {flexRender(
//                         cell.column.columnDef.cell,
//                         cell.getContext()
//                       )}
//                     </TableCell>
//                   ))}
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell
//                   colSpan={Columns.length}
//                   className="h-24 text-center"
//                 >
//                   No results.
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </div>
//       <DataTablePagination table={table} isLoading={isFetching} />
//     </div>
//   );
// }

// ---------------------------------- 222222222222222222222222222222 ------------------------------------
// app/(dashboard)/orders/_components/DataTable.tsx

"use client";

import * as React from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { CalendarIcon, Loader2, Search, X } from "lucide-react";
import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetAllOrdersQuery } from "@/redux/services/ordersApi";
import { DataTablePagination } from "@/components/common/DataTablePagination";
import { Columns } from "@/app/(dashboard)/orders/_components/Columns";
import { DataTableSkeleton } from "@/components/common/DataTableSkeleton";
import { parseAsInteger, parseAsString, useQueryStates } from "nuqs";
import { cn } from "@/lib/utils";

export function DataTable() {
  const [filters, setFilters] = useQueryStates({
    search: parseAsString.withDefault(""),
    limit: parseAsInteger.withDefault(10),
    page: parseAsInteger.withDefault(1),
    status: parseAsString.withDefault(""),
    startDate: parseAsString.withDefault(""),
    endDate: parseAsString.withDefault(""),
  });

  // Local search state for debouncing
  const [searchInput, setSearchInput] = React.useState(filters.search);
  const searchTimerRef = React.useRef<NodeJS.Timeout | null>(null);

  // Date picker states
  const [startDateOpen, setStartDateOpen] = React.useState(false);
  const [endDateOpen, setEndDateOpen] = React.useState(false);

  // Debounced search
  const handleSearchChange = React.useCallback(
    (value: string) => {
      setSearchInput(value);

      if (searchTimerRef.current) {
        clearTimeout(searchTimerRef.current);
      }

      searchTimerRef.current = setTimeout(() => {
        setFilters({
          search: value.trim() || "",
          page: 1,
        });
      }, 400);
    },
    [setFilters],
  );

  // Clear search
  const handleClearSearch = React.useCallback(() => {
    setSearchInput("");
    setFilters({ search: "", page: 1 });
  }, [setFilters]);

  // Handle status change
  const handleStatusChange = React.useCallback(
    (value: string) => {
      setFilters({
        status: value === "all" ? "" : value,
        page: 1,
      });
    },
    [setFilters],
  );

  // Handle date changes
  const handleStartDateChange = React.useCallback(
    (date: Date | undefined) => {
      setFilters({
        startDate: date ? format(date, "yyyy-MM-dd") : "",
        page: 1,
      });
      setStartDateOpen(false);
    },
    [setFilters],
  );

  const handleEndDateChange = React.useCallback(
    (date: Date | undefined) => {
      setFilters({
        endDate: date ? format(date, "yyyy-MM-dd") : "",
        page: 1,
      });
      setEndDateOpen(false);
    },
    [setFilters],
  );

  // Clear all filters
  const handleClearFilters = React.useCallback(() => {
    setSearchInput("");
    setFilters({
      search: "",
      status: "",
      startDate: "",
      endDate: "",
      page: 1,
    });
  }, [setFilters]);

  // Build query for API
  const query = React.useMemo(
    () => ({
      search: filters.search.trim(),
      limit: filters.limit,
      page: filters.page,
      status: filters.status || undefined,
      startDate: filters.startDate || undefined,
      endDate: filters.endDate || undefined,
    }),
    [filters],
  );

  const { data, isLoading, isFetching } = useGetAllOrdersQuery(query);

  const orders = data?.data ?? [];
  const pageCount = data?.pagination?.totalPages ?? 0;

  const table = useReactTable({
    data: orders,
    columns: Columns,
    pageCount,
    manualPagination: true,
    getCoreRowModel: getCoreRowModel(),
  });

  // Check if any filter is active
  const hasActiveFilters =
    filters.search || filters.status || filters.startDate || filters.endDate;

  // Parse dates for calendar
  const selectedStartDate = filters.startDate
    ? new Date(filters.startDate)
    : undefined;
  const selectedEndDate = filters.endDate
    ? new Date(filters.endDate)
    : undefined;

  // Initial loading - show skeleton
  if (isLoading) {
    return <DataTableSkeleton columnCount={Columns.length} />;
  }

  return (
    <div className="w-full space-y-4">
      {/* Filters Row */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Search Input */}
        <div className="relative min-w-[200px] max-w-sm flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by order ID, customer name..."
            value={searchInput}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-9 pr-9"
          />
          {searchInput && (
            <button
              onClick={handleClearSearch}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Status Filter */}
        <Select
          value={filters.status || "all"}
          onValueChange={handleStatusChange}
        >
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="PENDING">Pending</SelectItem>
            <SelectItem value="CONFIRMED">Confirmed</SelectItem>
            <SelectItem value="PROCESSING">Processing</SelectItem>
            <SelectItem value="SHIPPED">Shipped</SelectItem>
            <SelectItem value="DELIVERED">Delivered</SelectItem>
            <SelectItem value="CANCELLED">Cancelled</SelectItem>
          </SelectContent>
        </Select>

        {/* Start Date Picker */}
        <Popover open={startDateOpen} onOpenChange={setStartDateOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-[160px] justify-start text-left font-normal",
                !selectedStartDate && "text-muted-foreground",
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {selectedStartDate
                ? format(selectedStartDate, "MMM dd, yyyy")
                : "Start Date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={selectedStartDate}
              onSelect={handleStartDateChange}
              disabled={(date) =>
                selectedEndDate ? date > selectedEndDate : false
              }
              initialFocus
            />
            {selectedStartDate && (
              <div className="border-t p-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full"
                  onClick={() => {
                    setFilters({ startDate: "", page: 1 });
                    setStartDateOpen(false);
                  }}
                >
                  <X className="mr-2 h-4 w-4" />
                  Clear
                </Button>
              </div>
            )}
          </PopoverContent>
        </Popover>

        {/* End Date Picker */}
        <Popover open={endDateOpen} onOpenChange={setEndDateOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-[160px] justify-start text-left font-normal",
                !selectedEndDate && "text-muted-foreground",
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {selectedEndDate
                ? format(selectedEndDate, "MMM dd, yyyy")
                : "End Date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={selectedEndDate}
              onSelect={handleEndDateChange}
              disabled={(date) =>
                selectedStartDate ? date < selectedStartDate : false
              }
              initialFocus
            />
            {selectedEndDate && (
              <div className="border-t p-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full"
                  onClick={() => {
                    setFilters({ endDate: "", page: 1 });
                    setEndDateOpen(false);
                  }}
                >
                  <X className="mr-2 h-4 w-4" />
                  Clear
                </Button>
              </div>
            )}
          </PopoverContent>
        </Popover>

        {/* Clear All Filters */}
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearFilters}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="mr-2 h-4 w-4" />
            Clear filters
          </Button>
        )}
      </div>

      {/* Active Filters Summary */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          <span>Filters:</span>
          {filters.search && (
            <span className="rounded-full bg-muted px-2.5 py-0.5">
              Search: &quot;{filters.search}&quot;
            </span>
          )}
          {filters.status && (
            <span className="rounded-full bg-muted px-2.5 py-0.5">
              Status: {filters.status}
            </span>
          )}
          {filters.startDate && (
            <span className="rounded-full bg-muted px-2.5 py-0.5">
              From: {format(new Date(filters.startDate), "MMM dd, yyyy")}
            </span>
          )}
          {filters.endDate && (
            <span className="rounded-full bg-muted px-2.5 py-0.5">
              To: {format(new Date(filters.endDate), "MMM dd, yyyy")}
            </span>
          )}
        </div>
      )}

      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {/* Loading state - centered in table */}
            {isFetching ? (
              <TableRow>
                <TableCell colSpan={Columns.length} className="h-[400px]">
                  <div className="flex flex-col items-center justify-center gap-3">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    <p className="text-sm text-muted-foreground">
                      Loading orders...
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={Columns.length} className="h-[400px]">
                  <div className="flex flex-col items-center justify-center gap-3">
                    <Search className="h-10 w-10 text-muted-foreground/30" />
                    <div className="text-center">
                      <p className="font-medium">
                        {hasActiveFilters
                          ? "No orders match your filters"
                          : "No orders found"}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {hasActiveFilters
                          ? "Try adjusting your search or filters"
                          : "Orders will appear here once created"}
                      </p>
                    </div>
                    {hasActiveFilters && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleClearFilters}
                      >
                        <X className="mr-2 h-4 w-4" />
                        Clear all filters
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination - only show when not loading and has data */}
      {!isFetching && table.getRowModel().rows?.length > 0 && (
        <DataTablePagination table={table} isLoading={isFetching} />
      )}
    </div>
  );
}
