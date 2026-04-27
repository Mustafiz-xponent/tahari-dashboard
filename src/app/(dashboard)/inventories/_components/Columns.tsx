// import { InventoryPurchase } from "@/types/inventory";
// import { ColumnDef } from "@tanstack/react-table";
// import TableAction from "@/app/(dashboard)/inventories/_components/TableAction";

// export const Columns: ColumnDef<InventoryPurchase>[] = [
//   {
//     accessorKey: "purchaseId",
//     header: "ID",
//     cell: ({ row }) => (
//       <div className="capitalize font-secondary px-4">
//         {row.getValue("purchaseId")}
//       </div>
//     ),
//   },
//   {
//     accessorKey: "product",
//     header: ({ column }) => {
//       return (
//         <div
//           onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//           className="font-secondary"
//         >
//           Product
//         </div>
//       );
//     },
//     cell: ({ row }) => {
//       const product = row.getValue("product") as any; // eslint-disable-line @typescript-eslint/no-explicit-any
//       return <div>{product?.name ?? "N/A"}</div>;
//     },
//   },
//   {
//     accessorKey: "farmer",
//     header: () => <div>Farmer</div>,
//     cell: ({ row }) => {
//       const farmer = row.getValue("farmer") as any; // eslint-disable-line @typescript-eslint/no-explicit-any
//       return <div>{farmer?.name ?? "N/A"}</div>;
//     },
//   },
//   {
//     accessorKey: "quantity",
//     header: () => <div>Quantity</div>,
//     cell: ({ row }) => {
//       return <div>{row.getValue("quantity")}</div>;
//     },
//   },
//   {
//     accessorKey: "unitCost",
//     header: () => <div>Unit Cost</div>,
//     cell: ({ row }) => {
//       return <div>${row.getValue("unitCost")}</div>;
//     },
//   },
//   {
//     accessorKey: "totalCost",
//     header: () => <div>Total Cost</div>,
//     cell: ({ row }) => {
//       return <div>${row.getValue("totalCost")}</div>;
//     },
//   },
//   {
//     accessorKey: "status",
//     header: () => <div>Status</div>,
//     cell: ({ row }) => {
//       return <div>{row.getValue("status")}</div>;
//     },
//   },
//   {
//     id: "actions",
//     accessorKey: "Actions",
//     cell: ({ row }) => {
//       const purchase = row.original;
//       return <TableAction data={purchase} />;
//     },
//   },
// ];

// ----------------------------------- 2222222222222222222222222 -----------------------------
import { InventoryPurchase } from "@/types/inventory";
import { ColumnDef } from "@tanstack/react-table";
import TableAction from "@/app/(dashboard)/inventories/_components/TableAction";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Columns: ColumnDef<InventoryPurchase>[] = [
  {
    accessorKey: "purchaseId",
    header: "ID",
    cell: ({ row }) => (
      <div className="capitalize font-secondary px-4">
        #{row.getValue("purchaseId")}
      </div>
    ),
  },
  {
    accessorKey: "product",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Product
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const product = row.getValue("product") as InventoryPurchase["product"];
      return <div className="font-medium">{product?.name ?? "N/A"}</div>;
    },
  },
  {
    accessorKey: "farmer",
    header: () => <div>Farmer</div>,
    cell: ({ row }) => {
      const farmer = row.getValue("farmer") as InventoryPurchase["farmer"];
      return (
        <div>
          <div className="font-medium">{farmer?.name ?? "N/A"}</div>
          {farmer?.farmName && (
            <div className="text-sm text-muted-foreground">
              {farmer.farmName}
            </div>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "quantity",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Quantity
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <div>{row.getValue("quantity")}</div>;
    },
  },
  {
    accessorKey: "unitCost",
    header: () => <div>Unit Cost</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("unitCost"));
      return <div>৳{amount.toFixed(2)}</div>;
    },
  },
  {
    accessorKey: "totalCost",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Total Cost
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("totalCost"));
      return <div className="font-semibold">৳{amount.toFixed(2)}</div>;
    },
  },
  {
    accessorKey: "purchaseDate",
    header: () => <div>Purchase Date</div>,
    cell: ({ row }) => {
      return <div>{format(new Date(row.getValue("purchaseDate")), "PP")}</div>;
    },
  },
  {
    accessorKey: "status",
    header: () => <div>Status</div>,
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      const getStatusColor = () => {
        switch (status) {
          case "COMPLETED":
            return "bg-green-500";
          case "PENDING":
            return "bg-yellow-500";
          case "CANCELLED":
            return "bg-red-500";
          default:
            return "bg-gray-500";
        }
      };
      return <Badge className={getStatusColor()}>{status}</Badge>;
    },
  },
  {
    id: "actions",
    accessorKey: "Actions",
    cell: ({ row }) => {
      const purchase = row.original;
      return <TableAction data={purchase} />;
    },
  },
];
