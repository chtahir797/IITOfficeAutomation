import React from "react";
import { Link, NavLink } from "react-router-dom";

function Aside() {
  return (
    <aside className="relative bg-sidebar h-screen w-64 shadow-xl lg:block">
      <div className="p-6">
        <NavLink
          to="/admin"
          exact
          className="text-white text-3xl font-semibold uppercase hover:text-gray-300"
        >
          Admin
        </NavLink>
      </div>
      <nav className="text-white text-base font-semibold pt-3">
        <NavLink
          to="/admin"
          className={({ isActive, isPending }) =>
            `flex items-center text-white py-4 pl-6 nav-item ${
              isActive ? "active-nav-link" : ""
            }`
          }
        >
          <i className="fas fa-tachometer-alt mr-3"></i>
          Dashboard
        </NavLink>
        <NavLink
          to="/users"
          activeClassName=""
          className={({ isActive, isPending }) =>
            `flex items-center text-white py-4 pl-6 nav-item ${
              isActive ? "active-nav-link" : ""
            }`
          }
        >
          <i className="fas fa-sticky-note mr-3"></i>
          Users
        </NavLink>
        <NavLink
          to="/register"
          className={({ isActive, isPending }) =>
            `flex items-center text-white py-4 pl-6 nav-item ${
              isActive ? "active-nav-link" : ""
            }`
          }
        >
          <i className="fas fa-table mr-3"></i>
          Dispatch Register
        </NavLink>
        <NavLink
          to="/peon"
          className={({ isActive, isPending }) =>
            `flex items-center text-white py-4 pl-6 nav-item ${
              isActive ? "active-nav-link" : ""
            }`
          }
        >
          <i className="fas fa-align-left mr-3"></i>
          Peon Book
        </NavLink>
        <NavLink
          to="/complaints"
          className={({ isActive, isPending }) =>
            `flex items-center text-white py-4 pl-6 nav-item ${
              isActive ? "active-nav-link" : ""
            }`
          }
        >
          <i className="fas fa-tablet-alt mr-3"></i>
          Complaints
        </NavLink>
        <NavLink
          to="/allattandance"
          className={({ isActive, isPending }) =>
            `flex items-center text-white py-4 pl-6 nav-item ${
              isActive ? "active-nav-link" : ""
            }`
          }
        >
          <i className="fas fa-tablet-alt mr-3"></i>
          Attandance
        </NavLink>
        <NavLink
          to="/seeattandance"
          className={({ isActive, isPending }) =>
            `flex items-center text-white py-4 pl-6 nav-item ${
              isActive ? "active-nav-link" : ""
            }`
          }
        >
          <i className="fas fa-tablet-alt mr-3"></i>
          See Attendance
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
  );
}

export default Aside;