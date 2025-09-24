"use client";

import { Textarea } from "@/components/ui/textarea";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Control, FieldPath, FieldValues } from "react-hook-form";
import { twMerge } from "tailwind-merge";

interface TextAreaFieldProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
  label: string;
  placeholder?: string;
  rows?: number;
  labelClassName?: string;
  inputClassName?: string;
}

export function TextAreaField<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  rows = 4,
  labelClassName,
  inputClassName,
}: TextAreaFieldProps<TFieldValues>) {
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
            <Textarea
              id={name}
              placeholder={placeholder}
              rows={rows}
              {...field}
              className={twMerge(
                `pl-4 border-border placeholder:text-sm  text-sm font-primary focus-visible:border-border focus-visible:ring-0 transition-smooth`,
                inputClassName
              )}
            />
          </FormControl>
          <FormMessage className="font-primary" />
        </FormItem>
      )}
    />
  );
}
