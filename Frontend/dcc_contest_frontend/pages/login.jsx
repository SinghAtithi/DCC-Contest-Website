import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import LoginLottie from "../public/loginLottie.json";
import Lottie from "lottie-react";
import axios from "axios";
import Router, { useRouter } from "next/router";
import checkToken from "../utils/checkToken";
import {
    ADMIN,
    SUPER_ADMIN,
    USER_DASHBOARD,
    ADMIN_DASHBOARD,
    BASE_URL,
    LOGIN_ENDPOINT_BACKEND,
    SIGNUP_PAGE,
    FORGET_PASSWORD_PAGE,
} from "../utils/constants";
import { loginUser } from "../store/loginStore";
import store from "../store/baseStore";
import { useSelector } from "react-redux";
import toggleLoaderBackdrop from "../utils/toggleCustomBackdrop";
import Link from "next/link";

function login() {
    const router = useRouter();
    const { loggedIn, role } = useSelector((state) => state.login);

    const [loginId, setloginId] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        // setIsLoading(true);
        toggleLoaderBackdrop();
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
                    else Router.push(USER_DASHBOARD);
                } else {
                    // setIsLoading(false);
                    toggleLoaderBackdrop();
                }
            });
        } else {
            if (next) Router.push(`/${next}`);
            else if (role === ADMIN) Router.push(ADMIN_DASHBOARD);
            else if (role === SUPER_ADMIN) Router.push(ADMIN_DASHBOARD);
            else Router.push(USER_DASHBOARD);
        }
    }, []);

    const onLogin = () => {
        toggleLoaderBackdrop();
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        const data = {
            loginId,
            password,
        };
        axios
            .post(BASE_URL + LOGIN_ENDPOINT_BACKEND, data, config)
            .then((res) => {
                store.dispatch(
                    loginUser({
                        role: res.data.role,
                        profile_pic: res.data.profile_pic,
                        username: res.data.username,
                    })
                );
                localStorage.setItem("token", res.data.token);

                if (router.query["next"])
                    Router.push(`/${router.query["next"]}`);
                else if (res.data.role === ADMIN) Router.push(ADMIN_DASHBOARD);
                else if (res.data.role === SUPER_ADMIN)
                    Router.push(ADMIN_DASHBOARD);
                else Router.push(USER_DASHBOARD);
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
                        value={loginId}
                        placeholder="Email or Username"
                        onChange={(e) => setloginId(e.target.value)}
                    />{" "}
                    <input
                        type="password"
                        className="input text-xl rounded-lg my-4 bg-inherit input-success h-16 w-full max-w-lg"
                        value={password}
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <br />
                    <button
                        className="btn btn-success btn-lg rounded-lg"
                        onClick={onLogin}
                    >
                        Login
                    </button>
                    <Link
                        href={FORGET_PASSWORD_PAGE}
                        onClick={() => {
                            toggleLoaderBackdrop();
                        }}
                        className="py-4"
                    >
                        Forgot Password?
                    </Link>
                    <Link
                        href={SIGNUP_PAGE}
                        onClick={() => {
                            toggleLoaderBackdrop();
                        }}
                    >
                        Don't have an account? Create one now
                    </Link>
                </div>
                <div className="lottie">
                    <Lottie animationData={LoginLottie} className="w-10/12" />
                </div>
            </div>
        </div>
    );
}

export default login;
