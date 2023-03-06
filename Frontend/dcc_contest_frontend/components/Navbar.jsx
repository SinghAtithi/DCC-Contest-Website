import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import GeneralLoading from "../public/GeneralLoading.json";
import Lottie from "lottie-react";

import { GiHamburgerMenu } from "react-icons/gi";

function Navbar() {
  return (
    <nav>
      <div className="custom-navbar">
        <div className="navbar-logo">
          <Link
            href="/"
          >
            <Image
              src="/DCC_LOGO01.png"
              alt="Picture of the author"
              width={100}
              height={0}
            />
          </Link>
        </div>

        <ul className="custom-navbar-items" >
          <li>
            <Link href="/contest">Contest</Link>
          </li>
          <li>
            <Link href="/ProblemSet">Problem Set</Link>
          </li>
          <li>
            <Link href="/blogs">Blogs</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
          <UserMenu />
        </ul>
        <div className="custom-navbar-hamburger" onClick={() => {
          document.querySelector(".custom-navbar-items-offscreen").classList.toggle("active");
          document.querySelector(".custom-backdrop").classList.toggle("active");
        }}><GiHamburgerMenu size={35} /></div>

      </div>
      <ul className="custom-navbar-items-offscreen" >
        <li>
          <Link href="/">Contest</Link>
        </li>
        <li>
          <Link href="/ProblemSet">Problem Set</Link>
        </li>
        <li>
          <Link href="/Blogs">Blogs</Link>
        </li>
        <li>
          <Link href="/">About</Link>
        </li>
        <li>
          <Link href="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link href="/">Settings</Link>
        </li>
        <li>
          <Link href="/">Logout</Link>
        </li>

      </ul>

      <div className="custom-backdrop"></div>
      <div className="custom-backdrop-loader">
        <Lottie animationData={GeneralLoading} className="w-1/4"/>
      </div>
    </nav>
  );
}

function UserMenu() {
  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img src="https://placeimg.com/80/80/people" />
        </div>
      </label>
      <ul
        tabIndex={0}
        className="custom-navbar-avtar-pop menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
      >
        <li>
          <Link href="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link href="/settings">Settings</Link>
        </li>
        <li>
          <Link href="/logout">Logout</Link>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;


