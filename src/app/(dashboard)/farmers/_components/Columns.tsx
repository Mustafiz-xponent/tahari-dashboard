import { Farmer } from "@/types/farmer";
import { Product } from "@/types/product";
import { ColumnDef } from "@tanstack/react-table";
import TableAction from "@/app/(dashboard)/farmers/_components/TableAction";

export const Columns: ColumnDef<Farmer>[] = [
  {
    accessorKey: "farmerId",
    header: "ID",
    size: 40,
    cell: ({ row }) => (
      <div className="capitalize font-secondary px-4">
        {row.getValue("farmerId")}
      </div>
    ),
  },
  {
    accessorKey: "farmName",

    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="font-secondary"
        >
          Farm Name
        </div>
      );
    },
    cell: ({ row }) => <div>{row.getValue("farmName")}</div>,
  },
  {
    accessorKey: "name",
    header: () => <div>Farmer Name</div>,
    cell: ({ row }) => {
      return <div>{row.getValue("name")}</div>;
    },
  },
  {
    accessorKey: "contactInfo",
    header: () => <div>Contact</div>,
    cell: ({ row }) => {
      return <div>{row.getValue("contactInfo")}</div>;
    },
  },
  {
    accessorKey: "products",
    header: () => <div>Products</div>,
    cell: ({ row }) => {
      const products = row.getValue("products") as Product[];

      return <div>{products?.length ?? 0}</div>;
    },
  },
  {
    id: "actions",
    accessorKey: "Actions",
    cell: ({ row }) => {
      const farmer = row.original;
      return <TableAction data={farmer} />;
    },
  },
];
