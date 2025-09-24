"use client";

import { Upload, X } from "lucide-react";
import * as React from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  FileUpload,
  FileUploadDropzone,
  FileUploadItem,
  FileUploadItemDelete,
  FileUploadItemMetadata,
  FileUploadItemPreview,
  FileUploadItemProgress,
  FileUploadList,
  FileUploadTrigger,
} from "@/components/ui/file-upload";
import {
  Control,
  Controller,
  ControllerRenderProps,
  FieldPath,
  FieldValues,
} from "react-hook-form";

interface FileDropZoneProps<TFieldValues extends FieldValues = FieldValues> {
  orientation?: "horizontal" | "vertical";
  maxFiles?: number;
  maxSize?: number; // in MB
  multiple?: boolean;
  name: FieldPath<TFieldValues>;
  control: Control<TFieldValues>;
}

export function FileDropZone<TFieldValues extends FieldValues>({
  orientation = "vertical",
  maxFiles = 1,
  maxSize = 1,
  multiple = false,
  name,
  control,
}: FileDropZoneProps<TFieldValues>) {
  const onUpload = React.useCallback(
    async (
      files: File[],
      {
        onProgress,
        onSuccess,
        onError,
      }: {
        onProgress: (file: File, progress: number) => void;
        onSuccess: (file: File) => void;
        onError: (file: File, error: Error) => void;
      }
    ) => {
      try {
        const uploadPromises = files.map(async (file) => {
          try {
            const totalChunks = 10;
            let uploadedChunks = 0;

            for (let i = 0; i < totalChunks; i++) {
              await new Promise((resolve) =>
                setTimeout(resolve, Math.random() * 200 + 100)
              );
              uploadedChunks++;
              const progress = (uploadedChunks / totalChunks) * 100;
              onProgress(file, progress);
            }

            await new Promise((resolve) => setTimeout(resolve, 500));
            onSuccess(file);
          } catch (error) {
            onError(
              file,
              error instanceof Error ? error : new Error("Upload failed")
            );
          }
        });

        await Promise.all(uploadPromises);
      } catch (error) {
        console.error("Unexpected error during upload:", error);
      }
    },
    []
  );

  const onFileReject = React.useCallback((file: File, message: string) => {
    toast.warning(message, {
      description: `"${
        file.name.length > 20 ? `${file.name.slice(0, 20)}...` : file.name
      }" has been rejected`,
    });
  }, []);

  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { value, onChange },
      }: {
        field: ControllerRenderProps<TFieldValues, typeof name>;
      }) => (
        <FileUpload
          value={Array.isArray(value) ? value : value ? [value] : []}
          onValueChange={(files: File[]) => {
            // console.log("Selected files:", files); // Debug file selection
            onChange(multiple ? files : files[0] || null);
          }}
          maxFiles={maxFiles}
          maxSize={maxSize * 1024 * 1024} // Convert MB to bytes
          className="w-full"
          onUpload={onUpload}
          onFileReject={onFileReject}
          multiple={multiple}
          accept="image/*"
        >
          <FileUploadDropzone>
            <div className="flex flex-col w-full items-center gap-1 text-center">
              <div className="flex items-center justify-center rounded-full border p-2.5">
                <Upload className="size-6 text-muted-foreground" />
              </div>
              <p className="font-medium text-sm">Drag & drop files here</p>
              <p className="text-muted-foreground text-xs">
                Or click to browse (max {maxFiles} files, up to {maxSize}MB{" "}
                {multiple ? "each" : ""})
              </p>
            </div>
            <FileUploadTrigger asChild>
              <Button variant="outline" size="sm" className="mt-2 w-fit">
                Browse files
              </Button>
            </FileUploadTrigger>
          </FileUploadDropzone>
          <FileUploadList orientation={orientation}>
            {(Array.isArray(value) ? value : value ? [value] : []).map(
              (file: File, index: number) => (
                <FileUploadItem key={index} value={file} className="p-1">
                  <FileUploadItemPreview
                    className={`${
                      orientation === "vertical" ? "size-20" : "size-48"
                    }  [&>svg]:size-12`}
                  >
                    {/* <FileUploadItemProgress variant="circular" size={40} /> */}
                  </FileUploadItemPreview>
                  <FileUploadItemMetadata
                    className={`${
                      orientation === "vertical" ? "self-start pt-1" : "sr-only"
                    }`}
                  />
                  <FileUploadItemDelete asChild>
                    <Button
                      variant="secondary"
                      size="icon"
                      className="-top-1 -right-1 absolute size-5 rounded-full"
                    >
                      <X className="size-3" />
                    </Button>
                  </FileUploadItemDelete>
                </FileUploadItem>
              )
            )}
          </FileUploadList>
        </FileUpload>
      )}
    />
  );
}
