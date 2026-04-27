import { Deal } from "@/types/deal";
import { ColumnDef } from "@tanstack/react-table";
import TableAction from "@/app/(dashboard)/deals/_components/TableAction";

export const Columns: ColumnDef<Deal>[] = [
  {
    accessorKey: "dealId",
    header: "ID",
    cell: ({ row }) => (
      <div className="capitalize font-secondary px-4">
        {row.getValue("dealId")}
      </div>
    ),
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="font-secondary"
        >
          Title
        </div>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("title")}</div>
    ),
  },
  {
    accessorKey: "description",
    header: () => <div>Description</div>,
    cell: ({ row }) => <div>{row.getValue("description")}</div>,
  },
  {
    accessorKey: "discountType",
    header: () => <div>Discount Type</div>,
    cell: ({ row }) => <div>{row.getValue("discountType")}</div>,
  },
  {
    accessorKey: "discountValue",
    header: () => <div>Discount Value</div>,
    cell: ({ row }) => {
      const discountType = row.getValue("discountType");
      const discountValue = row.getValue("discountValue");
      return (
        <div>
          {discountType === "PERCENTAGE" ? `${discountValue}%` : `$${discountValue}`}
        </div>
      );
    },
  },
  {
    accessorKey: "startDate",
    header: () => <div>Start Date</div>,
    cell: ({ row }) => (
      <div>{new Date(row.getValue("startDate")).toLocaleDateString()}</div>
    ),
  },
  {
    accessorKey: "endDate",
    header: () => <div>End Date</div>,
    cell: ({ row }) => (
      <div>{new Date(row.getValue("endDate")).toLocaleDateString()}</div>
    ),
  },
  {
    accessorKey: "isGlobal",
    header: () => <div>Global</div>,
    cell: ({ row }) => {
      const isGlobal = row.getValue("isGlobal");
      return (
        <div className={`capitalize ${isGlobal ? "text-green-600" : "text-blue-600"}`}>
          {isGlobal ? "Global" : "Specific"}
        </div>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const deal = row.original;
      return <TableAction deal={deal} />;
    },
  },
];