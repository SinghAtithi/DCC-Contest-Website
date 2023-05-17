import { useRouter } from "next/router";
import {  useState ,useEffect } from "react";
import { useSelector } from "react-redux";
import SideNav from "../../../components/SideNavAdmin";
import checkToken from "../../../utils/checkToken";
import {
    ADMIN,
    END_USER,
    LOGIN_PAGE,
    SUPER_ADMIN,
    AdminSideNavMap,
    SEARCH_CONTESTS_ENDPOINT_BACKEND,
    CONTEST_SEARCH,
    BASE_URL
} from "../../../utils/constants";
import axios from "axios";
import Head from "next/head";
import ViewProblemSkeleton from "../../../components/skeleton/ViewProblemSkeleton";
import SearchBar from "../../../components/SearchBar";
import DisplayContestData from "../../../components/DisplayContestData";


const ViewContest = () => {
    const router = useRouter();
    const [search_option, SetSearchOption] = useState(2);
  const [search_text, setSearchText] = useState(true);
  const [data, setData] = useState([]);
  const [loadingSkeleton, setLoadingSkeleton] = useState(true);
  const [loadingButton, setLoadingButton] = useState("");

  const [message, setMessage] = useState("Nothing matches your current search.");

  const { role, loggedIn } = useSelector((state) => state.login);

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
            } else router.push(LOGIN_PAGE + "?next=admin/contest/view");
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
          console.log(err);
          setData([]);
          setLoadingButton("");
          setMessage("You have been logged out. Please login");
        });
    } else {
      setData([]);
      setLoadingButton("");
      setMessage("Cannot search with empty string or no filter.");
    }

    // setData([{ contest_id: "123", contest_name: "dummy1", ques_ids: [{ ques_id: "Trial_01", points: "100" }, { ques_id: "Trial_02", points: "200" }], creator: "ritik_kaushal", start_time: "18/05/2023 18:00", end_time: "18/05/2023 20:00", collaborators: ["ritik", "ABC"] }, { contest_id: "1234", contest_name: "dummy4", ques_ids: [{ ques_id: "Trial_03", points: "100" }, { ques_id: "Trial_04", points: "200" }], creator: "ritik_kaushal", start_time: "19/05/2023 18:00", end_time: "19/05/2023 20:00", collaborators: ["ritik", "DEF","GHI"] }])
  }

  return (
    <>
      <Head>
        <title>DCC : View Contests</title>
      </Head>
      <SideNav role="admin" highlight={AdminSideNavMap.view_contests} />
      {loadingSkeleton ? <>
        <ViewProblemSkeleton />
      </> : <>
        <div className="data-area">
          <SearchBar
            setFilter={SetSearchOption}
            filter={search_option}
            setText={setSearchText}
            text={search_text}
            search_options={CONTEST_SEARCH}
            triggerSearch={search_contests}
            loadingButton={loadingButton}
          />
          {data.length != 0 ? (
            <DisplayContestData
              data={data}
              setData={setData}
              heading={CONTEST_SEARCH[search_option]}
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
        </div>
      </>}
    </>
  );
};


export default ViewContest;
