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
    ADMIN_DASHBOARD,
    AdminSideNavMap,
    PROBLEM_SEARCH,
    BASE_URL,
    SEARCH_QUESIONS_ENDPOINT_BACKEND,
} from "../../../utils/constants";
import toggleLoaderBackdrop from "../../../utils/toggleCustomBackdrop";
import DisplayData from "../../../components/DisplayData";
import SearchBar from "../../../components/SearchBar";
import axios from "axios";

const ViewProblems = () => {
    const [search_option, SetSearchOption] = useState(5);
    const [search_text, setSearchText] = useState(true);
    const [data, setData] = useState([]);
    /* {
          Entire question data including test cases that has been created by the user
  
          {ques_id: "Trial-01",
          contest_id: "Dummy Contest",
          name: "Its a trial question",
          description: "<p>Hey hey hello</p>",
          constraints: "<p>Nothing such</p>",
          input_format: "<p>A single integer</p>",
          output_format: "<p>A single integer</p>",
          time_limit: 1,
          public_test_cases: [{input:"1", output:"1", explanation:""},{input:"2", output:"2", explanation:""}],
          private_test_cases: [{input:"3", output:"3"},{input:"4", output:"4"}],
          topics: "BasicIO, Maths",
          display_after: "07/03/2023 20:00",
          assigned: false,
          is_draft: false,
          author: "coder_ravan"}
      */

    const { role, isLoading, loggedIn } = useSelector((state) => state.login);

    const { asPath } = useRouter();

    useEffect(() => {
        toggleLoaderBackdrop();
        if (loggedIn && (role === ADMIN || role === SUPER_ADMIN))
            search_problems(true);
        else if (loggedIn && role === END_USER) Router.push(`/${username}`);
        else {
            checkToken().then((status) => {
                if (status.verified) {
                    if (status.role === ADMIN || status.role === SUPER_ADMIN) {
                        // FETCH data here
                        search_problems(true);
                    } else Router.push(`/${username}`);
                } else Router.push(LOGIN_PAGE + "?next=admin/problems/view");
            });
        }
    }, []);

    function search_problems(toggleLoader = false) {
        if (!toggleLoader) toggleLoaderBackdrop();
        if (search_text && search_option) {
            // Get the data from backend here.

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
                    // console.log(result);
                    setData(result.data.data);
                    toggleLoaderBackdrop();
                })
                .catch((err) => {
                    // error handling here
                    toggleLoaderBackdrop();
                    alert("Something went wrong");
                });
        } else {
            toggleLoaderBackdrop();
            alert("Cannot search with empty string or no filter.");
        }
    }

    return (
        <>
            <SideNav role="admin" highlight={AdminSideNavMap.view_problem} />
            <div className="data-area">
                <div className="view-problem-container">
                    <SearchBar
                        setFilter={SetSearchOption}
                        filter={search_option}
                        setText={setSearchText}
                        text={search_text}
                        search_options={PROBLEM_SEARCH}
                        triggerSearch={search_problems}
                    />
                    {data.length != 0 ? (
                        <DisplayData
                            data={data}
                            heading={PROBLEM_SEARCH[search_option]}
                        />
                    ) : (
                        <div>Nothing matches your current search.</div>
                    )}
                </div>
            </div>
        </>
    );
};

export default ViewProblems;
