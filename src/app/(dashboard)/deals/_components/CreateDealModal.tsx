"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2, Check, ChevronsUpDown } from "lucide-react";
import { useCreateDealMutation } from "@/redux/services/dealsApi";
import { useGetAllProductsQuery } from "@/redux/services/productsApi";
import { toast } from "sonner";
import { DiscountType } from "@/types/deal";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Product } from "@/types/product";

interface CreateDealModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface FormData {
  title: string;
  description: string;
  discountType: DiscountType;
  discountValue: string;
  startDate: string;
  endDate: string;
  isGlobal: boolean;
  productIds: string[];
}

// ✅ Separate type for error messages
interface FormErrors {
  title?: string;
  description?: string;
  discountType?: string;
  discountValue?: string;
  startDate?: string;
  endDate?: string;
  isGlobal?: string;
  productIds?: string;
}

export default function CreateDealModal({
  open,
  onOpenChange,
}: CreateDealModalProps) {
  const [createDeal, { isLoading }] = useCreateDealMutation();
  const { data: productsData } = useGetAllProductsQuery({
    limit: 100,
    page: 1,
  });

  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    discountType: DiscountType.PERCENTAGE,
    discountValue: "",
    startDate: "",
    endDate: "",
    isGlobal: true,
    productIds: [],
  });

  const [errors, setErrors] = useState<FormErrors>({}); // ✅ Use FormErrors
  const [openProductSelect, setOpenProductSelect] = useState(false);

  const products: Product[] = productsData?.data || [];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleDiscountTypeChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      discountType: value as DiscountType,
    }));
  };

  const handleProductToggle = (productId: string) => {
    setFormData((prev) => ({
      ...prev,
      productIds: prev.productIds.includes(productId)
        ? prev.productIds.filter((id) => id !== productId)
        : [...prev.productIds, productId],
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}; // ✅ Use FormErrors

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    } else if (formData.title.length < 3) {
      newErrors.title = "Title must be at least 3 characters";
    }

    if (!formData.discountValue) {
      newErrors.discountValue = "Discount value is required";
    } else if (Number(formData.discountValue) <= 0) {
      newErrors.discountValue = "Discount value must be greater than 0";
    }

    if (!formData.startDate) {
      newErrors.startDate = "Start date is required";
    }

    if (!formData.endDate) {
      newErrors.endDate = "End date is required";
    }

    if (formData.startDate && formData.endDate) {
      if (new Date(formData.endDate) <= new Date(formData.startDate)) {
        newErrors.endDate = "End date must be after start date";
      }
    }

    if (!formData.isGlobal && formData.productIds.length === 0) {
      newErrors.productIds = "At least one product must be selected"; // ✅ Now works
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    try {
      await createDeal({
        title: formData.title,
        description: formData.description || undefined,
        discountType: formData.discountType,
        discountValue: Number(formData.discountValue),
        startDate: formData.startDate,
        endDate: formData.endDate,
        isGlobal: formData.isGlobal,
        productIds: formData.isGlobal ? undefined : formData.productIds,
      }).unwrap();

      toast.success("Deal created successfully!");
      onOpenChange(false);
      resetForm();
    } catch (error: unknown) {
      console.log("Create deal error:", error);
      const err = error as { data?: { message?: string }; message?: string };
      const errorMessage =
        err?.data?.message || err?.message || "Failed to create deal";
      toast.error(errorMessage);
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      discountType: DiscountType.PERCENTAGE,
      discountValue: "",
      startDate: "",
      endDate: "",
      isGlobal: true,
      productIds: [],
    });
    setErrors({});
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      resetForm();
    }
    onOpenChange(newOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Deal</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div className="space-y-1.5">
            <Label htmlFor="title">
              Deal Title <span className="text-red-500">*</span>
            </Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="e.g., Summer Sale 2024"
              className={errors.title ? "border-red-500" : ""}
              disabled={isLoading}
            />
            {errors.title && (
              <p className="text-sm text-red-500">{errors.title}</p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <Label htmlFor="description">
              Description{" "}
              <span className="text-xs text-muted-foreground">(Optional)</span>
            </Label>
            <Input
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Describe the deal"
              disabled={isLoading}
            />
          </div>

          {/* Discount Type & Value */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="discountType">
                Discount Type <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.discountType}
                onValueChange={handleDiscountTypeChange}
                disabled={isLoading}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={DiscountType.PERCENTAGE}>
                    Percentage (%)
                  </SelectItem>
                  <SelectItem value={DiscountType.FLAT}>
                    Flat Amount (৳)
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="discountValue">
                Value <span className="text-red-500">*</span>
              </Label>
              <Input
                id="discountValue"
                name="discountValue"
                type="number"
                value={formData.discountValue}
                onChange={handleInputChange}
                placeholder={
                  formData.discountType === DiscountType.PERCENTAGE
                    ? "e.g., 20"
                    : "e.g., 500"
                }
                className={errors.discountValue ? "border-red-500" : ""}
                disabled={isLoading}
              />
              {errors.discountValue && (
                <p className="text-sm text-red-500">{errors.discountValue}</p>
              )}
            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="startDate">
                Start Date <span className="text-red-500">*</span>
              </Label>
              <Input
                id="startDate"
                name="startDate"
                type="date"
                value={formData.startDate}
                onChange={handleInputChange}
                className={errors.startDate ? "border-red-500" : ""}
                disabled={isLoading}
              />
              {errors.startDate && (
                <p className="text-sm text-red-500">{errors.startDate}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="endDate">
                End Date <span className="text-red-500">*</span>
              </Label>
              <Input
                id="endDate"
                name="endDate"
                type="date"
                value={formData.endDate}
                onChange={handleInputChange}
                className={errors.endDate ? "border-red-500" : ""}
                disabled={isLoading}
              />
              {errors.endDate && (
                <p className="text-sm text-red-500">{errors.endDate}</p>
              )}
            </div>
          </div>

          {/* Global Deal Checkbox */}
          <div className="flex items-center gap-3 rounded-lg border p-3">
            <Checkbox
              id="isGlobal"
              checked={formData.isGlobal}
              onCheckedChange={(checked) =>
                setFormData((prev) => ({
                  ...prev,
                  isGlobal: checked as boolean,
                  productIds: [],
                }))
              }
              disabled={isLoading}
            />
            <Label
              htmlFor="isGlobal"
              className="flex-1 cursor-pointer font-medium text-sm"
            >
              Global Deal
              <span className="block text-xs text-muted-foreground font-normal">
                {formData.isGlobal
                  ? "Applies to all products"
                  : "Applies to specific products"}
              </span>
            </Label>
          </div>

          {/* Product Selection (only for non-global deals) */}
          {!formData.isGlobal && (
            <div className="space-y-1.5">
              <Label>
                Select Products <span className="text-red-500">*</span>
              </Label>
              <Popover
                open={openProductSelect}
                onOpenChange={setOpenProductSelect}
              >
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={openProductSelect}
                    className="w-full justify-between"
                    disabled={isLoading}
                  >
                    {formData.productIds.length > 0
                      ? `${formData.productIds.length} product(s) selected`
                      : "Select products..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput placeholder="Search products..." />
                    <CommandEmpty>No products found.</CommandEmpty>
                    <CommandGroup className="max-h-64 overflow-y-auto">
                      {products.map((product) => (
                        <CommandItem
                          key={product.productId}
                          value={String(product.productId)}
                          onSelect={() =>
                            handleProductToggle(String(product.productId))
                          }
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              formData.productIds.includes(
                                String(product.productId),
                              )
                                ? "opacity-100"
                                : "opacity-0",
                            )}
                          />
                          {product.name}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
              {errors.productIds && (
                <p className="text-sm text-red-500">
                  {errors.productIds} {/* ✅ No casting needed */}
                </p>
              )}
            </div>
          )}

          {/* Form Actions */}
          <DialogFooter className="gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOpenChange(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-brand-100 text-white hover:bg-brand-200"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create Deal"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
