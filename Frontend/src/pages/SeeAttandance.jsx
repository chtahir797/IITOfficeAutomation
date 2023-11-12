import React, { useState } from "react";
import Aside from "../components/Aside";
import AdminHeader from "../components/AdminHeader";
import ShowAttendance from "../components/ShowAttendance"

function SeeAttandance() {
  return (
    <div className="flex">
      <Aside />
      <div className="w-full flex flex-col h-screen overflow-y-hidden">
        <AdminHeader />
        <ShowAttendance />
      </div>
    </div>
  );
}

export default SeeAttandance;
