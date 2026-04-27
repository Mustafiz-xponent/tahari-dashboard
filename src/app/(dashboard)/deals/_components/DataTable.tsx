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
import { useGetAllDealsQuery } from "@/redux/services/dealsApi";
import { DataTablePagination } from "@/components/common/DataTablePagination";
import { Columns } from "@/app/(dashboard)/deals/_components/Columns";
import { DataTableSkeleton } from "@/components/common/DataTableSkeleton";
import { parseAsInteger, parseAsString, useQueryStates } from "nuqs";
import SearchInput from "@/components/common/SearchInput";

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

  const { data, isLoading, isFetching } = useGetAllDealsQuery(query);

  const deals = data?.data ?? [];
  const pageCount = data?.pagination?.totalPages ?? 0;

  const table = useReactTable({
    data: deals,
    columns: Columns,
    pageCount,
    manualPagination: true,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) {
    return <DataTableSkeleton columnCount={Columns.length} />;
  }

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <SearchInput placeholder="Search deals..." />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={Columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} isLoading={isFetching} />
    </div>
  );
}