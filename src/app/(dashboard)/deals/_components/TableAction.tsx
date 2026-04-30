"use client";

import React, { useState, useEffect } from "react";
import { Deal, DiscountType } from "@/types/deal";
import {
  MoreHorizontal,
  Eye,
  Pencil,
  Trash2,
  Loader2,
  Check,
  ChevronsUpDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
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

import {
  useDeleteDealMutation,
  useUpdateDealMutation,
  useGetDealByIdQuery,
} from "@/redux/services/dealsApi";
import { useGetAllProductsQuery } from "@/redux/services/productsApi";
import { toast } from "sonner";
import { Product } from "@/types/product";

interface TableActionProps {
  deal: Deal;
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

export default function TableAction({ deal }: TableActionProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [deletingDealId, setDeletingDealId] = useState<string | null>(null);
  const [openProductSelect, setOpenProductSelect] = useState(false);

  const { data: productsData } = useGetAllProductsQuery({
    limit: 100,
    page: 1,
  });

  // ✅ Fetch deal with products when edit dialog opens
  const { data: dealDetails } = useGetDealByIdQuery(deal.dealId, {
    skip: !editDialogOpen,
  });

  const [formData, setFormData] = useState<FormData>({
    title: deal.title,
    description: deal.description ?? "",
    discountType: deal.discountType as DiscountType,
    discountValue: deal.discountValue.toString(),
    startDate: new Date(deal.startDate).toISOString().split("T")[0],
    endDate: new Date(deal.endDate).toISOString().split("T")[0],
    isGlobal: deal.isGlobal,
    productIds: [],
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const [deleteDeal, { isLoading: isDeleting }] = useDeleteDealMutation();
  const [updateDeal, { isLoading: isUpdating }] = useUpdateDealMutation();

  const products: Product[] = productsData?.data || [];

  // ✅ Load existing products from dealDetails
  useEffect(() => {
    console.log("Deal Details:", dealDetails); // ✅ Debug

    if (editDialogOpen && dealDetails?.data) {
      const dealData = Array.isArray(dealDetails.data)
        ? dealDetails.data[0]
        : dealDetails.data;

      console.log("Deal Data:", dealData); // ✅ Debug
      console.log("Products from API:", dealData?.products); // ✅ Debug

      if (dealData && dealData.products && Array.isArray(dealData.products)) {
        const productIds = dealData.products.map((p) => String(p.productId));
        console.log("Extracted Product IDs:", productIds); // ✅ Debug

        setFormData((prev) => ({
          ...prev,
          productIds,
        }));
      }
    }
  }, [editDialogOpen, dealDetails]);

  const handleCopyId = () => {
    navigator.clipboard.writeText(deal.dealId);
    toast.success("Deal ID copied to clipboard");
  };

  const handleDelete = async () => {
    try {
      setDeletingDealId(deal.dealId);
      await deleteDeal(deal.dealId).unwrap();
      toast.success("Deal deleted successfully");
      setDeleteDialogOpen(false);
    } catch (error: unknown) {
      const err = error as { data?: { message?: string }; message?: string };
      toast.error(err?.data?.message || "Failed to delete deal");
    } finally {
      setDeletingDealId(null);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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
    const newErrors: FormErrors = {};

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
      newErrors.productIds = "At least one product must be selected";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUpdate = async () => {
    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    try {
      await updateDeal({
        dealId: deal.dealId,
        title: formData.title,
        description: formData.description || undefined,
        discountType: formData.discountType,
        discountValue: Number(formData.discountValue),
        startDate: formData.startDate,
        endDate: formData.endDate,
        isGlobal: formData.isGlobal,
        productIds: formData.isGlobal ? undefined : formData.productIds,
      }).unwrap();
      toast.success("Deal updated successfully");
      setEditDialogOpen(false);
    } catch (error: unknown) {
      const err = error as { data?: { message?: string }; message?: string };
      toast.error(err?.data?.message || "Failed to update deal");
    }
  };

  const isThisDealDeleting = deletingDealId === deal.dealId && isDeleting;

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="h-8 w-8 p-0"
            disabled={isThisDealDeleting}
          >
            <span className="sr-only">Open menu</span>
            {isThisDealDeleting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <MoreHorizontal className="h-4 w-4" />
            )}
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={handleCopyId}>
            Copy Deal ID
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setViewDialogOpen(true)}>
            <Eye className="mr-2 h-4 w-4" />
            View Deal
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setEditDialogOpen(true)}>
            <Pencil className="mr-2 h-4 w-4" />
            Edit Deal
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => setDeleteDialogOpen(true)}
            className="text-red-600 focus:text-red-600"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete Deal
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* View Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Deal Details</DialogTitle>
          </DialogHeader>

          <div className="space-y-3 text-sm">
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
              <span className="text-muted-foreground font-medium">ID</span>
              <span>#{deal.dealId}</span>

              <span className="text-muted-foreground font-medium">Title</span>
              <span>{deal.title}</span>

              <span className="text-muted-foreground font-medium">
                Description
              </span>
              <span>{deal.description ?? "—"}</span>

              <span className="text-muted-foreground font-medium">
                Discount
              </span>
              <span>
                {deal.discountType === DiscountType.PERCENTAGE
                  ? `${deal.discountValue}%`
                  : `৳${deal.discountValue}`}
              </span>

              <span className="text-muted-foreground font-medium">
                Start Date
              </span>
              <span>{new Date(deal.startDate).toLocaleDateString()}</span>

              <span className="text-muted-foreground font-medium">
                End Date
              </span>
              <span>{new Date(deal.endDate).toLocaleDateString()}</span>

              <span className="text-muted-foreground font-medium">Type</span>
              <span>{deal.isGlobal ? "Global" : "Specific"}</span>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Deal</DialogTitle>
          </DialogHeader>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleUpdate();
            }}
            className="space-y-4"
          >
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
                placeholder="Deal title"
                className={errors.title ? "border-red-500" : ""}
                disabled={isUpdating}
              />
              {errors.title && (
                <p className="text-sm text-red-500">{errors.title}</p>
              )}
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <Label htmlFor="description">
                Description{" "}
                <span className="text-xs text-muted-foreground">
                  (Optional)
                </span>
              </Label>
              <Input
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Deal description"
                disabled={isUpdating}
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
                  disabled={isUpdating}
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
                  placeholder="0"
                  className={errors.discountValue ? "border-red-500" : ""}
                  disabled={isUpdating}
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
                  disabled={isUpdating}
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
                  disabled={isUpdating}
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
                disabled={isUpdating}
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
                      disabled={isUpdating}
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
                  <p className="text-sm text-red-500">{errors.productIds}</p>
                )}
              </div>
            )}

            {/* Form Actions */}
            <DialogFooter className="gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setEditDialogOpen(false)}
                disabled={isUpdating}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isUpdating}
                className="bg-brand-100 text-white hover:bg-brand-200"
              >
                {isUpdating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Deal</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete <strong>{deal.title}</strong>?
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isThisDealDeleting}
              className="bg-red-600 text-white hover:bg-red-700"
            >
              {isThisDealDeleting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
