import React from "react";
import { DataTable } from "@/app/(dashboard)/subscriptions/_components/DataTable";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const Subscriptions = () => {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Subscription Plans</h1>
          <p className="text-muted-foreground">
            Manage subscription plans for your products.
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Plan
        </Button>
      </div>
      <DataTable />
    </div>
  );
};

export default Subscriptions;
