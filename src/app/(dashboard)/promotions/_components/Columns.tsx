import { Promotion } from "@/types/promotion";
import { ColumnDef } from "@tanstack/react-table";
import AppImage from "@/components/common/AppImage";
import TableAction from "@/app/(dashboard)/promotions/_components/TableAction";

export const Columns: ColumnDef<Promotion>[] = [
  {
    accessorKey: "promotionId",
    header: "ID",
    cell: ({ row }) => (
      <div className="capitalize font-secondary px-4">
        {row.getValue("promotionId")}
      </div>
    ),
  },
  {
    accessorKey: "accessibleImageUrl",
    header: "Image",
    cell: ({ row }) => (
      <AppImage
        name={row.getValue("title")}
        image={row.getValue("accessibleImageUrl")}
      />
    ),
  },
  {
    accessorKey: "title",
    header: ({}) => {
      return <div className="font-secondary">Title</div>;
    },
    cell: ({ row }) => <div>{row.getValue("title")}</div>,
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
    accessorKey: "priority",
    header: () => <div>Priority</div>,
    cell: ({ row }) => {
      return <div>{row.getValue("priority")}</div>;
    },
  },
  {
    accessorKey: "isActive",
    header: () => <div>Status</div>,
    cell: ({ row }) => {
      const status = row.getValue("isActive") ? "Active" : "Inactive";
      return <div>{status}</div>;
    },
  },
  {
    id: "actions",
    accessorKey: "Actions",
    cell: ({ row }) => {
      const promotion = row.original;
      return <TableAction data={promotion} />;
    },
  },
];
