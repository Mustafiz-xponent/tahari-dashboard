import React from "react";
import { DataTable } from "@/app/(dashboard)/deals/_components/DataTable";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const Deals = () => {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Deals</h1>
          <p className="text-muted-foreground">
            Manage promotional deals and discounts.
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Deal
        </Button>
      </div>
      <DataTable />
    </div>
  );
};

export default Deals;
