"use client";
import * as React from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetAllFarmersQuery } from "@/redux/services/farmerApi";
import { farmerTableColumns } from "@/app/(dashboard)/farmers/_components/TableColumns";

export function DataTableDynamic() {
  const [page, setPage] = React.useState<number>(1);
  const [search, setSearch] = React.useState<string>("");
  const [limit, setLimit] = React.useState<number>(10);
  const query = { search, limit, page };
  const { data, isLoading } = useGetAllFarmersQuery(query);

  const farmers = data?.data ?? [];
  const total = data?.pagination?.totalItems ?? 0;

  const table = useReactTable({
    data: farmers,
    columns: farmerTableColumns,
    manualPagination: true,
    pageCount: Math.ceil(total / limit),
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="w-full border rounded-lg p-6 bg-white">
      {/* Search input */}
      <div className="flex items-center pb-4">
        <Input
          placeholder="Farm Name..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1); // reset on search
          }}
          className="max-w-sm h-10 text-sm border-border focus-visible:border-border focus-visible:ring-0 font-secondary "
        />
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-md border">
        {isLoading ? (
          <div className="p-6 h-80 flex items-center justify-center text-typography-50 font-secondary">
            Loading...
          </div>
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
                    colSpan={farmerTableColumns.length}
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

      {/* Pagination */}
      <div className="flex justify-end items-center font-secondary pt-4 space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </Button>
        <span className="text-sm font-secondary">
          Page {page} of {data?.pagination?.totalPages ?? 0}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPage((p) => (p * limit < total ? p + 1 : p))}
          disabled={page * limit >= total}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
