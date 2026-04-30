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
