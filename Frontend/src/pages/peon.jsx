import React from "react";
import Aside from "../components/Aside";
import AdminHeader from "../components/AdminHeader";
import PeonBook from "../components/PeonBook";
function Peon() {
  return (
    <div className="flex">
      <Aside />
      <div className="w-full flex flex-col h-screen overflow-y-hidden">
        <AdminHeader />
        <PeonBook />
      </div>
    </div>
  );
}

export default Peon;
