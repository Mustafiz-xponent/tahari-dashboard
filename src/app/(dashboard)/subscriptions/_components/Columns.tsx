import { SubscriptionPlan, Subscription } from "@/types/subscription";
import { Product } from "@/types/product";
import { ColumnDef } from "@tanstack/react-table";
import TableAction from "@/app/(dashboard)/subscriptions/_components/TableAction";

export const Columns: ColumnDef<SubscriptionPlan>[] = [
  {
    accessorKey: "planId",
    header: "ID",
    cell: ({ row }) => (
      <div className="capitalize font-secondary px-4">
        {row.getValue("planId")}
      </div>
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="font-secondary"
        >
          Plan Name
        </div>
      );
    },
    cell: ({ row }) => <div>{row.getValue("name")}</div>,
  },
  {
    accessorKey: "frequency",
    header: () => <div>Frequency</div>,
    cell: ({ row }) => {
      return <div>{row.getValue("frequency")}</div>;
    },
  },
  {
    accessorKey: "price",
    header: () => <div>Price</div>,
    cell: ({ row }) => {
      return <div>${row.getValue("price")}</div>;
    },
  },
  {
    accessorKey: "product",
    header: () => <div>Product</div>,
    cell: ({ row }) => {
      const product = row.getValue("product") as Product;
      return <div>{product?.name ?? "N/A"}</div>;
    },
  },
  {
    accessorKey: "subscriptions",
    header: () => <div>Subscriptions</div>,
    cell: ({ row }) => {
      const subscriptions = row.getValue("subscriptions") as Subscription[];
      return <div>{subscriptions?.length ?? 0}</div>;
    },
  },
  {
    id: "actions",
    accessorKey: "Actions",
    cell: ({ row }) => {
      const plan = row.original;
      return <TableAction data={plan} />;
    },
  },
];
