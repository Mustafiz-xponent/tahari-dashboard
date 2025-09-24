"use client";
import * as React from "react";
import { Control, FieldPath, FieldValues } from "react-hook-form";
import { cn } from "@/lib/utils";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandEmpty,
} from "@/components/ui/command";
import { Check, ChevronsUpDown } from "lucide-react";
import { Info } from "lucide-react";

interface SelectOption {
  label: string;
  value: string;
}

interface SelectFieldProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
  label?: string;
  placeholder?: string;
  options: SelectOption[];
  info?: string;
  isDataLoading?: boolean;
  inputClassName?: string;
  labelClassName?: string;
}

export function SelectField<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  placeholder = "Select...",
  options,
  info,
  inputClassName,
  labelClassName,
  isDataLoading = false,
}: SelectFieldProps<TFieldValues>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex w-full flex-col">
          <div className="flex items-center justify-between">
            {label && (
              <FormLabel
                className={cn(
                  "text-sm font-medium font-secondary",
                  labelClassName
                )}
              >
                {label}
              </FormLabel>
            )}
            {info && (
              <Popover>
                <PopoverTrigger className="cursor-pointer">
                  <Info className="w-4 h-4 text-typography-50" />
                </PopoverTrigger>
                <PopoverContent className="font-secondary text-xs text-typography-50 max-w-[200px]">
                  {info}
                </PopoverContent>
              </Popover>
            )}
          </div>

          <FormControl>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  className={cn(
                    "w-full justify-between font-secondary",
                    !field.value && "text-muted-foreground",
                    inputClassName
                  )}
                >
                  {field.value
                    ? options.find((opt) => opt.value === field.value)?.label
                    : placeholder}
                  <ChevronsUpDown className="opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                sideOffset={0}
                align="start"
                className="p-0 w-[var(--radix-popover-trigger-width)] max-w-none"
              >
                <Command>
                  <CommandInput
                    placeholder="Search..."
                    className="h-9 font-secondary"
                  />
                  <CommandList>
                    <CommandEmpty className="font-secondary text-center h-30 text-typography-50 pt-4">
                      {isDataLoading ? "Loading..." : "No results found."}
                    </CommandEmpty>
                    <CommandGroup>
                      {options?.map((opt) => (
                        <CommandItem
                          key={opt.value}
                          value={opt.label}
                          onSelect={() => field.onChange(opt.value)}
                          className="font-secondary"
                        >
                          {opt.label}
                          <Check
                            className={cn(
                              "ml-auto",
                              field.value === opt.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </FormControl>
          <FormMessage className="font-secondary" />
        </FormItem>
      )}
    />
  );
}
