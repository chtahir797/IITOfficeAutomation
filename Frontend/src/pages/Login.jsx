import React from "react";
import LoginComponent from "../components/LoginComponent";
import Header from "../components/Header";
import { Copyright } from "../components/Map";
function Login() {
  return (
    <>
      <Header />
      <LoginComponent />
      <Copyright />
    </>
  );
}

export default Login;
