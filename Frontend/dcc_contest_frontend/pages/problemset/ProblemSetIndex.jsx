import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import ProblemRow from "../../components/problemRow";

function ProblemSetIndex() {
  const [problems, setProblems] = React.useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    axios.get(`http://localhost:5000/question`).then((res) => {
      console.log(res.data);
      setTotalPages(Math.ceil(res.data.length / 10));
      setProblems(res.data);
    });
  }, []);

  return (
    <div className="mx-20">
      <div className="text-3xl m-4 flex items-center justify-center font-mono">
        Problem Set
      </div>
      {/* Heading of the problems page */}
      <div className="bg-green-500/50 shadow-lg shadow-green-500/50 grid grid-cols-7 gap-4 text-lg font-serif text-slate-50  py-2 my-2 border-b-2 border-slate-500">
        <div className="px-6">Status</div>
        <div className="px-6 text-left">Question No</div>
        <div className="col-span-3 px-6">Question Name</div>
        <div className="px-6">Topics</div>
        <div className="px-6">Actions</div>
      </div>

      {/* Question data */}
      {problems.slice((page - 1) * 10, page * 10).map((problem) => (
        <ProblemRow
          props={{
            name: problem.name,
            ques_no: problem.ques_no,
            topics: problem.topics,
            ques_status: "False",
          }}
        />
      ))}
      <div className="my-4 flex justify-center">
        <button
          className={`btn mx-1`}
          onClick={() => setPage(Math.max(0, page - 1))}
        >
          Prev
        </button>
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (num) => (
            <button
              className={`btn btn-success mx-1 ${
                num == page ? "btn-outline" : ""
              }`}
              onClick={() => setPage(num)}
            >
              {num}
            </button>
          )
        )}
        <button
          className={`btn mx-1`}
          onClick={() => setPage(Math.min(totalPages, page + 1))}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default ProblemSetIndex;
