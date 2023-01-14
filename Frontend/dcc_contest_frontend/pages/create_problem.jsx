import axios from "axios";
import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import TextArea from "../components/TextArea";
import { FcDeleteRow } from "react-icons/fc";
import dynamic from "next/dynamic";
// import { CKEditor } from "@ckeditor/ckeditor5-react";
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import ImageKit from "imagekit-javascript";


const questionAreaStyle = {
  height: "90vh",
  width: "50%",
}

const deleteIcon = {
  position: "absolute",
  top: "5px",
  right: "10px",
}

const CKEditor = dynamic(() => import("../components/RichTextEditor"), { ssr: false });
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
  // const [editorReady,setEditorReady] = React.useState(false);

  // let CKEditor,ClassicEditor;
  // useEffect(()=>{
  //   ClassicEditor = dynamic(() => import("@ckeditor/ckeditor5-build-classic"), { ssr: false });
    
  //   setEditorReady(true);
  // })
  // const Editor = dynamic(() => import("../components/RichTextEditor"), { ssr: false });
  
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

  var imagekit = new ImageKit({
    publicKey: "public_/8n1ylBbpeZ+hb/0ttpwZxVDshE=",
    urlEndpoint: "https://ik.imagekit.io/pqymxdgbi/Code-DCC",
    authenticationEndpoint: "http://localhost:5000/auth/imagekitAuth",
  });

  function uploadAdapter(loader) {
    return {
      upload: () => {
        return new Promise((resolve, reject) => {
          loader.file.then((file) => {
            imagekit.upload(
              {
                file: file,
                fileName: "trail.jpg",
              },
              function (err, result) {
                if (err) {
                  console.log(err);
                  reject(err);
                } else {
                  const url = imagekit.url({
                    src: result.url,
                    transformation: [{ height: 400, width: 400 }],
                  });

                  resolve({ default: url });
                }
              }
            );
          });
        });
      },
    };
  }

  function uploadPlugin(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = function (
      loader
    ) {
      return new uploadAdapter(loader);
    };
  }

  return (
    <div >
      <Navbar />

      <div className="font-serif p-8 w-auto">
        <div className="questionArea float-left" style={questionAreaStyle}>

          <h1 className="text-2xl">Problem ID : </h1>
          <h4 className="whitespace-pre text-sm">{"Format : contestId_questionNo\nDo not use space."}</h4>
          <TextArea value={problemID} setValue={setProblemID} height={10} />

          <h1 className="text-2xl">Problem Name : </h1>
          <TextArea value={name} setValue={setName} height={10} />

          <h1 className="text-2xl">Time Limit : </h1>
          <h4 className="whitespace-pre text-sm">{"An integer representing time in seconds"}</h4>
          <TextArea value={time_limit} setValue={setTimeLimit} height={10} />

          <h1 className="text-2xl">Topics : </h1>
          <TextArea value={topics} setValue={setTopics} height={10} />

          <h1 className="text-2xl">Description : </h1>
          <CKEditor value={description} setValue={setDescription}/>

          <h1 className="text-2xl pt-6">Constraints : </h1>
          <CKEditor value={constraints} setValue={setConstraints}/>

          <h1 className="text-2xl">Input Format : </h1>
          <TextArea value={input_format} setValue={setInputFormat} height={20} />

          <h1 className="text-2xl">Output Format : </h1>
          <TextArea value={output_format} setValue={setOutputFormat} height={20} />

          <h1 className="text-2xl">Input Test Cases : </h1>
          <TextArea value={inputTestCase} setValue={setInputTestCase} height={20} />

          <h1 className="text-2xl">Output Test Cases : </h1>
          <TextArea value={outputTestCase} setValue={setOutputTestCase} height={20} />

          <div className="flex w-full items-center justify-center">
            <div>
              <button
                className="btn btn-outline btn-success mt-3 mx-2"
                onClick={onAddPublicTestCase}
              >
                Add Public Test Case
              </button>
            </div>

            <div>
              <button
                className="btn btn-outline btn-success mt-3"
                onClick={onAddPrivateTestCase}
              >
                Add Private Test Case
              </button>
            </div>
          </div>
          <div className="flex w-full items-center justify-center">
              <button className="btn btn-outline btn-success mt-3 mx-2 mb-9" onClick={onSubmit}>
                Submit
              </button>
            </div>
        </div>

        <div className="previewArea float-right px-10 " style={questionAreaStyle}>

          <div className="flex flex-col w-full items-center justify-center">
            <h1 className="text-xl ">Preview of the Question </h1>
            <br></br>
            <br></br>
          </div>

          <div className="flex flex-col">

            <div className="flex flex-col w-full items-center justify-center">
              {problemID && <h1 className="text-2xl">{problemID}</h1>}
              {name && <h1 className="text-2xl">{name}</h1>}
              {time_limit && <p className="text-sm mt-1 italic">Time Limit : {time_limit} Sec</p>}
            </div>

            <div>
              {description && <p className="mt-12 ck-content" dangerouslySetInnerHTML={{ __html: description }}></p>}
            </div>

            {constraints && <div>
              <h1 className="text-xl mt-8 font-serif ck-content">Constraints : </h1>
              <p className="mt-2" dangerouslySetInnerHTML={{ __html: constraints }}></p>
            </div>}

            {input_format && <div>
              <h1 className="text-xl mt-8 font-serif">Input Format : </h1>
              <pre>{input_format}</pre>
            </div>}

            {output_format && <div>
              <h1 className="text-xl mt-8 font-serif">Output Format : </h1>
              <pre>{output_format}</pre>
            </div>}

            {topics && <div>
              <h1 className="text-xl mt-8 font-serif">Topics : </h1>
              <pre>{topics}</pre>
            </div>}

            {public_test_cases.length != 0 && <div>
              <h1 className="text-xl mt-8 font-serif">Public Test Cases : </h1>
              {public_test_cases.map((public_test_case, index) => (
                <div>
                  <div key={index} >
                    <h1 className="text-xl mt-8 font-serif">Test Case : {index}</h1>
                    <div className="bg-slate-700 relative">
                      <pre><span className="font-mono font-bold">Input</span><br></br>{public_test_case.input}</pre>
                      <pre><span className="font-mono font-bold">Output</span><br></br>{public_test_case.output}</pre>
                      <div style={deleteIcon}>
                        <FcDeleteRow size={32} onClick={() => {
                          setPublicTestCases(
                            public_test_cases.filter((_, i) => i !== index)
                          );
                        }} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>}

            {private_test_cases.length != 0 && <div>
              <h1 className="text-xl mt-8 font-serif">Private Test Cases : </h1>
              {private_test_cases.map((private_test_case, index) => (
                <div>
                  <div key={index} >
                    <h1 className="text-xl mt-8 font-serif">Test Case : {index}</h1>
                    <div className="bg-slate-700 relative ">
                      <pre><span className="font-mono font-bold">Input</span><br></br>{private_test_case.input}</pre>
                      <pre><span className="font-mono font-bold">Output</span><br></br>{private_test_case.output}</pre>
                      <div style={deleteIcon}>
                        <FcDeleteRow size={32} onClick={() => {
                          setPrivateTestCases(
                            private_test_cases.filter((_, i) => i !== index)
                          );
                        }} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>}

          </div>
        </div>
      </div>
    </div>
  );
}

export default create_problem;
