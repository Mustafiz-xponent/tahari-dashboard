import React from "react";
import Link from "next/link";
import { Search, Home } from "lucide-react";
import BackBtn from "@/components/common/BackBtn";

const NotFound = () => {
  return (
    <div className="bg-blue-50 sm:p-0 p-5 w-full min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-xl overflow-hidden transform  transition-all duration-300">
        {/* Header with gradient background */}
        <div className="bg-gradient-to-r from-brand-75 to-brand-100 px-8 py-12 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full mb-4">
            <Search className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">404</h1>
          <p className="text-blue-100 text-lg font-medium">Page Not Found</p>
        </div>
        {/* Content */}
        <div className="px-8 py-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            Oops! Lost in Space
          </h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            The page you&apos;re looking for seems to have wandered off into the
            digital void. Let&apos;s get you back on track.
          </p>

          {/* Action buttons */}
          <div className="space-y-3">
            <Link
              href={"/"}
              className="w-full cursor-pointer bg-brand-100 hover:bg-btn-hover text-white py-3 px-4 rounded-lg font-semibold  transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
            >
              <Home className="w-5 h-5" />
              Go Home
            </Link>

            <BackBtn title="Previous Page" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
