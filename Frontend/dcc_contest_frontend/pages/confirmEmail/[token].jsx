import axios from "axios";
import { useRouter } from "next/router"
import { useEffect } from "react"
import Navbar from "../../components/Navbar";
import { BASE_URL, LOGIN_PAGE, RESEND_CONFIRMATION_EMAIL_PAGE, VERIFY_EMAIL_BACKEND } from "../../utils/constants";
import toggleLoaderBackdrop from "../../utils/toggleCustomBackdrop";

export default function ConfirmEmail() {
    const router = useRouter();
    const { token } = router.query;

    useEffect(() => {
        if (token) {
            toggleLoaderBackdrop();
            const url = `${BASE_URL}${VERIFY_EMAIL_BACKEND}`;
            const data = {
                token: token
            };
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };

            axios.post(url, data, config).then((res) => {
                alert("Email verified successfully.");
                router.push('/login');

            }).catch((err) => {
                alert(err.response.data.error);
                if (err.response.data.error == "This link has already been used and your account has been verified.") router.push(LOGIN_PAGE);
                else router.push(RESEND_CONFIRMATION_EMAIL_PAGE);

            })
        }
    }, [token])
    return (
        <>
            <Navbar/>
            <div className="relative top-16"></div>
        </>
    )
}