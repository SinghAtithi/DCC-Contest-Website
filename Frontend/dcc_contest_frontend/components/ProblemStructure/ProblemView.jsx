import Link from "next/link";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { flushSync } from "react-dom";
import { problemSet, problemDescription } from "../../utils/fakeData/data";
import { useSelector } from "react-redux";
import { progressBar } from "../../utils/helper/apiIntegration";

function getDay() {
  const target = new Date(2023, 9, 17);
  const todayIstMil =
    new Date().getTime() ;
  const todayIst = new Date(todayIstMil);
  const diff = Math.floor((todayIst - target) / (1000 * 60 * 60 * 24));
  // console.log(diff);
  return diff;
}
export default function ProblemTable(props) {
  const day = getDay();
  console.log(props.problems);
  return (
    <div className="mb-5">
      <table className="table w-full custom-table">
        <thead>
          <tr>
            <th></th>
            <th className="pl-[120px]">Day</th>

            {props.tabActive !== "Problem" ? (
              <th className="pr-[120px]">Name</th>
            ) : (
              <th>Topic</th>
            )}
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {props.problems && props.problems.length != 0 ? (
            props.problems?.map((problem, index) => (
              <tr key={problem.day} className="hover cursor-pointer">
                {props.binaryStringProblem[index + 1] == "1" ? (
                  <th className="flex items-center justify-center">
                    <td>
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
                    </td>
                  </th>
                ) : (
                  <th className="flex items-center justify-center">
                    <td>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="red"
                        className="bi bi-x-square ml-1"
                        viewBox="0 0 16 16"
                      >
                        <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                      </svg>
                    </td>
                  </th>
                )}
                <td>
                  <div className="pl-[100px]">Day {problem.day}</div>
                </td>

                <td>
                  <div className="flex items-center justify-center pr-[100px]">
                    {problem.name}
                  </div>
                </td>

                <td>
                  <div className="pr-[20]">
                    <Link
                      href={
                        // problem.day <= day ? `/problems/${problem.ques_id}` : ``
                        problem.day <= day ? `/cooking` : ``
                      }
                      target={problem.day <= day ? "_blank" : ""}
                      disabled={problem.day > day}
                    >
                      <button
                        className={`btn ${problem.day < day
                          ? "bg-slate-600 border-none hover:bg-black hover:text-white"
                          : "hover:bg-blue-800"
                          } btn-info w-40 min-h-8 h-8`}
                        disabled={problem.day > day}
                      >
                        {problem.status ? "Solve Again" : "Solve"}
                      </button>
                    </Link>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <th>-</th>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
