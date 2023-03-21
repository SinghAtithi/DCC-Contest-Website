import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";

// Dummy data for the ranklist
const rankListData = [
  { id: 1, name: "John Doe", score: 200, country: "USA" },
  { id: 2, name: "Jane Smith", score: 150, country: "Canada" },
  { id: 3, name: "Mark Johnson", score: 1120, country: "Australia" },
  { id: 4, name: "Mary Brown", score: 100, country: "USA" },
  { id: 5, name: "Tom Wilson", score: 910, country: "UK" },
  { id: 6, name: "Lily Chen", score: 810, country: "China" },
  { id: 7, name: "Hiroshi Nakamura", score: 170, country: "Japan" },
  { id: 8, name: "Maria Rodriguez", score: 160, country: "Spain" },
  { id: 9, name: "Hans Schmidt", score: 510, country: "Germany" },
  { id: 10, name: "Kim Min-ji", score: 140, country: "South Korea" },
  { id: 11, name: "Sara Williams", score: 310, country: "UK" },
  { id: 12, name: "Sofia Garcia", score: 210, country: "Spain" },
  { id: 13, name: "Luisa Lopez", score: 110, country: "Spain" },
  { id: 14, name: "Samantha Lee", score: 15, country: "South Korea" },
  { id: 15, name: "Sofia Garcia", score: 20, country: "Spain" },
  { id: 16, name: "Luisa Lopez", score: 10, country: "Spain" },
  { id: 17, name: "Samantha Lee", score: 5, country: "South Korea" },
  { id: 18, name: "Sofia Garcia", score: 20, country: "Spain" },
  { id: 19, name: "Luisa Lopez", score: 10, country: "Spain" },
  { id: 20, name: "Samantha Lee", score: 5, country: "South Korea" },
  { id: 21, name: "Sofia Garcia", score: 20, country: "Spain" },
  { id: 22, name: "Luisa Lopez", score: 10, country: "Spain" },
  { id: 23, name: "Samantha Lee", score: 5, country: "South Korea" },
  { id: 24, name: "Sofia Garcia", score: 20, country: "Spain" },
  { id: 25, name: "Luisa Lopez", score: 10, country: "Spain" },
  { id: 26, name: "Samantha Lee", score: 5, country: "South Korea" },
];

// import React from "react";

function ranklist() {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const dataPerPage = 10;

  useEffect(() => {
    setTotalPages(Math.ceil(rankListData.length / 10));
    rankListData.sort(function (x, y) {
      if (x.score > y.score) {
        return -1;
      }
      if (x.score < y.score) {
        return 1;
      }
      return 0;
    });
  }, []);

  return (
    <div>
      <Navbar />
      <div className="text-3xl m-4 flex items-center justify-center font-mono">
        Ranklist
      </div>
      {/* Heading of the ranklist */}
      <div className="bg-grey-200 shadow-lg shadow-grey-500/50 grid grid-cols-4 gap-4 text-lg font-serif text-slate-50  py-2 my-2 border-b-2 border-slate-500">
        <div className="px-6">Rank</div>
        <div className="col-span-2 px-6">Name</div>
        <div className="px-6">Score</div>
      </div>

      {/* Ranklist data */}
      {rankListData
        .slice((page - 1) * dataPerPage, page * dataPerPage)
        .map((item, index) => (
          <div
            className={`bg-gray-800 grid grid-cols-4 gap-4 text-lg font-serif text-gray-200 py-2 my-2 border-b-2 border-gray-500 ${
              index > -1 ? "font-bold" : ""
            }`}
            key={item.id}
          >
            <div className="px-6">{(page - 1) * dataPerPage + index + 1}</div>
            <div className="col-span-2 px-6">
              <a
                href="https://codeforces.com/profile/coder_ravan"
                className="text-green-400"
              >
                {item.name}
              </a>
            </div>
            <div className="px-6">{item.score}</div>
          </div>
        ))}

      {/* Pagination */}

      <div className="my-4 flex justify-center">
        <button
          className={`btn mx-1`}
          onClick={() => setPage(Math.max(1, page - 1))}
        >
          Prev
        </button>
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (num) => (
            <button
              className={`btn btn-success mx-1 ${
                num == page ? "btn-outline" : ""
              }`}
              onClick={() => setPage(num)}
            >
              {num}
            </button>
          )
        )}
        <button
          className={`btn mx-1`}
          onClick={() => setPage(Math.min(totalPages, page + 1))}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default ranklist;
