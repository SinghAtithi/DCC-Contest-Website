import { useEffect, useState } from "react";
import { BASE_URL, DELETE_CONTEST_ENDPOINT_BACKEND, DELETE_QUESION_ENDPOINT_BACKEND } from "../utils/constants";
import { useRouter } from "next/router";
import axios from "axios";


export default function DisplayContestData(props) {
    const router = useRouter();

    const [clickedIndex, setClickedIndex] = useState(0);
    const [previewActive, setPreviewActive] = useState(false);
    const [deleteButtonLoading, setDeleteButtonLoading] = useState([]);

    useEffect(() => {
        setDeleteButtonLoading(Array(props.data.length).fill(""));
    }, [props.data]);

    function handleDeleteContest(contest_id, index) {
        setDeleteButtonLoading((prevLoadingStates) => {
            const newLoadingStates = [...prevLoadingStates];
            newLoadingStates[index] = "loading";
            return newLoadingStates;
        });
        const url = BASE_URL + DELETE_CONTEST_ENDPOINT_BACKEND + `/${contest_id}`;
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
            setDeleteButtonLoading((prevLoadingStates) => {
                const newLoadingStates = [...prevLoadingStates];
                newLoadingStates[index] = "";
                return newLoadingStates;
            });
        }).catch((error) => {
            if (error.data && error.data.error)
                alert(error.data.error);
            else alert("You have been logged out. Please login");
            setDeleteButtonLoading((prevLoadingStates) => {
                const newLoadingStates = [...prevLoadingStates];
                newLoadingStates[index] = "";
                return newLoadingStates;
            });
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
                                                View
                                            </button>
                                        </span>
                                        <span className="px-1">
                                            <button className="btn btn-outline btn-info min-w-fit w-20 min-h-8 h-8" onClick={() => {
                                                router.push(`/admin/contest/create?edit=${contest.contest_id}`)
                                            }}>
                                                Edit
                                            </button>
                                        </span>
                                        <span className="px-1">
                                            <button className={`btn btn-outline btn-info min-w-fit w-20 min-h-8 h-8 ${deleteButtonLoading[index]}`} onClick={() => { handleDeleteContest(contest.contest_id, index) }}>
                                                Delete
                                            </button>
                                        </span>
                                        <span className="px-1">
                                            <button className={`btn btn-outline btn-info min-w-fit w-20 min-h-8 h-8`} onClick={() => { router.push(`/admin/contest/stats?id=${contest.contest_id}`) }}>
                                                Statistics
                                            </button>
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div></>}


            {previewActive && <><h3 className="font-bold text-lg flex justify-center">Contest Details</h3>
                <div className="contest_preview_area">
                    <div className="contest-preview-content">
                        {props.data[clickedIndex].creator && <div id="contest-preview-data">
                            <h1 >Creator : </h1>
                            <p>{props.data[clickedIndex].creator}</p>
                        </div>}
                        <br />
                        {props.data[clickedIndex].contest_id && <div id="contest-preview-data">
                            <h1 >Contest ID : </h1>
                            <p>{props.data[clickedIndex].contest_id}</p>
                        </div>}
                        <br />
                        {props.data[clickedIndex].contest_name && <div id="contest-preview-data">
                            <h1 >Contest Name : </h1>
                            <p>{props.data[clickedIndex].contest_name}</p>
                        </div>}
                        <br />
                        {props.data[clickedIndex].start_time && <div id="contest-preview-data">
                            <h1 >Start Time : </h1>
                            <p>{props.data[clickedIndex].start_time}</p>
                        </div>}
                        <br />
                        {props.data[clickedIndex].end_time && <div id="contest-preview-data">
                            <h1 >End Time : </h1>
                            <p>{props.data[clickedIndex].end_time}</p>
                        </div>}
                        <br />
                        {props.data[clickedIndex].ques_ids && props.data[clickedIndex].ques_ids.length != 0 && <div id="contest-preview-data">
                            <h1 >Questions Assigned : </h1>
                            <DisplayQuestion ques_ids={props.data[clickedIndex].ques_ids} />
                        </div>}

                        {props.data[clickedIndex].collaborators && props.data[clickedIndex].collaborators.length != 0 && <div id="contest-preview-data">
                            <h1 >Collaborators : </h1>
                            {props.data[clickedIndex].collaborators.map((username, ind) => (
                                <p key={ind}>{ind + 1} : {username}</p>
                            ))}
                        </div>}
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


function DisplayQuestion(props) {
    return (
        <div className="overflow-x-auto">
            <table className="table w-full custom-table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Ques ID</th>
                        <th>Points</th>
                    </tr>
                </thead>
                <tbody>
                    {props.ques_ids.map((ques, index) => (
                        <tr key={ques.ques_id} className="hover cursor-pointer">
                            <th>{index + 1}</th>
                            <td>{ques.ques_id}</td>
                            <td>{ques.points}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}