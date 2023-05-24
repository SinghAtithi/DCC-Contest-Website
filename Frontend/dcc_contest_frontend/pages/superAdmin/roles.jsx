import Router, { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SideNav from "../../components/SideNavAdmin";
import checkToken from "../../utils/checkToken";
import {
    BASE_URL,
    ADMIN,
    END_USER,
    LOGIN_PAGE,
    SUPER_ADMIN,
    AdminSideNavMap,
    SEARCH_CONTESTS_ENDPOINT_BACKEND,
    UPDATE_RATINGS_CONTEST_ENDPOINT_BACKEND,
    UPDATE_ROLE_ENDPOINT_BACKEND,
    SEARCH_USER_ENDPOINT_BACKEND,
    ADMIN_DASHBOARD
} from "../../utils/constants";
import SearchBar from "../../components/SearchBar";
import Head from "next/head";
import axios from "axios";
import { AiOutlineClose } from "react-icons/ai";
import ViewContestSkeleton from "../../components/skeleton/ViewContestSkeleton";



const toastCross = {
    position: "absolute",
    top: "2px",
    right: "2px",
};


export default function AssignRoles() {
    const router = useRouter();
    const { role, loggedIn, username } = useSelector((state) => state.login);

    const [search_option, SetSearchOption] = useState(0);
    const [search_text, setSearchText] = useState("");
    const [data, setData] = useState();

    const SEARCH_FILTERS = ["name", "username", "email"]

    const [loadingSkeleton, setLoadingSkeleton] = useState(true);
    const [loadingButton, setLoadingButton] = useState("");
    const [tableActive, setTableActive] = useState(false);
    const [updateButtonLoading, setUpdateButtonLoading] = useState([]);
    const [message, setMessage] = useState("Nothing matches your current search.");

    const [toastActive, setToastActive] = useState(false);
    const [toastMessage, setToastMessage] = useState([]);
    const [toastClass, setToastClass] = useState(
        "alert alert-error relative"
    );


    const [roleFilter, setRoleFilter] = useState(0); // 0 -  end_user, 1 - admin, 2 - super_admin


    useEffect(() => {
        if (loggedIn && role === SUPER_ADMIN) {
            setLoadingSkeleton(false);
        }
        else if (loggedIn && role === ADMIN) router.push(ADMIN_DASHBOARD);
        else if (loggedIn && role === END_USER) router.push(`/${username}`);
        else {
            setLoadingSkeleton(true);
            checkToken().then((status) => {
                if (status.verified) {
                    if (status.role === SUPER_ADMIN) setLoadingSkeleton(false);
                    else if (role === ADMIN) router.push(ADMIN_DASHBOARD);
                    else router.push(`/${username}`);
                } else router.push(LOGIN_PAGE + "?next=superAdmin/roles");
            });
        }
    }, []);

    function search_users() {
        setLoadingButton("loading");
        if (search_text && search_option) {
            const url = BASE_URL + SEARCH_USER_ENDPOINT_BACKEND;
            const body = {
                searchFilter: search_option,
                searchString: search_text,
                selectString: "name username email role"
            };
            const options = {
                headers: {
                    "Content-Type": "application/json",
                },
            };
            axios
                .post(url, body, options)
                .then((result) => {
                    if (result.data.length === 0) {
                        setData([]);
                        setUpdateButtonLoading([]);
                        setMessage("Nothing matches your current search.");
                    }
                    else {
                        setData(result.data);
                        setUpdateButtonLoading(Array(result.data.length).fill(""));
                        setTableActive(true);
                    }
                    setLoadingButton("");
                })
                .catch((err) => {

                    setData([]);
                    setUpdateButtonLoading([]);
                    setLoadingButton("");
                    setTableActive(false);
                    if (err.response) {
                        const statusCode = err.response.status;
                        if (statusCode == 401) setMessage("Your session has expired. Please login again");
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

    function handleUpdateRoles(index) {
        setUpdateButtonLoading((prevLoadingStates) => {
            const newLoadingStates = [...prevLoadingStates];
            newLoadingStates[index] = "loading";
            return newLoadingStates;
        });
        const new_role = roleFilter == 0 ? "end_user" : (roleFilter == 1 ? "admin" : (roleFilter == 2 ? "super_admin" : "NA"));
        if (new_role !== "NA") {
            const url = BASE_URL + UPDATE_ROLE_ENDPOINT_BACKEND;
            const body = {
                username: data[index].username,
                new_role: new_role
            }
            const options = {
                headers: {
                    "Content-Type": "application/json",
                    token: localStorage.getItem("token"),
                },
            };

            axios.post(url, body, options).then((res) => {
                setToastClass("alert alert-success relative");
                setToastMessage(["Role Updated Successfully."]);
                setToastActive(true);

                setData((prevData) => {
                    const newData = [...prevData];
                    newData[index].role = new_role;
                    return newData;
                });

                setUpdateButtonLoading((prevLoadingStates) => {
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
                setUpdateButtonLoading((prevLoadingStates) => {
                    const newLoadingStates = [...prevLoadingStates];
                    newLoadingStates[index] = "";
                    return newLoadingStates;
                });
            })
        }
        else {
            setToastClass("alert alert-error relative");
            setToastMessage(["Please select a new role."]);
            setLoadingButton("");
            setToastActive(true);
            setUpdateButtonLoading((prevLoadingStates) => {
                const newLoadingStates = [...prevLoadingStates];
                newLoadingStates[index] = "";
                return newLoadingStates;
            });

        }
    }

    return (
        <>
            <Head>
                <title>DCC : Assign/Revoke Roles</title>
            </Head>
            <SideNav role={role} highlight={AdminSideNavMap.assign_revoke_roles} />
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
                    triggerSearch={search_users}
                    loadingButton={loadingButton}
                />

                {data && data.length != 0 ? (tableActive && <>
                    <div className="flex justify-center pb-2">
                        <div className="alert alert-info shadow-lg !w-fit">
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current flex-shrink-0 w-6 h-6 text-black"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                <span className="text-black">Search results based on {SEARCH_FILTERS[search_option]}</span>
                            </div>
                        </div>
                    </div>
                    <div className="overflow-auto p-2">
                        <table className="table w-full table-compact custom-table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Username</th>
                                    <th>Current Role</th>
                                    <th>New Role</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((user, index) => (
                                    <tr key={index} className="hover">
                                        <th>{index + 1}</th>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.username}</td>
                                        <td>{user.role}</td>
                                        <td>
                                            <select className="select max-w-sm" onClick={(e) => {
                                                setRoleFilter(e.target.value);
                                            }}>
                                                <option disabled>Select an option</option>
                                                <option value={0} selected={user.role == "end_user" ? "selected" : ""}>end_user</option>
                                                <option value={1} selected={user.role == "admin" ? "selected" : ""}>admin</option>
                                                <option value={2} selected={user.role == "super_admin" ? "selected" : ""}>super_admin</option>
                                            </select>
                                        </td>
                                        <td><button className={`btn btn-outline btn-info rounded btn-sm ${updateButtonLoading[index]}`} onClick={() => { handleUpdateRoles(index) }}>Update</button></td>
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
