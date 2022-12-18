import React from "react";
import HeroLottie from "./HeroLottie";

function HomePage() {
  return (
    <div className="hero min-h-screen bg-inherit pl-16">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <HeroLottie />
        <div>
          <h1 className="text-5xl font-bold">Dream Code Create!</h1>
          <p className="py-6">
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
