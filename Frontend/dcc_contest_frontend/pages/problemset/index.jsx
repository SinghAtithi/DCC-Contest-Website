import React from "react";
import Navbar from "../../components/Navbar";
import ProblemSet from "./ProblemSet";

function ProblemSetPage() {
  return (
    <>
      // @refresh reset
      <Navbar />
      <div className="content-area-top p-2">
        <ProblemSet />
      </div>
    </>
  );
}

export default ProblemSetPage;
