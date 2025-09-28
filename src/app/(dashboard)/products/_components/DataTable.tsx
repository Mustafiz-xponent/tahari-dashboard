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
import { useSearchParams } from "next/navigation";
import SearchInput from "@/app/(dashboard)/products/_components/SearchInput";
import { DataTableSkeleton } from "@/components/common/DataTableSkeleton";
import { Columns } from "@/app/(dashboard)/products/_components/Columns";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetAllProductsQuery } from "@/redux/services/productsApi";
import { useQuery } from "@/hooks/use-query";
import TableFilterDialog from "@/app/(dashboard)/products/_components/TableFilterDialog";

export function DataTable() {
  const searchParams = useSearchParams();

  const initialType = ["subscription", "preorder"].includes(
    searchParams.get("type") ?? ""
  )
    ? searchParams.get("type")!
    : "regular";

  const [type, setType] = React.useState<string>(initialType);

  const name = searchParams.get("name")?.trim() ?? "";
  const limit = Number(searchParams.get("limit") ?? 10);
  const page = Number(searchParams.get("page") ?? 1);

  const query = {
    name,
    limit,
    page,
    isSubscription: type === "subscription",
    isPreorder: type === "preorder",
  };

  const { data, isLoading, isFetching } = useGetAllProductsQuery(query);

  const products = data?.data ?? [];
  const pageCount = data?.pagination?.totalPages ?? 0;

  const table = useReactTable({
    data: products,
    columns: Columns,
    pageCount,
    manualPagination: true,
    getCoreRowModel: getCoreRowModel(),
    getRowId: (originalRow) => originalRow?.productId,
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

  // update query params when product type change
  const typeQuery = React.useMemo(
    () => ({
      type: type,
    }),
    [type]
  );

  useQuery({
    query: typeQuery,
    debounceMs: 0,
    resetPageOn: ["type"],
  });

  return (
    <>
      <Tabs
        defaultValue="regular"
        className="w-full"
        value={type}
        onValueChange={(value) => setType(value)}
      >
        <TabsList className="w-full p-0 h-11 px-1 font-secondary bg-brand-10">
          <TabsTrigger value="regular" className="cursor-pointer h-9 text-sm">
            Regular
          </TabsTrigger>
          <TabsTrigger value="subscription" className="cursor-pointer h-9">
            Subscription
          </TabsTrigger>
          <TabsTrigger value="preorder" className="cursor-pointer h-9">
            Preorder
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="w-full border rounded-lg p-6 bg-white">
        <div className="flex items-center justify-between mb-4">
          <SearchInput />
          <TableFilterDialog />
        </div>
        {/* Search input */}
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
                {products?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow key={row.id}>
                      {row.getVisibleCells().map((cell) => (
                        <TableCell
                          key={cell.id}
                          className="py-2  font-secondary"
                        >
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
    </>
  );
}
