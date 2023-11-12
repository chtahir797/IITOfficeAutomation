import React from "react";
import Aside from "../components/Aside";
import AdminHeader from "../components/AdminHeader";
import AllUser from "../components/AllUser";
function Users() {
  return (
    <div className="flex">
      <Aside />
      <div className="w-full flex flex-col h-screen overflow-y-hidden">
        <AdminHeader />
        <AllUser />
      </div>
    </div>
  );
}

export default Users;
