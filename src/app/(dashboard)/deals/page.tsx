// import React from "react";
// import { DataTable } from "@/app/(dashboard)/deals/_components/DataTable";
// import { Button } from "@/components/ui/button";
// import { Plus } from "lucide-react";

// const Deals = () => {
//   return (
//     <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-2xl font-bold">Deals</h1>
//           <p className="text-muted-foreground">
//             Manage promotional deals and discounts.
//           </p>
//         </div>
//         <Button>
//           <Plus className="mr-2 h-4 w-4" />
//           Add Deal
//         </Button>
//       </div>
//       <DataTable />
//     </div>
//   );
// };

// export default Deals;

// ---------------------------- 222222222222222222222222-------------------------
"use client";

import React, { useState } from "react";
import DataTable from "@/app/(dashboard)/deals/_components/DataTable"; // ✅ Change to default import
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import CreateDealModal from "@/app/(dashboard)/deals/_components/CreateDealModal";

const DealsPage = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Deals</h1>
          <p className="text-muted-foreground">
            Manage promotional deals and discounts.
          </p>
        </div>
        <Button
          onClick={() => setModalOpen(true)}
          className="bg-brand-100 text-white hover:bg-brand-200"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Deal
        </Button>
      </div>

      <DataTable />

      {/* Create Deal Modal */}
      <CreateDealModal open={modalOpen} onOpenChange={setModalOpen} />
    </div>
  );
};

export default DealsPage;