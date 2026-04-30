"use client";

import { Deal } from "@/types/deal";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import TableAction from "@/app/(dashboard)/deals/_components/TableAction";
import { formatDistanceToNow } from "date-fns";

export const Columns: ColumnDef<Deal>[] = [
  {
    accessorKey: "dealId",
    header: "ID",
    cell: ({ row }) => (
      <div className="font-secondary text-xs px-4 text-muted-foreground">
        #{row.getValue("dealId")}
      </div>
    ),
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <div
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="font-secondary cursor-pointer"
      >
        Title
      </div>
    ),
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("title")}</div>
    ),
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => {
      const description = row.getValue("description") as string | null;
      return (
        <div className="max-w-[200px] truncate text-sm text-muted-foreground">
          {description ?? "—"}
        </div>
      );
    },
  },
  {
    accessorKey: "discountType",
    header: "Discount",
    cell: ({ row }) => {
      const type = row.getValue("discountType") as string;
      const value = row.original.discountValue;
      return (
        <div className="font-semibold">
          {type === "PERCENTAGE" ? `${value}%` : `৳${value}`}
        </div>
      );
    },
  },
  {
    accessorKey: "startDate",
    header: "Start Date",
    cell: ({ row }) => (
      <div className="text-sm">
        {new Date(row.getValue("startDate") as string).toLocaleDateString()}
      </div>
    ),
  },
  {
    accessorKey: "endDate",
    header: "End Date",
    cell: ({ row }) => (
      <div className="text-sm">
        {new Date(row.getValue("endDate") as string).toLocaleDateString()}
      </div>
    ),
  },
  {
    accessorKey: "isGlobal",
    header: "Type",
    cell: ({ row }) => {
      const isGlobal = row.getValue("isGlobal");
      return (
        <Badge
          variant={isGlobal ? "default" : "secondary"}
          className={isGlobal ? "bg-brand-100 text-white" : ""}
        >
          {isGlobal ? "Global" : "Specific"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ row }) => (
      <div className="text-xs text-muted-foreground">
        {formatDistanceToNow(new Date(row.getValue("createdAt") as string), {
          addSuffix: true,
        })}
      </div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const deal = row.original; // ✅ Get deal from row.original
      return <TableAction deal={deal} />; // ✅ Pass deal prop
    },
  },
];
