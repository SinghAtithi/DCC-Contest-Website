import React, { useEffect } from "react";
import axios from "axios";
import Router from "next/router";

function QuestionStatement(props) {
  const [question, setQuestion] = React.useState({
    name: "",
    description: "",
    constraints: "", 
    input_format: "",
    output_format: "",
    topics: "",
    public_test_cases: null,
  });

  useEffect(() => {
    console.log("props : ",props);
    axios
      .get(`http://localhost:5000/question/${props.problemId}`)
      .then((res) => {
        if(question.name != res.data.name){
          setQuestion({
            name: res.data.name,
            description: res.data.description,
            constraints: res.data.constraints,
            input_format: res.data.input_format,
            output_format: res.data.output_format,
            topics: res.data.topics,
            public_test_cases: res.data.public_test_cases,
          });

        }
      }).catch((err) => {
        console.log(err);
        Router.push("/404");
      });
      // Catch errors and redirect
  }, [question]);
  return (
    question.name && (
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
        <h1 className="text-xl mt-8 font-serif">Constraints : </h1>
        <pre>{question.constraints}</pre>
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
        {question.public_test_cases.map((public_test_case,index)=>(
          <div>
            <br></br>
            <div key={index} >
              <h1 className="text-xl mt-8 font-serif">Example {index+1} :</h1>
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
