import React from "react";
import { Link } from "react-router-dom";


const VerifiedPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50 dark:bg-gray-900">
      <svg
        className="animate-bounce h-24 w-24 mb-4 text-gray-50"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        {/* Red circle */}
        <circle cx="10" cy="10" r="9" fill="red" />
        {/* Cross sign */}
        <path
          fillRule="evenodd"
          d="M14.95 5.293a1 1 0 010 1.414L11.414 10l3.536 3.536a1 1 0 11-1.414 1.414L10 11.414l-3.536 3.536a1 1 0 11-1.414-1.414L8.586 10 5.05 6.464a1 1 0 011.414-1.414L10 8.586l3.536-3.536a1 1 0 011.414 0z"
          clipRule="evenodd"
        />
      </svg>
      <h1 className="text-2xl font-semibold mb-2 dark:text-gray-50">
        Your record is already verified!
      </h1>
      <p className="text-gray-600 text-center mb-6 dark:text-gray-50">
        Invalid Link or Document already Verified
      </p>
      <Link to="/">
        <button className="px-6 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600">
          Go to Home Page
        </button>
      </Link>
    </div>
  );
};

export default VerifiedPage;
