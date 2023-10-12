import Link from "next/link";
import React, { useState } from "react";
import { flushSync } from "react-dom";
import { problemSet, problemDescription } from "../../utils/fakeData/data";

function getDay() {
  const startingDay = 10;
  const today = new Date();
  const dayNumber = today.getDate();
  const day = dayNumber - startingDay;

  return day;
}
export default function ProblemTable(props) {
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [disabled, setDisable] = useState(false);
  const day = getDay();

  console.log("Day number " + day);
  const handleViewClick = (problem) => {
    setSelectedProblem(problem);
  };

  return (
    <div>
      <table className="table w-full custom-table mx-auto">
        <thead>
          <tr>
            <th></th>
            <th>Day</th>

            {props.tabActive === "Problem" ? <th>Name</th> : <th>Topic</th>}
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {problemDescription && problemDescription.length != 0 ? (
            problemDescription.map((problem) => (
              <tr key={problem.day} className="hover cursor-pointer">
                {problem.status ? (
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
                <td>Day {problem.day}</td>
                {props.tabActive === "Problem" ? (
                  <td>{problem.name}</td>
                ) : day >= problem.day ? (
                  <td>{problem.topic}</td>
                ) : (
                  <td>
                    <span className="text-2xl">🔒</span>
                  </td>
                )}
                <td>
                  {props.tabActive === "Problem" ? (
                    <Link
                      href={
                        problem.day <= day ? `/problems/${problem.ques_id}` : ``
                      }
                      target={problem.day <= day ? "_blank" : ""}
                      disabled={problem.day > day}
                    >
                      <button
                        className={`btn ${
                          problem.day < day
                            ? "bg-slate-600 border-none hover:bg-black hover:text-white"
                            : "hover:bg-blue-800"
                        } btn-info w-40 min-h-8 h-8`}
                        disabled={problem.day > day}
                      >
                        {problem.status ? "Solve Again" : "Solve"}
                      </button>
                    </Link>
                  ) : (
                    <>
                      {day >= problem.day ? (
                        <div className="shadow-xl">
                          <label
                            htmlFor="my_modal_7"
                            className="btn  btn-outline btn-info w-40 min-h-8 h-8"
                            onClick={() => handleViewClick(problem)}
                          >
                            view
                          </label>

                          <input
                            type="checkbox"
                            id="my_modal_7"
                            className="modal-toggle"
                          />
                          <div className="modal">
                            <div className="modal-box bg-stone-700 overflow-x-hidden flex flex-col rounded-md">
                              <div className="flex w-full items-center">
                                <div className="text-lg font-bold flex-grow">
                                  {selectedProblem?.topic}
                                </div>
                                <label
                                  className="modal-backdrop bg-stone-600 px-4 py-1 rounded-md hover:bg-white hover:text-black"
                                  htmlFor="my_modal_7"
                                >
                                  Close
                                </label>
                              </div>

                              <i className="py-4 whitespace-normal overflow-auto">
                                {selectedProblem?.description}
                              </i>
                              <div className="flex justify-between">
                                <a
                                  className="btn  btn-outline btn-info w-40 min-h-8 h-8"
                                  href={problem.resourceURL}
                                  target="_blank"
                                >
                                  Visit Topic
                                </a>
                                <a
                                  className="btn  btn-outline btn-info w-40 min-h-8 h-8"
                                  href={problem.codeforcesURL}
                                  target="_blank"
                                >
                                  Solve Problem
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <h2>🔑</h2>
                      )}
                    </>
                  )}
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
