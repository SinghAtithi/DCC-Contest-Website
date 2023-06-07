import { useState } from "react";
import { BASE_URL, DELETE_QUESION_ENDPOINT_BACKEND, PROBLEM_SEARCH } from "../utils/constants";
import { useRouter } from "next/router";
import axios from "axios";
import TestCaseContainer from "./TestCaseContainer";


export default function DisplayProblemData(props) {
    const router = useRouter();

    const [clickedIndex, setClickedIndex] = useState(0);
    const [previewActive, setPreviewActive] = useState(false);
    const [buttonLoading, setButtonLoading] = useState("");

    function handleDeleteQuestion(ques_id, index) {
        setButtonLoading("loading");
        const url = BASE_URL + DELETE_QUESION_ENDPOINT_BACKEND + `/${ques_id}`;
        const options = {
            headers: {
                "Content-Type": "application/json",
                token: localStorage.getItem("token"),
            },
        };
        axios.delete(url, options).then((res) => {
            const updatedData = [...props.data];
            updatedData.splice(index, 1);
            props.setData(updatedData);
            setButtonLoading("");
        }).catch((error) => {
            if (error.data && error.data.error)
                alert(error.data.error);
            else alert("You have been logged out. Please login");
            setButtonLoading("");
        })

    }
    return (
        <div className="m-2">
            <br></br>
            {!previewActive && <>
                <div className="flex justify-center pb-2">
                    <div className="alert alert-info shadow-lg !w-fit">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current flex-shrink-0 w-6 h-6 text-black"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            <span className="text-black">Search results based on property {props.heading}</span>
                        </div>
                    </div>
                </div>
                <div className="overflow-auto">
                    <table className="table w-full custom-table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Ques ID</th>
                                <th>Name</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.data.map((problem, index) => (
                                <tr key={index} className="hover">
                                    <th>{index + 1}</th>
                                    <td>{problem.ques_id}</td>
                                    <td>{problem.name}</td>
                                    <td>
                                        <span className="px-1">
                                            <button className="btn btn-outline btn-info min-h-8 h-8 min-w-fit w-20" onClick={() => {
                                                setClickedIndex(index);
                                                setPreviewActive(true);
                                            }}>
                                                View
                                            </button>
                                        </span>
                                        <span className="px-1">
                                            <button className="btn btn-outline btn-info min-w-fit w-20 min-h-8 h-8" onClick={() => {
                                                router.push(`/admin/problems/create?edit=${problem.ques_id}`)
                                            }}>
                                                Edit
                                            </button>
                                        </span>
                                        <span className="px-1">
                                            <button className={`btn btn-outline btn-info min-w-fit w-20 min-h-8 h-8 ${buttonLoading}`} onClick={() => { handleDeleteQuestion(problem.ques_id, index) }}>
                                                Delete
                                            </button>
                                        </span>
                                        {problem.is_draft ? <></> : <span className="px-1">
                                            <button className={`btn btn-outline btn-info min-w-fit w-20 min-h-8 h-8`} onClick={() => { router.push(`/admin/problems/execute/${problem.ques_id}`); }}>
                                                Execute
                                            </button>
                                        </span>}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div></>}


            {previewActive && <><h3 className="font-bold text-lg flex justify-center">Question Details</h3>
                <div className="problem_preview_area">
                    <div className="problem-preview-content">
                        <div className="problem-metadata-preview">
                            {props.data[clickedIndex].ques_id && <h1 className="text-2xl">{props.data[clickedIndex].ques_id}</h1>}
                            {props.data[clickedIndex].name && <h1 className="text-2xl">{props.data[clickedIndex].name}</h1>}
                            {props.data[clickedIndex].time_limit && <p className="text-sm mt-1 italic">Time Limit : {props.data[clickedIndex].time_limit} Sec</p>}
                        </div>
                        <br />
                        <div id="problem-preview-data">
                            {props.data[clickedIndex].description && <p className="ck-content" dangerouslySetInnerHTML={{ __html: props.data[clickedIndex].description }}></p>}
                        </div>
                        <br />
                        {props.data[clickedIndex].constraints && <div id="problem-preview-data">
                            <h1 >Constraints : </h1>
                            <p className="ck-content" dangerouslySetInnerHTML={{ __html: props.data[clickedIndex].constraints }}></p>
                        </div>}
                        <br />
                        {props.data[clickedIndex].input_format && <div id="problem-preview-data">
                            <h1 >Input Format : </h1>
                            <p className="ck-content" dangerouslySetInnerHTML={{ __html: props.data[clickedIndex].input_format }}></p>
                        </div>}
                        <br />
                        {props.data[clickedIndex].output_format && <div id="problem-preview-data">
                            <h1 >Output Format : </h1>
                            <p className="ck-content" dangerouslySetInnerHTML={{ __html: props.data[clickedIndex].output_format }}></p>
                        </div>}
                        <br />
                        {props.data[clickedIndex].topics && <div id="problem-preview-data">
                            <h1 >Topics : </h1>
                            <p>{props.data[clickedIndex].topics}</p>
                        </div>}
                        <br />
                        {props.data[clickedIndex].is_draft && <div id="problem-preview-data">
                            <h1 >Draft Status : </h1>
                            <p>true</p>
                        </div>}
                        <br />
                        <div id="problem-preview-data">
                            <h1 >Public Test Cases : </h1>
                            {props.data[clickedIndex].public_test_cases.map((public_test_case, index) => (
                                <TestCaseContainer key={index} index={index} input={public_test_case.input} output={public_test_case.output} explanation={public_test_case.explanation} />
                            ))}
                        </div>
                        <br />
                        {props.data[clickedIndex].private_test_cases.length != 0 && <div id="problem-preview-data">
                            <h1 >Private Test Cases : </h1>
                            {props.data[clickedIndex].private_test_cases.map((private_test_case, index) => (
                                <TestCaseContainer key={index} index={index} input={private_test_case.input} output={private_test_case.output} />
                            ))}
                        </div>}
                        <div id="problem-preview-data"><button className="btn btn-outline btn-success rounded-lg" onClick={() => {
                            setPreviewActive(false);
                        }}>Close Preview</button></div>
                    </div>
                </div>
            </>}
        </div>
    )

}