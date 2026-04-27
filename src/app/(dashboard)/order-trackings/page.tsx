// import React from "react";
// import Link from "next/link";
// import { DataTable } from "@/app/(dashboard)/order-trackings/_components/DataTable";
// import { Button } from "@/components/ui/button";
// import { Plus } from "lucide-react";

// const OrderTrackings = () => {
//   return (
//     <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-2xl font-bold">Order Trackings</h1>
//           <p className="text-muted-foreground">
//             Track and manage order shipments and deliveries.
//           </p>
//         </div>
//         <Link href="/order-trackings/add">
//           <Button>
//             <Plus className="mr-2 h-4 w-4" />
//             Add Tracking
//           </Button>
//         </Link>
//       </div>
//       <DataTable />
//     </div>
//   );
// };

// export default OrderTrackings;

//_-------------------- 22222222222222222 ---------------------------
import React from "react";
import Link from "next/link";
import { DataTable } from "@/app/(dashboard)/order-trackings/_components/DataTable";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const OrderTrackings = () => {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Order Trackings</h1>
          <p className="text-muted-foreground">
            Track and manage order shipments and deliveries.
          </p>
        </div>
        <Link href="/order-trackings/add">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Tracking
          </Button>
        </Link>
      </div>
      <DataTable />
    </div>
  );
};

export default OrderTrackings;