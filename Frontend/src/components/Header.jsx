// import React from "react";
// import { Link } from "react-router-dom";

// function Header() {
//   return (
//     <div>
//       <header className="fixed w-full shadow-lg">
//         <nav className="bg-white border-gray-200 py-2.5 dark:bg-gray-900">
//           <div className="flex flex-wrap items-center justify-between max-w-screen-2xl px-4 mx-auto">
//             <div className="w-full md:w-auto flex items-center justify-center md:justify-start">
//               <Link to={"/"} className="flex items-center">
//                 <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
//                   IIT Office
//                 </span>
//               </Link>
//             </div>
//             <div className="flex items-center lg:order-2 flex-wrap lg:flex-no-wrap">
//               <Link
//                 to="/complaintform"
//                 className="text-gray-900 border border-gray-200 hover:bg-gray-200 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-xs sm:text-sm px-1.5 py-1 sm:px-2 lg:px-3 lg:py-1.5 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
//               >
//                 Complaint Us
//               </Link>
//               <span className="mx-2">|</span>
//               <Link
//                 to="/contactus"
//                 className="text-gray-900 border border-gray-200 hover:bg-gray-200 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-xs sm:text-sm px-1.5 py-1 sm:px-2 lg:px-3 lg:py-1.5 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
//               >
//                 Contact Us
//               </Link>
//               <span className="mx-2">|</span>
//               <Link
//                 to="/aboutus"
//                 className="text-gray-900 border border-gray-200 hover:bg-gray-200 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-xs sm:text-sm px-1.5 py-1 sm:px-2 lg:px-3 lg:py-1.5 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
//               >
//                 About Us
//               </Link>
//               <span className="mx-2">|</span>
//               <Link
//                 to="/login"
//                 className="text-white bg-blue-700 hover:bg-blue-700 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 sm:mr-2 lg:mr-0 dark:bg-purple-600 dark:hover:bg-purple-700 focus:outline-none dark:focus:ring-purple-800"
//               >
//                 Login Now
//               </Link>
//             </div>
//           </div>
//         </nav>
//       </header>
//     </div>
//   );
// }

// export default Header;

import React, { useState } from "react";
import { Link } from "react-router-dom";

function Header() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div>
      <header className="fixed w-full shadow-lg">
        <nav className="bg-white border-gray-200 py-2.5 dark:bg-gray-900">
          <div className="flex flex-wrap items-center justify-between max-w-screen-2xl px-4 mx-auto">
            <div className="w-full md:w-auto flex items-center justify-between">
              <Link to={"/"} className="flex items-center">
                <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                  IIT Office
                </span>
              </Link>
              <div className="lg:hidden">
                <button
                  onClick={toggleMobileMenu}
                  className="text-gray-900 dark:text-white p-2 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-400"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="h-6 w-6 transform rotate-90"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
            {/* Show buttons on larger screens */}
            <div className="hidden lg:flex lg:items-center lg:order-2 flex-wrap lg:flex-no-wrap">
              <Link
                to="/complaintform"
                className="text-gray-900 border-b border-gray-200 hover:bg-gray-200 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-4 py-2 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
              >
                Complaint Us
              </Link>
              <span className="mx-2">|</span>
              <Link
                to="/contactus"
                className="text-gray-900 border-b border-gray-200 hover:bg-gray-200 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-4 py-2 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
              >
                Contact Us
              </Link>
              <span className="mx-2">|</span>
              <Link
                to="/aboutus"
                className="text-gray-900 border-b border-gray-200 hover:bg-gray-200 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-4 py-2 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
              >
                About Us
              </Link>
              <span className="mx-2">|</span>
              <Link
                to="/login"
                className="text-white bg-blue-700 hover:bg-blue-700 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-purple-600 dark:hover:bg-purple-700 focus:outline-none dark:focus:ring-purple-800"
              >
                Login Now
              </Link>
            </div>
            {/* Show hamburger menu on mobile and tablet devices */}
            <div
              className={`${
                isMobileMenuOpen ? "block" : "hidden"
              } lg:hidden mt-4`}
            >
              <Link
                to="/complaintform"
                className="block text-gray-900 border-b border-gray-200 hover:bg-gray-200 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-4 py-2 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
              >
                Complaint Us
              </Link>
              <span className="mx-1"></span>
              <Link
                to="/contactus"
                className="block text-gray-900 border-b border-gray-200 hover:bg-gray-200 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-4 py-2 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
              >
                Contact Us
              </Link>
              <span className="mx-1"></span>
              <Link
                to="/aboutus"
                className="block text-gray-900 border-b border-gray-200 hover:bg-gray-200 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-4 py-2 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
              >
                About Us
              </Link>
              <span className="mx-1"></span>
              <Link
                to="/login"
                className="block text-white bg-blue-700 hover:bg-blue-700 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-4 py-2 mt-2 dark:bg-purple-600 dark:hover:bg-purple-700 focus:outline-none dark:focus:ring-purple-800"
              >
                Login Now
              </Link>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}

export default Header;



