import Router, { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SideNav from "../../../components/SideNavAdmin";
import checkToken from "../../../utils/checkToken";
import {
    ADMIN,
    END_USER,
    LOGIN_PAGE,
    SUPER_ADMIN,
    AdminSideNavMap,
    PROBLEM_SEARCH,
    BASE_URL,
    SEARCH_QUESIONS_ENDPOINT_BACKEND,
} from "../../../utils/constants";
import DisplayProblemData from "../../../components/DisplayProblemData";
import SearchBar from "../../../components/SearchBar";
import axios from "axios";
import SideNavSkeleton from "../../../components/skeleton/SideNavSkeleton";
import ViewProblemSkeleton from "../../../components/skeleton/ViewProblemSkeleton";
import Head from "next/head";

const ViewProblems = () => {
    const [search_option, SetSearchOption] = useState(5);
    const [search_text, setSearchText] = useState(true);
    const [data, setData] = useState([]);
    const [loadingSkeleton, setLoadingSkeleton] = useState(true);
    const [loadingButton, setLoadingButton] = useState("");

    const [message, setMessage] = useState("Nothing matches your current search.");

    const { role, loggedIn } = useSelector((state) => state.login);
    const { asPath } = useRouter();

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
                    } else Router.push(`/${username}`);
                } else Router.push(LOGIN_PAGE + "?next=admin/problems/view");
            });
        }
    }, []);

    function search_problems() {
        setLoadingButton("loading");
        if (search_text && search_option) {
            const url = BASE_URL + SEARCH_QUESIONS_ENDPOINT_BACKEND;
            const body = {
                searchFilter: search_option,
                searchString: search_text,
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
                    setData(result.data.data);
                    setLoadingButton("");
                })
                .catch((err) => {
                    setData([]);
                    setLoadingButton("");
                    setMessage("You have been logged out. Please login");
                });
        } else {
            setData([]);
            setLoadingButton("");
            setMessage("Cannot search with empty string or no filter.");
        }

    }

    return (
        <>
            <Head>
                <title>DCC : View Problems</title>
            </Head>
            <SideNav role="admin" highlight={AdminSideNavMap.view_problem} />
            {loadingSkeleton ? <>
                <ViewProblemSkeleton />
            </> : <>
                <div className="data-area">
                    <SearchBar
                        setFilter={SetSearchOption}
                        filter={search_option}
                        setText={setSearchText}
                        text={search_text}
                        search_options={PROBLEM_SEARCH}
                        triggerSearch={search_problems}
                        loadingButton={loadingButton}
                    />
                    {data.length != 0 ? (
                        <DisplayProblemData
                            data={data}
                            setData={setData}
                            heading={PROBLEM_SEARCH[search_option]}
                        />
                    ) : (
                        <div className="flex justify-center">
                            <div className="alert alert-warning shadow-lg !w-fit">
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                                    <span>{message}</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div></>}
        </>
    );
};

export default ViewProblems;
