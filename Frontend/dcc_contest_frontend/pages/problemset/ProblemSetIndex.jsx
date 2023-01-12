import axios from "axios";
import React, { useEffect } from "react";
import ProblemRow from "../../components/problemRow";

function ProblemSetIndex() {
  const [problems, setProblems] = React.useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/question").then((res) => {
      console.log(res.data);
      setProblems(res.data);
    });
  }, []);

  return (
    <>
      <div className="text-3xl m-4 flex w-full items-center justify-center">
        Problem Set
      </div>
      <div className="flex flex-col w-full px-16 mt-10 text-lg">
        {problems.map((problem) => (
          <ProblemRow props={{name:problem.name,ques_no:problem.ques_no,topics:problem.topics}}/>
        ))}
      </div>
    </>
  );
}

export default ProblemSetIndex;
