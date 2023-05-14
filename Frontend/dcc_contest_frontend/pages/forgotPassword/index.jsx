import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import LoginLottie from "../../public/loginLottie.json";
import Lottie from "lottie-react";
import axios from "axios";
import {
    BASE_URL,
    LOGIN_PAGE,
    SEND_FORGOT_PASSWORD_EMAIL_BACKEND,
    SIGNUP_PAGE,
} from "../../utils/constants";
import toggleLoaderBackdrop from "../../utils/toggleCustomBackdrop";
import Link from "next/link";
import Router from "next/router";

function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");

    const onSubmit = () => {
        toggleLoaderBackdrop();
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        const data = {
            email: email,
        };
        const URL = BASE_URL + SEND_FORGOT_PASSWORD_EMAIL_BACKEND;
        axios
            .post(URL, data, config)
            .then((res) => {
                alert("Email send successfully.");
                Router.push(LOGIN_PAGE);
            })
            .catch((err) => {
                console.log(err);
                toggleLoaderBackdrop();
                // setError(err.response.data.error);
                if (err.code == "ERR_NETWORK") {
                    setError(
                        "Something went wrong. Please check your Internet or refresh. If the problem persists, contact the adminstrator."
                    );
                } else if (
                    err.code == "ERR_BAD_RESPONSE" ||
                    err.code == "ERR_BAD_REQUEST"
                ) {
                    setError(err.response.data.error);
                } else {
                    setError(
                        "Something went wrong. Please check your Internet or refresh. If the problem persists, contact the adminstrator."
                    );
                }
            });
    };

    // if (isLoading) return (<div>Loading...</div>)

    return (
        <div>
            <Navbar />
            <div className="container min-w-full mt-16 w-full flex justify-around items-center">
                <div className="login flex items-start w-3/12 flex-col">
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
                    <input
                        type="text"
                        className="input text-xl rounded-lg my-4 bg-inherit input-success h-16 w-full max-w-lg"
                        value={email}
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                    />{" "}
                    <br />
                    <button
                        className="btn btn-success btn-lg rounded-lg"
                        onClick={onSubmit}
                    >
                        Send Password Reset Instructions
                    </button>
                    <Link
                        href={LOGIN_PAGE}
                        className="py-4"
                        onClick={() => {
                            toggleLoaderBackdrop();
                        }}
                    >
                        Login
                    </Link>
                    <Link
                        href={SIGNUP_PAGE}
                        onClick={() => {
                            toggleLoaderBackdrop();
                        }}
                    >
                        {"Don't have an account? Create one now"}
                    </Link>
                </div>
                <div className="lottie">
                    <Lottie animationData={LoginLottie} className="w-10/12" />
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;
