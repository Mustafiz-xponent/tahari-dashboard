"use client";
import React, { useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

interface ImageProps {
  name: string;
  image: string;
  className?: string;
  unOptimize?: boolean;
}

const AppImage = ({
  name,
  image,
  className,
  unOptimize = true,
}: ImageProps) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const fallbackImage = "/fallbackImage.jpg";

  // Memoize the image source validation
  const imageSrc = React.useMemo(() => {
    // Check for empty, null, undefined, or invalid strings
    if (
      !image ||
      image.trim() === "" ||
      image === "null" ||
      image === "undefined"
    ) {
      return fallbackImage;
    }

    // Check for valid URL patterns
    const isValidUrl =
      image.startsWith("http") ||
      image.startsWith("/") ||
      image.startsWith("data:");
    if (!isValidUrl) {
      return fallbackImage;
    }

    return error ? fallbackImage : image;
  }, [image, error, fallbackImage]);

  return (
    <div className={twMerge(`relative w-[50px] h-[50px]`, className)}>
      {/* Shimmer skeleton */}
      {loading && !error && (
        <div className="absolute inset-0 animate-pulse rounded-sm bg-gray-200" />
      )}

      <Image
        src={imageSrc}
        alt={`${name} image`}
        sizes="100vw"
        width={0}
        height={0}
        unoptimized={unOptimize}
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

export default AppImage;
