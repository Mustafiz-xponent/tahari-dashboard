"use client";
import React, { useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

interface CategoryImageProps {
  name: string;
  image: string;
  className?: string;
}
const CategoryImage = ({ name, image, className }: CategoryImageProps) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const fallbackImage = "/fallbackImage.jpg";
  return (
    <div className={twMerge(`relative  w-[50px] h-[50px]`, className)}>
      {/* Shimmer skeleton */}
      {loading && !error && (
        <div className="absolute inset-0 animate-pulse rounded-sm bg-gray-200" />
      )}

      <Image
        src={error ? fallbackImage : image}
        alt={`${name} image`}
        sizes="100vw"
        width={0}
        height={0}
        unoptimized
        className={clsx(
          "rounded-sm object-cover w-full h-full transition-opacity duration-300",
          loading ? "opacity-0" : "opacity-100"
        )}
        onLoad={() => setLoading(false)}
        onError={() => {
          setError(true);
          setLoading(false);
        }}
      />
    </div>
  );
};

export default CategoryImage;
