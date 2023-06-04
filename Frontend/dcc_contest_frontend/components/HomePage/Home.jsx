import React from "react";
import HeroLottie from "./HeroLottie";
import { useRouter } from "next/router";
// import LinkedListAnimation from "./LinkedListAnimation";
// import MergeSort from "./MergeSort";


function HomePage() {
  const router = useRouter();

  return (
    <div className="content-area-top home-page">
      <div className="home-page-content-general">
        <HeroLottie />
        <div>
          <h1 className="text-4xl font-bold text-white mb-4">
            <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
              Dream Code Conquer!
            </span>
          </h1>
          <p className="text-lg text-gray-300 leading-relaxed mb-6 font-serif">
            <span className="bg-gradient-to-r from-green-300 to-red-200 text-transparent bg-clip-text">
              Become a coding pro with our comprehensive practice materials. From data structures to algorithms, our platform covers all the fundamental concepts you need to succeed in computer science. Start your journey to coding mastery now!
            </span>
          </p>
          <button className="btn btn-success rounded-md" onClick={() => router.push("/signup")}>Get Started</button>
        </div>
      </div>
      <Animations />
    </div>
  );
}

export default HomePage;


function Animations() {
  return (
    <div className="home-page-animation">
      <h2 class="text-3xl font-bold text-gray-400 mb-6">
        <span class="inline-block bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
          Unveiling Algorithms
        </span>
        <span class="inline-block text-2xl ml-2"> : Animated Edition</span>
      </h2>
      <div className="home-page-animation-container">
        <div className="home-page-animation-column">
          <h1 className="text-md font-bold text-white mb-4">
            <span className="bg-gradient-to-r from-green-600 to-green-100 text-transparent bg-clip-text">
              Sorting Algorithms
            </span>
          </h1>
          <img src="/sortingAnimation.gif" alt=""/>
        </div>
        <div className="home-page-animation-column">
          <h1 className="text-md font-bold text-white mb-4">
            <span className="bg-gradient-to-r from-green-600 to-green-100 text-transparent bg-clip-text">
              Slow and Fast Pointer
            </span>
          </h1>
          <img src="/slowFastPointer.gif" alt=""/>
        </div>
        <div className="home-page-animation-column">
          <h1 className="text-md font-bold text-white">
            <span className="bg-gradient-to-r from-green-600 to-green-100 text-transparent bg-clip-text">
              DFS
            </span>
          </h1>
          <img src="/dfs.gif" alt=""/>
        </div>
      </div>
    </div>

  )
}