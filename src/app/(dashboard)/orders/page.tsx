import React from "react";
import { DataTable } from "@/app/(dashboard)/orders/_components/DataTable";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const Orders = () => {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Orders</h1>
          <p className="text-muted-foreground">
            Manage customer orders and their status.
          </p>
        </div>
        {/* <Button
          variant="outline"
          className="h-11 w-fit self-end font-secondary rounded-sm cursor-pointer text-typography-5 hover:text-white bg-brand-100 hover:bg-btn-hover"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Order
        </Button> */}
      </div>
      <DataTable />
    </div>
  );
};

export default Orders;
