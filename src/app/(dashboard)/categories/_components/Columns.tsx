import Image from "next/image";
import { Product } from "@/types/product";
import { Category } from "@/types/category";
import { ColumnDef } from "@tanstack/react-table";
import TableAction from "@/app/(dashboard)/categories/_components/TableAction";

export const Columns: ColumnDef<Category>[] = [
  {
    accessorKey: "categoryId",
    header: "ID",
    cell: ({ row }) => (
      <div className="capitalize font-secondary px-4">
        {row.getValue("categoryId")}
      </div>
    ),
  },
  {
    accessorKey: "accessibleImageUrl",
    header: "Image",
    cell: ({ row }) => (
      <div className="capitalize font-secondary">
        <Image
          src={row.getValue("accessibleImageUrl") ?? ""}
          width={50}
          height={50}
          alt={row.getValue("name") + " Image"}
          className="rounded-sm object-cover"
        />
      </div>
    ),
  },
  {
    accessorKey: "name",
    header: ({}) => {
      return <div className="font-secondary">Category Name</div>;
    },
    cell: ({ row }) => <div>{row.getValue("name")}</div>,
  },
  {
    accessorKey: "description",
    header: ({}) => {
      return <div className="font-secondary">Description</div>;
    },
    cell: ({ row }) => (
      <div className="max-w-[200px] text-ellipsis whitespace-nowrap overflow-hidden">
        {row.getValue("description")}
      </div>
    ),
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
      const category = row.original;
      return <TableAction data={category} />;
    },
  },
];
