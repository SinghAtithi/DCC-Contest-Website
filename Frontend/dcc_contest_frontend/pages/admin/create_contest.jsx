import axios from "axios";
import React, { useEffect } from "react";
import Navbar from "../../components/Navbar";
import TextArea from "../../components/TextArea";
import { AiOutlineDelete } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";
import { BsPencilSquare } from "react-icons/bs";
import dynamic from "next/dynamic";
import checkToken from "../../utils/checkToken";
import Router from "next/router";
import Head from 'next/head';
import moment from 'moment';


const questionAreaStyle = {
  height: "90vh",
  width: "50%",
}

const deleteIcon = {
  position: "absolute",
  top: "0px",
  right: "10px",
}
const editIcon = {
  position: "absolute",
  top: "4px",
  right: "50px",
}

const toastCross = {
  position: "absolute",
  top: "2px",
  right: "2px",
}

function validateDateTimeString(dateTime) {
  try {
    const arr = dateTime.split(" ");
    if (arr.length != 3) return false;

    let result = moment(arr[0], 'DD/MM/YYYY', true).isValid();
    if (!result) return false;

    let hour = parseInt(arr[1].split(':')[0]);
    let min = parseInt(arr[1].split(':')[1]);

    if (hour > 12 || hour < 0) return false;
    if (min >= 60 || min < 0) return false;

    if (arr[2] != "am" && arr[2] != "pm") return false;
    return true;
  }
  catch (error) {
    return false;
  }
}

function create_problem() {

  const [contestName, setContestName] = React.useState("");
  const [contestNameError, setContestNameError] = React.useState(null);

  const [contestID, setContestID] = React.useState("");
  const [contestIDError, setContestIDError] = React.useState(null);

  const [startTime, setStartTime] = React.useState("");
  const [startTimeError, setStartTimeError] = React.useState(null);

  const [endTime, setEndTime] = React.useState("");
  const [endTimeError, setEndTimeError] = React.useState(null);

  const [timeError, setTimeError] = React.useState(null);

  const [toastActive, setToastActive] = React.useState(false);
  const [toastMessage, setToastMessage] = React.useState("");
  const [toastClass, setToastClass] = React.useState("alert alert-error relative");
  const [isLoading, setIsLoading] = React.useState(true);


  useEffect(() => {
    setIsLoading(true);

    checkToken().then((status) => {
      if (status) {
        setIsLoading(false);

        const currDate = moment(new Date()).format('DD/MM/YYYY HH:mm a');
        const nextDate = moment(new Date()).add(2, 'hours').format('DD/MM/YYYY HH:mm a');
        setStartTime(currDate.toString());
        setEndTime(nextDate.toString());

      }
      else {
        Router.push("/login?next=admin/create_contest");
      }
    });
  }, [])

  useEffect(() => {
    console.log(contestID);

    if (contestID.indexOf(' ') >= 0) setContestIDError("Contest ID cannot contain space.");
    else setContestIDError(null);

  }, [contestID])

  useEffect(() => {
    if (startTime != "" && !validateDateTimeString(startTime)) {
      setStartTimeError("Please enter the date and time as per the format");
    }
    else setStartTimeError(null);

    if (endTime != "" && !validateDateTimeString(endTime)) {
      setEndTimeError("Please enter the date and time as per the format");
    }
    else setEndTimeError(null);

    if (!(startTime === "" || endTime === "")) {
      if (startTime >= endTime) setTimeError("Start time cannot be greater than end time");
      else setTimeError(null);
    }
    else setTimeError(null);
  }, [startTime, endTime]);


  const reinitialiseQuestionState = () => {
    setContestName("");
    setContestNameError(null);
    setContestID("");
    setContestIDError("");
    setStartTime("");
    setEndTime("");
  }

  const scroll2El = (elID) => {
    window.scrollTo({
      top: document.getElementById(elID).offsetTop - 60,
      behavior: 'smooth',
    });
  };

  const onSubmit = () => {
    axios
      .post(
        "http://localhost:5000/contest/create",
        {
          contestName, contestID, startTime, endTime
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((result) => {
        reinitialiseQuestionState();
        setToastClass("alert alert-success relative");
        setToastMessage("Contest Successfully created.");
        setToastActive(true);
      })
      .catch((err) => {
        // if (err.response.data.message) {
        //   let err_msg = err.response.data.message.substr(28).split(',');
        //   console.log(err_msg[0].split(':'));
        //   let err_list = err_msg[0].split(':');
        //   if (err_list[0] == "time_limit") {
        //     setTimeLimitError("Time limit must be Integer.");
        //     setToastClass("alert alert-error relative");
        //     setToastMessage("Time limit must be Integer.");
        //     setToastActive(true);
        //   }
        //   else {
        //     setToastClass("alert alert-error relative");
        //     setToastMessage("Something went wrong. Please refresh and try again. If problem persists, contact the developer.");
        //     setToastActive(true);
        //   }

        // }

        // else if (err.response.data.code) {
        //   setProblemIDError("");
        //   setNameError("");
        //   const err_tag = err.response.data.keyValue;
        //   console.log(err_tag);
        //   const key = Object.keys(err_tag);
        //   if (key[0] == "ques_no") {
        //     setProblemIDError("Question with this ID already exists.");
        //     setToastClass("alert alert-error relative");
        //     setToastMessage("Question with this ID already exists.");
        //     setToastActive(true);
        //   }
        //   else {
        //     setNameError("Question with this name already exists.");
        //     setToastClass("alert alert-error relative");
        //     setToastMessage("Question with this name already exists.");
        //     setToastActive(true);
        //   }
        // }

        // else
        console.log(err);


      });
  };

  if (isLoading) return (<div>Loading...</div>)

  return (
    <div >
      <div>
        <Head>
          <title>Create Contest</title>
        </Head>
      </div>
      <Navbar />

      <div className="font-serif p-8 w-auto">
        <div className="questionArea float-left" style={questionAreaStyle}>
          {toastActive && <div className="toast toast-start">
            <div className={toastClass}>
              <div>
                <span>{toastMessage}</span>
              </div>
              <div style={toastCross}>
                <AiOutlineClose onClick={() => { setToastActive(false); }} />
              </div>
            </div>
          </div>}


          <h1 className="text-2xl">Contest ID : </h1>
          <h4 className="whitespace-pre text-sm">{"Do not use space."}</h4>
          {contestIDError && <h4 className="whitespace-pre text-sm text-red-600">{contestIDError}</h4>}
          <TextArea value={contestID} setValue={setContestID} height={10} />

          <h1 className="text-2xl">Contest Name : </h1>
          {contestNameError && <h4 className="whitespace-pre text-sm text-red-600">{contestNameError}</h4>}
          <TextArea value={contestName} setValue={setContestName} height={10} />

          {timeError && <h4 className="whitespace-pre text-sm text-red-600">{timeError}</h4>}

          <h1 className="text-2xl">Contest Start Time : </h1>
          <h4 className="whitespace-pre text-sm">{"Example : 12/01/2023 08:00 am"}</h4>
          {startTimeError && <h4 className="whitespace-pre text-sm text-red-600">{startTimeError}</h4>}
          <TextArea value={startTime} setValue={setStartTime} height={10} />

          <h1 className="text-2xl">Contest End Time : </h1>
          <h4 className="whitespace-pre text-sm">{"Example : 12/01/2023 08:00 am"}</h4>
          {endTimeError && <h4 className="whitespace-pre text-sm text-red-600">{endTimeError}</h4>}
          <TextArea value={endTime} setValue={setEndTime} height={10} />


          <div className="flex w-full items-center justify-center">
            {(contestID && contestName && startTime && endTime && !contestNameError && !contestIDError && !startTimeError && !endTimeError && !timeError) ? <button className="btn btn-outline btn-success mt-3 mx-2 mb-9" onClick={onSubmit}>Submit</button> : <button className="btn btn-outline btn-error mt-3 mx-2 mb-9 btn-disabled" style={{ "cursor": "not-allowed" }}>Submit</button>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default create_problem;