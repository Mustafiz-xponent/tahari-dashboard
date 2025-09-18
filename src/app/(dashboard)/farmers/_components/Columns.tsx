import { ColumnDef } from "@tanstack/react-table";
import { Eye, Pencil, Trash, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type Farmer = {
  address: string;
  contactInfo: string;
  farmName: string;
  farmerId: string;
  name: string;
};
interface Product {
  name: string;
}
export const Columns: ColumnDef<Farmer>[] = [
  {
    accessorKey: "farmerId",
    header: "ID",
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
    cell: ({}) => {
      //   const farmer = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="font-secondaryr  pl-1">
            <div className="h-8 w-8 p-0 font-secondary flex items-center cursor-pointer justify-center">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="size-5" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="font-secondary">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>
              <Eye /> View farmer
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Pencil /> Edit Farmer
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Trash className="text-red-500" /> Delete Farmer
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
