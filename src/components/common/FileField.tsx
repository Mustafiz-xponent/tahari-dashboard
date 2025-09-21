"use client";

import * as React from "react";
import { Control, FieldPath, FieldValues } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FileDropZone } from "./FileDropZone";

interface FileFieldProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
  label?: string;
  maxFiles?: number; // max number of files
  maxSize?: number; // in MB
  multiple?: boolean;
}

export function FileField<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  maxFiles = 1,
  maxSize = 1,
  multiple = false,
}: FileFieldProps<TFieldValues>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <FileDropZone
              orientation="vertical"
              maxFiles={maxFiles}
              maxSize={maxSize}
              multiple={multiple}
              name={field.name}
              control={control}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
