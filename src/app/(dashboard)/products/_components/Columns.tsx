import { Product } from "@/types/product";
import { Badge } from "@/components/ui/badge";
import { TbCurrencyTaka } from "react-icons/tb";
import { ColumnDef } from "@tanstack/react-table";
import AppImage from "@/components/common/AppImage";
import TableAction from "@/app/(dashboard)/products/_components/TableAction";
import Link from "next/link";

export const Columns: ColumnDef<Product>[] = [
  {
    accessorKey: "productId",
    header: "ID",
    cell: ({ row }) => (
      <div className="capitalize font-secondary px-4">
        {row.getValue("productId")}
      </div>
    ),
  },
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => {
      const product = row.original;
      return (
        <AppImage
          name={row.getValue("name")}
          image={product?.accessibleImageUrls[0]}
        />
      );
    },
  },
  {
    accessorKey: "name",
    header: ({}) => {
      return <div className="font-secondary">Name</div>;
    },
    cell: ({ row }) => (
      <Link href={`/products/details/${row.getValue("productId")}`}>
        {row.getValue("name")}
      </Link>
    ),
  },
  {
    accessorKey: "farmerName",
    header: ({}) => {
      return <div className="font-secondary">Supplier</div>;
    },
    cell: ({ row }) => {
      const product = row.original;
      return <div className="font-secondary">{product?.farmer?.farmName}</div>;
    },
  },
  {
    accessorKey: "price",
    header: ({}) => {
      return <div className="font-secondary">Price</div>;
    },
    cell: ({ row }) => {
      const product = row.original;
      const displayPrice =
        Number(product?.unitPrice) * Number(product?.packageSize);
      return (
        <div className="font-secondary flex items-center">
          <TbCurrencyTaka className="size-5 text-typography-50" />{" "}
          {displayPrice.toFixed(2)}
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({}) => {
      return <div className="font-secondary">Status</div>;
    },
    cell: ({ row }) => {
      const product = row.original;

      const handleOrderStatus = (
        stockQuantity: number,
        reorderLevel: number
      ) => {
        if (stockQuantity < reorderLevel) return "Low Stock";
        if (stockQuantity === 0) return "Out of Stock";
        return "In Stock";
      };
      const getStockBadgeClasses = (
        stockStatus: "In Stock" | "Out of Stock" | "Low Stock"
      ) => {
        const baseClasses =
          "inline-flex items-center font-secondary text-xs rounded-sm font-medium border";

        const variants = {
          "In Stock": "bg-green-100 text-green-800 border-green-200",
          "Out of Stock": "bg-red-100 text-red-800 border-red-200",
          "Low Stock": "bg-yellow-100 text-yellow-800 border-yellow-200",
        };

        return `${baseClasses} ${variants[stockStatus]}`;
      };

      return (
        <div className="font-secondary">
          <Badge
            className={getStockBadgeClasses(
              handleOrderStatus(product?.stockQuantity, product?.reorderLevel)
            )}
          >
            {handleOrderStatus(product?.stockQuantity, product?.reorderLevel)}
          </Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "type",
    header: ({}) => {
      return <div className="font-secondary">Type</div>;
    },
    cell: ({ row }) => {
      const product = row.original;
      const handleOrderType = (
        isSubscription: boolean,
        isPreorder: boolean
      ) => {
        if (isSubscription) return "Subscription";
        if (isPreorder) return "Preorder";
        return "Regular";
      };
      const getBadgeClasses = (
        productType: "Regular" | "Subscription" | "Preorder"
      ) => {
        const baseClasses =
          "rounded-sm font-secondary text-xs font-medium transition-colors";

        const variants = {
          Regular:
            "bg-green-50 text-green-700 border border-green-200 hover:bg-green-100",
          Subscription:
            "bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100",
          Preorder:
            "bg-orange-50 text-orange-700 border border-orange-200 hover:bg-orange-100",
        };

        return `${baseClasses} ${variants[productType]}`;
      };
      return (
        <div className="font-secondary">
          <Badge
            className={getBadgeClasses(
              handleOrderType(product?.isSubscription, product?.isPreorder)
            )}
          >
            {handleOrderType(product?.isSubscription, product?.isPreorder)}
          </Badge>
        </div>
      );
    },
  },
  {
    id: "actions",
    accessorKey: "Actions",
    cell: ({ row }) => {
      const product = row.original;
      return <TableAction data={product} />;
    },
  },
];
