import React, { useEffect } from "react";
import axios from "axios";

function QuestionStatement(props) {
  const [question, setQuestion] = React.useState({
    name: "",
    description: "",
    constraints: "",
    input_format: "",
    output_format: "",
    topics: "",
    public_test_cases: "",
  });

  useEffect(() => {
    axios.get(`http://localhost:5000/question/Trial-01`).then((res) => {
      console.log(res.data);
      setQuestion({
        name: res.data.name,
        description: res.data.description,
        constraints: res.data.constraints,
        input_format: res.data.input_format,
        output_format: res.data.output_format,
        topics: res.data.topics,
        public_test_cases: res.data.public_test_cases,
      });
    });
  }, []);

  return (
    <div className="flex flex-col w-full justify-start ">
      <div className="flex flex-col w-full items-center justify-center">
        <h1 className="text-2xl">{question.name}</h1>
        <p className="text-sm mt-1 italic">Time Limit : 1 Sec</p>
        <p className="text-sm italic">Space Limit : 256 MB</p>
      </div>
      <div>
        <p className="mt-12">{question.description}</p>
      </div>
      <div>
        <h1 className="text-xl mt-8">Constraints : </h1>
        <p>{question.constraints}</p>
      </div>
      <div>
        <h1 className="text-xl mt-8">Input : </h1>
        <p>{question.input_format}</p>
      </div>
      <div>
        <h1 className="text-xl mt-8">Output : </h1>
        <p>{question.output_format}</p>
      </div>
    </div>
  );
}

export default QuestionStatement;
