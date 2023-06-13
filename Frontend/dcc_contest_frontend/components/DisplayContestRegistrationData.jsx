import { useEffect, useState } from "react";
import { BASE_URL, DELETE_CONTEST_ENDPOINT_BACKEND, DELETE_QUESION_ENDPOINT_BACKEND } from "../utils/constants";
import { useRouter } from "next/router";
import axios from "axios";


export default function DisplayContestRegistrationData(props) {
    const router = useRouter();

    const [clickedIndex, setClickedIndex] = useState(0);
    const [previewActive, setPreviewActive] = useState(false);

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
                                <th>Contest ID</th>
                                <th>Contest Name</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.data.map((contest, index) => (
                                <tr key={index} className="hover">
                                    <th>{index + 1}</th>
                                    <td>{contest.contest_id}</td>
                                    <td>{contest.contest_name}</td>
                                    <td>
                                        <span className="px-1">
                                            <button className="btn btn-outline btn-info min-h-8 h-8 min-w-fit w-20" onClick={() => {
                                                setClickedIndex(index);
                                                setPreviewActive(true);
                                            }}>
                                                View Registrations
                                            </button>
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div></>}


            {previewActive && <><h3 className="font-bold text-lg flex justify-center">Regstration Details</h3>
                <div className="contest_preview_area">
                    <div className="contest-preview-content">
                        {props.data[clickedIndex].contest_name && <div id="contest-preview-data">
                            <h1 >Contest Name : </h1>
                            <p>{props.data[clickedIndex].contest_name}</p>
                        </div>}
                        <br />
                        <div id="contest-preview-data">
                            <h1 > Registrations : </h1>
                            {props.data[clickedIndex].registrations && props.data[clickedIndex].registrations.length != 0 ?
                                <DisplayUser registrations={props.data[clickedIndex].registrations} />
                                : <p>No Registrations</p>}
                        </div>
                        <br />
                        <div id="contest-preview-data"><button className="btn btn-outline btn-success" onClick={() => {
                            setPreviewActive(false);
                        }}>Close Preview</button></div>
                    </div>
                </div>
            </>}
        </div>
    )

}


function DisplayUser(props) {
    return (
        <div className="overflow-x-auto">
            <table className="table w-full table-compact custom-table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>username</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {props.registrations.map((user, index) => (
                        <tr key={index} className="hover cursor-pointer">
                            <th>{index + 1}</th>
                            <td>{user}</td>
                            <td>
                                <span className="px-1">
                                    <button className="btn btn-outline btn-info min-h-8 h-8 min-w-fit w-20" disabled>
                                        Unregister
                                    </button>
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}