import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { BASE_URL } from "../../utils/constants";
import AlertError from "./AlertError";
import ProblemTable from "../../components/problemset/ProblemTable";
import PageButtons from "./PageButtons";
import ProblemSetSkeleton from "./ProblemSetSkeleton";

function ProblemSet() {
  const [problems, setProblems] = React.useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [alert, setAlert] = useState(false);
  const [loading, setLoading] = useState(true);
  const [severeError, setSevereError] = useState(""); // Error in case backend is not able to give proper response

  useEffect(() => {
    const URL = `${BASE_URL}/question`;
    console.log(URL);
    axios
      .get(URL)
      .then((res) => {
        setTotalPages(Math.ceil(res.data.length / 6));
        setProblems(res.data);
        setLoading(false);
      }).catch((error) => {
        console.log(error);
        setSevereError("Network Error. Please check your internet connectivity.")
        setLoading(false);
      });
  }, []);

  if (loading) return <ProblemSetSkeleton />;

  return (
    <div className="mx-4">
      {severeError
        ?
        <div className='flex justify-center p-2'>
          <div className="alert alert-error shadow-lg w-fit">
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span>{severeError}</span>
            </div>
          </div>
        </div>
        : <>
          <div className="text-3xl m-4 flex items-center justify-center font-serif">
            Problem Set
          </div>
          <ProblemTable problems={problems} page={page} />
          <PageButtons setPage={setPage} totalPages={totalPages} page={page} setAlert={setAlert} />
          <AlertError alert={alert} />
        </>}
    </div>
  );
}



export default ProblemSet;
