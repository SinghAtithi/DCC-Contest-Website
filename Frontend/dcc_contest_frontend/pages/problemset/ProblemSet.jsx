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
  const [loading,setLoading] = useState(true);

  useEffect(() => {
    const URL = `${BASE_URL}/question`;
    axios
      .get(URL)
      .then((res) => {
        setTotalPages(Math.ceil(res.data.length / 6));
        setProblems(res.data);
        setLoading(false);
      });
  }, []);

    if(loading) return <ProblemSetSkeleton />;

    return (
      <div className="mx-4">
        <div className="text-3xl m-4 flex items-center justify-center font-serif">
          Problem Set
        </div>
        <ProblemTable problems={problems} page={page} />
        <PageButtons setPage={setPage} totalPages={totalPages} page={page} setAlert={setAlert} />
        <AlertError alert={alert}/>
      </div>
    );
}



export default ProblemSet;
