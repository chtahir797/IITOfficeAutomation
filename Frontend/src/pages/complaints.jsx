import React from "react";
import Aside from "../components/Aside";
import AdminHeader from "../components/AdminHeader";
import Complaint from "../components/Complaint";
function Complaints() {
  return (
    <div className="flex">
      <Aside />
      <div className="w-full flex flex-col h-screen overflow-y-hidden">
        <AdminHeader />
        <Complaint />
      </div>
    </div>
  );
}

export default Complaints;
