// import { Order } from "@/types/order";
// import { ColumnDef } from "@tanstack/react-table";
// import TableAction from "@/app/(dashboard)/orders/_components/TableAction";

// export const Columns: ColumnDef<Order>[] = [
//   {
//     accessorKey: "orderId",
//     header: "ID",
//     cell: ({ row }) => (
//       <div className="capitalize font-secondary px-4">
//         {row.getValue("orderId")}
//       </div>
//     ),
//   },
//   {
//     accessorKey: "customer",
//     header: ({ column }) => {
//       return (
//         <div
//           onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//           className="font-secondary"
//         >
//           Customer
//         </div>
//       );
//     },
//     cell: ({ row }) => {
//       const customer = row.getValue("customer") as any; // eslint-disable-line @typescript-eslint/no-explicit-any
//       return <div>{customer?.name ?? "N/A"}</div>;
//     },
//   },
//   {
//     accessorKey: "totalAmount",
//     header: () => <div>Total Amount</div>,
//     cell: ({ row }) => (
//       <div>${Number(row.getValue("totalAmount")).toFixed(2)}</div>
//     ),
//   },
//   {
//     accessorKey: "orderStatus",
//     header: () => <div>Order Status</div>,
//     cell: ({ row }) => {
//       const status = row.getValue("orderStatus") as string;
//       const statusColors = {
//         PENDING: "text-yellow-600",
//         PROCESSING: "text-blue-600",
//         SHIPPED: "text-purple-600",
//         DELIVERED: "text-green-600",
//         CANCELLED: "text-red-600",
//         CONFIRMED: "text-green-600",
//       };
//       return (
//         <div className={`capitalize ${statusColors[status as keyof typeof statusColors] || "text-gray-600"}`}>
//           {status}
//         </div>
//       );
//     },
//   },
//   {
//     accessorKey: "paymentStatus",
//     header: () => <div>Payment Status</div>,
//     cell: ({ row }) => {
//       const status = row.getValue("paymentStatus") as string;
//       const statusColors = {
//         PENDING: "text-yellow-600",
//         COMPLETED: "text-green-600",
//         FAILED: "text-red-600",
//         REFUNDED: "text-orange-600",
//         LOCKED: "text-gray-600",
//       };
//       return (
//         <div className={`capitalize ${statusColors[status as keyof typeof statusColors] || "text-gray-600"}`}>
//           {status}
//         </div>
//       );
//     },
//   },
//   {
//     accessorKey: "orderDate",
//     header: () => <div>Order Date</div>,
//     cell: ({ row }) => (
//       <div>{new Date(row.getValue("orderDate")).toLocaleDateString()}</div>
//     ),
//   },
//   {
//     accessorKey: "deliveryDate",
//     header: () => <div>Delivery Date</div>,
//     cell: ({ row }) => {
//       const date = row.getValue("deliveryDate") as string | null;
//       return <div>{date ? new Date(date).toLocaleDateString() : "N/A"}</div>;
//     },
//   },
//   {
//     id: "actions",
//     enableHiding: false,
//     cell: ({ row }) => {
//       const order = row.original;
//       return <TableAction order={order} />;
//     },
//   },
// ];

// ------------------------- 222222222222222222222222222222 -------------------------
// app/(dashboard)/orders/_components/Columns.tsx

import { Order } from "@/types/order";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import TableAction from "@/app/(dashboard)/orders/_components/TableAction";

// Customer type based on your API response
interface OrderCustomer {
  customerId: number | bigint;
  user?: {
    name?: string;
    email?: string;
  };
}

const orderStatusConfig: Record<string, { label: string; className: string }> = {
  PENDING: {
    label: "Pending",
    className: "bg-yellow-100 text-yellow-800 border-yellow-200",
  },
  CONFIRMED: {
    label: "Confirmed",
    className: "bg-blue-100 text-blue-800 border-blue-200",
  },
  PROCESSING: {
    label: "Processing",
    className: "bg-purple-100 text-purple-800 border-purple-200",
  },
  SHIPPED: {
    label: "Shipped",
    className: "bg-orange-100 text-orange-800 border-orange-200",
  },
  DELIVERED: {
    label: "Delivered",
    className: "bg-green-100 text-green-800 border-green-200",
  },
  CANCELLED: {
    label: "Cancelled",
    className: "bg-red-100 text-red-800 border-red-200",
  },
};

const paymentStatusConfig: Record<string, { label: string; className: string }> = {
  PENDING: {
    label: "Pending",
    className: "bg-yellow-100 text-yellow-800 border-yellow-200",
  },
  COMPLETED: {
    label: "Completed",
    className: "bg-green-100 text-green-800 border-green-200",
  },
  FAILED: {
    label: "Failed",
    className: "bg-red-100 text-red-800 border-red-200",
  },
  REFUNDED: {
    label: "Refunded",
    className: "bg-orange-100 text-orange-800 border-orange-200",
  },
  LOCKED: {
    label: "Locked",
    className: "bg-gray-100 text-gray-800 border-gray-200",
  },
};

export const Columns: ColumnDef<Order>[] = [
  {
    accessorKey: "orderId",
    header: "ID",
    cell: ({ row }) => (
      <div className="px-4 font-medium">#{row.getValue("orderId")}</div>
    ),
  },
  {
    accessorKey: "customer",
    header: "Customer",
    cell: ({ row }) => {
      const customer = row.getValue("customer") as OrderCustomer | null;
      return (
        <div>
          <p className="font-medium">{customer?.user?.name ?? "N/A"}</p>
          <p className="text-xs text-muted-foreground">
            ID: {customer?.customerId?.toString() ?? "N/A"}
          </p>
        </div>
      );
    },
  },
  {
    accessorKey: "totalAmount",
    header: () => <div>Total Amount</div>,
    cell: ({ row }) => (
      <div className="font-medium">
        ৳
        {Number(row.getValue("totalAmount")).toLocaleString("en-BD", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: () => <div>Order Status</div>,
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      const config = orderStatusConfig[status];

      return (
        <Badge
          className={`border font-medium ${config?.className || "bg-gray-100 text-gray-800 border-gray-200"}`}
        >
          {config?.label || status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "paymentStatus",
    header: () => <div>Payment Status</div>,
    cell: ({ row }) => {
      const status = row.getValue("paymentStatus") as string;
      const config = paymentStatusConfig[status];

      return (
        <Badge
          className={`border font-medium ${config?.className || "bg-gray-100 text-gray-800 border-gray-200"}`}
        >
          {config?.label || status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: () => <div>Order Date</div>,
    cell: ({ row }) => (
      <div className="text-sm">
        {new Date(row.getValue("createdAt")).toLocaleDateString("en-BD", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })}
      </div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const order = row.original;
      return <TableAction order={order} />;
    },
  },
];