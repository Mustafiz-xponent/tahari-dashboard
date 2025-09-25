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
import { useGetAllFarmersQuery } from "@/redux/services/farmersApi";
import { DataTablePagination } from "@/components/common/DataTablePagination";
import { Columns } from "@/app/(dashboard)/farmers/_components/Columns";
import { useSearchParams } from "next/navigation";
import SearchInput from "@/app/(dashboard)/farmers/_components/SearchInput";
import { DataTableSkeleton } from "@/components/common/DataTableSkeleton";

export function DataTable() {
  const searchParams = useSearchParams();
  const search = searchParams.get("search") ?? "";
  const limit = searchParams.get("limit") ?? "10";
  const page = searchParams.get("page") ?? "1";

  const query = { search, limit, page };
  const { data, isLoading, isFetching } = useGetAllFarmersQuery(query);

  const farmers = data?.data ?? [];
  const pageCount = data?.pagination?.totalPages ?? 0;

  const table = useReactTable({
    data: farmers,
    columns: Columns,
    pageCount,
    manualPagination: true,
    getCoreRowModel: getCoreRowModel(),
    getRowId: (originalRow) => originalRow.farmerId,
    initialState: {
      pagination: {
        pageIndex: Number(page) - 1,
        pageSize: Number(limit),
      },
    },
  });
  // update table pagination state when query params change
  React.useEffect(() => {
    table.setPageIndex(Number(page) - 1);
    table.setPageSize(Number(limit));
  }, [table, page, limit]);

  return (
    <div className="w-full border rounded-lg p-6 bg-white">
      <SearchInput /> {/* Search input */}
      <div className="overflow-hidden rounded-md border">
        {isLoading || isFetching ? (
          <DataTableSkeleton
            columnCount={Columns.length}
            filterCount={0}
            withPagination={false}
            withViewOptions={false}
          />
        ) : (
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className="py-3.5 font-secondary text-typography-50 first:px-5"
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
              {farmers.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="py-4 font-secondary">
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
