// "use client";

// import { OrderTracking } from "@/types/orderTracking";
// import { MoreHorizontal, Eye, Edit, Trash2 } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { useRouter } from "next/navigation";
// import { useDeleteOrderTrackingMutation } from "@/redux/services/orderTrackingsApi";
// import { toast } from "sonner";
// import { IApiError } from "@/types";

// interface TableActionProps {
//   tracking: OrderTracking;
// }

// export default function TableAction({ tracking }: TableActionProps) {
//   const router = useRouter();
//   const [deleteOrderTracking, { isLoading }] = useDeleteOrderTrackingMutation();

//   const handleDelete = async () => {
//     try {
//       const response = await deleteOrderTracking(tracking.trackingId).unwrap();
//       if (response.success) {
//         toast.success("Order tracking deleted successfully.");
//       }
//     } catch (err: unknown) {
//       const error = err as IApiError;
//       toast.error(error?.data?.error?.message || "Something went wrong.");
//     }
//   };

//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger asChild>
//         <Button variant="ghost" className="h-8 w-8 p-0">
//           <span className="sr-only">Open menu</span>
//           <MoreHorizontal className="h-4 w-4" />
//         </Button>
//       </DropdownMenuTrigger>
//       <DropdownMenuContent align="end">
//         <DropdownMenuLabel>Actions</DropdownMenuLabel>
//         <DropdownMenuItem
//           onClick={() => navigator.clipboard.writeText(tracking.trackingId.toString())}
//         >
//           Copy tracking ID
//         </DropdownMenuItem>
//         <DropdownMenuSeparator />
//         <DropdownMenuItem onClick={() => router.push(`/order-trackings/${tracking.orderId}`)}>
//           <Eye className="mr-2 h-4 w-4" />
//           View tracking details
//         </DropdownMenuItem>
//         <DropdownMenuItem onClick={() => router.push(`/order-trackings/edit/${tracking.trackingId}`)}>
//           <Edit className="mr-2 h-4 w-4" />
//           Edit tracking
//         </DropdownMenuItem>
//         <DropdownMenuItem
//           onClick={handleDelete}
//           disabled={isLoading}
//           className="text-red-600"
//         >
//           <Trash2 className="mr-2 h-4 w-4" />
//           Delete tracking
//         </DropdownMenuItem>
//       </DropdownMenuContent>
//     </DropdownMenu>
//   );
// }

// ----------------------- 222222222222222222222222222 ----------------------------------
"use client";

import { OrderTracking } from "@/types/orderTracking";
import { MoreHorizontal, Eye, Edit, Trash2 } from "lucide-react";
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
import { useDeleteOrderTrackingMutation } from "@/redux/services/orderTrackingsApi";
import { toast } from "sonner";
import { IApiError } from "@/types";

interface TableActionProps {
  tracking: OrderTracking;
}

export default function TableAction({ tracking }: TableActionProps) {
  const router = useRouter();
  const [deleteOrderTracking, { isLoading }] =
    useDeleteOrderTrackingMutation();

  const handleDelete = async () => {
    try {
      const response = await deleteOrderTracking(tracking.trackingId).unwrap();
      if (response.success) {
        toast.success("Order tracking deleted successfully.");
      }
    } catch (err: unknown) {
      const error = err as IApiError;
      toast.error(error?.data?.error?.message || "Something went wrong.");
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
          onClick={() =>
            navigator.clipboard.writeText(tracking.trackingId.toString())
          }
        >
          Copy tracking ID
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() =>
            router.push(`/order-trackings/${tracking.orderId}`)
          }
        >
          <Eye className="mr-2 h-4 w-4" />
          View tracking details
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() =>
            router.push(`/order-trackings/edit/${tracking.trackingId}`)
          }
        >
          <Edit className="mr-2 h-4 w-4" />
          Edit tracking
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={handleDelete}
          disabled={isLoading}
          className="text-red-600"
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Delete tracking
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}