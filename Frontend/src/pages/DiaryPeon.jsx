import React, { useState } from "react";
import AdminHeader from "../components/AdminHeader";
import { NavLink } from "react-router-dom";
import PeonBook from "../components/PeonBook";

function PeonRegister() {
  return (
    <div className="flex">
      <aside className="relative bg-sidebar h-screen w-64 hidden sm:block shadow-xl">
        <div className="p-6">
          <NavLink
            to="/diarymanager"
            exact
            className="text-white text-3xl font-semibold uppercase hover:text-gray-300 "
          >
            Diary Manager
          </NavLink>
        </div>
        <nav className="text-white text-base font-semibold pt-3">
          <NavLink
            to="/dispatchRegister"
            className={({ isActive, isPending }) =>
              `flex items-center text-white py-4 pl-6 nav-item ${
                isActive ? "active-nav-link" : ""
              }`
            }
          >
            <i className="fas fa-tachometer-alt mr-3"></i>
            Dispatch Register
          </NavLink>
          <NavLink
            to="/peonBook"
            className={({ isActive, isPending }) =>
              `flex items-center text-white py-4 pl-6 nav-item ${
                isActive ? "active-nav-link" : ""
              }`
            }
          >
            <i className="fas fa-tachometer-alt mr-3"></i>
            Peon Book
          </NavLink>
          <NavLink
            to="/logout"
            className={({ isActive, isPending }) =>
              `flex items-center text-white py-4 pl-6 nav-item ${
                isActive ? "active-nav-link" : ""
              }`
            }
          >
            <i className="fas fa-tablet-alt mr-3"></i>
            Logout
          </NavLink>
        </nav>
      </aside>
      <div className="w-full flex flex-col h-screen overflow-y-hidden">
        <AdminHeader />
        <PeonBook />
      </div>
    </div>
  );
}

export default PeonRegister;
