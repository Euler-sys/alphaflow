import React, { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const VerifyPage: React.FC = () => {
  const navigate = useNavigate();
  const [verifying, setVerifying] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    // First, show success after 4 seconds
    const successTimer = setTimeout(() => {
      console.log(showSuccess)
      setVerifying(false);
      setShowSuccess(true);
    }, 4000);

    // Then navigate after 7 seconds
    const redirectTimer = setTimeout(() => {
      navigate("/home");
    }, 10000);

    return () => {
      clearTimeout(successTimer);
      clearTimeout(redirectTimer);
    };
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="w-full max-w-md p-6 text-center border border-gray-300 rounded-lg shadow-md">
        {/* Top banner */}
        <div className="bg-blue-900 text-white text-sm py-1 rounded-t-md mb-4 font-semibold">
         Verify 
        </div>

        {/* Warning + Title */}
        <div className="flex items-center justify-center mb-3 text-yellow-600 font-semibold text-lg">
          <span className="text-xl mr-2">⚠️</span> Identity Verification
          Required
        </div>

        {/* Description */}
        <p className="text-sm text-gray-700 mb-5">
          To protect your information and ensure secure access, please complete
          this verification. This helps prevent unauthorized access and confirms
          you are not a robot.
        </p>

        {/* Verification box */}
        <div className="border border-gray-300 p-4 rounded-md flex items-center justify-between bg-gray-50 mb-4">
          <div className="flex items-center gap-2">
            {verifying ? (
              <>
                <div className="h-4 w-4 border-2 border-green-500 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-gray-800 text-sm">Verifying...</span>
              </>
            ) : (
              <>
                <span className="text-green-600 text-lg bg-green-600 p-2 text-white rounded-full"><FaCheck/></span>
                <span className="text-green-600 text-lg font-bold">Success</span>
              </>
            )}
          </div>
          <img
            src="data:image/png;base64,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"
            alt="Cloudflare"
            className=" w-[100px]"
          />
        </div>

        {/* Refresh Link */}
        <p className="text-blue-600 text-sm font-medium hover:underline cursor-pointer">
          🔄 Refresh if needed
        </p>
      </div>
    </div>
  );
};

export default VerifyPage;
