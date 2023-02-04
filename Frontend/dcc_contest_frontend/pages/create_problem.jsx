import axios from "axios";
import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import TextArea from "../components/TextArea";
import { AiOutlineDelete } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";
import { BsPencilSquare } from "react-icons/bs";
import dynamic from "next/dynamic";
import { useState } from "react";
import store from "../store/baseStore";
import Router from "next/router";
import checkToken from "../utils/checkToken";

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

const CKEditor = dynamic(() => import("../components/RichTextEditor"), { ssr: false });

function create_problem() {

  const [name, setName] = React.useState("");
  const [nameError, setNameError] = React.useState(null);
  const [description, setDescription] = React.useState("");
  const [constraints, setConstraints] = React.useState("");
  const [input_format, setInputFormat] = React.useState("");
  const [output_format, setOutputFormat] = React.useState("");
  const [topics, setTopics] = React.useState("");
  const [public_test_cases, setPublicTestCases] = React.useState([]);
  const [private_test_cases, setPrivateTestCases] = React.useState([]);
  const [time_limit, setTimeLimit] = React.useState("");
  const [time_limitError, setTimeLimitError] = React.useState(null);
  const [problemID, setProblemID] = React.useState("");
  const [problemIDError, setProblemIDError] = React.useState(null);
  const [inputTestCase, setInputTestCase] = React.useState("");
  const [outputTestCase, setOutputTestCase] = React.useState("");
  const [explanation, setExplanation] = React.useState("");

  const [toastActive, setToastActive] = React.useState(false);
  const [toastMessage, setToastMessage] = React.useState("");
  const [toastClass, setToastClass] = React.useState("alert alert-error relative");

  useEffect(()=>{
    checkToken();

    if(! store.getState().login.loggedIn){
      Router.push('/login?next=create_problem');
    }
  },[]);

  const reinitialiseQuestionState = () => {
    setName("");
    setNameError(null);
    setDescription("");
    setConstraints("");
    setInputFormat("");
    setOutputFormat("");
    setTopics("");
    setPublicTestCases([]);
    setPrivateTestCases([]);
    setTimeLimit("");
    setTimeLimitError(null);
    setProblemID("");
    setProblemIDError("");
    setInputTestCase("");
    setOutputTestCase("");
    setExplanation("");

  }
  
  const scroll2El = elID => {
    window.scrollTo({
      top: document.getElementById(elID).offsetTop - 60,
      behavior: 'smooth',
    });
  };

  const onSubmit = () => {
    axios
      .post(
        "http://localhost:5000/question/createQuestion/create/",
        {
          name,
          description,
          constraints,
          input_format,
          output_format,
          topics,
          public_test_cases,
          private_test_cases,
          time_limit,
          problemID,
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
        setToastMessage("Question Successfully created.");
        setToastActive(true);
      })
      .catch((err) => {
        setTimeLimitError("");
        if (err.response.data.message) {
          let err_msg = err.response.data.message.substr(28).split(',');
          console.log(err_msg[0].split(':'));
          let err_list = err_msg[0].split(':');
          if (err_list[0] == "time_limit") {
            setTimeLimitError("Time limit must be Integer.");
            setToastClass("alert alert-error relative");
            setToastMessage("Time limit must be Integer.");
            setToastActive(true);
          }
          else {
            setToastClass("alert alert-error relative");
            setToastMessage("Something went wrong. Please refresh and try again. If problem persists, contact the developer.");
            setToastActive(true);
          }

        }

        else if (err.response.data.code) {
          setProblemIDError("");
          setNameError("");
          const err_tag = err.response.data.keyValue;
          console.log(err_tag);
          const key = Object.keys(err_tag);
          if (key[0] == "ques_no") {
            setProblemIDError("Question with this ID already exists.");
            setToastClass("alert alert-error relative");
            setToastMessage("Question with this ID already exists.");
            setToastActive(true);
          }
          else {
            setNameError("Question with this name already exists.");
            setToastClass("alert alert-error relative");
            setToastMessage("Question with this name already exists.");
            setToastActive(true);
          }
        }

        else
          console.log(err);


      });
  };

  const onAddPublicTestCase = () => {
    setPublicTestCases([
      ...public_test_cases,
      {
        input: inputTestCase,
        output: outputTestCase,
        explanation: explanation
      },
    ]);
    setInputTestCase("");
    setOutputTestCase("");
    setExplanation("");
  };

  const onAddPrivateTestCase = () => {
    setPrivateTestCases([
      ...private_test_cases,
      {
        input: inputTestCase,
        output: outputTestCase,
      },
    ]);

    setInputTestCase("");
    setOutputTestCase("");
  };


  return (
    <div >
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


          <h1 className="text-2xl">Problem ID : </h1>
          <h4 className="whitespace-pre text-sm">{"Format : contestId_questionNo\nDo not use space."}</h4>
          {problemIDError && <h4 className="whitespace-pre text-sm text-red-600">{problemIDError}</h4>}
          <TextArea value={problemID} setValue={setProblemID} height={10} />

          <h1 className="text-2xl">Problem Name : </h1>
          {nameError && <h4 className="whitespace-pre text-sm text-red-600">{nameError}</h4>}
          <TextArea value={name} setValue={setName} height={10} />

          <h1 className="text-2xl">Time Limit : </h1>
          <h4 className="whitespace-pre text-sm">{"An integer representing time in seconds"}</h4>
          {time_limitError && <h4 className="whitespace-pre text-sm text-red-600">{time_limitError}</h4>}
          <TextArea value={time_limit} setValue={setTimeLimit} height={10} />

          <h1 className="text-2xl">Topics : </h1>
          <TextArea value={topics} setValue={setTopics} height={10} />

          <h1 className="text-2xl">Description : </h1>
          <CKEditor value={description} setValue={setDescription} />

          <h1 className="text-2xl pt-6">Constraints : </h1>
          <CKEditor value={constraints} setValue={setConstraints} />

          <h1 className="text-2xl pt-6">Input Format : </h1>
          <CKEditor value={input_format} setValue={setInputFormat} />

          <h1 className="text-2xl">Output Format : </h1>
          <CKEditor value={output_format} setValue={setOutputFormat} />

          <h1 className="text-2xl pt-6" id="testCases">Input Test Case : </h1>
          <TextArea value={inputTestCase} setValue={setInputTestCase} height={20} />

          <h1 className="text-2xl pt-6">Output Test Case : </h1>
          <TextArea value={outputTestCase} setValue={setOutputTestCase} height={20} />

          <h1 className="text-2xl">Explanation : </h1>
          <CKEditor value={explanation} setValue={setExplanation} />

          <div className="flex w-full items-center justify-center">
            <div>
              <button
                className="btn btn-outline btn-success mt-3 mx-2"
                onClick={onAddPublicTestCase}
              >
                Add Public Test Case
              </button>
            </div>

            <div>
              <button
                className="btn btn-outline btn-success mt-3"
                onClick={onAddPrivateTestCase}
              >
                Add Private Test Case
              </button>
            </div>
          </div>
          <div className="flex w-full items-center justify-center">
            {(name && description && constraints && input_format && output_format && problemID && time_limit && public_test_cases.length != 0 && private_test_cases.length != 0) ? <button className="btn btn-outline btn-success mt-3 mx-2 mb-9" onClick={onSubmit}>Submit</button> : <button className="btn btn-outline btn-error mt-3 mx-2 mb-9 btn-disabled" style={{ "cursor": "not-allowed" }}>Submit</button>}
          </div>
        </div>

        <div className="previewArea float-right px-10 " style={questionAreaStyle}>

          <div className="flex flex-col w-full items-center justify-center">
            <h1 className="text-xl ">Preview of the Question </h1>
            <br></br>
            <br></br>
          </div>

          <div className="flex flex-col">

            <div className="flex flex-col w-full items-center justify-center">
              {problemID && <h1 className="text-2xl">{problemID}</h1>}
              {name && <h1 className="text-2xl">{name}</h1>}
              {time_limit && <p className="text-sm mt-1 italic">Time Limit : {time_limit} Sec</p>}
            </div>

            <div>
              {description && <p className="mt-12 ck-content" dangerouslySetInnerHTML={{ __html: description }}></p>}
            </div>

            {constraints && <div>
              <h1 className="text-xl mt-8 font-serif ck-content">Constraints : </h1>
              <p className="mt-2" dangerouslySetInnerHTML={{ __html: constraints }}></p>
            </div>}

            {input_format && <div>
              <h1 className="text-xl mt-8 font-serif">Input Format : </h1>
              <pre>{input_format}</pre>
            </div>}

            {output_format && <div>
              <h1 className="text-xl mt-8 font-serif">Output Format : </h1>
              <pre>{output_format}</pre>
            </div>}

            {topics && <div>
              <h1 className="text-xl mt-8 font-serif">Topics : </h1>
              <pre>{topics}</pre>
            </div>}

            {public_test_cases.length != 0 && <div>
              <h1 className="text-xl mt-8 font-serif">Public Test Cases : </h1>
              {public_test_cases.map((public_test_case, index) => (
                <div key={index} className="relative" >
                  <h1 className="text-xl mt-8 font-serif">Test Case : {index}</h1>
                  <div style={deleteIcon} className="tooltip tooltip-error" data-tip="Delete">
                    <AiOutlineDelete size={32} onClick={() => {
                      setPublicTestCases(
                        public_test_cases.filter((_, i) => i !== index)
                      );
                    }} />
                  </div>
                  <div style={editIcon} className="tooltip tooltip-warning" data-tip="Edit">
                    <BsPencilSquare size={25} onClick={() => {
                      setInputTestCase(public_test_cases[index].input);
                      setOutputTestCase(public_test_cases[index].output);
                      setExplanation(public_test_cases[index].explanation);
                      setTimeout(() => {
                        scroll2El("testCases");
                      }, 100);
                      setPublicTestCases(
                        public_test_cases.filter((_, i) => i !== index)
                      );
                    }} />
                  </div>
                  <div className="bg-slate-700">
                    <pre><span className="font-mono font-bold">Input</span><br></br>{public_test_case.input}</pre>
                    <hr></hr>
                    <pre><span className="font-mono font-bold">Output</span><br></br>{public_test_case.output}</pre>
                    <hr></hr>
                    <pre><span className="font-mono font-bold">Explanation</span><br></br><p className="ck-content" dangerouslySetInnerHTML={{ __html: public_test_case.explanation }}></p></pre>
                  </div>
                </div>
              ))}
            </div>}

            {private_test_cases.length != 0 && <div>
              <h1 className="text-xl mt-8 font-serif">Private Test Cases : </h1>
              {private_test_cases.map((private_test_case, index) => (
                <div key={index} className="relative" >
                  <h1 className="text-xl mt-8 font-serif">Test Case : {index}</h1>
                  <div style={deleteIcon} className="tooltip tooltip-error" data-tip="Delete">
                    <AiOutlineDelete size={32} onClick={() => {
                      setPrivateTestCases(
                        private_test_cases.filter((_, i) => i !== index)
                      );
                    }} />
                  </div>
                  <div style={editIcon} className="tooltip tooltip-warning" data-tip="Edit">
                    <BsPencilSquare size={25} onClick={() => {
                      setInputTestCase(private_test_cases[index].input);
                      setOutputTestCase(private_test_cases[index].output);
                      setTimeout(() => {
                        scroll2El("testCases");
                      }, 100);
                      setPrivateTestCases(
                        private_test_cases.filter((_, i) => i !== index)
                      );
                    }} />
                  </div>
                  <div className="bg-slate-700">
                    <pre><span className="font-mono font-bold">Input</span><br></br>{private_test_case.input}</pre>
                    <hr></hr>
                    <pre><span className="font-mono font-bold">Output</span><br></br>{private_test_case.output}</pre>
                  </div>
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
