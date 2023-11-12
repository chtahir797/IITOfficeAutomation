import React from "react";

function HowSection() {
  return (
    <div>
      <section className="bg-white dark:bg-gray-900">
        <div className="max-w-screen-2xl px-4 py-8 mx-auto lg:py-24 lg:px-6">
          <div className="max-w-screen-md mx-auto mb-8 text-center lg:mb-12">
            <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
              How it works
            </h2>
          </div>
          <div className="flex justify-center">
          <div className="space-y-8 lg:grid lg:grid-cols-4 sm:gap-6 xl:gap-10 lg:space-y-0 ">
            <div className="flex flex-col max-w-lg p-6   text-gray-900 bg-white border-4 border-orange-400 rounded-lg shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
              <h3 className="mb-4 text-2xl font-semibold text-orange-400">
                STUDENT QUERY REGISTRATION
              </h3>
              
              <ul role="list" className="mb-8 space-y-4 text-left">
                <li className="flex  space-x-3">
                  
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-orange-400 dark:text-orange-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span>
                    Student having query can contact us and attach the relevant file about their query and submit. 
                    
                  </span>
                </li>

              </ul>
            </div>
            <div className="flex flex-col max-w-lg p-6   text-gray-900 bg-white border-4 border-red-500 rounded-lg shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
              <h3 className="mb-4 text-2xl font-semibold text-red-500">
                COMPLAINT REGISTRATION
              </h3>

              
              <ul role="list" className="mb-8 space-y-4 text-left">
                <li className="flex  space-x-3">
                  
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-red-500 dark:text-red-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span>
                    Any Student who want to complaint about any issue but want to hide his/her identity can complaint easily by clicking on Complaint Us button. 
                  </span>
                </li>
              </ul>
            </div>
            <div className="flex flex-col max-w-lg p-6   text-gray-900 bg-white border-4 border-blue-600 rounded-lg shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
              <h3 className="mb-4 text-2xl font-semibold text-blue-600 ">
                COMPLAINT MONITORING
              </h3>

              
              <ul role="list" className="mb-8 space-y-4 text-left">
                <li className="flex  space-x-3">
                 
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-blue-600  dark:text-blue-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span>
                    An ID will be generated after submitting the complaint save this id and come back 
                    to check the complaint status with the help of ID.
                  </span>
                </li>
              </ul>
            </div>
            <div className="flex flex-col max-w-lg p-6   text-gray-900 bg-white border-4 border-green-600 rounded-lg shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
              <h3 className="mb-4 text-2xl font-semibold text-green-600">
              STUDENT QUERY FEEDBACK
              </h3>

              
              <ul role="list" className="mb-8 space-y-4 text-left">
                <li className="flex  space-x-3">
                  
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-green-600 dark:text-green-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span>
                    Student will keep checking their mail they will get reply after the 4 to 5 working days.
                  </span>
                </li>
              </ul>
            </div>
            </div>



          </div>
        </div>
      </section>
    </div>
  );
}

export default HowSection;
