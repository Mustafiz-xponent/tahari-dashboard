"use client";
import React from "react";
import { AlertTriangle, RefreshCw, Code } from "lucide-react";
import BackBtn from "@/components/common/BackBtn";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="bg-brand-5 sm:p-0 p-5 w-full min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-md overflow-hidden transform  transition-all duration-300">
        {/* Header with Next.js inspired gradient */}
        <div className="bg-gradient-to-r from-brand-75 to-brand-100 px-8 py-12 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full mb-4 relative">
            <AlertTriangle className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2 font-secondary">
            500
          </h1>
          <p className="text-gray-300 text-lg font-medium font-secondary">
            Internal Server Error
          </p>
        </div>

        {/* Content */}
        <div className="px-8 py-8">
          <h2 className="text-2xl font-secondary font-bold text-gray-800 mb-3">
            Application Error
          </h2>
          <p className="text-gray-600 font-secondary text-sm mb-4 leading-relaxed">
            A server-side exception has occurred. This error happened during the
            execution of our application.
          </p>

          {/* Error details box */}
          <div className="bg-gray-50 border-l-4 border-red-500 p-4 mb-6 rounded-r-lg">
            <div className="flex items-start gap-3">
              <Code className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold font-secondary text-gray-800 text-sm mb-1">
                  Error Details
                </p>
                <p className="text-gray-600 text-sm font-secondary bg-white px-2 py-1 rounded border">
                  TypeError: {error.message}
                </p>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="space-y-3">
            <button
              onClick={() => reset()}
              className="w-full cursor-pointer bg-brand-100 hover:bg-btn-hover text-white py-3 px-4 rounded-lg font-semibold  transition-all duration-200 font-secondary flex items-center justify-center gap-2 shadow-lg"
            >
              <RefreshCw className="w-5 h-5" />
              Retry Request
            </button>
            <BackBtn title="Previous Page" />
          </div>
        </div>
      </div>
    </div>
  );
}
