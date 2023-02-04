import axios from "axios";
import React, { useEffect } from "react";
import ProblemRow from "../../components/problemRow";

function ProblemSetIndex() {
  const [problems, setProblems] = React.useState([]);

  useEffect(() => {
    let page_no = 1;
    try{
      page_no = +(window.location.href.split("?page=")[1]);
    }
    catch{}
    axios.get(`http://localhost:5000/question?page=${page_no}`).then((res) => {
      console.log(res.data);
      setProblems(res.data);
    });
  }, []);

  return (
    <div className="mx-20">
      <div className="text-3xl m-4 flex items-center justify-center font-mono">
        Problem Set
      </div>
      {/* Heading of the problems page */}
      <div className="bg-green-500/50 shadow-lg shadow-green-500/50 grid grid-cols-7 gap-4 text-lg font-serif text-slate-50 py-2 my-2 border-b-2 border-slate-500">
        <div className="px-6">Status</div>
        <div className="px-6 text-left">Question No</div>
        <div className="col-span-3 px-6">Question Name</div>
        <div className="px-6">Topics</div>
        <div className="px-6">Actions</div>
      </div>

      {/* Question data */}
      {problems.map((problem) => (
        <ProblemRow props={{ name: problem.name, ques_no: problem.ques_no, topics: problem.topics, ques_status:"False"}} />
      ))}
    </div>
  );
}

export default ProblemSetIndex;
