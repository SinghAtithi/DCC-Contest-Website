import React, { useEffect } from "react";
import axios from "axios";
import Router from "next/router";
import QuestionSkeleton from "./skeleton/QuestionSkeleton";
import { BASE_URL } from "../utils/constants";

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
      axios
        .get(
          `${BASE_URL}/question/${props.problemId}`
        )
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
            alert(res.data._id);
          }
          props.setLoader(false);
        })
        .catch((err) => {
          console.log(err);
          Router.push("/404");
        });
    }
  }, [props.problemId]);
  useEffect(() => {
    props.setLoader(true);
    if (props.problemId) {
      axios
        .get(
          `${BASE_URL}/question/${props.problemId}`
        )
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
            alert(res.data._id);
          }
          props.setLoader(false);
        })
        .catch((err) => {
          console.log(err);
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
            Time Limit : {question.time_limit} per test case
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
        <div>
          {question.public_test_cases.map((public_test_case, index) => (
            <div>
              <br></br>
              <div key={index}>
                <h1 className="text-xl font-serif">Example {index + 1} :</h1>
                <div className="bg-slate-700 ">
                  <pre>
                    <span className="font-mono font-bold">Input</span>
                    <br></br>
                    {public_test_case.input}
                  </pre>
                  <pre>
                    <span className="font-mono font-bold">Output</span>
                    <br></br>
                    {public_test_case.output}
                  </pre>
                  {public_test_case.explanation && (
                    <pre>
                      <span className="font-mono font-bold">Explanation</span>
                      <br></br>
                      <p
                        className="ck-content"
                        dangerouslySetInnerHTML={{
                          __html: public_test_case.explanation,
                        }}
                      ></p>
                    </pre>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  );
  return props.loader ? (
    <QuestionSkeleton />
  ) : (
    question.name && (
      <div className="question-component">
        <div className="question-component-question-meta-data">
          <h1 className="text-2xl">{question.name}</h1>
          <p className="text-sm mt-1 italic">
            Time Limit : {question.time_limit} per test case
          </p>
          <p className="text-sm italic">Space Limit : 256 MB</p>
        </div>
        <div>
          <p
            className="mt-12 ck-content"
            dangerouslySetInnerHTML={{
              __html: question.description,
            }}
          ></p>
        </div>
        <div>
          <h1 className="text-xl mt-8 font-serif">Constraints : </h1>
          <p
            className="mt-2 ck-content"
            dangerouslySetInnerHTML={{
              __html: question.constraints,
            }}
          ></p>
        </div>
        <div className="abc">
          <h1 className="text-xl mt-8 font-serif">Input Format : </h1>
          <p
            className="mt-2 ck-content"
            dangerouslySetInnerHTML={{
              __html: question.input_format,
            }}
          ></p>
        </div>
        <div>
          <h1 className="text-xl mt-8 font-serif">Output Format: </h1>
          <p
            className="mt-2 ck-content"
            dangerouslySetInnerHTML={{
              __html: question.output_format,
            }}
          ></p>
        </div>
        <div>
          {question.public_test_cases.map((public_test_case, index) => (
            <div>
              <br></br>
              <div key={index}>
                <h1 className="text-xl font-serif">Example {index + 1} :</h1>
                <div className="bg-slate-700 ">
                  <pre>
                    <span className="font-mono font-bold">Input</span>
                    <br></br>
                    {public_test_case.input}
                  </pre>
                  <pre>
                    <span className="font-mono font-bold">Output</span>
                    <br></br>
                    {public_test_case.output}
                  </pre>
                  {public_test_case.explanation && (
                    <pre>
                      <span className="font-mono font-bold">Explanation</span>
                      <br></br>
                      <p
                        className="ck-content"
                        dangerouslySetInnerHTML={{
                          __html: public_test_case.explanation,
                        }}
                      ></p>
                    </pre>
                  )}
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
