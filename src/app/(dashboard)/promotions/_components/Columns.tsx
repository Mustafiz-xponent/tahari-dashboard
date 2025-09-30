import { Badge } from "@/components/ui/badge";
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
    cell: ({ row }) => (
      <div className="max-w-[200px] text-ellipsis whitespace-nowrap overflow-hidden">
        {row.getValue("title")}
      </div>
    ),
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
      const badgeClasses = row.getValue("isActive")
        ? "bg-green-100 border-green-200 text-green-800"
        : "bg-red-100 border-red-200 text-red-800";
      return (
        <div>
          <Badge
            className={`${badgeClasses} rounded-sm text-xs font-secondary `}
          >
            {status}
          </Badge>
        </div>
      );
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
