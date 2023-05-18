import Link from "next/link";
import React from "react";

function ProblemTable(props) {

  return (
    <div className="overflow-x-auto">
      <table className="table w-full custom-table">
        <thead>
          <tr>
            <th></th>
            <th>Problem</th>
            <th>Points</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {props.problems && props.problems.lemgth != 0 && props.problems.map((problem) => (
            <tr key={problem.ques_id} className="hover cursor-pointer">
              {props.solved.includes(problem.ques_id) ? (
                <th>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="green"
                    className="bi bi-check-circle"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                    <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z" />
                  </svg>
                </th>
              ) : (
                <th>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="red"
                    className="bi bi-x-square"
                    viewBox="0 0 16 16"
                  >
                    <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                  </svg>
                </th>
              )}
              <td>{problem.ques_id}</td>
              <td>{problem.points}</td>
              <td>
                <Link href={`/contest/${props.cid}/${problem.ques_id}`} target="_blank">
                  <button className="btn btn-outline btn-info w-40 min-h-8 h-8">
                    {props.solved.includes(problem.ques_id) ? "Solve Again" : "Solve"}
                  </button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProblemTable;
