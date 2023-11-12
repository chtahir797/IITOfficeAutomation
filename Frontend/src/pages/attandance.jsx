import React, { useState } from "react";
import Aside from "../components/Aside";
import AdminHeader from "../components/AdminHeader";

import UserAttendance from "../components/UserAttendance"

function Attandance() {
  return (
    <div className="flex">
      <Aside />
      <div className="w-full flex flex-col h-screen overflow-y-hidden">
        <AdminHeader />
        <UserAttendance />
      </div>
    </div>
  );
}

export default Attandance;
