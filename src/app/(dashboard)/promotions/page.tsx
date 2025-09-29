import React from "react";
import AddPromoDialog from "@/app/(dashboard)/promotions/_components/AddPromoDialog";

const Promotions = () => {
  return (
    <div className="space-y-6">
      <header className="flex sm:items-center gap-y-4 sm:flex-row flex-col justify-between">
        <div>
          <h2 className="font-secondary  text-typography-100 tracking-tight text-2xl font-bold">
            Promotions Management
          </h2>
          <p className="text-typography-75 font-secondary">
            Create, organize, and track your promotional campaigns
          </p>
        </div>
        {/* Add Promotion Dialog */}
        <AddPromoDialog />
      </header>
      {/* Promotions list table */}
      {/* <DataTable /> */}
    </div>
  );
};

export default Promotions;
