// import { Customer } from "@/types/customer";
// import { ColumnDef } from "@tanstack/react-table";
// import TableAction from "@/app/(dashboard)/customers/_components/TableAction";

// export const Columns: ColumnDef<Customer>[] = [
//   {
//     accessorKey: "customerId",
//     header: "ID",
//     cell: ({ row }) => (
//       <div className="capitalize font-secondary px-4">
//         {row.getValue("customerId")}
//       </div>
//     ),
//   },
//   {
//     accessorKey: "firstName",
//     header: ({ column }) => {
//       return (
//         <div
//           onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//           className="font-secondary"
//         >
//           First Name
//         </div>
//       );
//     },
//     cell: ({ row }) => (
//       <div className="capitalize">{row.getValue("firstName")}</div>
//     ),
//   },
//   {
//     accessorKey: "lastName",
//     header: ({ column }) => {
//       return (
//         <div
//           onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//           className="font-secondary"
//         >
//           Last Name
//         </div>
//       );
//     },
//     cell: ({ row }) => (
//       <div className="capitalize">{row.getValue("lastName")}</div>
//     ),
//   },
//   {
//     accessorKey: "email",
//     header: () => <div>Email</div>,
//     cell: ({ row }) => <div>{row.getValue("email")}</div>,
//   },
//   {
//     accessorKey: "phone",
//     header: () => <div>Phone</div>,
//     cell: ({ row }) => <div>{row.getValue("phone")}</div>,
//   },
//   {
//     accessorKey: "city",
//     header: () => <div>City</div>,
//     cell: ({ row }) => <div>{row.getValue("city")}</div>,
//   },
//   {
//     accessorKey: "totalOrders",
//     header: () => <div>Total Orders</div>,
//     cell: ({ row }) => <div>{row.getValue("totalOrders")}</div>,
//   },
//   {
//     accessorKey: "totalSpent",
//     header: () => <div>Total Spent</div>,
//     cell: ({ row }) => (
//       <div>${Number(row.getValue("totalSpent")).toFixed(2)}</div>
//     ),
//   },
//   {
//     accessorKey: "isActive",
//     header: () => <div>Status</div>,
//     cell: ({ row }) => {
//       const isActive = row.getValue("isActive");
//       return (
//         <div className={`capitalize ${isActive ? "text-green-600" : "text-red-600"}`}>
//           {isActive ? "Active" : "Inactive"}
//         </div>
//       );
//     },
//   },
//   {
//     id: "actions",
//     enableHiding: false,
//     cell: ({ row }) => {
//       const customer = row.original;
//       return <TableAction customer={customer} />;
//     },
//   },
// ];

// -------------------------- 2222222222222222222222222 -----------------------------
"use client";

import { Customer } from "@/types/customer";
import { ColumnDef } from "@tanstack/react-table";
import TableAction from "@/app/(dashboard)/customers/_components/TableAction";
import { Badge } from "@/components/ui/badge";
import { MessageCircle } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export const Columns: ColumnDef<Customer>[] = [
  {
    accessorKey: "customerId",
    header: () => <div className="font-secondary px-4">ID</div>,
    cell: ({ row }) => (
      <div className="font-secondary px-4 text-muted-foreground text-xs">
        #{String(row.getValue("customerId"))}
      </div>
    ),
  },
  {
    accessorKey: "name",
    header: () => <div className="font-secondary">Name</div>,
    cell: ({ row }) => {
      const name = row.getValue("name") as string | null;
      return (
        <div className="capitalize font-medium">
          {name ?? (
            <span className="text-muted-foreground italic text-xs">
              No name
            </span>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    header: () => <div>Email</div>,
    cell: ({ row }) => {
      const email = row.getValue("email") as string | null;
      return (
        <div className="text-sm">
          {email ?? (
            <span className="text-muted-foreground italic text-xs">
              No email
            </span>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "phone",
    header: () => <div>Phone</div>,
    cell: ({ row }) => <div className="text-sm">{row.getValue("phone")}</div>,
  },
  {
    accessorKey: "lastMessage",
    header: () => <div>Last Message</div>,
    cell: ({ row }) => {
      const customer = row.original;
      const lastMessage = customer.lastMessage;
      const lastMessageCreatedAt = customer.lastMessageCreatedAt;

      if (!lastMessage) {
        return (
          <span className="text-muted-foreground italic text-xs">
            No messages
          </span>
        );
      }

      return (
        <div className="flex flex-col gap-0.5 max-w-[200px]">
          <p className="text-sm truncate">{lastMessage}</p>
          {lastMessageCreatedAt && (
            <span className="text-xs text-muted-foreground">
              {formatDistanceToNow(new Date(lastMessageCreatedAt), {
                addSuffix: true,
              })}
            </span>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "unreadMessageCount",
    header: () => (
      <div className="flex items-center gap-1">
        <MessageCircle className="h-4 w-4" />
        Unread
      </div>
    ),
    cell: ({ row }) => {
      const count = row.getValue("unreadMessageCount") as number;
      return count > 0 ? (
        <Badge variant="destructive" className="text-xs px-2 py-0.5">
          {count}
        </Badge>
      ) : (
        <Badge
          variant="secondary"
          className="text-xs px-2 py-0.5 text-muted-foreground"
        >
          0
        </Badge>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const customer = row.original;
      return <TableAction customer={customer} />;
    },
  },
];
