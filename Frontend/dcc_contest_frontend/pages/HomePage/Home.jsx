import React from "react";
import HeroLottie from "./HeroLottie";


function HomePage() {

  return (
    <div className="home-page">
      <div className="home-page-content-general">
        <HeroLottie/>
        <div>
          <h1>Dream Code Create!</h1>
          <p>
            Become a coding pro with our comprehensive practice materials. From
            data structures to algorithms, our platform covers all the
            fundamental concepts you need to succeed in computer science. Start
            your journey to coding mastery now!
          </p>
          <button className="btn btn-success">Get Started</button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
