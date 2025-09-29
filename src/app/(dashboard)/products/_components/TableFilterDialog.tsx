"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ListFilter } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useGetAllCategoriesQuery } from "@/redux/services/categoriesApi";
import { Category } from "@/types/category";
import { Separator } from "@/components/ui/separator";
import { useGetAllFarmersQuery } from "@/redux/services/farmersApi";
import { Farmer } from "@/types/farmer";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Link from "next/link";
import {
  useQueryStates,
  parseAsArrayOf,
  parseAsString,
  parseAsInteger,
} from "nuqs";

const statusData = [
  { value: "in-stock", label: "In Stock" },
  { value: "out-of-stock", label: "Out of Stock" },
  { value: "low-stock", label: "Low Stock" },
];
const productTypesData = [
  { value: "regular", label: "Regular" },
  { value: "subscription", label: "Subscription" },
  { value: "preorder", label: "Preorder" },
];
const TableFilterDialog = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [categoriesLimit, setCategoriesLimit] = React.useState(5);
  const [farmersLimit, setFarmersLimit] = React.useState(5);
  const [urlFilters, setUrlFilters] = useQueryStates({
    page: parseAsInteger.withDefault(1),
    categoryIds: parseAsArrayOf(parseAsString).withDefault([]),
    farmerIds: parseAsArrayOf(parseAsString).withDefault([]),
    status: parseAsString.withDefault(""),
    type: parseAsString.withDefault(""),
  });
  const {
    data: categoriesData,
    isLoading: categoriesLoading,
    isFetching: categoriesFetching,
  } = useGetAllCategoriesQuery({ limit: categoriesLimit });
  const {
    data: farmersData,
    isLoading: farmersLoading,
    isFetching: farmersFetching,
  } = useGetAllFarmersQuery({ limit: farmersLimit });
  const [selectedCategories, setSelectedCategories] = React.useState<string[]>(
    []
  );
  const [selectedFarmers, setSelectedFarmers] = React.useState<string[]>([]);
  const [status, setStatus] = React.useState<string>("");
  const [type, setType] = React.useState<string>("");

  // Sync URL params to local state when dialog opens
  React.useEffect(() => {
    if (isOpen) {
      setSelectedCategories(urlFilters.categoryIds);
      setSelectedFarmers(urlFilters.farmerIds);
      setStatus(urlFilters.status);
      setType(urlFilters.type);
    }
  }, [isOpen, urlFilters]);

  const handleCategoriesChange = (value: string, checked: boolean) => {
    setSelectedCategories((prev) =>
      checked ? [...prev, value] : prev.filter((item) => item !== value)
    );
  };
  const handleFarmersChange = (value: string, checked: boolean) => {
    setSelectedFarmers((prev) =>
      checked ? [...prev, value] : prev.filter((item) => item !== value)
    );
  };
  const handleCategoryLimit = (type: "MORE" | "LESS") => {
    if (type === "MORE") setCategoriesLimit((prev) => prev + 5);
    if (type === "LESS") setCategoriesLimit(5);
  };
  const handleFarmerLimit = (type: "MORE" | "LESS") => {
    if (type === "MORE") setFarmersLimit((prev) => prev + 5);
    if (type === "LESS") setFarmersLimit(5);
  };

  // Apply filters to URL
  const handleApplyFilters = () => {
    setUrlFilters({
      page: 1, // Always reset to page 1
      categoryIds: selectedCategories.length > 0 ? selectedCategories : null,
      farmerIds: selectedFarmers.length > 0 ? selectedFarmers : null,
      status: status || null, // Remove from URL if empty
      type: type || null, // Remove from URL if empty
    });
    setIsOpen(false); // Close dialog after applying
  };
  // Clear all filters
  const handleClearFilters = () => {
    // Clear local state
    setSelectedCategories([]);
    setSelectedFarmers([]);
    setStatus("");
    setType("");

    // Clear URL params and reset to page 1
    setUrlFilters({
      page: 1,
      categoryIds: null,
      farmerIds: null,
      status: null,
      type: null,
    });

    setIsOpen(false); // Close dialog after clearing
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className="font-secondary transition-all duration-300 flex items-center gap-x-1 text-sm  border-[1px] border-border px-3 hover:bg-gray-50  py-2 rounded-md cursor-pointer font-medium">
        <ListFilter className="size-5" /> Filters
      </DialogTrigger>{" "}
      <DialogContent className="sm:max-w-xl rounded-sm  max-h-[90vh] no-scrollbar overflow-y-scroll">
        <DialogHeader>
          <DialogTitle className="font-secondary text-lg font-semibold">
            Filter Products
          </DialogTitle>
          <DialogDescription className="font-secondary text-typography-50 ">
            Select filters to narrow down your product list.
          </DialogDescription>
        </DialogHeader>
        {/* Categories Filter */}
        <div className="py-1">
          <h6 className="font-secondary mb-3 font-medium text-base text-typography-75">
            Categories
          </h6>
          <div className="gap-2 grid grid-cols-3">
            {categoriesData?.data?.map((category: Category) => {
              return (
                <div
                  key={category?.categoryId}
                  className="flex items-center space-x-2"
                >
                  <Checkbox
                    id={category?.name}
                    checked={selectedCategories.includes(category?.categoryId)}
                    onCheckedChange={(checked) =>
                      handleCategoriesChange(
                        category?.categoryId,
                        checked === true
                      )
                    }
                    className="data-[state=checked]:bg-brand-100 border-brand-100 data-[state=checked]:border-brand-100"
                  />
                  <Label
                    htmlFor={category?.name}
                    className="font-secondary font-medium text-sm"
                  >
                    {category?.name}
                  </Label>
                </div>
              );
            })}
          </div>
          <div className="flex items-center justify-end gap-2">
            <Button
              variant={"link"}
              onClick={() => handleCategoryLimit("MORE")}
              disabled={
                categoriesLoading ||
                categoriesFetching ||
                categoriesData?.pagination?.hasNextPage === false
              }
              className={`font-secondary p-0 h-5 text-typography-75 pt-2 cursor-pointer float-right ${
                categoriesData?.pagination?.hasNextPage === false && "hidden"
              }`}
            >
              {categoriesFetching ? "Loading..." : " See More"}
            </Button>
            <Button
              variant={"link"}
              disabled={categoriesLoading || categoriesFetching}
              onClick={() => handleCategoryLimit("LESS")}
              className={`font-secondary p-0 h-5 text-typography-75 hidden pt-2 cursor-pointer float-right ${
                categoriesData?.pagination?.hasNextPage === false && "block"
              }`}
            >
              See Less
            </Button>
          </div>
        </div>
        <Separator />
        {/* Farmers Filter */}
        <div className="py-1">
          <h6 className="font-secondary mb-3 font-medium text-base text-typography-75">
            Farmers
          </h6>
          <div className="gap-x-2 gap-y-4 grid grid-cols-2">
            {farmersData?.data?.map((farmer: Farmer) => {
              return (
                <div
                  key={farmer?.farmerId}
                  className="flex items-center space-x-2"
                >
                  <Checkbox
                    id={farmer?.farmName}
                    checked={selectedFarmers.includes(farmer?.farmerId)}
                    onCheckedChange={(checked) =>
                      handleFarmersChange(farmer?.farmerId, checked === true)
                    }
                    className="data-[state=checked]:bg-brand-100 border-brand-100 data-[state=checked]:border-brand-100"
                  />
                  <Label
                    htmlFor={farmer?.farmName}
                    className="font-secondary font-medium text-sm"
                  >
                    {farmer?.farmName}
                  </Label>
                </div>
              );
            })}
          </div>
          <div className="flex gap-2 justify-end items-center">
            <Button
              variant={"link"}
              disabled={
                farmersLoading ||
                farmersFetching ||
                farmersData?.pagination?.hasNextPage === false
              }
              onClick={() => handleFarmerLimit("MORE")}
              className={`font-secondary p-0 h-5 text-typography-75 pt-2 cursor-pointer float-right ${
                farmersData?.pagination?.hasNextPage === false && "hidden"
              }`}
            >
              {farmersFetching ? "Loading..." : " See More"}
            </Button>
            <Button
              variant={"link"}
              disabled={farmersLoading || farmersFetching}
              onClick={() => handleFarmerLimit("LESS")}
              className={`font-secondary p-0 h-5 text-typography-75 hidden pt-2 cursor-pointer float-right ${
                farmersData?.pagination?.hasNextPage === false && "block"
              }`}
            >
              See Less
            </Button>
          </div>
        </div>
        <Separator />
        {/* Status filter */}
        <div className="py-1">
          <h6 className="font-secondary mb-3 font-medium text-base text-typography-75">
            Status
          </h6>
          <RadioGroup
            value={status}
            onValueChange={setStatus}
            className="flex gap-4 flex-wrap items-center"
          >
            {statusData.map((status) => (
              <div key={status.value} className="flex items-center space-x-2">
                <RadioGroupItem
                  value={status.value}
                  id={status.value}
                  className="border-brand-100  "
                />
                <Label
                  htmlFor={status.value}
                  className="font-secondary font-medium text-sm"
                >
                  {status.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
        <Separator />
        {/* Filter by product type */}
        <div className="py-1">
          <h6 className="font-secondary mb-3 font-medium text-base text-typography-75">
            Product Type
          </h6>

          <RadioGroup
            value={type}
            onValueChange={setType}
            className="flex gap-4 flex-wrap items-center"
          >
            {productTypesData.map((type) => (
              <div key={type.value} className="flex items-center space-x-2">
                <RadioGroupItem
                  value={type.value}
                  id={type.value}
                  className="border-brand-100  "
                />
                <Label
                  htmlFor={type.value}
                  className="font-secondary font-medium text-sm"
                >
                  {type.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
        <div className="flex items-center mt-2  w-full sm:justify-end gap-2">
          <Button
            variant={"outline"}
            onClick={handleClearFilters}
            className="cursor-pointer h-10 font-secondary sm:w-fit w-1/2"
          >
            <Link href={"/products"}> Reset Filters</Link>
          </Button>
          <Button
            variant={"outline"}
            onClick={handleApplyFilters}
            className="cursor-pointer bg-brand-75 text-white hover:bg-brand-100 hover:text-white sm:w-fit w-1/2 min-w-[120px] h-10"
          >
            Apply Filters
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TableFilterDialog;
