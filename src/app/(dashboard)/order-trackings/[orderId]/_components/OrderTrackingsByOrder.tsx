// "use client";
// import React from "react";
// import { useParams } from "next/navigation";
// import { useGetOrderTrackingsByOrderIdQuery } from "@/redux/services/orderTrackingsApi";
// import { OrderTracking } from "@/types/orderTracking";
// import { DataTableSkeleton } from "@/components/common/DataTableSkeleton";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { MapPin, Truck, Package, Clock, CheckCircle } from "lucide-react";

// const OrderTrackingsByOrder = () => {
//   const { orderId } = useParams();
//   const { data, isLoading } = useGetOrderTrackingsByOrderIdQuery(Number(orderId));

//   if (isLoading) {
//     return <DataTableSkeleton columnCount={4} />;
//   }

//   const trackings = Array.isArray(data)
//     ? data
//     : data?.data ?? data?.orderTrackings ?? data?.items ?? [];

//   if (trackings.length === 0) {
//     return (
//       <Card>
//         <CardContent className="flex flex-col items-center justify-center py-10">
//           <Package className="h-12 w-12 text-muted-foreground mb-4" />
//           <h3 className="text-lg font-semibold">No trackings found</h3>
//           <p className="text-muted-foreground">This order has no tracking information yet.</p>
//         </CardContent>
//       </Card>
//     );
//   }

//   return (
//     <div className="space-y-4">
//       {trackings.map((tracking: OrderTracking) => (
//         <Card key={tracking.trackingId}>
//           <CardHeader>
//             <CardTitle className="flex items-center justify-between">
//               <span>Tracking #{tracking.trackingId}</span>
//               <Badge
//                 variant={
//                   tracking.status === "DELIVERED"
//                     ? "default"
//                     : tracking.status === "FAILED_DELIVERY"
//                     ? "destructive"
//                     : "secondary"
//                 }
//               >
//                 {tracking.status.replace(/_/g, " ")}
//               </Badge>
//             </CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//               <div className="flex items-center space-x-2">
//                 <MapPin className="h-4 w-4 text-muted-foreground" />
//                 <span className="text-sm">{tracking.location}</span>
//               </div>
//               <div className="flex items-center space-x-2">
//                 <Truck className="h-4 w-4 text-muted-foreground" />
//                 <span className="text-sm">{tracking.carrier}</span>
//               </div>
//               <div className="flex items-center space-x-2">
//                 <Package className="h-4 w-4 text-muted-foreground" />
//                 <span className="text-sm font-mono">{tracking.trackingNumber}</span>
//               </div>
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div className="flex items-center space-x-2">
//                 <Clock className="h-4 w-4 text-muted-foreground" />
//                 <span className="text-sm">
//                   Est. Delivery: {new Date(tracking.estimatedDelivery).toLocaleDateString()}
//                 </span>
//               </div>
//               {tracking.actualDelivery && (
//                 <div className="flex items-center space-x-2">
//                   <CheckCircle className="h-4 w-4 text-green-600" />
//                   <span className="text-sm">
//                     Delivered: {new Date(tracking.actualDelivery).toLocaleDateString()}
//                   </span>
//                 </div>
//               )}
//             </div>
//             {tracking.notes && (
//               <div className="pt-2 border-t">
//                 <p className="text-sm text-muted-foreground">{tracking.notes}</p>
//               </div>
//             )}
//           </CardContent>
//         </Card>
//       ))}
//     </div>
//   );
// };

// export default OrderTrackingsByOrder;

// -------------------------- 2222222222222222222222222222 ------------------------------
"use client";
import React from "react";
import { useParams } from "next/navigation";
import { useGetOrderTrackingsByOrderIdQuery } from "@/redux/services/orderTrackingsApi";
import { OrderTracking } from "@/types/orderTracking";
import { DataTableSkeleton } from "@/components/common/DataTableSkeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Package, Clock } from "lucide-react";

export const OrderTrackingsByOrder = () => {
  const { orderId } = useParams();
  const { data: trackings = [], isLoading } = useGetOrderTrackingsByOrderIdQuery(
    Number(orderId)
  );

  if (isLoading) {
    return <DataTableSkeleton columnCount={4} />;
  }

  if (trackings.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-10">
          <Package className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold">No trackings found</h3>
          <p className="text-muted-foreground">
            This order has no tracking information yet.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {trackings.map((tracking: OrderTracking) => (
        <Card key={tracking.trackingId}>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Tracking #{tracking.trackingId}</span>
              <Badge
                variant={
                  tracking.status === "DELIVERED"
                    ? "default"
                    : tracking.status === "CANCELLED"
                      ? "destructive"
                      : "secondary"
                }
              >
                {tracking.status}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">
                Updated:{" "}
                {tracking.updateDate
                  ? new Date(tracking.updateDate).toLocaleString()
                  : "N/A"}
              </span>
            </div>
            {tracking.description && (
              <div className="pt-2 border-t">
                <p className="text-sm text-muted-foreground">
                  {tracking.description}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};