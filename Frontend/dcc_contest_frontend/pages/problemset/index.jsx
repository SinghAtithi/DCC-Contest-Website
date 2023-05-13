import React from "react";
import Navbar from "../../components/Navbar";
import ProblemSet from "./ProblemSet";

function ProblemSetPage() {
  return (
    <>
      <Navbar />
      <div className="content-area-top">
        <ProblemSet />
      </div>
    </>
  );
}

export default ProblemSetPage;
