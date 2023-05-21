import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import {
    BASE_URL,
    VERIFY_EMAIL_BACKEND,
} from "../../utils/constants";
import Head from "next/head";

export default function ConfirmEmail() {
    const router = useRouter();
    const { token } = router.query;

    const [loadingSkeleton, setSkeletonLoading] = useState(true);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (router.isReady) {
            const url = `${BASE_URL}${VERIFY_EMAIL_BACKEND}`;
            const data = {
                token: token,
            };
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };

            axios
                .post(url, data, config)
                .then((res) => {
                    setError("");
                    setMessage("Email Verified successfully... Redirecting to login page in 3 seconds...")
                    setSkeletonLoading(false);
                    setTimeout(() => {
                        router.push("/login");
                    }, 3000)
                })
                .catch((error) => {
                    setMessage("");
                    if (error.response) {
                        const statusCode = error.response.status;
                        if (statusCode === 403) setError("Your email has already been verified.");
                        else setError("Invalid attempt to verify email.");

                    }
                    else if (error.request) setError("Network error. Please check your internet connectivity.");
                    else setError("Something went wrong. Please relaod.");
                    setSkeletonLoading(false);
                });
        }
    }, [router.isReady]);

    return (
        <>
            <Head><title>DCC : Confirm Email</title></Head>
            <Navbar />
            <div className="content-area-top">
                {loadingSkeleton
                    ?
                    <div className="flex justify-center p-2">
                        <div className="animated-background mt-1" style={{ width: "50%", height: "50px" }}></div>
                    </div>
                    :
                    (error
                        ?
                        <div className='flex justify-center p-2'>
                            <div className="alert alert-error shadow-lg w-fit">
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    <span>{error}</span>
                                </div>
                            </div>
                        </div>
                        :
                        <div className='flex justify-center p-2'>
                            <div className="alert alert-success shadow-lg w-fit">
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    <span>{message}</span>
                                </div>
                            </div>
                        </div>)}
            </div>
        </>
    );
}
