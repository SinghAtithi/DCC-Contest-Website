import React from "react";
import Navbar from "../../components/Navbar";
import ThreePicAbout from "../../components/about/ThreePicAbout";
import Atithi from "../../components/about/Atithi";
import Ritik from "../../components/about/Ritik";
import Head from "next/head";

function About() {
  return (
    <div className="main-nav-content-area bg-white dark:bg-gray-900 pt-16">
      <Head><title>DCC : About</title></Head>
      <Navbar />
      <ThreePicAbout />
      <Ritik />
      <Atithi />
    </div>
  );
}

export default About;
