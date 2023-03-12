import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router"
import { useState } from "react"
import Navbar from "../../components/Navbar";
import { LOGIN_PAGE, SIGNUP_PAGE , BASE_URL, FORGOT_PASSWORD_BACKEND, FORGET_PASSWORD_PAGE} from "../../utils/constants";
import Lottie from "lottie-react";
import LoginLottie from "../../public/loginLottie.json";
import toggleLoaderBackdrop from "../../utils/toggleCustomBackdrop";

export default function ForgotPassword() {
    const router = useRouter();
    const { token } = router.query;

    const [password, setPassword] = useState("");
    const [confirm_password, setConfirmPassword] = useState("");
    const [error,setError] = useState("");

    const onsubmit = ()=>{
        toggleLoaderBackdrop();
        console.log(token,password,confirm_password)

        const url = `${BASE_URL}${FORGOT_PASSWORD_BACKEND}`;
        const data = {
            token: token,
            password : password,
            confirm_password : confirm_password
        };
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        axios.post(url, data, config).then((res) => {
            alert("Password Changed Successfully.");
            router.push('/login');

        }).catch((err) => {
            setError(err.response.data.error);
            toggleLoaderBackdrop();

        })
    }
    return (
        <div>
          <Navbar />
          <div className="container min-w-full mt-16 w-full flex justify-around items-center">
            <div className="login flex items-start w-3/12 flex-col">
                <h1 className="py-4">Enter your password and confirm password</h1>
              {error && <div className="alert alert-error shadow-lg">
                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <span>{error}</span>
                </div>
              </div>}
              <input
                type="password"
                className="input text-xl rounded-lg my-4 bg-inherit input-success h-16 w-full max-w-lg"
                value={password}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />{" "}
              <input
                type="password"
                className="input text-xl rounded-lg my-4 bg-inherit input-success h-16 w-full max-w-lg"
                value={confirm_password}
                placeholder="Confirm Password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <br />
              {token && password && confirm_password ? <button
                className="btn btn-success btn-lg rounded-lg"
                onClick={()=>{
                    onsubmit();

                }}
              >
                Submit
              </button> : <button
                className="btn btn-error btn-lg rounded-lg disabled"
              >
                Submit
              </button>}
              <Link href={LOGIN_PAGE} onClick={() => {
                toggleLoaderBackdrop();
              }} className="py-4" >Login</Link>
              <Link href={SIGNUP_PAGE} onClick={() => {
                toggleLoaderBackdrop();
              }}>Don't have an account? Create one now</Link>
            </div>
            <div className="lottie">
              <Lottie animationData={LoginLottie} className="w-10/12" />
            </div>
          </div>
        </div>
      );
}