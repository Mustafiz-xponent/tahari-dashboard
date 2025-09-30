"use client";
import * as React from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DataTablePagination } from "@/components/common/DataTablePagination";
import SearchInput from "@/components/common/SearchInput";
import { DataTableSkeleton } from "@/components/common/DataTableSkeleton";
import { useGetAllCategoriesQuery } from "@/redux/services/categoriesApi";
import { Columns } from "@/app/(dashboard)/categories/_components/Columns";
import { parseAsInteger, parseAsString, useQueryStates } from "nuqs";

export function DataTable() {
  const [filters, setFilters] = useQueryStates({
    search: parseAsString.withDefault(""),
    limit: parseAsInteger.withDefault(10),
    page: parseAsInteger.withDefault(1),
  });

  // Build query for API
  const query = React.useMemo(
    () => ({
      search: filters.search.trim(),
      limit: filters.limit,
      page: filters.page,
    }),
    [filters]
  );
  const { data, isLoading, isFetching } = useGetAllCategoriesQuery(query);

  const categories = data?.data ?? [];
  const pageCount = data?.pagination?.totalPages ?? 0;

  const table = useReactTable({
    data: categories,
    columns: Columns,
    pageCount,
    manualPagination: true,
    getCoreRowModel: getCoreRowModel(),
    getRowId: (originalRow) => originalRow.categoryId,
    state: {
      pagination: {
        pageIndex: filters.page - 1,
        pageSize: filters.limit,
      },
    },
    onPaginationChange: (updater) => {
      if (typeof updater === "function") {
        const newPagination = updater({
          pageIndex: filters.page - 1,
          pageSize: filters.limit,
        });
        setFilters({
          page: newPagination.pageIndex + 1,
          limit: newPagination.pageSize,
        });
      }
    },
  });

  return (
    <div className="w-full border rounded-lg p-6 bg-white">
      <SearchInput placeholder="Search Categories..." /> {/* Search input */}
      <div className="overflow-hidden rounded-md border">
        {isLoading || isFetching ? (
          <DataTableSkeleton
            columnCount={Columns.length}
            filterCount={0}
            withPagination={false}
            withViewOptions={false}
          />
        ) : (
          <Table className="w-full ">
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className="py-3.5  font-secondary text-typography-50 first:px-5"
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {categories?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="py-2  font-secondary">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow className="h-40">
                  <TableCell
                    colSpan={Columns.length}
                    className="text-center font-secondary text-typography-50 text-sm h-80"
                  >
                    No results
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </div>
      <DataTablePagination
        table={table}
        isLoading={isLoading}
        isFetching={isFetching}
      />
    </div>
  );
}
