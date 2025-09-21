import Image from "next/image";
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

    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="font-secondary"
        >
          Name
        </div>
      );
    },
    cell: ({ row }) => <div>{row.getValue("name")}</div>,
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
