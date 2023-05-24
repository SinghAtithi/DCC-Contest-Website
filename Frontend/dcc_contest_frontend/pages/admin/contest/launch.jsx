import Router, { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SideNav from "../../../components/SideNavAdmin";
import checkToken from "../../../utils/checkToken";
import {
    BASE_URL,
    ADMIN,
    END_USER,
    LOGIN_PAGE,
    SUPER_ADMIN,
    AdminSideNavMap,
    LAUNCH_CANCEL_CONTEST_ENDPOINT_BACKEND,
    SEARCH_CONTESTS_ENDPOINT_BACKEND
} from "../../../utils/constants";
import SearchBar from "../../../components/SearchBar";
import Head from "next/head";
import axios from "axios";
import { AiOutlineClose } from "react-icons/ai";
import ViewContestSkeleton from "../../../components/skeleton/ViewContestSkeleton";



const toastCross = {
    position: "absolute",
    top: "2px",
    right: "2px",
};


const LaunchContest = () => {
    const router = useRouter();

    const [search_option, SetSearchOption] = useState("");
    const [search_text, setSearchText] = useState("");
    const [data, setData] = useState([]);
    const [loadingSkeleton, setLoadingSkeleton] = useState(true);
    const [loadingButton, setLoadingButton] = useState("");
    const [tableActive, setTableActive] = useState(false);
    const [cancelContestButtonLoading, setCancelContestButtonLoading] = useState([]);
    const [launchContestButtonLoading, setLaunchContestButtonLoading] = useState([]);

    const SEARCH_FILTERS = ["contest_name", "contest_id"]
    const [message, setMessage] = useState("Nothing matches your current search.");
    const { role, loggedIn } = useSelector((state) => state.login);

    const [toastActive, setToastActive] = useState(false);
    const [toastMessage, setToastMessage] = useState([]);
    const [toastClass, setToastClass] = useState(
        "alert alert-error relative"
    );


    useEffect(() => {
        if (loggedIn && (role === ADMIN || role === SUPER_ADMIN)) {
            setLoadingSkeleton(false);
        }
        else if (loggedIn && role === END_USER) Router.push(`/${username}`);
        else {
            setLoadingSkeleton(true);
            checkToken().then((status) => {
                if (status.verified) {
                    if (status.role === ADMIN || status.role === SUPER_ADMIN) {
                        setLoadingSkeleton(false);
                    } else router.push(`/${username}`);
                } else router.push(LOGIN_PAGE + "?next=admin/contest/launch");
            });
        }
    }, []);

    function search_contests() {
        setLoadingButton("loading");
        if (search_text && search_option) {
            const url = BASE_URL + SEARCH_CONTESTS_ENDPOINT_BACKEND;
            const body = {
                searchFilter: search_option,
                searchString: search_text,
                selectString: "contest_id contest_name launched"
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
                    if (result.data.data.length === 0) {
                        setData([]);
                        setCancelContestButtonLoading([]);
                        setLaunchContestButtonLoading([]);
                        setMessage("Nothing matches your current search.");

                    }
                    else {
                        setData(result.data.data);
                        setCancelContestButtonLoading(Array(result.data.data.length).fill(""));
                        setLaunchContestButtonLoading(Array(result.data.data.length).fill(""));
                        setTableActive(true);
                    }
                    setLoadingButton("");
                })
                .catch((err) => {

                    setData([]);
                    setUpdateRatingButtonLoading([]);
                    setLoadingButton("");
                    setTableActive(false);
                    if (err.response) {
                        const statusCode = err.response.status;
                        if (statusCode == 401) setMessage("Your session has expired. Please login again.");
                        else setMessage("Internal Server Error");

                    }
                    else if (err.request) {
                        setMessage("Network Error. Please check your internet connectivity.")
                    }
                    else setMessage("Something went wrong. Please relaod.");
                });
        } else {

            setData([]);
            setLoadingButton("");
            setTableActive(false);
            setMessage("Cannot search with empty string or no filter.");
        }
    }

    function handleCancelContest(contest_id, index) {
        setCancelContestButtonLoading((prevLoadingStates) => {
            const newLoadingStates = [...prevLoadingStates];
            newLoadingStates[index] = "loading";
            return newLoadingStates;
        });
        const url = BASE_URL + LAUNCH_CANCEL_CONTEST_ENDPOINT_BACKEND;
        const body = {
            type: "cancel",
            contest_id: contest_id
        }
        const options = {
            headers: {
                "Content-Type": "application/json",
                token: localStorage.getItem("token"),
            },
        };
        axios.put(url, body, options).then((res) => {
            const updatedData = [...data];
            updatedData[index].launched = false;
            setData(updatedData);
            setToastClass("alert alert-success relative");
            setToastMessage(["Contest successfully cancelled."]);
            setToastActive(true);
            setCancelContestButtonLoading((prevLoadingStates) => {
                const newLoadingStates = [...prevLoadingStates];
                newLoadingStates[index] = "";
                return newLoadingStates;
            });
        }).catch((err) => {
            setToastClass("alert alert-error relative");
            if (err.response) {
                const statusCode = err.response.status;
                if (statusCode == 401) setToastMessage(["Your session has expired. Please login again"]);
                else if (Array.isArray(err.response.data)) {
                    let errorArray = err.response.data.map(error => `Error in ${error.error_field} - ${error.error_message}`);
                    setToastMessage(errorArray);
                }
                else setToastMessage(["Internal Server Error"]);
            }
            else if (err.request) setToastMessage(["Network Error. Please check your internet connectivity."]);
            else setToastMessage(["Something went wrong."]);


            setLoadingButton("");
            setToastActive(true);
            setCancelContestButtonLoading((prevLoadingStates) => {
                const newLoadingStates = [...prevLoadingStates];
                newLoadingStates[index] = "";
                return newLoadingStates;
            });
        })
    }

    function handleLaunchContest(contest_id, index) {
        setLaunchContestButtonLoading((prevLoadingStates) => {
            const newLoadingStates = [...prevLoadingStates];
            newLoadingStates[index] = "loading";
            return newLoadingStates;
        });
        const url = BASE_URL + LAUNCH_CANCEL_CONTEST_ENDPOINT_BACKEND;
        const body = {
            type: "launch",
            contest_id: contest_id
        }
        const options = {
            headers: {
                "Content-Type": "application/json",
                token: localStorage.getItem("token"),
            },
        };
        axios.put(url, body, options).then((res) => {
            const updatedData = [...data];
            updatedData[index].launched = true;
            setData(updatedData);
            setToastClass("alert alert-success relative");
            setToastMessage(["Contest successfully launched"]);
            setToastActive(true);
            setLaunchContestButtonLoading((prevLoadingStates) => {
                const newLoadingStates = [...prevLoadingStates];
                newLoadingStates[index] = "";
                return newLoadingStates;
            });
        }).catch((err) => {
            setToastClass("alert alert-error relative");
            if (err.response) {
                const statusCode = err.response.status;
                if (statusCode == 401) setToastMessage(["Your session has expired. Please login again"]);
                else if (Array.isArray(err.response.data)) {
                    let errorArray = err.response.data.map(error => `Error in ${error.error_field} - ${error.error_message}`);
                    setToastMessage(errorArray);
                }
                else setToastMessage(["Internal Server Error"]);
            }
            else if (err.request) setToastMessage(["Network Error. Please check your internet connectivity."]);
            else setToastMessage(["Something went wrong."]);

            setLoadingButton("");
            setToastActive(true);
            setLaunchContestButtonLoading((prevLoadingStates) => {
                const newLoadingStates = [...prevLoadingStates];
                newLoadingStates[index] = "";
                return newLoadingStates;
            });
        })
    }

    return (
        <>
            <Head>
                <title>DCC : Launch Contests</title>
            </Head>
            <SideNav role={role} highlight={AdminSideNavMap.launch_contest} />
            {loadingSkeleton ? <ViewContestSkeleton /> : <div className="data-area">
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
                <SearchBar
                    setFilter={SetSearchOption}
                    filter={search_option}
                    setText={setSearchText}
                    text={search_text}
                    search_options={SEARCH_FILTERS}
                    triggerSearch={search_contests}
                    loadingButton={loadingButton}
                />

                {data && data.length != 0 ? (tableActive && <>
                    <div className="flex justify-center pb-2">
                        <div className="alert alert-info shadow-lg !w-fit">
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current flex-shrink-0 w-6 h-6 text-black"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                <span className="text-black">Search results based on property {SEARCH_FILTERS[search_option]}</span>
                            </div>
                        </div>
                    </div>
                    <div className="overflow-auto p-2">
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
                                {data.map((contest, index) => (
                                    <tr key={index} className="hover">
                                        <th>{index + 1}</th>
                                        <td>{contest.contest_id}</td>
                                        <td>{contest.contest_name}</td>
                                        <td>
                                            {contest.launched ?
                                                <span className="px-1">
                                                    <button className={`btn btn-outline btn-info min-w-fit w-20 min-h-8 h-8 ${cancelContestButtonLoading[index]}`} onClick={() => { handleCancelContest(contest.contest_id, index) }}>
                                                        Cancel Contest
                                                    </button>
                                                </span>
                                                :
                                                <span className="px-1">
                                                    <button className={`btn btn-outline btn-info min-w-fit w-20 min-h-8 h-8 ${launchContestButtonLoading[index]}`} onClick={() => { handleLaunchContest(contest.contest_id, index) }}>
                                                        Launch
                                                    </button>
                                                </span>
                                            }
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>) : <div className="flex justify-center">
                    <div className="alert alert-warning shadow-lg !w-fit">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                            <span>{message}</span>
                        </div>
                    </div>
                </div>}


            </div>}
        </>
    );
};

export default LaunchContest;