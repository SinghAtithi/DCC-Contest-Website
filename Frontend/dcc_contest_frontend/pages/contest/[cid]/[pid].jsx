import { useRouter } from 'next/router';
import React, { useEffect } from "react";
import CodeEditor from "../../../components/CodeEditor";
import Navbar from "../../../components/Navbar";
import QuestionStatement from "../../../components/QuestionStatement";
import snippetCode from "../../../components/snippet";
import axios from "axios";
import ConsolePanel from "../../../components/console_panel";

const contest_container = {
    "display": "flex",
}

const side_bar = {
    height: "90vh",
    width: "4%"
}

const question_area = {
    height: "90vh",
    width: "40%",
    overflowY: "scroll"
}


const code_editor = {
    height: "80vh",
    width: "56%",
  }
  
  
  const button_area = {
    display: "flex"
  }
  

const contestPage = () => {
    const router = useRouter();
    const { cid ,pid} = router.query;
    console.log(cid,pid);

    const [problemId, setProblemId] = React.useState("");
    const [code, setCode] = React.useState("");
    const [isOpen, setIsOpen] = React.useState(false);
    const [lowerSpaceVisible, setLowerSpaceVisible] = React.useState(false);
    const [editorHeight, setEditorHeight] = React.useState("80vh");
    const [consoleData, setConsoleData] = React.useState("Nothing to display on console");

    const code_console = {
        display: lowerSpaceVisible ? 'block' : 'none'
    }

    useEffect(() => {
        (() => {
            try {
                let temp = window.location.href.split("/");
                setProblemId(temp[temp.length - 1]);
            } catch (err) { }
        })();
    }, []);

    useEffect(() => {
        let prevCode = localStorage.getItem(problemId, snippetCode);
        if (prevCode === null) {
            prevCode = snippetCode;
        }
        let prevCodeWithoutSpaces = prevCode.replace(/\s/g, "");
        if (prevCodeWithoutSpaces.length === 0) {
            prevCode = snippetCode;
        }
        setCode(prevCode);
    }, [problemId]);


    const controlConsole = () => {
        setEditorHeight((editorHeight === "80vh") ? "60vh" : "80vh");
        setLowerSpaceVisible(!lowerSpaceVisible);
        setIsOpen(!isOpen);
    }

    const onSubmit = async () => {
        console.log(code);
        setConsoleData("Evaluating the code ...");
        if (!isOpen) {
            setEditorHeight((editorHeight === "80vh") ? "60vh" : "80vh");
            setLowerSpaceVisible(!lowerSpaceVisible);
            setIsOpen(true);
        }

        const url = "http://localhost:5000/question/submit";
        const config = {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        };
        const params = new URLSearchParams();
        params.append("code", code);
        params.append("language", "cpp");
        params.append("ques_no", problemId);

        axios.post(url, params, config).then((result) => {
            setConsoleData(result.data.message);
        })
            .catch((err) => {
                setConsoleData(err.response.data.error);
            });

    };
    return (
        <>
            <Navbar />
            <div style={contest_container}>
                <div className="px-4" style={side_bar}>
                    Hello
                </div>
                <div className="px-4" style={question_area}>
                    <QuestionStatement problemId={problemId} />
                </div>
                <div style={code_editor}>
                    <div className="mx-4">
                        <CodeEditor Code={code} setCode={setCode} ProblemId={problemId} EditorHeight={editorHeight} EditorWidth="54vw" />
                        <div style={button_area}>
                            <button
                                className="btn btn-outline btn-success mt-4 mx-3"
                                onClick={onSubmit}
                            >
                                Submit
                            </button>
                            <button className="btn btn-outline btn-success mt-4" onClick={controlConsole}>
                                Console
                            </button>
                        </div>
                    </div>
                    <div style={code_console}>
                        <ConsolePanel isOpen={isOpen} console_data={consoleData} width="56vw"/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default contestPage;