// import React from "react";
// import { OrderTrackingsByOrder } from "@/app/(dashboard)/order-trackings/[orderId]/_components/OrderTrackingsByOrder";

// const OrderTrackingsByOrderPage = () => {
//   return (
//     <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-2xl font-bold">Order Trackings</h1>
//           <p className="text-muted-foreground">
//             Trackings for this order.
//           </p>
//         </div>
//       </div>
//       <OrderTrackingsByOrder />
//     </div>
//   );
// };

// export default OrderTrackingsByOrderPage;
// ---------------------- 22222222222222222222222 ------------------------
import React from "react";
import { OrderTrackingsByOrder } from "@/app/(dashboard)/order-trackings/[orderId]/_components/OrderTrackingsByOrder";

const OrderTrackingsByOrderPage = () => {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Order Trackings</h1>
          <p className="text-muted-foreground">Trackings for this order.</p>
        </div>
      </div>
      <OrderTrackingsByOrder />
    </div>
  );
};

export default OrderTrackingsByOrderPage;