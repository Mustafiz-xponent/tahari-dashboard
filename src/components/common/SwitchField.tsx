"use client";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { Control, FieldPath, FieldValues } from "react-hook-form";
import { Info } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { twMerge } from "tailwind-merge";

interface SwitchFieldProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
  label: string;
  description?: string;
  labelClassName?: string;
  info?: string;
}

export function SwitchField<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  description,
  labelClassName,
  info,
}: SwitchFieldProps<TFieldValues>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-xs">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <FormLabel
                htmlFor={name}
                className={twMerge(`text-sm font-medium`, labelClassName)}
              >
                {label}
              </FormLabel>
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
            {description && (
              <FormDescription className="text-xs text-muted-foreground">
                {description}
              </FormDescription>
            )}
          </div>

          <FormControl>
            <Switch
              checked={field.value}
              onCheckedChange={field.onChange}
              className="data-[state=checked]:bg-brand-100"
            />
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
}
