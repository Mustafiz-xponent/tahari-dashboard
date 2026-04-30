// import React from "react";
// import { DataTable } from "@/app/(dashboard)/customers/_components/DataTable";
// import { Button } from "@/components/ui/button";
// import { Plus } from "lucide-react";

// const Customers = () => {
//   return (
//     <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-2xl font-bold">Customers</h1>
//           <p className="text-muted-foreground">
//             Manage customer information and accounts.
//           </p>
//         </div>
//         <Button>
//           <Plus className="mr-2 h-4 w-4" />
//           Add Customer
//         </Button>
//       </div>
//       <DataTable />
//     </div>
//   );
// };

// export default Customers;

// -------------------------- 222222222222222222222 --------------------
import React from "react";
import { DataTable } from "@/app/(dashboard)/customers/_components/DataTable";

const CustomersPage = () => {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Customers</h1>
          <p className="text-muted-foreground">
            Manage customer information and message threads.
          </p>
        </div>
      </div>
      <DataTable />
    </div>
  );
};

export default CustomersPage;
