import { useState } from "react";
import { PROBLEM_SEARCH } from "../utils/constants";

export default function DisplayData(props) {
    const [clickedIndex, setClickedIndex] = useState(0);
    const [previewActive, setPreviewActive] = useState(false);
    return (
        <>
            <br></br>

            {!previewActive && <><div className="data-heading">Search results based on property {props.heading}</div>
                <div className="overflow-x-auto bg-white">
                    <table className="table w-full ">
                        <thead>
                            <tr>
                                <th>Ques No</th>
                                <th>Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.data.map((problem, index) => (
                                <tr key={index} className="hover" onClick={() => {
                                    setClickedIndex(index);
                                    // document.querySelector(".modal").classList.toggle("modal-open");
                                    setPreviewActive(true);
                                }}>
                                    <td>{problem.ques_id}</td>
                                    <td>{problem.name}</td>
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
                        <div id="problem-preview-data">
                            {props.data[clickedIndex].description && <p className="ck-content" dangerouslySetInnerHTML={{ __html: props.data[clickedIndex].description }}></p>}
                        </div>
                        {props.data[clickedIndex].constraints && <div id="problem-preview-data">
                            <h1 >Constraints : </h1>
                            <p className="ck-content" dangerouslySetInnerHTML={{ __html: props.data[clickedIndex].constraints }}></p>
                        </div>}
                        {props.data[clickedIndex].input_format && <div id="problem-preview-data">
                            <h1 >Input Format : </h1>
                            <p className="ck-content" dangerouslySetInnerHTML={{ __html: props.data[clickedIndex].input_format }}></p>
                        </div>}
                        {props.data[clickedIndex].output_format && <div id="problem-preview-data">
                            <h1 >Output Format : </h1>
                            <p className="ck-content" dangerouslySetInnerHTML={{ __html: props.data[clickedIndex].output_format }}></p>
                        </div>}
                        {props.data[clickedIndex].topics && <div id="problem-preview-data">
                            <h1 >Topics : </h1>
                            <p>{props.data[clickedIndex].topics}</p>
                        </div>}
                        {props.data[clickedIndex].public_test_cases.length != 0 && <div id="problem-preview-data">
                            <h1 >Public Test Cases : </h1>
                            {props.data[clickedIndex].public_test_cases.map((public_test_case, index) => (
                                <div key={index} className="problem-preview-data-icon" >
                                    <h1 >Test Case : {index}</h1>
                                    <div className="problem-test-case-preview-area">
                                        <p><span>Input</span><br></br>{public_test_case.input}</p>
                                        <hr></hr>
                                        <p><span>Output</span><br></br>{public_test_case.output}</p>
                                        <hr></hr>
                                        {public_test_case.explanation && <div><span>Explanation</span><br></br><p className="ck-content" dangerouslySetInnerHTML={{ __html: public_test_case.explanation }}></p></div>}
                                    </div>
                                </div>
                            ))}
                        </div>}
                        {props.data[clickedIndex].private_test_cases.length != 0 && <div id="problem-preview-data">
                            <h1 >Private Test Cases : </h1>
                            {props.data[clickedIndex].private_test_cases.map((private_test_case, index) => (
                                <div className="problem-test-case-preview-area">
                                    <p><span>Input</span><br></br>{private_test_case.input}</p>
                                    <hr></hr>
                                    <p><span>Output</span><br></br>{private_test_case.output}</p>
                                </div>
                            ))}
                        </div>}
                        <div id="problem-preview-data"><button className="btn btn-outline btn-success" onClick={() => {
                            setPreviewActive(false);
                        }}>Close Preview</button></div>
                    </div>
                </div>
            </>}
        </>
    )

}