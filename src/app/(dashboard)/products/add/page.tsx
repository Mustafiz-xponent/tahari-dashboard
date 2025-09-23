import React from "react";
import AddProductForm from "@/app/(dashboard)/products/add/_components/AddProductForm";

const AddProduct = () => {
  return (
    <div className="space-y-6">
      <header>
        <h2 className="font-secondary text-typography-100 tracking-tight text-2xl font-bold">
          Add New Product
        </h2>
        <p className="text-typography-75 max-w-lg font-secondary">
          Expand your catalog by adding new products effortlessly.
        </p>
      </header>
      <AddProductForm />
    </div>
  );
};

export default AddProduct;
