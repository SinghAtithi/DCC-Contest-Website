import React from "react";

function shivendu() {
  let names = [
    "Lorem",
    "ipsum",
    "dolor",
    "sit",
    "amet",
    "consectetur",
    "adipisicing",
    "elit.",
    "Laudantium,",
    "deleniti",
    "nesciunt",
    "praesentium",
    "a",
    "odio",
    "alias",
    "voluptas",
    "inventore",
    "eius",
    "vel",
    "labore",
    "exercitationem",
    "facere",
    "nobis",
    "obcaecati",
    "aspernatur",
    "delectus.",
    "Est",
    "totam",
    "dignissimos",
    "deleniti.",
  ];

  const [pageNo, setPageNo] = React.useState(1);

  const nextClick = () => {
    setPageNo(pageNo + 1);
  };

  const prevClick = () => {
    setPageNo(pageNo - 1);
  };

  return (
    <div>
      {names.slice(pageNo * 5, pageNo * 5 + 5).map((name, index) => (
        <div key={index}>{name}</div>
      ))}
      <button onClick={nextClick}>Next</button>
      <button onClick={prevClick}>Prev</button>
    </div>
  );
}

export default shivendu;
