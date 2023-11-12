import React from "react";
import Header from "../components/Header";
import Banner from "../components/Banner";
import HowSection from "../components/HowSection";
// import Footer from "../components/Footer";
import {MapAndContact, Copyright} from "../components/Map"

function Home() {
  return (
    <>
      <Header />
      <Banner />
      <HowSection />
      <MapAndContact />
      <Copyright/>
    </>
  );
}

export default Home;
