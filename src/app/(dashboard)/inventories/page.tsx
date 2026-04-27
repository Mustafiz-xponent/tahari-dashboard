// import React from "react";
// import { DataTable } from "@/app/(dashboard)/inventories/_components/DataTable";
// import { Button } from "@/components/ui/button";
// import { Plus } from "lucide-react";

// const Inventories = () => {
//   return (
//     <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-2xl font-bold">Inventories</h1>
//           <p className="text-muted-foreground">
//             Manage inventory purchases and stock levels.
//           </p>
//         </div>
//         <Button>
//           <Plus className="mr-2 h-4 w-4" />
//           Add Purchase
//         </Button>
//       </div>
//       <DataTable />
//     </div>
//   );
// };

// export default Inventories;

// ------------------------------ 222222222222222222222 ---------------------
"use client";
import React, { useState } from "react";
import { DataTable } from "@/app/(dashboard)/inventories/_components/DataTable";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { InventoryDialog } from "@/app/(dashboard)/inventories/_components/InventoryDialog";

const Inventories = () => {
  const [createOpen, setCreateOpen] = useState(false);

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Inventories</h1>
          <p className="text-muted-foreground">
            Manage inventory purchases and stock levels.
          </p>
        </div>
        <Button
          onClick={() => setCreateOpen(true)}
          className="bg-brand-100 hover:bg-brand-100/90"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Purchase
        </Button>
      </div>
      <DataTable />

      <InventoryDialog open={createOpen} onOpenChange={setCreateOpen} />
    </div>
  );
};

export default Inventories;
