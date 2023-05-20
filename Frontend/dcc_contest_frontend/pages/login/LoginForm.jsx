import React, { useState } from 'react';
import { useRouter } from "next/router";
import Link from "next/link";
import { loginUser } from "../../store/loginStore";
import store from "../../store/baseStore";
import { ADMIN, SUPER_ADMIN, ADMIN_DASHBOARD, BASE_URL, LOGIN_ENDPOINT_BACKEND, SIGNUP_PAGE, FORGET_PASSWORD_PAGE } from '../../utils/constants';
import axios from "axios";
import ForgotPasswordModal from '../../components/login/ForgotPasswordModal';
import ResendConfirmationEmailModal from '../../components/login/ResendConfirmationEmail';

export default function LoginForm() {
    const router = useRouter();
    const [loginId, setloginId] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loadingButton, setLoadingButton] = useState("");

    const [openForgotPasswordModal, setOpenForgotPasswordModal] = useState(false);
    const [openResendConfirmationEmailModal, setOpenResendConfirmationEmailModal] = useState(false);

    const onLogin = () => {
        setLoadingButton("loading");
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
                    router.push(`/${router.query["next"]}`);
                else if (res.data.role === ADMIN) router.push(ADMIN_DASHBOARD);
                else if (res.data.role === SUPER_ADMIN) router.push(ADMIN_DASHBOARD);
                else router.push(`/${res.data.username}`);
            })
            .catch((err) => {
                console.log(err);
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
                setLoadingButton("");
            });
    };


    return (
        <div className="login-form">
            <ForgotPasswordModal open={openForgotPasswordModal} setOpen={setOpenForgotPasswordModal}/>
            <ResendConfirmationEmailModal open={openResendConfirmationEmailModal} setOpen={setOpenResendConfirmationEmailModal}/>
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
                className="form-input input text-xl rounded-lg my-4 bg-inherit input-success w-full max-w-lg"
                value={loginId}
                placeholder="Email or Username"
                onChange={(e) => setloginId(e.target.value)}
            />{" "}
            <input
                type="password"
                className="form-input input text-xl rounded-lg my-4 bg-inherit input-success w-full max-w-lg"
                value={password}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
            />{" "}
            <br />
            <button
                className={`login-button btn btn-outline btn-success btn-lg rounded-lg ${loadingButton}`}
                onClick={onLogin}
            >
                Login
            </button>

            <div className='flex flex-row gap-2 m-4 justify-between text-green-600'>
                <Link href="#" onClick={()=>setOpenForgotPasswordModal(true)}> Forgot Password ??? </Link>
                | 
                <Link href="#" onClick={()=>setOpenResendConfirmationEmailModal(true)}> Resend Confirmation</Link>
                
            </div>
            <div>
                <Link href="#" onClick={()=>router.push(SIGNUP_PAGE)}> New to Code-DCC ? Sign Up</Link>
            </div>
        </div>
    )
}
