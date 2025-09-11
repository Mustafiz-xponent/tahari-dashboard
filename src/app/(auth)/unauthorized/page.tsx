import React from "react";
import Link from "next/link";
import { Shield, LogIn } from "lucide-react";
import BackBtn from "@/components/common/BackBtn";

const UnauthorizedCard: React.FC = () => {
  return (
    <div className="bg-blue-50 sm:p-0 p-5 w-full min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-md overflow-hidden transform  transition-all duration-300">
        {/* Header with gradient background */}
        <div className="bg-gradient-to-r from-brand-75 to-brand-100 px-8 py-12 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full mb-4">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">401</h1>
          <p className="text-white text-lg font-medium">Unauthorized Access</p>
        </div>

        {/* Content */}
        <div className="px-8 py-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            Access Denied
          </h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            You don&apos;t have permission to access this resource. Please log
            in with proper credentials or contact your administrator.
          </p>

          {/* Action buttons */}
          <div className="space-y-3">
            <Link
              href={"/login"}
              className="w-full cursor-pointer bg-brand-100 hover:bg-btn-hover text-white py-3 px-4 rounded-lg font-semibold  transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
            >
              <LogIn className="w-5 h-5" />
              Login
            </Link>

            <BackBtn title={"Go Back"} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnauthorizedCard;
