import React from "react";
import Aside from "../components/Aside";
import AdminHeader from "../components/AdminHeader";
import DispatchRegister from "../components/DispatchRegister";
function Register() {
  return (
    <div className="flex">
      <Aside />
      <div className="w-full flex flex-col h-screen overflow-y-hidden">
        <AdminHeader />
        <DispatchRegister />
      </div>
    </div>
  );
}

export default Register;
