import React, { useEffect } from "react";
import Navbar from "../../components/Navbar";
import LoginLottie from "../../public/loginLottie.json";
import Lottie from "lottie-react";
import { useRouter } from "next/router";
import checkToken from "../../utils/checkToken";
import { ADMIN, SUPER_ADMIN , ADMIN_DASHBOARD } from "../../utils/constants";
import toggleLoaderBackdrop from "../../utils/toggleCustomBackdrop";
import { useSelector } from "react-redux";
import Head from "next/head";
import LoginForm from "./LoginForm";

function login() {
    const router = useRouter();
    const { loggedIn, role } = useSelector((state) => state.login);

    useEffect(() => {
        toggleLoaderBackdrop();
        var next = null;
        if (router.query["next"]) next = router.query["next"];

        // Check if user is not logged in
        if (!loggedIn) {
            // Verify user's token
            checkToken().then((status) => {
                if (status.verified) {
                    if (next) router.push(`/${next}`);
                    else if (status.role === ADMIN)
                        router.push(ADMIN_DASHBOARD);
                    else if (status.role === SUPER_ADMIN)
                        router.push(ADMIN_DASHBOARD);
                    else router.push(`/${res.data.username}`);
                } else {
                    toggleLoaderBackdrop();
                }
            });
        } else {
            // If user is already logged in, redirect based on role and next query parameter
            if (next) router.push(`/${next}`);
            else if (role === ADMIN) router.push(ADMIN_DASHBOARD);
            else if (role === SUPER_ADMIN) router.push(ADMIN_DASHBOARD);
            else router.push(`/${res.data.username}`);
        }
    }, []);

    return (
        <>
            <Head>
                <title>DCC : Login</title>
            </Head>
            <Navbar />
            <div className="content-area-top">
                <div className="login-page-container">
                    <LoginForm />
                    <div className="login-lottie">
                        <Lottie animationData={LoginLottie} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default login;
