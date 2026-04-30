// import { Deal } from "@/types/deal";
// import { ColumnDef } from "@tanstack/react-table";
// import TableAction from "@/app/(dashboard)/deals/_components/TableAction";

// export const Columns: ColumnDef<Deal>[] = [
//   {
//     accessorKey: "dealId",
//     header: "ID",
//     cell: ({ row }) => (
//       <div className="capitalize font-secondary px-4">
//         {row.getValue("dealId")}
//       </div>
//     ),
//   },
//   {
//     accessorKey: "title",
//     header: ({ column }) => {
//       return (
//         <div
//           onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//           className="font-secondary"
//         >
//           Title
//         </div>
//       );
//     },
//     cell: ({ row }) => (
//       <div className="capitalize">{row.getValue("title")}</div>
//     ),
//   },
//   {
//     accessorKey: "description",
//     header: () => <div>Description</div>,
//     cell: ({ row }) => <div>{row.getValue("description")}</div>,
//   },
//   {
//     accessorKey: "discountType",
//     header: () => <div>Discount Type</div>,
//     cell: ({ row }) => <div>{row.getValue("discountType")}</div>,
//   },
//   {
//     accessorKey: "discountValue",
//     header: () => <div>Discount Value</div>,
//     cell: ({ row }) => {
//       const discountType = row.getValue("discountType");
//       const discountValue = row.getValue("discountValue");
//       return (
//         <div>
//           {discountType === "PERCENTAGE" ? `${discountValue}%` : `$${discountValue}`}
//         </div>
//       );
//     },
//   },
//   {
//     accessorKey: "startDate",
//     header: () => <div>Start Date</div>,
//     cell: ({ row }) => (
//       <div>{new Date(row.getValue("startDate")).toLocaleDateString()}</div>
//     ),
//   },
//   {
//     accessorKey: "endDate",
//     header: () => <div>End Date</div>,
//     cell: ({ row }) => (
//       <div>{new Date(row.getValue("endDate")).toLocaleDateString()}</div>
//     ),
//   },
//   {
//     accessorKey: "isGlobal",
//     header: () => <div>Global</div>,
//     cell: ({ row }) => {
//       const isGlobal = row.getValue("isGlobal");
//       return (
//         <div className={`capitalize ${isGlobal ? "text-green-600" : "text-blue-600"}`}>
//           {isGlobal ? "Global" : "Specific"}
//         </div>
//       );
//     },
//   },
//   {
//     id: "actions",
//     enableHiding: false,
//     cell: ({ row }) => {
//       const deal = row.original;
//       return <TableAction deal={deal} />;
//     },
//   },
// ];

// ------------------------------- 222222222222222222222222 ------------------------------
"use client";

import { Deal, DiscountType } from "@/types/deal";
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
          className={isGlobal ? "bg-brand-100 text-brand-700" : ""}
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
