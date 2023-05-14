import { useRouter } from "next/router";
import Navbar from "../../components/Navbar";
import Head from "next/head";
import problemTable from "../../components/contest/problemTable";
const { BASE_URL } = require("../../utils/constants");
import axios from "axios";
import { useEffect, useState } from "react";
import React from "react";

const contestPage = () => {
  const router = useRouter();
  const { cid } = router.query;

  const [problems, setProblems] = React.useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const URL = `${BASE_URL}/question`;
    axios.get(URL).then((res) => {
      setTotalPages(Math.ceil(res.data.length / 6));
      setProblems(res.data);
    });
  }, []);

  return (
    <div>
      <Head>
        <title>Contest - {cid}</title>
      </Head>
      <Navbar />

      <div className="main-nav-content-area flex flex-col">
        <div className="text-2xl self-center my-2">Contest Page - {cid}</div>
        <div className="px-2">
          {problems.length != 0 && (
            <problemTable problems={problems} page={page} cid={cid} />
          )}
        </div>
      </div>
    </div>
  );
};

export default contestPage;
