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
import SearchInput from "@/app/(dashboard)/products/_components/SearchInput";
import { DataTableSkeleton } from "@/components/common/DataTableSkeleton";
import { Columns } from "@/app/(dashboard)/products/_components/Columns";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetAllProductsQuery } from "@/redux/services/productsApi";
import TableFilterDialog from "@/app/(dashboard)/products/_components/TableFilterDialog";
import { useQueryStates, parseAsInteger, parseAsString } from "nuqs";

const VALID_TYPES = ["regular", "subscription", "preorder"] as const;
type ProductType = (typeof VALID_TYPES)[number];
export function DataTable() {
  const [filters, setFilters] = useQueryStates({
    name: parseAsString.withDefault(""),
    limit: parseAsInteger.withDefault(10),
    page: parseAsInteger.withDefault(1),
    type: parseAsString.withDefault("regular"),
    status: parseAsString.withDefault(""),
    categoryIds: parseAsString.withDefault(""),
    farmerIds: parseAsString.withDefault(""),
  });

  // Validate and get current type
  const currentType = VALID_TYPES.includes(filters.type as ProductType)
    ? filters.type
    : "regular";

  // Build query for API
  const query = React.useMemo(
    () => ({
      name: filters.name.trim(),
      limit: filters.limit,
      page: filters.page,
      isSubscription: currentType === "subscription",
      isPreorder: currentType === "preorder",
      status: filters.status,
      categoryIds: filters.categoryIds,
      farmerIds: filters.farmerIds,
    }),
    [filters, currentType]
  );

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
  // Handle product type change (tabs)
  const handleTypeChange = React.useCallback(
    (newType: string) => {
      setFilters({
        type: newType,
        page: 1, // Reset to page 1 when type changes
      });
    },
    [setFilters]
  );

  return (
    <>
      <Tabs
        defaultValue="regular"
        className="w-full"
        value={currentType}
        onValueChange={handleTypeChange}
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
        <div className="flex items-center gap-2 justify-between mb-4">
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
