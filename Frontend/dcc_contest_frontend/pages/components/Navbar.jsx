import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image"; 

function Navbar() {
  useEffect(() => {
    console.log("refreshed");
  }, []);
  return (
    <nav>
      <div className="navbar bg-slate-700 bg-opacity-25 px-12">
        <div className="flex-1">
          <Link href="/" className="btn btn-ghost normal-case text-xl hover:bg-inherit">
            {/* <img src="../../public/DCC_LOGO.png" /> */}
            <Image
              className="hover:scale-110 "
              // loader={myLoader}
              src="/DCC_LOGO.png"
              alt="Picture of the author"
              width={64}
              height={64}
            />
          </Link>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link href="/">Contest</Link>
            </li>
            <li>
              <Link href="/ProblemSet">Problem Set</Link>
            </li>
            <li>
              <Link href="/">Blogs</Link>
            </li>
            <li>
              <Link href="/">About</Link>
            </li>
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img src="https://placeimg.com/80/80/people" />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <Link href="/" className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </Link>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li>
                  <a>Logout</a>
                </li>
              </ul>
            </div>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
