import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

import { GiHamburgerMenu } from "react-icons/gi";
import {
  ABOUT_PAGE,
  ADMIN,
  ADMIN_DASHBOARD,
  BLOGS_PAGE,
  CONTEST_PAGE,
  EVENT_PAGE,
  HOME_PAGE,
  INTERVIEW_PREP_PAGE,
  LOGIN_PAGE,
  PROBLEM_SET_PAGE,
  SETTINGS_PAGE,
  SIGNUP_PAGE,
  SUPER_ADMIN,
} from "../utils/constants";
import { useSelector } from "react-redux";
import { logoutUser } from "../store/loginStore";
import store from "../store/baseStore";
import BackdropLoader from "./BackdropLoader";

function getPath(role, username) {
  return role === ADMIN || role === SUPER_ADMIN
    ? ADMIN_DASHBOARD
    : `/${username}`;
}

function Navbar() {
  const { asPath } = useRouter();
  const { role, loggedIn, profile_pic, username } = useSelector(
    (state) => state.login
  );

  return (
    <>
      <div className="custom-navbar">
        <div className="navbar-logo">
          <Link href="/">
            <Image
              src="/DCC_LOGO01.png"
              alt="Picture of the author"
              width={100}
              height={0}
            />
          </Link>
        </div>

        <ul className="custom-navbar-items">
          <li>
            <Link href={CONTEST_PAGE}>Contest</Link>
          </li>
          <li>
            <Link href={PROBLEM_SET_PAGE}>Problem Set</Link>
          </li>
          <li>
            <Link href={EVENT_PAGE}>Event</Link>
          </li>
          <li>
            <Link href={INTERVIEW_PREP_PAGE}>Interview Prep</Link>
          </li>
          <li>
            <Link href={ABOUT_PAGE}>About</Link>
          </li>
          {loggedIn && (
            <UserMenu
              role={role}
              asPath={asPath}
              profile_pic={profile_pic}
              username={username}
            />
          )}
          {!loggedIn && (
            <>
              <li>
                <Link href={LOGIN_PAGE}>Login</Link>
              </li>
              <li>
                <Link href={SIGNUP_PAGE}>SignUp</Link>
              </li>
            </>
          )}
        </ul>
        <div
          className="custom-navbar-hamburger"
          onClick={() => {
            document
              .querySelector(".custom-navbar-items-offscreen")
              .classList.toggle("active");
            document
              .querySelector(".custom-backdrop")
              .classList.toggle("active");
          }}
        >
          <GiHamburgerMenu size={35} />
        </div>
      </div>
      <ul className="custom-navbar-items-offscreen">
        <li>
          <Link href={CONTEST_PAGE}>Contest</Link>
        </li>
        <li>
          <Link href={PROBLEM_SET_PAGE}>Problem Set</Link>
        </li>
        <li>
          <Link href={INTERVIEW_PREP_PAGE}>Interview Prep</Link>
        </li>
        <li>
          <Link href={ABOUT_PAGE}>About</Link>
        </li>
        {loggedIn && (
          <>
            <li>
              <Link href={getPath(role, username)}>Dashboard</Link>
            </li>
            <li>
              <Link href={SETTINGS_PAGE}>Settings</Link>
            </li>
            <li>
              <Link
                href={HOME_PAGE}
                onClick={() => {
                  store.dispatch(logoutUser());
                }}
              >
                Logout
              </Link>
            </li>
          </>
        )}
        {!loggedIn && (
          <>
            <li>
              <Link href={LOGIN_PAGE}>Login</Link>
            </li>
            <li>
              <Link href={SIGNUP_PAGE}>SignUp</Link>
            </li>
          </>
        )}
      </ul>

      <div className="custom-backdrop"></div>
      <BackdropLoader />
    </>
  );
}

function UserMenu(props) {
  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img src={props.profile_pic} />
        </div>
      </label>
      <ul
        tabIndex={0}
        className="custom-navbar-avtar-pop menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
      >
        <li>
          <Link href={getPath(props.role, props.username)}>Dashboard</Link>
        </li>
        <li>
          <Link href={SETTINGS_PAGE}>Settings</Link>
        </li>
        <li>
          <Link
            href="/"
            onClick={() => {
              store.dispatch(logoutUser());
            }}
          >
            Logout
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
