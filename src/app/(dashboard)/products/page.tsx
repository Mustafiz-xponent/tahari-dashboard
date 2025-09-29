import React from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/app/(dashboard)/products/_components/DataTable";

const Products = () => {
  return (
    <div className="space-y-6">
      <header className="flex sm:items-center gap-y-4 sm:flex-row flex-col justify-between">
        <div>
          <h2 className="font-secondary  text-typography-100 tracking-tight text-2xl font-bold">
            Product Management
          </h2>
          <p className="text-typography-75 font-secondary">
            Add, update, and manage products in your catalog
          </p>
        </div>
        {/* Add Product Button */}
        <Link href={"/products/add"} className="self-end">
          <Button
            variant="outline"
            className="h-11 w-fit font-secondary rounded-sm cursor-pointer text-typography-5 hover:text-white bg-brand-100 hover:bg-btn-hover"
          >
            <Plus />
            <span>Add Product</span>
          </Button>
        </Link>
      </header>
      {/* Products list table */}
      <DataTable />
    </div>
  );
};

export default Products;
