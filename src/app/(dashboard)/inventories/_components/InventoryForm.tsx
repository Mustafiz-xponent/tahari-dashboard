"use client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  useCreateInventoryMutation,
  useUpdateInventoryMutation,
} from "@/redux/services/inventoriesApi";
import { useGetAllFarmersQuery } from "@/redux/services/farmersApi";
import { useGetAllProductsQuery } from "@/redux/services/productsApi";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { InventoryPurchase } from "@/types/inventory";

const inventoryFormSchema = z.object({
  farmerId: z.string().min(1, "Farmer is required"),
  productId: z.string().min(1, "Product is required"),
  quantity: z.number().int().positive("Quantity must be a positive number"),
  unitCost: z.number().positive("Unit cost must be a positive number"),
  totalCost: z.number().positive("Total cost must be a positive number"),
  packageSize: z
    .number()
    .positive("Package size must be a positive number")
    .optional(),
  purchaseDate: z.string().optional(),
  status: z.enum(["PENDING", "COMPLETED", "CANCELLED"]).optional(),
  notes: z.string().optional(),
});

type InventoryFormValues = z.infer<typeof inventoryFormSchema>;

interface InventoryFormProps {
  inventory?: InventoryPurchase;
  onSuccess?: () => void;
}

interface Farmer {
  farmerId: string | number;
  name: string;
  farmName: string;
}

interface Product {
  productId: string | number;
  name: string;
}

export function InventoryForm({ inventory, onSuccess }: InventoryFormProps) {
  const [createInventory, { isLoading: isCreating }] =
    useCreateInventoryMutation();
  const [updateInventory, { isLoading: isUpdating }] =
    useUpdateInventoryMutation();

  const { data: farmersData } = useGetAllFarmersQuery({});
  const { data: productsData } = useGetAllProductsQuery({});

  const farmers = (farmersData?.data ?? []) as Farmer[];
  const products = (productsData?.data ?? []) as Product[];

  const form = useForm<InventoryFormValues>({
    resolver: zodResolver(inventoryFormSchema),
    defaultValues: {
      farmerId: inventory?.farmerId?.toString() ?? "",
      productId: inventory?.productId?.toString() ?? "",
      quantity: inventory?.quantity ?? 0,
      unitCost: Number(inventory?.unitCost) ?? 0,
      totalCost: Number(inventory?.totalCost) ?? 0,
      packageSize: inventory?.packageSize ?? 1,
      purchaseDate: inventory?.purchaseDate
        ? new Date(inventory.purchaseDate).toISOString().split("T")[0]
        : new Date().toISOString().split("T")[0],
      status: inventory?.status ?? "PENDING",
      notes: inventory?.notes ?? "",
    },
  });

  // Auto-calculate total cost
  const quantity = form.watch("quantity");
  const unitCost = form.watch("unitCost");

  useEffect(() => {
    if (quantity && unitCost) {
      const total = quantity * unitCost;
      form.setValue("totalCost", total);
    }
  }, [quantity, unitCost, form]);

  const onSubmit = async (data: InventoryFormValues) => {
    try {
      const payload = {
        ...data,
        farmerId: data.farmerId,
        productId: data.productId,
        purchaseDate: data.purchaseDate
          ? new Date(data.purchaseDate).toISOString()
          : undefined,
      };

      if (inventory) {
        await updateInventory({
          inventoryId: inventory.purchaseId,
          bodyData: payload,
        }).unwrap();
        toast.success("Inventory purchase updated successfully");
      } else {
        await createInventory(payload).unwrap();
        toast.success("Inventory purchase created successfully");
        form.reset();
      }

      onSuccess?.();
    } catch (error) {
      const errorMessage =
        error && typeof error === "object" && "data" in error
          ? (error.data as { message?: string })?.message
          : undefined;
      toast.error(
        errorMessage ??
          `Failed to ${inventory ? "update" : "create"} inventory purchase`,
      );
    }
  };

  const isLoading = isCreating || isUpdating;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Farmer Selection */}
          <FormField
            control={form.control}
            name="farmerId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Farmer</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={isLoading}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a farmer" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {farmers.map((farmer) => (
                      <SelectItem
                        key={farmer.farmerId}
                        value={farmer.farmerId.toString()}
                      >
                        {farmer.name} - {farmer.farmName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Product Selection */}
          <FormField
            control={form.control}
            name="productId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={isLoading}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a product" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {products.map((product) => (
                      <SelectItem
                        key={product.productId}
                        value={product.productId.toString()}
                      >
                        {product.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Quantity */}
          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantity</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter quantity"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Unit Cost */}
          <FormField
            control={form.control}
            name="unitCost"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Unit Cost (৳)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.01"
                    placeholder="Enter unit cost"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Total Cost */}
          <FormField
            control={form.control}
            name="totalCost"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Total Cost (৳)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.01"
                    placeholder="Auto-calculated"
                    {...field}
                    disabled={true}
                  />
                </FormControl>
                <FormDescription>
                  Auto-calculated: Quantity × Unit Cost
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Package Size */}
          <FormField
            control={form.control}
            name="packageSize"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Package Size</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.01"
                    placeholder="Enter package size"
                    {...field}
                    onChange={(e) =>
                      field.onChange(
                        e.target.value ? Number(e.target.value) : undefined,
                      )
                    }
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Purchase Date */}
          <FormField
            control={form.control}
            name="purchaseDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Purchase Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} disabled={isLoading} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Status */}
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={isLoading}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="PENDING">Pending</SelectItem>
                    <SelectItem value="COMPLETED">Completed</SelectItem>
                    <SelectItem value="CANCELLED">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Notes */}
        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes (Optional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Add any additional notes..."
                  className="resize-none"
                  {...field}
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-4">
          <Button
            type="submit"
            disabled={isLoading}
            className="bg-brand-100 hover:bg-brand-100/90"
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {inventory ? "Update Purchase" : "Create Purchase"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
