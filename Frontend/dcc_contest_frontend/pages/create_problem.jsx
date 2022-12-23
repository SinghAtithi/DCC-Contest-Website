import axios from "axios";
import React from "react";
import Navbar from "../components/Navbar";
import TextArea from "../components/TextArea";

function create_problem() {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [constraints, setConstraints] = React.useState("");
  const [input_format, setInputFormat] = React.useState("");
  const [output_format, setOutputFormat] = React.useState("");
  const [topics, setTopics] = React.useState("");
  const [public_test_cases, setPublicTestCases] = React.useState([]);
  const [private_test_cases, setPrivateTestCases] = React.useState([]);
  const [time_limit, setTimeLimit] = React.useState("");
  const [problemID, setProblemID] = React.useState("");
  const [inputTestCase, setInputTestCase] = React.useState("");
  const [outputTestCase, setOutputTestCase] = React.useState("");
  const [testCase, setTestCase] = React.useState([]);

  const onSubmit = () => {
    axios
      .post(
        "http://localhost:5000/question/createQuestion/create/",
        {
          name,
          description,
          constraints,
          input_format,
          output_format,
          topics,
          public_test_cases,
          private_test_cases,
          time_limit,
          problemID,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onAddPublicTestCase = () => {
    setPublicTestCases([
      ...public_test_cases,
      {
        input: inputTestCase,
        output: outputTestCase,
      },
    ]);
    setInputTestCase("");
    setOutputTestCase("");
  };

  const onAddPrivateTestCase = () => {
    setPrivateTestCases([
      ...private_test_cases,
      {
        input: inputTestCase,
        output: outputTestCase,
      },
    ]);
    setInputTestCase("");
    setOutputTestCase("");
  };

  return (
    <div>
      <Navbar />
      <div className="p-8 w-full justify-between">
        <div>
          <h1 className="text-2xl">Problem ID : </h1>
          <TextArea value={problemID} setValue={setProblemID} />
          <h1 className="text-2xl">Problem Name : </h1>
          <TextArea value={name} setValue={setName} />
          <h1 className="text-2xl">Time Limit : </h1>
          <TextArea value={time_limit} setValue={setTimeLimit} />
          <h1 className="text-2xl">Description : </h1>
          <TextArea value={description} setValue={setDescription} />
          <h1 className="text-2xl">Constraints : </h1>
          <TextArea value={constraints} setValue={setConstraints} />
          <h1 className="text-2xl">Input Format : </h1>
          <TextArea value={input_format} setValue={setInputFormat} />
          <h1 className="text-2xl">Output Format : </h1>
          <TextArea value={output_format} setValue={setOutputFormat} />
          <h1 className="text-2xl">Topics : </h1>
          <TextArea value={topics} setValue={setTopics} />
          <h1 className="text-2xl">Input Test Cases : </h1>
          <TextArea value={inputTestCase} setValue={setInputTestCase} />
          <h1 className="text-2xl">Output Test Cases : </h1>
          <TextArea value={outputTestCase} setValue={setOutputTestCase} />
          <button
            className="btn btn-outline btn-success mt-6 mx-6"
            onClick={onAddPublicTestCase}
          >
            Add Public Test Case
          </button>
          <button
            className="btn btn-outline btn-success mt-6"
            onClick={onAddPrivateTestCase}
          >
            Add Private Test Case
          </button>
        </div>
        <div>
          {public_test_cases.map((test, index) => {
            console.log(test);
            return (
              <div key={index} className="flex flex-col w-3/5 m-6 border">
                <div className="w-72 m-4">
                  <h1 className="text-2xl">Public TC </h1>
                  <h1 className="text-2xl">Input : </h1>
                  <p className="text-lg whitespace-pre">{test.input}</p>
                </div>
                <div className="w-72 m-4">
                  <h1 className="text-2xl">Output : </h1>
                  <p className="text-lg whitespace-pre">{test.output}</p>
                </div>
              </div>
            );
          })}
        </div>
        <div>
          {private_test_cases.map((test, index) => {
            return (
              <div key={index} className="flex flex-col w-3/5 m-6 border">
                <div className="w-72 m-4">
                  <h1 className="text-2xl">Private TC </h1>
                  <h1 className="text-2xl">Input : </h1>
                  <p className="text-lg">{test.input}</p>
                </div>
                <div className="w-72 m-4">
                  <h1 className="text-2xl">Output : </h1>
                  <p className="text-lg">{test.output}</p>
                </div>
              </div>
            );
          })}
        </div>
        <button className="btn btn-outline btn-success mt-6" onClick={onSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
}

export default create_problem;
