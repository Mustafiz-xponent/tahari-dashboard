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
// import { useGetAllCustomersQuery } from "@/redux/services/customersApi";
// import { DataTablePagination } from "@/components/common/DataTablePagination";
// import { Columns } from "@/app/(dashboard)/customers/_components/Columns";
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

//   const { data, isLoading, isFetching } = useGetAllCustomersQuery(query);

//   const customers = data?.data ?? [];
//   const pageCount = data?.pagination?.totalPages ?? 0;

//   const table = useReactTable({
//     data: customers,
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
//         <SearchInput placeholder="Search customers..." />
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

// --------------------------- 22222222222222222222222222 --------------------
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
import { Badge } from "@/components/ui/badge";
import { MessageCircle } from "lucide-react";
import { useGetAllCustomersQuery } from "@/redux/services/customersApi";
import { DataTablePagination } from "@/components/common/DataTablePagination";
import { Columns } from "@/app/(dashboard)/customers/_components/Columns";
import { DataTableSkeleton } from "@/components/common/DataTableSkeleton";
import { parseAsInteger, parseAsString, useQueryStates } from "nuqs";
import SearchInput from "@/components/common/SearchInput";

export function DataTable() {
  const [filters, setFilters] = useQueryStates({
    search: parseAsString.withDefault(""),
    limit: parseAsInteger.withDefault(10),
    page: parseAsInteger.withDefault(1),
  });

  const query = React.useMemo(
    () => ({
      search: filters.search.trim() || undefined,
      limit: filters.limit,
      page: filters.page,
      sort: "desc" as const,
    }),
    [filters],
  );

  const { data, isLoading, isFetching } = useGetAllCustomersQuery(query);

  const customers = data?.data ?? [];
  const pageCount = data?.pagination?.totalPages ?? 0;
  const totalUnreadMessageCount = data?.meta?.totalUnreadMessageCount ?? 0;

  const table = useReactTable({
    data: customers,
    columns: Columns,
    pageCount,
    manualPagination: true,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) {
    return <DataTableSkeleton columnCount={Columns.length} />;
  }

  return (
    <div className="w-full space-y-4">
      {/* Header Bar */}
      <div className="flex items-center justify-between">
        <SearchInput placeholder="Search by name or phone..." />

        {/* Total Unread Badge */}
        {totalUnreadMessageCount > 0 && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MessageCircle className="h-4 w-4 text-destructive" />
            <span>
              Total unread messages:
              <Badge variant="destructive" className="ml-1 text-xs">
                {totalUnreadMessageCount}
              </Badge>
            </span>
          </div>
        )}
      </div>

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
            {isFetching ? (
              // Subtle loading overlay while refetching
              <TableRow>
                <TableCell
                  colSpan={Columns.length}
                  className="h-24 text-center text-muted-foreground"
                >
                  Loading...
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className={
                    (row.original.unreadMessageCount ?? 0) > 0
                      ? "bg-red-50/40 hover:bg-red-50/60"
                      : ""
                  }
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
                <TableCell
                  colSpan={Columns.length}
                  className="h-24 text-center text-muted-foreground"
                >
                  No customers found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <DataTablePagination table={table} isLoading={isFetching} />
    </div>
  );
}
