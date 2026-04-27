import { Customer } from "@/types/customer";
import { ColumnDef } from "@tanstack/react-table";
import TableAction from "@/app/(dashboard)/customers/_components/TableAction";

export const Columns: ColumnDef<Customer>[] = [
  {
    accessorKey: "customerId",
    header: "ID",
    cell: ({ row }) => (
      <div className="capitalize font-secondary px-4">
        {row.getValue("customerId")}
      </div>
    ),
  },
  {
    accessorKey: "firstName",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="font-secondary"
        >
          First Name
        </div>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("firstName")}</div>
    ),
  },
  {
    accessorKey: "lastName",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="font-secondary"
        >
          Last Name
        </div>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("lastName")}</div>
    ),
  },
  {
    accessorKey: "email",
    header: () => <div>Email</div>,
    cell: ({ row }) => <div>{row.getValue("email")}</div>,
  },
  {
    accessorKey: "phone",
    header: () => <div>Phone</div>,
    cell: ({ row }) => <div>{row.getValue("phone")}</div>,
  },
  {
    accessorKey: "city",
    header: () => <div>City</div>,
    cell: ({ row }) => <div>{row.getValue("city")}</div>,
  },
  {
    accessorKey: "totalOrders",
    header: () => <div>Total Orders</div>,
    cell: ({ row }) => <div>{row.getValue("totalOrders")}</div>,
  },
  {
    accessorKey: "totalSpent",
    header: () => <div>Total Spent</div>,
    cell: ({ row }) => (
      <div>${Number(row.getValue("totalSpent")).toFixed(2)}</div>
    ),
  },
  {
    accessorKey: "isActive",
    header: () => <div>Status</div>,
    cell: ({ row }) => {
      const isActive = row.getValue("isActive");
      return (
        <div className={`capitalize ${isActive ? "text-green-600" : "text-red-600"}`}>
          {isActive ? "Active" : "Inactive"}
        </div>
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