import React from "react";
import SheetCards from "../../components/SheetCards";

function ProblemSetIndex() {
  return (
    <div className="flex flex-wrap justify-evenly px-100 mx-20 mt-10">
      <SheetCards
        imageURL="https://placeimg.com/400/225/arch"
        title="Striver Sheet"
        description="This is a Striver Sheet and it is very good."
      />
      <SheetCards
        imageURL="https://placeimg.com/400/225/arch"
        title="Striver Sheet"
        description="This is a Striver Sheet and it is very good."
      />
      <SheetCards
        imageURL="https://placeimg.com/400/225/arch"
        title="Striver Sheet"
        description="This is a Striver Sheet and it is very good."
      />
      <SheetCards
        imageURL="https://placeimg.com/400/225/arch"
        title="Striver Sheet"
        description="This is a Striver Sheet and it is very good."
      />
    </div>
  );
}

export default ProblemSetIndex;
