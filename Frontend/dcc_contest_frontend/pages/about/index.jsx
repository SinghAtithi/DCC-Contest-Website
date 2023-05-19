import React from "react";
import Navbar from "../../components/Navbar";
import ThreePicAbout from "./ThreePicAbout";
import Ritik from "./Ritik";
import Atithi from "./Atithi";
import Stats from "./Stats";

function About() {
  return (
    <div className="main-nav-content-area bg-white dark:bg-gray-900 pt-16">
      <Navbar />
      <ThreePicAbout />
      <Ritik />
      <Atithi />
      {/* <Stats /> */}
    </div>
  );
}

export default About;
