"use client";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { twMerge } from "tailwind-merge";

interface BackBtnProps {
  title: string;
  className?: string;
}
const BackBtn = ({ title, className }: BackBtnProps) => {
  const router = useRouter();
  const handleBack = () => {
    router.back();
  };
  return (
    <button
      onClick={handleBack}
      className={twMerge(
        "w-full cursor-pointer bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-semibold hover:bg-gray-200 transition-all duration-200 flex items-center justify-center gap-2",
        className
      )}
    >
      <ArrowLeft className="w-5 h-5" />
      {title}
    </button>
  );
};

export default BackBtn;
