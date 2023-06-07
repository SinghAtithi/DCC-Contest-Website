import React, { useEffect } from "react";
import axios from "axios";
import Router from "next/router";
import QuestionSkeleton from "./skeleton/QuestionSkeleton";
import { BASE_URL } from "../utils/constants";
import TestCaseContainer from "./TestCaseContainer";

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
    props.setLoader(true);
    if (props.problemId) {
      let url = `${BASE_URL}/question/${props.problemId}`;
      if (props.test) url = `${BASE_URL}/question/test/${props.problemId}`;
      const options = {
        headers: {
          "token": localStorage.getItem('token'),
        },
      };

      axios
        .get(url, options)
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
            props.setQuestionId(res.data._id);
            props.setQuesName(res.data.name);
          }
          props.setLoader(false);
        })
        .catch((err) => {
          Router.push("/404");
        });
    }
  }, [props.problemId]);

  return props.loader ? (
    <QuestionSkeleton />
  ) : (
    question.name && (
      <div className="question-component">
        <div className="question-component-question-meta-data">
          <h1 className="text-2xl">{question.name}</h1>
          <p className="text-sm mt-1 italic">
            Time Limit : {question.time_limit} seconds per test case
          </p>
          <p className="text-sm italic">Space Limit : 256 MB</p>
        </div>
        <div>
          <p
            className="mt-12 ck-content"
            dangerouslySetInnerHTML={{ __html: question.description }}
          ></p>
        </div>
        <div>
          <h1 className="text-xl mt-8 font-serif">Constraints : </h1>
          <p
            className="mt-2 ck-content"
            dangerouslySetInnerHTML={{ __html: question.constraints }}
          ></p>
        </div>
        <div className="abc">
          <h1 className="text-xl mt-8 font-serif">Input Format : </h1>
          <p
            className="mt-2 ck-content"
            dangerouslySetInnerHTML={{ __html: question.input_format }}
          ></p>
        </div>
        <div>
          <h1 className="text-xl mt-8 font-serif">Output Format: </h1>
          <p
            className="mt-2 ck-content"
            dangerouslySetInnerHTML={{ __html: question.output_format }}
          ></p>
        </div>

        {question.public_test_cases.length != 0 && <div id="problem-preview-data">
          <br />
          {question.public_test_cases.map((public_test_case, index) => (
            <TestCaseContainer key = {index} index={index+1} input={public_test_case.input} output={public_test_case.output} explanation={public_test_case.explanation} />
          ))}
        </div>}
      </div>
    )
  );
}

export default QuestionStatement;
