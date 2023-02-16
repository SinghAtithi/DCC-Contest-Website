import axios from "axios";
import React, { useEffect } from "react";
import Navbar from "../../components/Navbar";
import TextArea from "../../components/TextArea";
import { FcSearch } from "react-icons/fc";
import { AiOutlineClose } from "react-icons/ai";
import checkToken from "../../utils/checkToken";
import Router from "next/router";
import Head from 'next/head';
import moment from 'moment';
import { baseUrl } from "../../utils/constants";


const add_problem_area = {
  height: "90vh",
  width: "50%",
}

const toastCross = {
  position: "absolute",
  top: "2px",
  right: "2px",
}

function validateDateTimeString(dateTime) {
  try {
    const arr = dateTime.split(" ");
    if (arr.length != 2) return false;

    let result = moment(arr[0], 'DD/MM/YYYY', true).isValid();
    if (!result) return false;

    let hour = parseInt(arr[1].split(':')[0]);
    let min = parseInt(arr[1].split(':')[1]);

    if (hour >= 24 || hour < 0) return false;
    if (min >= 60 || min < 0) return false;

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

  const [ques_ids, setQues_ids] = React.useState([]);

  const [startTime, setStartTime] = React.useState("");
  const [startTimeError, setStartTimeError] = React.useState(null);

  const [endTime, setEndTime] = React.useState("");
  const [endTimeError, setEndTimeError] = React.useState(null);

  const [timeError, setTimeError] = React.useState(null);

  const [quesIDs, setQuesIDs] = React.useState([]);
  const [searchString, setSearchString] = React.useState("");
  const [searchedList, setSearchedList] = React.useState([]);

  const [toastActive, setToastActive] = React.useState(false);
  const [toastMessage, setToastMessage] = React.useState("");
  const [toastClass, setToastClass] = React.useState("alert alert-error relative");
  const [isLoading, setIsLoading] = React.useState(true);


  useEffect(() => {
    setIsLoading(true);

    checkToken().then((status) => {
      if (status) {
        setIsLoading(false);

        const currDate = moment(new Date()).format('DD/MM/YYYY HH:mm');
        const nextDate = moment(new Date()).add(2, 'hours').format('DD/MM/YYYY HH:mm');
        setStartTime(currDate.toString());
        setEndTime(nextDate.toString());

        // Get ques ids to choose from in search
        axios.get(`${baseUrl}/question/getQuesNo`).then((res) => {
          var ques_ids = []
          for (var i = 0; i < res.data.length; i++) {
            ques_ids.push(res.data[i].ques_no);
          }
          console.log(ques_ids);
          setQuesIDs(ques_ids);
        }).catch((err) => {
          console.log(err);
        })

      }
      else {
        Router.push("/login?next=admin/create_contest");
      }
    });
  }, [])

  useEffect(() => {
    if (searchString == "") setSearchedList([]);
    else {
      setSearchedList(quesIDs.filter(id => {
        const notToBeIncluded = new Set(ques_ids);
        if (!notToBeIncluded.has(id))
          return id.toLowerCase().includes(searchString.toLowerCase());
      }));
    }

  }, [searchString])




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


  const reinitialiseContestState = () => {
    setContestName("");
    setContestNameError(null);
    setContestID("");
    setContestIDError("");
    setStartTime("");
    setStartTimeError(null);
    setEndTime("");
    setEndTimeError(null);
    setTimeError(null);
    setSearchString("");
    setSearchedList([]);


    setQuesIDs(quesIDs.filter(id => {
      const notToBeIncluded = new Set(ques_ids);
      if (!notToBeIncluded.has(id))
        return id;
    }));

    setQues_ids([]);




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
          contestName, contestID, startTime, endTime, ques_ids
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((result) => {
        reinitialiseContestState();
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
      <div className="contest_container">
        <div className="contest_details_area">
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


          <div id="contest-details-section">
            <h1 className="text-2xl">Contest ID : </h1>
            <h4 className="whitespace-pre text-sm">{"Do not use space."}</h4>
            {contestIDError && <h4 className="whitespace-pre text-sm text-red-600">{contestIDError}</h4>}
            <TextArea value={contestID} setValue={setContestID} height={10} />
          </div>

          <div id="contest-details-section">
            <h1 className="text-2xl">Contest Name : </h1>
            {contestNameError && <h4 className="whitespace-pre text-sm text-red-600">{contestNameError}</h4>}
            <TextArea value={contestName} setValue={setContestName} height={10} />
          </div>

          <div id="contest-details-section">
            {timeError && <h4 className="whitespace-pre text-sm text-red-600">{timeError}</h4>}
            <h1 className="text-2xl">Contest Start Time : </h1>
            <h4 className="whitespace-pre text-sm">{"Example : 12/01/2023 08:00"}</h4>
            {startTimeError && <h4 className="whitespace-pre text-sm text-red-600">{startTimeError}</h4>}
            <TextArea value={startTime} setValue={setStartTime} height={10} />
            <h1 className="text-2xl">Contest End Time : </h1>
            <h4 className="whitespace-pre text-sm">{"Example : 12/01/2023 20:00"}</h4>
            {endTimeError && <h4 className="whitespace-pre text-sm text-red-600">{endTimeError}</h4>}
            <TextArea value={endTime} setValue={setEndTime} height={10} />
          </div>


          <div className="flex w-full items-center justify-center">
            {(contestID && contestName && startTime && endTime && !contestNameError && !contestIDError && !startTimeError && !endTimeError && !timeError) ? <button className="btn btn-outline btn-success mt-2 mx-2 mb-2" onClick={onSubmit}>Submit</button> : <button className="btn btn-outline btn-error mt-2 mx-2 mb-2 btn-disabled" style={{ "cursor": "not-allowed" }}>Submit</button>}
          </div>
        </div>

        <div className="add_problem_area px-10 pt-5">

          <div className="flex flex-col w-full items-center justify-center">
            <h1 className="text-2xl ">Add Problems </h1>
            <br></br>
          </div>

          <div className="flex flex-col">

            <FcSearch size={30} />
            <TextArea value={searchString} setValue={setSearchString} height={10} />


            {searchedList.length != 0 && <div>
              {searchedList.map((value, index) => (
                <div className="tooltip tooltip-warning" data-tip="Add">
                  <div className="bg-slate-700 my-1 py-1 mx-1 hover:text-green-500" onClick={() => {
                    setQues_ids([...ques_ids, searchedList[index]]);
                    setSearchedList(searchedList.filter((_, i) => i !== index));
                  }}>
                    <span className="font-mono font-bold px-3">{value}</span>
                  </div><hr></hr></div>))}
            </div>}

            {ques_ids.length != 0 && <div>
              <br></br>
              <span className="font-mono font-bold">Added Problems</span><br></br>
              {ques_ids.map((value, index) => (
                <div className="tooltip tooltip-error" data-tip="Remove">
                  <div className="bg-slate-700 my-1 py-1 mx-1 hover:text-red-500" onClick={() => {
                    if (searchString) setSearchedList([...searchedList, ques_ids[index]]);
                    setQues_ids(ques_ids.filter((_, i) => i != index));
                  }}>
                    <span className="font-mono font-bold px-3">{value}</span>
                  </div>
                  <hr></hr>
                </div>
              ))}
            </div>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default create_problem;