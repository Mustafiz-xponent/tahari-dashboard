"use client";
import { Input } from "@/components/ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Control, FieldPath, FieldValues } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { Info } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
interface InputFieldProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
  label: string;
  placeholder?: string;
  type?: string;
  inputClassName?: string;
  labelClassName?: string;
  info?: string;
}

export function InputField<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  type = "text",
  inputClassName,
  labelClassName,
  info,
}: InputFieldProps<TFieldValues>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <div className="flex items-center justify-between">
            <FormLabel
              htmlFor={name}
              className={twMerge(
                `text-sm font-medium font-secondary`,
                labelClassName
              )}
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

          <FormControl>
            <Input
              id={name}
              placeholder={placeholder}
              type={type}
              onWheel={(e) => e.currentTarget.blur()}
              {...field}
              className={twMerge(
                `pl-4 h-11 border-border placeholder:text-sm text-sm font-secondary focus-visible:border-border focus-visible:ring-0 transition-smooth`,
                inputClassName
              )}
            />
          </FormControl>
          <FormMessage className="font-secondary" />
        </FormItem>
      )}
    />
  );
}
