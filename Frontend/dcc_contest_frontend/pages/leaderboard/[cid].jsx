import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Head from "next/head";
import { useRouter } from "next/router";
import LeaderboardProblemTable from "../../components/leaderboard/LeaderboardTable";
import TableSkeleton from "../../components/skeleton/TableSkeleton";
import { BASE_URL } from "../../utils/constants";
import axios from "axios";
import TheFooter from "../../components/Footer";

// Dummy data for the ranklist
// const rankListData = [
//   { id: 1, username: "ritik_kaushal", score: 22200, country: "USA" },
//   { id: 2, username: "coder_ravan", score: 12550, country: "Canada" },
//   { id: 3, username: "Mark Johnson", score: 1120, country: "Australia" },
//   { id: 4, username: "Mary Brown", score: 100, country: "USA" },
//   { id: 5, username: "Tom Wilson", score: 910, country: "UK" },
//   { id: 6, username: "Lily Chen", score: 810, country: "China" },
//   { id: 7, username: "Hiroshi Nakamura", score: 170, country: "Japan" },
//   { id: 8, username: "Maria Rodriguez", score: 160, country: "Spain" },
//   { id: 9, username: "Hans Schmidt", score: 510, country: "Germany" },
//   { id: 10, username: "Kim Min-ji", score: 140, country: "South Korea" },
//   { id: 11, username: "Sara Williams", score: 310, country: "UK" },
//   { id: 12, username: "Sofia Garcia", score: 210, country: "Spain" },
//   { id: 13, username: "Luisa Lopez", score: 110, country: "Spain" },
//   { id: 14, username: "Samantha Lee", score: 15, country: "South Korea" },
//   { id: 15, username: "Sofia Garcia", score: 20, country: "Spain" },
//   { id: 16, username: "Luisa Lopez", score: 10, country: "Spain" },
//   { id: 17, username: "Samantha Lee", score: 5, country: "South Korea" },
//   { id: 18, username: "Sofia Garcia", score: 20, country: "Spain" },
//   { id: 19, username: "Luisa Lopez", score: 10, country: "Spain" },
//   { id: 20, username: "Samantha Lee", score: 5, country: "South Korea" },
//   { id: 21, username: "Sofia Garcia", score: 20, country: "Spain" },
//   { id: 22, username: "Luisa Lopez", score: 10, country: "Spain" },
//   { id: 23, username: "Samantha Lee", score: 5, country: "South Korea" },
//   { id: 24, username: "Sofia Garcia", score: 20, country: "Spain" },
//   { id: 25, username: "Luisa Lopez", score: 10, country: "Spain" },
//   { id: 26, username: "Samantha Lee", score: 5, country: "South Korea" },
// ];

// import React from "react";

function ContestLeaderboard() {
  const router = useRouter();
  const { cid } = router.query;

  const [rankList, setRankList] = useState([]);
  const [ques_list, setQuesList] = useState([]);
  const [contest_name, setContestName] = useState("");
  const [loadingSkeleton, setLoadingSkeleton] = useState(true);
  const [severeError, setSevereError] = useState(""); // Error in case backend is not able to give proper response

  useEffect(() => {
    if (router.isReady) {
      const url = BASE_URL + `/contest/results/${cid}`;
      axios.get(url).then((res) => {
        const tempList = res.data.contest.result;

        tempList.sort(function (x, y) {
          if (x.points > y.points) {
            return -1;
          }
          if (x.points < y.points) {
            return 1;
          }
          return 0;
        });

        setRankList(tempList);
        setQuesList(res.data.contest.ques_ids);
        setContestName(res.data.contest.contest_name);
        setLoadingSkeleton(false);

      }).catch((error) => {
        if (error.response) {
          const statusCode = error.response.status;
          if (statusCode == 404) setSevereError("Contest not found");
          else setSevereError("Internal Server Error");

        }
        else if (error.request) {
          setSevereError("Network Error. Please check your internet connectivity.")
        }
        else {
          setSevereError("Something went wrong. Please reload")
        }
        setLoadingSkeleton(false);
      })
    }
  }, [router.isReady]);

  return (
    <>
      <Head><title>Leaderboard - {cid}</title></Head>
      <Navbar />
      <div className="content-area-top">
        <div className="p-2">
          {severeError
            ?
            <div className='flex justify-center'>
              <div className="alert alert-error shadow-lg w-fit">
                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <span>{severeError}</span>
                </div>
              </div>
            </div>
            :
            (loadingSkeleton ?
              <>
                <div className="flex justify-center">
                  <div className="animated-background mt-1" style={{ width: "30%", height: "30px" }}></div>
                </div>
                <TableSkeleton table_headers={["#", "Username", "Prob-1", "Prob-2", "Prob-3", "Total Score"]} rows={3} compact={true}/>
              </>
              :
              <>
                <h1 id="contest-main-heading">Leaderboard - {contest_name}</h1>
                <LeaderboardProblemTable results={rankList} ques_list={ques_list} />
              </>)}
        </div>
      </div>
      <TheFooter />
    </>
  );
}

export default ContestLeaderboard;




