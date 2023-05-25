import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import signupQues from "../components/signupQues";
import heroSignupLottie from "../public/heroSignupLottie.json";
import Lottie from "lottie-react";
import axios from "axios";
import Router from "next/router";
import { BiArrowToRight, BiArrowToLeft } from "react-icons/bi";
import {
    BASE_URL,
    SIGNUP_ENDPOINT_BACKEND,
    ADMIN,
    SUPER_ADMIN,
    ADMIN_DASHBOARD
} from "../utils/constants";
import SignUpConfirmaionModal from "../components/SignUpConfirmationModal";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import checkToken from "../utils/checkToken";
import Head from "next/head";
import TheFooter from "../components/Footer";

function Signup() {
    const router = useRouter();
    const { loggedIn, role, username } = useSelector((state) => state.login);

    const [quesInd, setQuesInd] = React.useState(0);
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [confirm_password, setconfirm_password] = React.useState("");
    const [user_name, setuser_name] = React.useState("");
    const [githubURL, setGithubURL] = React.useState("");
    const [linkedinURL, setLinkedinURL] = React.useState("");
    const [codeforcesURL, setCodeforcesURL] = React.useState("");
    const [codechefURL, setCodechefURL] = React.useState("");
    const [bio, setBio] = React.useState("");
    const [text, setText] = React.useState("");
    const [error, setError] = React.useState(null);

    useEffect(() => {
        var next = null;
        if (router.query["next"]) next = router.query["next"];

        if (!loggedIn) {
            checkToken().then((status) => {
                if (status.verified) {
                    if (next) Router.push(`/${next}`);
                    else if (status.role === ADMIN)
                        Router.push(ADMIN_DASHBOARD);
                    else if (status.role === SUPER_ADMIN)
                        Router.push(ADMIN_DASHBOARD);
                    else Router.push(`/${username}`);
                }
            });
        } else {
            if (next) Router.push(`/${next}`);
            else if (role === ADMIN) Router.push(ADMIN_DASHBOARD);
            else if (role === SUPER_ADMIN) Router.push(ADMIN_DASHBOARD);
            else Router.push(`/${username}`);
        }
    }, []);

    const onSubmit = () => {
        const data = {
            name,
            email,
            password,
            confirm_password,
            user_name,
            githubURL,
            linkedinURL,
            codeforcesURL,
            codechefURL,
            bio,
        };

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        axios
            .post(BASE_URL + SIGNUP_ENDPOINT_BACKEND, data, config)
            .then((res) => {
                document.querySelector(".modal").classList.toggle("modal-open");
            })
            .catch((err) => {
                if (err.code == "ERR_NETWORK") {
                    setError(
                        "Something went wrong. Please check your Internet or refresh. If the problem persists, contact the adminstrator."
                    );
                    setQuesInd(0);
                } else if (
                    err.code == "ERR_BAD_RESPONSE" ||
                    err.code == "ERR_BAD_REQUEST"
                ) {
                    setError(err.response.data.error);
                    setQuesInd(err.response.data.seq);
                } else {
                    setError(
                        "Something went wrong. Please check your Internet or refresh. If the problem persists, contact the adminstrator."
                    );
                    setQuesInd(0);
                }
            });
    };

    const onBackClick = () => {
        if (quesInd <= 0) {
            return;
        }
        switch (quesInd - 1) {
            case 0:
                setText(name);
                break;
            case 1:
                setText(email);
                break;
            case 2:
                setText(user_name);
                break;
            case 3:
                setText(password);
                break;
            case 4:
                setText(confirm_password);
            case 5:
                setText(githubURL);
                break;
            case 6:
                setText(linkedinURL);
                break;
            case 7:
                setText(codeforcesURL);
                break;
            case 8:
                setText(codechefURL);
                break;
            case 9:
                setText(bio);
                break;
            default:
                break;
        }
        setQuesInd(quesInd - 1);
    };

    const onNextClick = () => {
        if (quesInd >= signupQues.length - 1) {
            return;
        }

        switch (quesInd) {
            case 0:
                setName(text);
                break;
            case 1:
                setEmail(text);
                break;
            case 2:
                setuser_name(text);
                break;
            case 3:
                setPassword(text);
                break;
            case 4:
                setconfirm_password(text);
            case 5:
                setGithubURL(text);
                break;
            case 6:
                setLinkedinURL(text);
                break;
            case 7:
                setCodeforcesURL(text);
                break;
            case 8:
                setCodechefURL(text);
                break;
            case 9:
                setBio(text);
                break;
            default:
                break;
        }

        setQuesInd(quesInd + 1);

        setText("");
    };

    return (
        <>
            <Head><title>DCC : Sign Up</title></Head>
            <Navbar />
            <SignUpConfirmaionModal />
            <div className="content-area-top">
                <h1 id="contest-main-heading">Welcome to Code-DCC</h1>
                <div className="signup-container min-w-full flex justify-around items-center mb-4">
                    <Lottie animationData={heroSignupLottie} />
                    <div
                        className={`${quesInd < signupQues.length - 1 ? "" : "hidden"
                            }`}
                    >
                        {error && (
                            <div className="alert alert-error shadow-lg">
                                <div>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="stroke-current flex-shrink-0 h-6 w-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                    <span>{error}</span>
                                </div>
                            </div>
                        )}
                        <div className="mt-8 text-xl justify-center flex">
                            {signupQues[quesInd].question}
                        </div>
                        <div className="flex justify-center items-center">
                            {quesInd >= 0 ? (
                                <button
                                    className="btn btn-outline btn-success rounded-full mx-6"
                                    onClick={onBackClick}
                                    disabled={quesInd === 0 ? true : false}
                                >
                                    <BiArrowToLeft size={30} />
                                </button>
                            ) : (
                                <></>
                            )}
                            <input
                                type="text"
                                className="input text-2xl rounded-lg my-4 bg-inherit input-success h-16 w-full max-w-lg"
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") onNextClick();
                                }}
                            />
                            <button
                                className="btn btn-outline btn-success rounded-full mx-6"
                                onClick={onNextClick}
                            >
                                <BiArrowToRight size={30} />
                            </button>
                        </div>
                    </div>
                    <div
                        className={`${quesInd === signupQues.length - 1
                            ? "flex justify-center items-center flex-col"
                            : "hidden"
                            }`}
                    >
                        <p className="text-xl my-5 px-2">
                            By clicking on the button you accept to our terms and
                            conditions!
                        </p>
                        <div className="flex justify-center items-center">
                            <button
                                className="btn btn-outline btn-success rounded-full mx-6"
                                onClick={onBackClick}
                            >
                                <BiArrowToLeft size={30} />
                            </button>
                            <button
                                className="btn btn-outline btn-success rounded-full mx-6"
                                onClick={onSubmit}
                            >
                                {"Yay Lets Go!"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <TheFooter />
        </>
    );
}

export default Signup;
