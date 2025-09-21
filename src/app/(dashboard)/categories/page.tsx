import React from "react";
import AddCategoryDialog from "@/app/(dashboard)/categories/_components/AddCategoryDialog";

const Categories = () => {
  return (
    <div className="space-y-6">
      <header className="flex sm:items-center gap-y-4 sm:flex-row flex-col justify-between">
        <div>
          <h2 className="font-secondary  text-typography-100 tracking-tight text-2xl font-bold">
            Category Management
          </h2>
          <p className="text-typography-75 font-secondary">
            Create and manage product categories
          </p>
        </div>
        {/* Add Category Dialog */}
        <AddCategoryDialog />
      </header>
      {/* Categories list table */}
      {/* <DataTable /> */}
    </div>
  );
};

export default Categories;
