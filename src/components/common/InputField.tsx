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

interface InputFieldProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
  label: string;
  placeholder?: string;
  type?: string;
  inputClassName?: string;
  labelClassName?: string;
}

export function InputField<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  type = "text",
  inputClassName,
  labelClassName,
}: InputFieldProps<TFieldValues>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel
            htmlFor={name}
            className={twMerge(
              `text-sm font-medium font-secondary`,
              labelClassName
            )}
          >
            {label}
          </FormLabel>
          <FormControl>
            <Input
              id={name}
              placeholder={placeholder}
              type={type}
              {...field}
              className={twMerge(
                `pl-4 h-11 border-border font-secondary focus-visible:border-border focus-visible:ring-0 transition-smooth`,
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
