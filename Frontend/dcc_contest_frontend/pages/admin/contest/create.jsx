import axios from "axios";
import React, { useState, useEffect, Children } from "react";
import TextArea from "../../../components/TextArea";
import { FcSearch } from "react-icons/fc";
import { AiOutlineClose } from "react-icons/ai";
import Head from "next/head";
import moment from "moment";
import SideNav from "../../../components/SideNavAdmin";
import {
  AdminSideNavMap,
  ADMIN,
  SUPER_ADMIN,
  END_USER,
  LOGIN_PAGE,
  BASE_URL,
  CREATE_CONTEST_ENDPOINT_BACKEND,
  UPDATE_CONTEST_ENDPOINT_BACKEND,
  SEARCH_CONTESTS_ENDPOINT_BACKEND,
  PRE_FETCH_COLLABORATORS_AND_QUESTION_ENDPOINT_BACKEND,
} from "../../../utils/constants";
import { useSelector } from "react-redux";
import checkToken from "../../../utils/checkToken";
import { useRouter } from "next/router";
import CreateContestSkeleton from "../../../components/skeleton/CreateContestSkeleton";


const toastCross = {
  position: "absolute",
  top: "2px",
  right: "2px",
};

function CreateProblem() {
  const { role, loggedIn } = useSelector((state) => state.login);
  const router = useRouter();
  const [contest_name, setcontest_name] = useState("");

  const [contest_id, setcontest_id] = useState("");
  const [contest_idError, setcontest_idError] = useState(null);

  const [ques_ids, setQues_ids] = useState([]);

  const [start_time, setstart_time] = useState("");
  const [start_timeError, setstart_timeError] = useState(null);

  const [end_time, setend_time] = useState("");
  const [end_timeError, setend_timeError] = useState(null);

  const [timeError, setTimeError] = useState(null);

  const [collaborators, setCollaborators] = useState([]);
  const [is_draft, setIsDraft] = useState(false);

  const [filteredSearchedQuesId, setFilteredSearchedQuesId] = useState([]); // this stores the ques ids from the search list which is filered based on question search string
  const [questionSearchString, setQuestionSearchString] = useState(""); // String based on which filter will happen
  const [questionSearchedList, setQuestionSearchedList] = useState([]); // List of all probable questions that can be added in contest.

  const [filteredSearchedCollaborators, setFilteredSearchedCollaborators] = useState([]); // this stores the username from the search list which is filered based on collaborator search string
  const [collaboratorsSearchString, setCollaboratorsSearchString] = useState(""); // String based on which filter will happen
  const [collaboratorsSearchedList, setCollaboratorsSearchedList] = useState([]); // List of all probable collaborators that can be added in contest.

  const [toastActive, setToastActive] = useState(false);
  const [toastMessage, setToastMessage] = useState([]);
  const [toastClass, setToastClass] = useState(
    "alert alert-error relative"
  );

  const [loadingButton, setLoadingButton] = useState("");
  const [loadingSkeleton, setLoadingSkeleton] = useState(true);
  const [disableContestID, setDisableContestID] = useState(false);
  const [disableContestName, setDisableContestName] = useState(false);


  // Function to set the state with the fetched contest details when in edit mode
  function setContestForEdit(contest_id) {
    const url = BASE_URL + SEARCH_CONTESTS_ENDPOINT_BACKEND;
    const body = {
      searchFilter: 1,
      searchString: contest_id,
    };

    const options = {
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
    };
    axios
      .post(url, body, options)
      .then((result) => {
        const data = result.data.data;
        if (data.length === 0) {
          setToastMessage([`Contest with ID ${contest_id} does not exist.`]);
          setToastActive(true);
          setLoadingSkeleton(false);
        }
        else {
          setDisableContestID(true);
          setDisableContestName(true);

          setcontest_id(data[0].contest_id);
          setcontest_name(data[0].contest_name);
          setQues_ids(data[0].ques_ids);
          setCollaborators(data[0].collaborators);
          setstart_time(data[0].start_time);
          setend_time(data[0].end_time);

          setLoadingSkeleton(false);
        }
      })
      .catch((err) => {
        setToastClass("alert alert-error relative");
        setToastMessage([`Something went wrong.`]);
        setToastActive(true);
        setLoadingSkeleton(false);
      });

  }

  async function preFetchCollaboartorsAndQuestion() {
    const url = BASE_URL + PRE_FETCH_COLLABORATORS_AND_QUESTION_ENDPOINT_BACKEND;
    const options = {
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
    };
    axios.get(url, options).then((result) => {

      if (result.data.ques_ids.length !== 0) setQuestionSearchedList(result.data.ques_ids.map((ques, i) => ques.ques_id));
      if (result.data.collaborators.length !== 0) setCollaboratorsSearchedList(result.data.collaborators.map((user, i) => user.username));
    }).catch((error) => {
      console.log(error);
    })
  }


  // useEffect that will be run when page reloads.
  useEffect(() => {
    if (router.isReady) {
      if (loggedIn && (role === ADMIN || role === SUPER_ADMIN)) {
        if (router.query["edit"]) {
          setContestForEdit(router.query["edit"]);
        }
        else setLoadingSkeleton(false);

        // Get probable ques ids and collaborators
        preFetchCollaboartorsAndQuestion();

      }

      else if (loggedIn && role === END_USER) router.push(`/${username}`);
      else {
        checkToken().then((status) => {
          if (status.verified) {
            if (status.role === ADMIN || status.role === SUPER_ADMIN) {
              if (router.query["edit"]) {
                setContestForEdit(router.query["edit"]);
              }
              else setLoadingSkeleton(false);

              // Get probable ques ids and collaborators
              preFetchCollaboartorsAndQuestion();


            } else router.push(`/${username}`);
          } else {
            if (router.query["edit"]) {
              router.push(LOGIN_PAGE + `?next=admin/contest/create?edit=${router.query["edit"]}`);
            }
            else router.push(LOGIN_PAGE + "?next=admin/contest/create");
          }
        });
      }
    }

  }, [router.isReady]);


  // useEffect that will set the questionSearchedList - list of questions available for adding in the contest.
  useEffect(() => {
    if (questionSearchString == "") {
      // If the question search string is empty, set the filtered searched question IDs to an empty array.
      setFilteredSearchedQuesId([]);
    } else {
      // If the question search string is not empty, perform filtering based on the search criteria.
      setFilteredSearchedQuesId(
        questionSearchedList.filter((id) => {
          const notToBeIncluded = new Set(ques_ids.map((ques_obj) => ques_obj.ques_id));
          // Create a Set of question IDs that should not be included in the filtered results.

          if (!notToBeIncluded.has(id)) {
            // If the id is not present in the 'notToBeIncluded' set,
            // return true if the ID includes the question search string (case-insensitive match).
            return id.toLowerCase().includes(questionSearchString.toLowerCase());
          }
        })
      );
    }
  }, [questionSearchString]);


  // useEffect that will set the collaboratorsSearchedList - list of collaborators available for adding in the contest.
  useEffect(() => {
    if (collaboratorsSearchString == "") {
      // If the collaborators search string is empty,
      // set the filtered searched collaborators list to an empty array.
      setFilteredSearchedCollaborators([]);
    } else {
      // If the collaborators search string is not empty, perform filtering based on the search criteria.
      setFilteredSearchedCollaborators(
        collaboratorsSearchedList.filter((id) => {
          const notToBeIncluded = new Set(collaborators);
          // Create a Set of collaborators that should not be included in the filtered results.

          if (!notToBeIncluded.has(id)) {
            // If the collaborator is not present in the 'notToBeIncluded' Set,
            // return true if the collaborator ID includes the collaborators search string (case-insensitive match).
            return id.toLowerCase().includes(collaboratorsSearchString.toLowerCase());
          }
        })
      );
    }

  }, [collaboratorsSearchString]);


  // useEffect to check if contest id is containing space or not 
  useEffect(() => {
    console.log(contest_id);

    if (contest_id.indexOf(" ") >= 0)
      setcontest_idError("Contest ID cannot contain space.");
    else setcontest_idError(null);
  }, [contest_id]);

  // useEffect to check for validity of dates
  useEffect(() => {
    const start = moment(start_time, "DD/MM/YYYY HH:mm", true);
    const end = moment(end_time, "DD/MM/YYYY HH:mm", true);

    if (!start.isValid()) {
      setstart_timeError("Please enter the date and time as per the format");
    }
    else {
      setstart_timeError("");
    }

    if (!end.isValid()) {
      setend_timeError("Please enter the date and time as per the format");
    }
    else {
      setend_timeError("");
    }

    if (start.isBefore(end)) {
      if (!start.isAfter(moment())) {
        setTimeError("Start date must be in the future");
      }
      else {
        setTimeError("");
      }
    }
    else {
      setTimeError("Contest cannot end before starting");
    }

  }, [start_time, end_time]);


  // Function to reinitialise the state to its default values
  const reinitialiseContestState = () => {
    setcontest_name("");
    setcontest_id("");
    setcontest_idError("");
    setstart_time("");
    setstart_timeError(null);
    setend_time("");
    setCollaborators([]);
    setIsDraft(false);
    setQues_ids([]);
    setend_timeError(null);
    setTimeError(null);
    setQuestionSearchString("");
    setQuestionSearchedList([]);
    setDisableContestID(false);
    setDisableContestName(false);
  };


  // Function to handle submit
  const onSubmit = () => {
    setLoadingButton("loading");
    console.log(ques_ids);
    const data = {
      contest_name: contest_name,
      contest_id: contest_id,
      start_time: start_time,
      end_time: end_time,
      ques_ids: ques_ids,
      collaborators: collaborators,
      is_draft: is_draft,
    };
    let url = BASE_URL + CREATE_CONTEST_ENDPOINT_BACKEND;
    if (router.query["edit"]) {
      url = BASE_URL + UPDATE_CONTEST_ENDPOINT_BACKEND;
    }
    console.log(url);
    const options = {
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
    };
    axios
      .post(url, data, options)
      .then((result) => {
        setLoadingButton("");
        reinitialiseContestState();
        setToastClass("alert alert-success relative");
        setToastMessage(["Contest Successfully created."]);
        if (router.query["edit"]) {
          setToastMessage(["Contest Successfully updated."]);
        }
        setToastActive(true);
      })
      .catch((err) => {
        console.log(err.response.data);
        setToastClass("alert alert-error relative");
        if (err.response.data.error) {
          setToastMessage(["Your session has expired. Please login again"]);
        }
        else if (Array.isArray(err.response.data)) {
          let errorArray = err.response.data.map(error => `Error in ${error.error_field} - ${error.error_message}`);
          setToastMessage(errorArray);
        }
        else {
          setToastMessage(["Something went wrong."]);
        }
        setLoadingButton("");
        setToastActive(true);
      });
  };

  return (
    <div>
      <Head>
        <title>Create Contest</title>
      </Head>

      <SideNav role="SuperAdmin" highlight={AdminSideNavMap.create_contest} />

      {loadingSkeleton ? <CreateContestSkeleton /> : <div className="data-area">
        <div className="contest_container">
          <div className="contest_details_area">

            {/* Toast to show if question is created or there is some error */}
            {toastActive && toastMessage.length !== 0 && (
              <div className="toast toast-start z-50">
                <div className={toastClass}>
                  <div>
                    {toastMessage.map((message, index) => (
                      <span key={index}>{message}</span>
                    ))}
                  </div>
                  <div style={toastCross}>
                    <AiOutlineClose
                      onClick={() => {
                        setToastActive(false);
                      }}
                    />
                  </div>
                </div>
              </div>
            )}


            <div id="contest-details-section">
              <h1 className="text-2xl">Contest ID : </h1>
              <h4 className="whitespace-pre text-sm">{"Do not use space."}</h4>
              {contest_idError && (
                <h4 className="whitespace-pre text-sm text-red-600">
                  {contest_idError}
                </h4>
              )}
              <TextArea value={contest_id} setValue={setcontest_id} height={10} disabled={disableContestID} />
            </div>
            <div id="contest-details-section">
              <h1 className="text-2xl">Contest Name : </h1>
              <TextArea
                value={contest_name}
                setValue={setcontest_name}
                height={10}
                disabled={disableContestName}
              />
            </div>
            <div id="contest-details-section">
              {timeError && (
                <h4 className="whitespace-pre text-sm text-red-600">
                  {timeError}
                </h4>
              )}
              <h1 className="text-2xl">Contest Start Time : </h1>
              <h4 className="whitespace-pre text-sm">
                {"Example : 12/01/2023 08:00"}
              </h4>
              {start_timeError && (
                <h4 className="whitespace-pre text-sm text-red-600">
                  {start_timeError}
                </h4>
              )}
              <TextArea value={start_time} setValue={setstart_time} height={10} />
              <h1 className="text-2xl">Contest End Time : </h1>
              <h4 className="whitespace-pre text-sm">
                {"Example : 12/01/2023 20:00"}
              </h4>
              {end_timeError && (
                <h4 className="whitespace-pre text-sm text-red-600">
                  {end_timeError}
                </h4>
              )}
              <TextArea value={end_time} setValue={setend_time} height={10} />
            </div>
            <div className="flex w-full items-center justify-center">
              <div className="form-control">
                <label className="cursor-pointer label">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-error"
                    onChange={(event) => {
                      setIsDraft(event.target.checked);
                    }}
                  />
                  <span className="label-text mx-2">
                    Save as draft ?
                  </span>
                </label>
              </div>
              {contest_id &&
                contest_name &&
                start_time &&
                end_time &&
                !contest_idError &&
                !start_timeError &&
                !end_timeError &&
                !timeError ? (
                <button
                  className={`btn btn-outline btn-success ${loadingButton}`}
                  onClick={onSubmit}
                >
                  Submit
                </button>
              ) : (
                <button
                  className="btn btn-outline btn-error btn-disabled"
                  style={{ cursor: "not-allowed" }}
                >
                  Submit
                </button>
              )}
            </div>
          </div>

          <div className="add_problem_area px-10 pt-5">

            {/* Add problems */}
            <div className="flex flex-col w-full items-center justify-center">
              <h1 className="text-2xl ">Add Problems </h1>
              <br></br>
            </div>
            <div className="flex flex-col">
              <FcSearch size={30} />
              <TextArea
                value={questionSearchString}
                setValue={setQuestionSearchString}
                height={10}
              />
              {filteredSearchedQuesId.length != 0 && (
                <div>
                  {filteredSearchedQuesId.map((value, index) => (
                    <div className="tooltip tooltip-warning cursor-pointer" data-tip="Add" key={index}>
                      <div
                        className="bg-slate-700 my-2 py-2 mx-1 hover:text-green-500 flex justify-center items-center rounded"
                        onClick={() => {
                          setQues_ids([...ques_ids, { ques_id: filteredSearchedQuesId[index], points: "0" }]);
                          setFilteredSearchedQuesId(
                            filteredSearchedQuesId.filter((_, i) => i !== index)
                          );
                        }}
                      >
                        <span className="font-mono font-bold px-3">
                          {value}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {ques_ids.length != 0 && (
                <div>
                  <br></br>
                  <span className="font-mono font-bold">Added Problems</span>
                  <br></br>
                  {ques_ids.map((ques_obj, index) => (
                    <>
                      <div className="flex" key={index}>
                        <div className="tooltip tooltip-error cursor-pointer flex" data-tip="Remove" >
                          <div
                            className="bg-slate-700 my-2 py-2 mx-1 hover:text-red-500 flex justify-center items-center rounded"
                            onClick={() => {
                              if (questionSearchString)
                                setFilteredSearchedQuesId([...filteredSearchedQuesId, ques_obj.ques_id]);
                              setQues_ids(ques_ids.filter((_, i) => i != index));
                            }}
                          >
                            <span className="font-mono font-bold px-3">
                              {ques_obj.ques_id}
                            </span>
                          </div>
                        </div>
                        <div className="text-area-div">
                          <textarea
                            type="text"
                            className="textarea rounded-lg bg-inherit input-success max-w-xlg h-10 w-20"
                            value={ques_obj.points}
                            onChange={(e) => setQues_ids(prevQuesIds => prevQuesIds.map(ques => ques.ques_id === ques_obj.ques_id ? { ...ques, points: e.target.value } : ques))}
                          />
                        </div>
                      </div>
                      <br></br>
                    </>
                  ))}
                </div>
              )}
            </div>


            {/* Add  collaborators */}
            <div className="flex flex-col w-full items-center justify-center mt-8">
              <h1 className="text-2xl ">Add Collaborators </h1>
              <br></br>
            </div>
            <div className="flex flex-col">
              <FcSearch size={30} />
              <TextArea
                value={collaboratorsSearchString}
                setValue={setCollaboratorsSearchString}
                height={10}
              />
              {filteredSearchedCollaborators.length != 0 && (
                <div>
                  {filteredSearchedCollaborators.map((value, index) => (
                    <div className="tooltip tooltip-warning cursor-pointer" data-tip="Add" key={index}>
                      <div
                        className="bg-slate-700 my-2 py-2 mx-1 hover:text-green-500 flex justify-center items-center rounded"
                        onClick={() => {
                          setCollaborators([...collaborators, filteredSearchedCollaborators[index]]);
                          setFilteredSearchedCollaborators(
                            filteredSearchedCollaborators.filter((_, i) => i !== index)
                          );
                        }}
                      >
                        <span className="font-mono font-bold px-3">
                          {value}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {collaborators.length != 0 && (
                <div>
                  <br></br>
                  <span className="font-mono font-bold">Added Collaborators</span>
                  <br></br>
                  {collaborators.map((value, index) => (
                    <><div className="tooltip tooltip-error cursor-pointer" data-tip="Remove" key={index}>
                      <div
                        className="bg-slate-700 my-2 py-2 mx-1 hover:text-red-500 flex justify-center items-center rounded"
                        onClick={() => {
                          if (collaboratorsSearchString)
                            setFilteredSearchedCollaborators([...filteredSearchedCollaborators, collaborators[index]]);
                          setCollaborators(collaborators.filter((_, i) => i != index));
                        }}
                      >
                        <span className="font-mono font-bold px-3">
                          {value}
                        </span>
                      </div>
                    </div>
                      <br></br></>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>}
    </div>
  );
}

export default CreateProblem;
