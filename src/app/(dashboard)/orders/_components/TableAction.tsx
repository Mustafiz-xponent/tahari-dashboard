
// -------------------- 222222222222222222222 -------------------
// app/(dashboard)/orders/_components/TableAction.tsx
"use client";

import { Order } from "@/types/order";
import { MoreHorizontal, Eye, Edit, Trash2, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { useDeleteOrderMutation } from "@/redux/services/ordersApi";
import { toast } from "sonner";

interface TableActionProps {
  order: Order;
}

export default function TableAction({ order }: TableActionProps) {
  const router = useRouter();
  const [deleteOrder, { isLoading }] = useDeleteOrderMutation();

  const handleDelete = async () => {
    const confirmed = window.confirm(
      `Are you sure you want to delete Order #${order.orderId}?`,
    );
    if (!confirmed) return;

    try {
      const response = await deleteOrder(order.orderId).unwrap();
      console.log("Delete response:", response);
      toast.success(response?.message || "Order deleted successfully.");
    } catch (err: unknown) {
      console.error("Delete error:", err);

      // Handle different error shapes
      const error = err as {
        data?: {
          message?: string;
          error?: { message?: string };
        };
        status?: number;
        message?: string;
      };

      const errorMessage =
        error?.data?.message ||
        error?.data?.error?.message ||
        error?.message ||
        "Failed to delete order.";

      toast.error(errorMessage);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>

        <DropdownMenuItem
          onClick={() => {
            navigator.clipboard.writeText(order.orderId.toString());
            toast.success("Order ID copied");
          }}
        >
          <Copy className="mr-2 h-4 w-4" />
          Copy order ID
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={() => router.push(`/orders/${order.orderId}`)}
        >
          <Eye className="mr-2 h-4 w-4" />
          View order details
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => router.push(`/orders/${order.orderId}`)}
        >
          <Edit className="mr-2 h-4 w-4" />
          Edit order
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={handleDelete}
          disabled={isLoading}
          className="text-red-600 focus:text-red-600"
        >
          <Trash2 className="mr-2 h-4 w-4" />
          {isLoading ? "Deleting..." : "Delete order"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
