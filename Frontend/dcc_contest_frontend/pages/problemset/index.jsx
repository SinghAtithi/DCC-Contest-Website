import React from "react";
import Navbar from "../../components/Navbar";
import ProblemSet from "./ProblemSet";
import Head from "next/head";
import TheFooter from "../../components/Footer";

function ProblemSetPage() {
  return (
    <>
      <Head><title>DCC : Problems</title></Head>
      <Navbar />
      <div className="content-area-top p-2">
        <ProblemSet />
      </div>
      <TheFooter />
    </>
  );
}

export default ProblemSetPage;
