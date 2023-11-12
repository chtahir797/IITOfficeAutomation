import React from "react";
import { Link } from "react-router-dom";


const VerifiedPage = () => {

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-50 dark:bg-gray-900">
            <svg
                className="animate-bounce h-24 w-24 text-green-500 mb-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
            >
                <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm-3.293-7.293a1 1 0 111.414-1.414L9 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-2-2z"
                    clipRule="evenodd"
                />
            </svg>
            <h1 className="text-2xl font-semibold mb-2 dark:text-gray-50">Your record is verified!</h1>
            <p className="text-gray-600 text-center mb-6 dark:text-gray-50">
                Congratulations! Your document has been successfully verified.
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
