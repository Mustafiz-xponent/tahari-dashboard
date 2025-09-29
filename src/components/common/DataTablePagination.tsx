import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import type { Table } from "@tanstack/react-table";
import { useQueryStates, parseAsInteger } from "nuqs";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DataTablePaginationProps<TData> extends React.ComponentProps<"div"> {
  table: Table<TData>;
  pageSizeOptions?: number[];
  isLoading?: boolean;
  isFetching?: boolean;
}

export function DataTablePagination<TData>({
  table,
  pageSizeOptions = [10, 20, 30, 40, 50],
  isLoading,
  isFetching,
  className,
  ...props
}: DataTablePaginationProps<TData>) {
  // Get and set pagination via nuqs (URL state)
  const [pagination, setPagination] = useQueryStates({
    page: parseAsInteger.withDefault(1),
    limit: parseAsInteger.withDefault(10),
  });

  // Handlers for pagination actions
  const handlePageChange = React.useCallback(
    (newPage: number) => {
      setPagination({ page: newPage });
    },
    [setPagination]
  );

  const handlePageSizeChange = React.useCallback(
    (newLimit: number) => {
      setPagination({
        limit: newLimit,
        page: 1, // Reset to page 1 when changing page size
      });
    },
    [setPagination]
  );

  // Get current state from table
  const currentPage = table.getState().pagination.pageIndex + 1;
  const pageCount = table.getPageCount();
  const pageSize = table.getState().pagination.pageSize;
  return (
    <div
      className={cn(
        "flex w-full flex-col-reverse my-4 font-secondary items-center justify-between gap-4 overflow-auto p-1 sm:flex-row sm:gap-8",
        className
      )}
      {...props}
    >
      {/* <div className="flex-1 whitespace-nowrap text-muted-foreground text-sm">
        {table.getFilteredSelectedRowModel().rows.length} of{" "}
        {table.getFilteredRowModel().rows.length} row(s) selected.
      </div> */}
      <div className="flex items-center space-x-2">
        <p className="whitespace-nowrap font-medium text-sm">Rows per page</p>
        <Select
          value={`${pageSize}`}
          onValueChange={(value) => handlePageSizeChange(Number(value))}
          disabled={isLoading || isFetching}
        >
          <SelectTrigger className="h-8 w-[4.5rem]">
            <SelectValue placeholder={pageSize} />
          </SelectTrigger>
          <SelectContent side="top">
            {pageSizeOptions.map((size) => (
              <SelectItem key={size} value={`${size}`}>
                {size}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Pagination controls */}
      <div className="flex flex-col-reverse items-center gap-4 sm:flex-row sm:gap-6 lg:gap-8">
        {/* Page counter - Desktop */}
        <div className="sm:flex hidden items-center justify-center font-medium text-sm">
          Page {currentPage} of {pageCount || 1}
        </div>

        {/* Navigation buttons */}
        <div className="flex items-center space-x-2">
          {/* First page */}
          <Button
            aria-label="Go to first page"
            variant="outline"
            size="icon"
            className="hidden size-8 lg:flex"
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1 || isLoading || isFetching}
          >
            <ChevronsLeft className="size-4" />
          </Button>

          {/* Previous page */}
          <Button
            aria-label="Go to previous page"
            variant="outline"
            size="icon"
            className="size-8"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1 || isLoading || isFetching}
          >
            <ChevronLeft className="size-4" />
          </Button>

          {/* Page counter - Mobile */}
          <div className="flex mx-2 px-2 sm:hidden items-center justify-center font-medium text-sm">
            Page {currentPage} of {pageCount || 1}
          </div>

          {/* Next page */}
          <Button
            aria-label="Go to next page"
            variant="outline"
            size="icon"
            className="size-8"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage >= pageCount || isLoading || isFetching}
          >
            <ChevronRight className="size-4" />
          </Button>

          {/* Last page */}
          <Button
            aria-label="Go to last page"
            variant="outline"
            size="icon"
            className="hidden size-8 lg:flex"
            onClick={() => handlePageChange(pageCount)}
            disabled={currentPage >= pageCount || isLoading || isFetching}
          >
            <ChevronsRight className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
