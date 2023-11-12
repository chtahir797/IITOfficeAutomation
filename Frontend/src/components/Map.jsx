import React from "react";
import { Link } from "react-router-dom";

export function MapAndContact() {
  return (
    <div className="MapAndContact bg-white dark:bg-gray-800 max-w-screen-2xl p-4 md:p-8 lg:p-16">
      <div className="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="links grid grid-cols-1 gap-4 mt-11">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">IIT OFFICE</h1>
            <div className="font-light text-gray-500 lg:mt-8 md:text-lg lg:text-xl dark:text-gray-400">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim saepe fugit laboriosam? Vel maxime beatae veritatis animi laudantium temporibus vero dicta, consectetur minus, dolorum reprehenderit enim a. Nobis, unde possimus!
            </div>
            <div className="items-center lg:order-2 mt-11">
              <Link
                to="/complaintform"
                className="text-white bg-blue-700 hover:bg-blue-700 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 sm:mr-2 lg:mr-0 dark:bg-purple-600 dark:hover:bg-purple-700 focus:outline-none dark:focus:ring-purple-800"
              >
                Complaint Us
              </Link>
            </div>
          </div>
        </div>
        <div className="map rounded-lg overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1658.7580482009696!2d73.13493425436992!3d33.74732708687115!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38dfc11d79bc2ae7%3A0xd2061cac532b2da0!2sInstitute%20of%20Information%20Technology%20QAU!5e0!3m2!1sen!2s!4v1681114566597!5m2!1sen!2s"
            width="100%"
            height="300"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="my-6"
            style={{ borderRadius: "5%" }}
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export function Copyright() {
  return (
    <div className=" ">
      <hr className="border-gray-200 sm:mx-auto dark:border-gray-700" />
      <div className="MapAndContact bg-white dark:bg-gray-800 max-w-screen-2xl p-4 md:p-8 flex flex-col sm:flex-row justify-between items-center">
        <div className="mb-4 sm:mb-0">
          <Link
            to={"/"}
            className="text-2xl font-semibold text-gray-900 dark:text-white"
          >
            IIT OFFICE
          </Link>
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          © Copyright 2023. All Rights Reserved.
        </div>
      </div>
    </div>
  );
}
