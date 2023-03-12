import axios from "axios";
import { useRouter } from "next/router"
import { useEffect } from "react"
import Navbar from "../../components/Navbar";
import { BASE_URL, VERIFY_EMAIL_BACKEND } from "../../utils/constants";

export default function ConfirmEmail() {
    const router = useRouter();
    const { token } = router.query;

    useEffect(() => {
        if (token) {
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
                router.push('/resendConfirmation');

            })
        }
    }, [token])
    return (
        <>
            <Navbar />
            <div className="relative top-16"></div>
        </>
    )
}