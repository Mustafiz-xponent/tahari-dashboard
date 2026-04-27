// import { OrderTracking } from "@/types/orderTracking";
// import { ColumnDef } from "@tanstack/react-table";
// import TableAction from "@/app/(dashboard)/order-trackings/_components/TableAction";

// export const Columns: ColumnDef<OrderTracking>[] = [
//   {
//     accessorKey: "trackingId",
//     header: "ID",
//     cell: ({ row }) => (
//       <div className="capitalize font-secondary px-4">
//         {row.getValue("trackingId")}
//       </div>
//     ),
//   },
//   {
//     accessorKey: "orderId",
//     header: ({ column }) => {
//       return (
//         <div
//           onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//           className="font-secondary"
//         >
//           Order ID
//         </div>
//       );
//     },
//     cell: ({ row }) => (
//       <div className="capitalize">{row.getValue("orderId")}</div>
//     ),
//   },
//   {
//     accessorKey: "status",
//     header: () => <div>Status</div>,
//     cell: ({ row }) => {
//       const status = row.getValue("status") as string;
//       const statusColors = {
//         PENDING: "text-yellow-600",
//         PICKED_UP: "text-blue-600",
//         IN_TRANSIT: "text-purple-600",
//         OUT_FOR_DELIVERY: "text-orange-600",
//         DELIVERED: "text-green-600",
//         FAILED_DELIVERY: "text-red-600",
//         RETURNED: "text-gray-600",
//       };
//       return (
//         <div className={`capitalize ${statusColors[status as keyof typeof statusColors] || "text-gray-600"}`}>
//           {status.replace(/_/g, " ")}
//         </div>
//       );
//     },
//   },
//   {
//     accessorKey: "location",
//     header: () => <div>Location</div>,
//     cell: ({ row }) => <div>{row.getValue("location")}</div>,
//   },
//   {
//     accessorKey: "carrier",
//     header: () => <div>Carrier</div>,
//     cell: ({ row }) => <div>{row.getValue("carrier")}</div>,
//   },
//   {
//     accessorKey: "trackingNumber",
//     header: () => <div>Tracking Number</div>,
//     cell: ({ row }) => <div className="font-mono text-sm">{row.getValue("trackingNumber")}</div>,
//   },
//   {
//     accessorKey: "estimatedDelivery",
//     header: () => <div>Est. Delivery</div>,
//     cell: ({ row }) => (
//       <div>{new Date(row.getValue("estimatedDelivery")).toLocaleDateString()}</div>
//     ),
//   },
//   {
//     accessorKey: "actualDelivery",
//     header: () => <div>Actual Delivery</div>,
//     cell: ({ row }) => {
//       const date = row.getValue("actualDelivery") as string | null;
//       return <div>{date ? new Date(date).toLocaleDateString() : "N/A"}</div>;
//     },
//   },
//   {
//     id: "actions",
//     enableHiding: false,
//     cell: ({ row }) => {
//       const tracking = row.original;
//       return <TableAction tracking={tracking} />;
//     },
//   },
// ];

// ------------------------- 222222222222222222222222 --------------------------
import { OrderTracking } from "@/types/orderTracking";
import { ColumnDef } from "@tanstack/react-table";
import TableAction from "@/app/(dashboard)/order-trackings/_components/TableAction";

export const Columns: ColumnDef<OrderTracking>[] = [
  {
    accessorKey: "trackingId",
    header: "ID",
    cell: ({ row }) => (
      <div className="capitalize font-secondary px-4">
        {row.getValue("trackingId")}
      </div>
    ),
  },
  {
    accessorKey: "orderId",
    header: "Order ID",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("orderId")}</div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      const statusColors = {
        PENDING: "text-yellow-600",
        CONFIRMED: "text-blue-600",
        PROCESSING: "text-purple-600",
        SHIPPED: "text-orange-600",
        DELIVERED: "text-green-600",
        CANCELLED: "text-red-600",
      };
      return (
        <div
          className={`capitalize ${statusColors[status as keyof typeof statusColors] || "text-gray-600"}`}
        >
          {status}
        </div>
      );
    },
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => (
      <div className="max-w-[300px] truncate">
        {row.getValue("description") || "—"}
      </div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const tracking = row.original;
      return <TableAction tracking={tracking} />;
    },
  },
];