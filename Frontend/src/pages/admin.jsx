import React, { useState } from "react";
import Aside from "../components/Aside";
import AdminHeader from "../components/AdminHeader";
import ShowContact from "../components/ShowContact";
function Admin() {
  const data = JSON.parse(localStorage.getItem("data"));
  console.log(data);
  return (
    <div className="flex">
      {}
      <Aside />
      <div className="w-full flex flex-col h-screen overflow-y-hidden">
        <AdminHeader />
        <ShowContact />
      </div>
    </div>
  );
}

export default Admin;
