import React, { useEffect } from "react";
import axios from "axios";
import Router from "next/router";
import QuestionSkeleton from "../skeleton/QuestionSkeleton";

function QuestionStatement(props) {
  const [question, setQuestion] = React.useState({
    name: "",
    description: "",
    constraints: "",
    time_limit: 1,
    input_format: "",
    output_format: "",
    topics: "",
    public_test_cases: null,
  });


  useEffect(() => {
    console.log("Weclome here");
    props.setLoader(true);
    console.log(" From here props : ", props);
    if (props.problemId) {
      console.log("Inside");
      axios
        .get(`http://localhost:5000/question/${props.problemId}`)
        .then((res) => {
          if (question.name != res.data.name) {
            setQuestion({
              name: res.data.name,
              description: res.data.description,
              constraints: res.data.constraints,
              time_limit: res.data.time_limit,
              input_format: res.data.input_format,
              output_format: res.data.output_format,
              topics: res.data.topics,
              public_test_cases: res.data.public_test_cases,
            });
          }
          console.log("Setting loader false, current it is ",props.loader);
          props.setLoader(false);
        }).catch((err) => {
          console.log(err);
          Router.push("/404");
        });
    }
  }, [props.problemId]);

  return (
    props.loader ? <QuestionSkeleton /> :
      question.name && (
        <div className="flex flex-col w-full justify-start ">
          <div className="flex flex-col w-full items-center justify-center">
            <h1 className="text-2xl">{question.name}</h1>
            <p className="text-sm mt-1 italic">Time Limit : {question.time_limit} per test case</p>
            <p className="text-sm italic">Space Limit : 256 MB</p>
          </div>
          <div>
            <p className="mt-12 ck-content" dangerouslySetInnerHTML={{ __html: question.description }}></p>
          </div>
          <div>
            <h1 className="text-xl mt-8 font-serif">Constraints : </h1>
            <p className="mt-2 ck-content" dangerouslySetInnerHTML={{ __html: question.constraints }}></p>
          </div>
          <div>
            <h1 className="text-xl mt-8 font-serif">Input Format : </h1>
            <pre>{question.input_format}</pre>
          </div>
          <div>
            <h1 className="text-xl mt-8 font-serif">Output Format: </h1>
            <pre>{question.output_format}</pre>
          </div>
          <div>
            {question.public_test_cases.map((public_test_case, index) => (
              <div>
                <br></br>
                <div key={index} >
                  <h1 className="text-xl mt-8 font-serif">Example {index + 1} :</h1>
                  <div className="bg-slate-700 ">
                    <pre><span className="font-mono font-bold">Input</span><br></br>{public_test_case.input}</pre>
                    <pre><span className="font-mono font-bold">Output</span><br></br>{public_test_case.output}</pre>
                  </div>
                </div>
              </div>
            ))}

          </div>
        </div>
      )

  );
}

export default QuestionStatement;
