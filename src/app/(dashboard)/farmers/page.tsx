import React from "react";
import AddFarmerDialog from "@/app/(dashboard)/farmers/_components/AddFarmerDialog";

const Farmers = () => {
  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h2 className="font-secondary  text-typography-100 tracking-tight text-2xl font-bold">
            Farmer Management
          </h2>
          <p className="text-typography-75 font-secondary">
            Create, update, and manage farmer profiles
          </p>
        </div>
        {/* Add farmer Dialog */}
        <AddFarmerDialog />
      </header>
    </div>
  );
};

export default Farmers;
