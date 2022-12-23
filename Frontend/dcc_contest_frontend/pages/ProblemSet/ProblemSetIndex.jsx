import axios from "axios";
import Link from "next/link";
import React, { useEffect } from "react";

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
          <div className="border flex justify-between items-center h-22 py-4 border-gray-500">
            <div className="flex flex-col px-6  ">{problem.name}</div>
            <div className="flex flex-col px-6  max-w-sm  ">{problem.name}</div>
            <div className="flex flex-col px-6  max-w-sm  ">{problem.name}</div>
            <Link href={`/problems/${problem.ques_no}`} target= "_blank">
              <div className="flex flex-col px-6  max-w-sm  ">
                <button className="btn btn-outline btn-success w-40">
                  Solve{" "}
                </button>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}

export default ProblemSetIndex;
