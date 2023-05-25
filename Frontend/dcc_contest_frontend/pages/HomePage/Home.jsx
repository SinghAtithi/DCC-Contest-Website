import React from "react";
import HeroLottie from "./HeroLottie";
import { useRouter } from "next/router";


function HomePage() {
  const router = useRouter();

  return (
    <div className="content-area-top home-page">
      <div className="home-page-content-general">
        <HeroLottie />
        <div>
          <h1>Dream Code Conquer!</h1>
          <p>
            Become a coding pro with our comprehensive practice materials. From
            data structures to algorithms, our platform covers all the
            fundamental concepts you need to succeed in computer science. Start
            your journey to coding mastery now!
          </p>
          <button className="btn btn-success" onClick={()=>router.push("/signup")}>Get Started</button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
