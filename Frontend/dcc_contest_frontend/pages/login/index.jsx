import React, { useEffect } from "react";
import Navbar from "../../components/Navbar";
import LoginLottie from "../../public/loginLottie.json";
import Lottie from "lottie-react";
import { useRouter } from "next/router";
import checkToken from "../../utils/checkToken";
import { ADMIN, SUPER_ADMIN, ADMIN_DASHBOARD } from "../../utils/constants";
import { useSelector } from "react-redux";
import Head from "next/head";
import LoginForm from "./LoginForm";
import { useState } from "react";
import LoginPageSkeleton from "../../components/skeleton/LoginPageSkeleton";
import TheFooter from "../../components/Footer";

function Login() {
    const router = useRouter();
    const { loggedIn, role } = useSelector((state) => state.login);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
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
                    setLoading(false);
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
                <h1 id="contest-main-heading" className="font-serif">Welcome to Code-DCC</h1>
                <div className="login-page-container">
                    {loading ? <LoginPageSkeleton /> : <>
                        <div></div>  {/* Just to adjust the login form and animation */}
                        <LoginForm />
                        <div className="login-lottie">
                            <Lottie animationData={LoginLottie} />
                        </div>
                        <div></div> {/* Just to adjust the login form and animation */}
                    </>}
                </div>
            </div>
            <TheFooter />
        </>
    );
}

export default Login;
