import React from "react";
import EditProductForm from "@/app/(dashboard)/products/edit/[id]/_components/EditProductForm";

const ProductEditPage = () => {
  return (
    <div className="space-y-6">
      <header>
        <h2 className="font-secondary text-typography-100 tracking-tight text-2xl font-bold">
          Edit Product
        </h2>
        <p className="text-typography-75 max-w-lg font-secondary">
          Update your product details, pricing, and availability
        </p>
      </header>
      <EditProductForm />
    </div>
  );
};

export default ProductEditPage;
