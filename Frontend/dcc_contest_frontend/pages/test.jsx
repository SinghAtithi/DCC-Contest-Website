import { useState } from "react";
import DisplayData from "../components/DisplayData";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import SideNav from "../components/SideNavAdmin";
import { AdminSideNavMap, PROBLEM_SEARCH } from "../utils/constants";
import toggleLoaderBackdrop from "../utils/toggleCustomBackdrop";

const problems = [
  {
    name: "abc",
    ques_no: 1,
    topics: "a b c",
    ques_status: false,
  },
  {
    name: "abc",
    ques_no: 1,
    topics: "d e f",
    ques_status: false,
  },
  {
    name: "abc",
    ques_no: 1,
    topics: "g h i",
    ques_status: true,
  },
  {
    name: "abc",
    ques_no: 1,
    topics: "j k l",
    ques_status: false,
  },
  {
    name: "abc",
    ques_no: 1,
    topics: "m n o",
    ques_status: false,
  },
  {
    name: "abc",
    ques_no: 1,
    topics: "p q r",
    ques_status: false,
  },
  {
    name: "abc",
    ques_no: 1,
    topics: "s t u",
    ques_status: true,
  },
];

export default function test() {
  const [search_option, SetSearchOption] = useState(5);
  const [search_text, setSearchText] = useState("");
  const [data, setData] = useState([
    {
      ques_id: "Trial-01",
      contest_id: "Dummy Contest",
      name: "Its a trial question",
      description: "<p>Hey hey hello</p>",
      constraints: "<p>Nothing such</p>",
      input_format: "<p>A single integer</p>",
      output_format: "<p>A single integer</p>",
      time_limit: 1,
      public_test_cases: [
        { input: "1", output: "1", explanation: "" },
        { input: "2", output: "2", explanation: "" },
      ],
      private_test_cases: [
        { input: "3", output: "3" },
        { input: "4", output: "4" },
      ],
      topics: "BasicIO, Maths",
      display_after: "07/03/2023 20:00",
      assigned: false,
      is_draft: false,
      author: "coder_ravan",
    },
    {
      ques_id: "Trial-02",
      contest_id: "Dummy Contest",
      name: "Its a trial question",
      description: "<p>Hey hey hello</p>",
      constraints: "<p>Nothing such</p>",
      input_format: "<p>A single integer</p>",
      output_format: "<p>A single integer</p>",
      time_limit: 1,
      public_test_cases: [
        { input: "1", output: "1", explanation: "" },
        { input: "2", output: "2", explanation: "" },
      ],
      private_test_cases: [
        { input: "3", output: "3" },
        { input: "4", output: "4" },
      ],
      topics: "BasicIO, Maths",
      display_after: "07/03/2023 20:00",
      assigned: false,
      is_draft: false,
      author: "coder_ravan",
    },
    {
      ques_id: "Trial-03",
      contest_id: "Dummy Contest",
      name: "Its a trial question",
      description: "<p>Hey hey hello</p>",
      constraints: "<p>Nothing such</p>",
      input_format: "<p>A single integer</p>",
      output_format: "<p>A single integer</p>",
      time_limit: 1,
      public_test_cases: [
        { input: "1", output: "1", explanation: "" },
        { input: "2", output: "2", explanation: "" },
      ],
      private_test_cases: [
        { input: "3", output: "3" },
        { input: "4", output: "4" },
      ],
      topics: "BasicIO, Maths",
      display_after: "07/03/2023 20:00",
      assigned: false,
      is_draft: false,
      author: "coder_ravan",
    },
    {
      ques_id: "Trial-04",
      contest_id: "Dummy Contest",
      name: "Its a trial question",
      description: "<p>Hey hey hello</p>",
      constraints: "<p>Nothing such</p>",
      input_format: "<p>A single integer</p>",
      output_format: "<p>A single integer</p>",
      time_limit: 1,
      public_test_cases: [
        { input: "1", output: "1", explanation: "" },
        { input: "2", output: "2", explanation: "" },
      ],
      private_test_cases: [
        { input: "3", output: "3" },
        { input: "4", output: "4" },
      ],
      topics: "BasicIO, Maths",
      display_after: "07/03/2023 20:00",
      assigned: false,
      is_draft: false,
      author: "coder_ravan",
    },
  ]);
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

  function search_problems() {
    toggleLoaderBackdrop();
    if (search_text && search_option) {
      console.log(search_text, search_option);
      // Get the data from backend here.
     
      
      toggleLoaderBackdrop();
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
          {data.length != 0 && (
            <DisplayData data={data} heading={PROBLEM_SEARCH[search_option]} />
          )}
        </div>
      </div>
    </>
  );
}

{
  /* <Navbar />
            <div className="TableDiv bg-white">
                <table className="table w-full "> */
}
{
  /* head */
}
//         <thead>
//             <tr>
//                 <th>Name</th>
//                 <th>Ques No</th>
//                 <th>Topics</th>
//             </tr>
//         </thead>
//         <tbody>
//             {problems.map((problem, index) => (
//                 <tr className="hover" onClick={()=>{
//                     alert(`Hello from ${index}`);
//                 }}>
//                     <td>{problem.name}</td>
//                     <td>{problem.ques_no}</td>
//                     <td>{problem.topics}</td>

//                 </tr>
//             ))}
//         </tbody>
//     </table>
// </div>
