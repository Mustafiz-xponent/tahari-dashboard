import React from "react";
import DashboardContent from "@/app/(dashboard)/_components/DashboardContent";

const Dasborad = () => {
  return (
    <div className="space-y-6">
      <header>
        <h2 className="font-secondary  text-typography-100 tracking-tight text-2xl font-bold">
          Dashboard
        </h2>
        <p className="text-typography-75 font-secondary">
          Overview of your farm produce operations
        </p>
      </header>
      <DashboardContent />
    </div>
  );
};

export default Dasborad;
