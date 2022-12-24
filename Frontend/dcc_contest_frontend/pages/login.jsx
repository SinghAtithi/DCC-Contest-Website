import React, { useState } from "react";
import Navbar from "../components/Navbar";
import LoginLottie from "../public/loginLottie.json";
import Lottie from "lottie-react";

function login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div>
      <Navbar />
      <div className="container min-w-full mt-16 w-full flex justify-around items-center">
        <div className="login flex items-start w-3/12 flex-col">
          <input
            type="text"
            className="input text-xl rounded-lg my-4 bg-inherit input-success h-16 w-full max-w-lg"
            value={email}
            placeholder="Email or Username"
            onChange={(e) => setEmail(e.target.value)}
          />{" "}
          <input
            type="password"
            className="input text-xl rounded-lg my-4 bg-inherit input-success h-16 w-full max-w-lg"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <button className="btn btn-success btn-lg rounded-lg">Login</button>
        </div>
        <div className="lottie">
          <Lottie animationData={LoginLottie} className="w-10/12" />
        </div>
      </div>
    </div>
  );
}

export default login;
