import axios from "axios";
import React, { useEffect } from "react";
import TextArea from "../../../components/TextArea";
import { AiOutlineDelete } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";
import { BsPencilSquare } from "react-icons/bs";
import dynamic from "next/dynamic";
import checkToken from "../../../utils/checkToken";
import Router from "next/router";
import Head from 'next/head'
import SideNav from "../../../components/SideNavAdmin";
import { AdminSideNavMap, ADMIN, SUPER_ADMIN, END_USER, USER_DASHBOARD, LOGIN_PAGE, BASE_URL, CREATE_QUESTION_ENDPOINT_BACKEND } from "../../../utils/constants";
import toggleLoaderBackdrop from "../../../utils/toggleCustomBackdrop";
import { useSelector } from "react-redux";


const toastCross = {
    position: "absolute",
    top: "2px",
    right: "2px",
}

const CKEditor = dynamic(() => import("../../../components/RichTextEditor"), { ssr: false });

function create_problem() {
    const { role, isLoading, loggedIn } = useSelector(state => state.login);

    const [name, setName] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [constraints, setConstraints] = React.useState("");
    const [input_format, setInputFormat] = React.useState("");
    const [output_format, setOutputFormat] = React.useState("");
    const [topics, setTopics] = React.useState("");
    const [public_test_cases, setPublicTestCases] = React.useState([]);
    const [private_test_cases, setPrivateTestCases] = React.useState([]);
    const [time_limit, setTimeLimit] = React.useState("");
    const [problemID, setProblemID] = React.useState("");
    const [inputTestCase, setInputTestCase] = React.useState("");
    const [outputTestCase, setOutputTestCase] = React.useState("");
    const [explanation, setExplanation] = React.useState("");
    const [is_draft, setIsDraft] = React.useState(false);

    const [toastActive, setToastActive] = React.useState(false);
    const [toastMessage, setToastMessage] = React.useState("");
    const [toastClass, setToastClass] = React.useState("alert left-16 alert-error relative");


    useEffect(() => {
        toggleLoaderBackdrop();
        if (loggedIn && (role === ADMIN || role === SUPER_ADMIN)) toggleLoaderBackdrop();
        else if (loggedIn && role === END_USER) Router.push(USER_DASHBOARD);
        else {
            checkToken().then((status) => {
                if (status.verified) {
                    if (status.role === ADMIN || status.role === SUPER_ADMIN) {

                        // FETCH data here

                        toggleLoaderBackdrop();
                    }
                    else Router.push(USER_DASHBOARD);
                }
                else Router.push(LOGIN_PAGE + "?next=admin/problems/create");
            })
        }
    }, [])

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

    const scrollToTestCase = (elID) => {
        const test_case = document.getElementById(elID);
        console.log(test_case.offsetTop)
        test_case.scrollIntoView({ behavior: "smooth" });
    };

    const onSubmit = () => {
        const data = {
            name: name,
            description: description,
            constraints: constraints,
            input_format: input_format,
            output_format: output_format,
            topics: topics,
            public_test_cases: public_test_cases,
            private_test_cases: private_test_cases,
            time_limit: time_limit,
            ques_id: problemID,
            is_draft: is_draft
        }
        const url = BASE_URL + CREATE_QUESTION_ENDPOINT_BACKEND
        const options = {
            headers: {
                "Content-Type": "application/json",
                "token": localStorage.getItem("token")
            },
        }
        axios
            .post(url, data, options)
            .then((result) => {
                reinitialiseQuestionState();
                setToastClass("alert left-16 alert-success relative");
                setToastMessage("Question Successfully created.");
                setToastActive(true);
            })
            .catch((err) => {
                console.log(err);
                if (err.response) {
                    if (err.response.data) {
                        if (err.response.data.message) {
                            let err_msg = err.response.data.message.substr(28).split(',');
                            console.log(err_msg[0].split(':'));
                            let err_list = err_msg[0].split(':');
                            if (err_list[0] == "time_limit") {
                                setToastClass("alert left-16 alert-error relative");
                                setToastMessage("Time limit must be Integer.");
                                setToastActive(true);
                            }
                            else {
                                setToastClass("alert left-16 alert-error relative");
                                setToastMessage("Something went wrong. Please refresh and try again. If problem persists, contact the developer.");
                                setToastActive(true);
                            }
                        }
                        else if (err.response.data.code) {
                            const err_tag = err.response.data.keyValue;
                            console.log(err_tag);
                            const key = Object.keys(err_tag);
                            if (key[0] == "ques_id") {
                                setToastClass("alert left-20 alert-error relative");
                                setToastMessage("Question with this ID already exists.");
                                setToastActive(true);
                            }
                            else {
                                setToastClass("alert left-16 alert-error relative");
                                setToastMessage("Question with this name already exists.");
                                setToastActive(true);
                            }
                        }
                        else {
                            setToastClass("alert left-16 alert-error relative");
                            setToastMessage("Something went wrong. Please refresh and try again. If problem persists, contact the developer.");
                            setToastActive(true);
                        }
                    }
                    else {
                        setToastClass("alert left-16 alert-error relative");
                        setToastMessage("Something went wrong. Please refresh and try again. If problem persists, contact the developer.");
                        setToastActive(true);
                    }
                }
                else {
                    setToastClass("alert left-16 alert-error relative");
                    setToastMessage("Something went wrong. Please refresh and try again. If problem persists, contact the developer.");
                    setToastActive(true);
                }

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
            <Head>
                <title>Create Question</title>
            </Head>
            <SideNav role="SuperAdmin" highlight={AdminSideNavMap.create_problems} />

            <div className="data-area">
                <div className="question_container">
                    <div className="question_details_area">
                        {toastActive && <div className="toast toast-start z-50">
                            <div className={toastClass}>
                                <div>
                                    <span>{toastMessage}</span>
                                </div>
                                <div style={toastCross}>
                                    <AiOutlineClose onClick={() => { setToastActive(false); }} />
                                </div>
                            </div>
                        </div>}
                        <div id="question_area_section">
                            <h1 className="text-2xl">Problem ID : </h1>
                            <h4 className="whitespace-pre text-sm">{"Format : contestId_questionNo\nDo not use space."}</h4>

                            <TextArea value={problemID} setValue={setProblemID} height={10} />
                        </div>
                        <div id="question_area_section">
                            <h1 className="text-2xl">Problem Name : </h1>

                            <TextArea value={name} setValue={setName} height={10} />
                        </div>
                        <div id="question_area_section">
                            <h1 className="text-2xl">Time Limit : </h1>
                            <h4 className="whitespace-pre text-sm">{"An integer representing time in seconds"}</h4>
                            <TextArea value={time_limit} setValue={setTimeLimit} height={10} />
                        </div>
                        <div id="question_area_section">
                            <h1 className="text-2xl">Topics : </h1>
                            <TextArea value={topics} setValue={setTopics} height={10} />
                        </div>
                        <div id="question_area_section">
                            <h1 className="text-2xl">Description : </h1>
                            <CKEditor value={description} setValue={setDescription} />
                        </div>
                        <div id="question_area_section">
                            <h1 className="text-2xl">Constraints : </h1>
                            <CKEditor value={constraints} setValue={setConstraints} />
                        </div>
                        <div id="question_area_section">
                            <h1 className="text-2xl">Input Format : </h1>
                            <CKEditor value={input_format} setValue={setInputFormat} />
                        </div>
                        <div id="testCases"></div> {/* This is just a dummy div, a place to which it will automatically scroll when needed */}
                        <div id="question_area_section">
                            <h1 className="text-2xl">Output Format : </h1>
                            <CKEditor value={output_format} setValue={setOutputFormat} />
                        </div>
                        <div id="question_area_section">
                            <h1 className="text-2xl" >Input Test Case : </h1>
                            <TextArea value={inputTestCase} setValue={setInputTestCase} height={20} />
                        </div>
                        <div id="question_area_section">
                            <h1 className="text-2xl">Output Test Case : </h1>
                            <TextArea value={outputTestCase} setValue={setOutputTestCase} height={20} />
                        </div>
                        <div id="question_area_section">
                            <h1 className="text-2xl">Explanation : </h1>
                            <CKEditor value={explanation} setValue={setExplanation} />
                        </div>
                        <div id="question_area_section" className="button_area">
                            <div id="button-div">
                                {inputTestCase.trim() !== "" && outputTestCase.trim() !== "" ? <button
                                    className="btn btn-outline btn-success"
                                    onClick={onAddPublicTestCase}
                                >
                                    Add Public Test Case
                                </button> : <button className="btn btn-outline btn-error btn-disabled">Add Public Test Case</button>}
                            </div>
                            <div id="button-div">
                                {inputTestCase.trim() !== "" && outputTestCase.trim() !== "" ? <button
                                    className="btn btn-outline btn-success"
                                    onClick={onAddPrivateTestCase}
                                >
                                    Add Private Test Case
                                </button> : <button className="btn btn-outline btn-error btn-disabled">Add Private Test Case</button>}
                            </div>
                        </div>
                        <div className="button_area" id="question_area_section">
                            <div className="form-control">
                                <label className="cursor-pointer label">
                                    <input type="checkbox" className="checkbox checkbox-error" onChange={(event) => {
                                        setIsDraft(event.target.checked);
                                    }} />
                                    <span className="label-text mx-2">Save as draft ?</span>
                                </label>
                            </div>
                            {(name && description && constraints && input_format && output_format && problemID && time_limit && public_test_cases.length != 0 && private_test_cases.length != 0) ? <div id="buttom-div"><button className="btn btn-outline btn-success" onClick={onSubmit}>Submit</button></div> : <div id="button-div"><button className="btn btn-outline btn-error btn-disabled cursor-not-allowed">Submit</button></div>}
                        </div>
                    </div>
                    <div className="question_preview_area">
                        <div className="preview-heading">
                            <h1>Preview of the Question </h1>
                        </div>
                        <div className="preview-content">
                            <div className="question-metadata-preview">
                                {problemID && <h1 className="text-2xl">{problemID}</h1>}
                                {name && <h1 className="text-2xl">{name}</h1>}
                                {time_limit && <p className="text-sm mt-1 italic">Time Limit : {time_limit} Sec</p>}
                            </div>
                            <div id="question-preview-data">
                                {description && <p className="ck-content" dangerouslySetInnerHTML={{ __html: description }}></p>}
                            </div>
                            {constraints && <div id="question-preview-data">
                                <h1 >Constraints : </h1>
                                <p className="ck-content" dangerouslySetInnerHTML={{ __html: constraints }}></p>
                            </div>}
                            {input_format && <div id="question-preview-data">
                                <h1 >Input Format : </h1>
                                <p className="ck-content" dangerouslySetInnerHTML={{ __html: input_format }}></p>
                            </div>}
                            {output_format && <div id="question-preview-data">
                                <h1 >Output Format : </h1>
                                <p className="ck-content" dangerouslySetInnerHTML={{ __html: output_format }}></p>
                            </div>}
                            {topics && <div id="question-preview-data">
                                <h1 >Topics : </h1>
                                <p>{topics}</p>
                            </div>}
                            {public_test_cases.length != 0 && <div id="question-preview-data">
                                <h1 >Public Test Cases : </h1>
                                {public_test_cases.map((public_test_case, index) => (
                                    <div key={index} className="question-preview-data-icon" >
                                        <h1 >Test Case : {index}</h1>
                                        <div className="question-preview-delete-icon tooltip tooltip-error" data-tip="Delete">
                                            <AiOutlineDelete size={32} onClick={() => {
                                                setPublicTestCases(
                                                    public_test_cases.filter((_, i) => i !== index)
                                                );
                                            }} />
                                        </div>
                                        <div className="question-preview-edit-icon tooltip tooltip-warning" data-tip="Edit">
                                            <BsPencilSquare size={28} onClick={() => {
                                                setInputTestCase(public_test_cases[index].input);
                                                setOutputTestCase(public_test_cases[index].output);
                                                setExplanation(public_test_cases[index].explanation);
                                                setTimeout(() => {
                                                    scrollToTestCase("testCases");
                                                }, 100);
                                                setPublicTestCases(
                                                    public_test_cases.filter((_, i) => i !== index)
                                                );
                                            }} />
                                        </div>
                                        <div className="test-case-preview-area">
                                            <p><span>Input</span><br></br>{public_test_case.input}</p>
                                            <hr></hr>
                                            <p><span>Output</span><br></br>{public_test_case.output}</p>
                                            <hr></hr>
                                            {public_test_case.explanation && <div><span>Explanation</span><br></br><p className="ck-content" dangerouslySetInnerHTML={{ __html: public_test_case.explanation }}></p></div>}
                                        </div>
                                    </div>
                                ))}
                            </div>}
                            {private_test_cases.length != 0 && <div id="question-preview-data">
                                <h1 >Private Test Cases : </h1>
                                {private_test_cases.map((private_test_case, index) => (
                                    <div key={index} className="question-preview-data-icon" >
                                        <h1> Test Case : {index}</h1>
                                        <div className="question-preview-delete-icon tooltip tooltip-error" data-tip="Delete">
                                            <AiOutlineDelete size={32} onClick={() => {
                                                setPrivateTestCases(
                                                    private_test_cases.filter((_, i) => i !== index)
                                                );
                                            }} />
                                        </div>
                                        <div className="question-preview-edit-icon tooltip tooltip-warning" data-tip="Edit">
                                            <BsPencilSquare size={28} onClick={() => {
                                                setInputTestCase(private_test_cases[index].input);
                                                setOutputTestCase(private_test_cases[index].output);
                                                setTimeout(() => {
                                                    scrollToTestCase("testCases");
                                                }, 100);
                                                setPrivateTestCases(
                                                    private_test_cases.filter((_, i) => i !== index)
                                                );
                                            }} />
                                        </div>
                                        <div className="test-case-preview-area">
                                            <p><span>Input</span><br></br>{private_test_case.input}</p>
                                            <hr></hr>
                                            <p><span>Output</span><br></br>{private_test_case.output}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default create_problem;