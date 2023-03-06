import React from "react";
import Link from "next/link";
import Image from "next/image";
import toggleLoaderBackdrop from "../utils/toggleCustomBackdrop";
import { useRouter } from "next/router";

import { GiHamburgerMenu } from "react-icons/gi";
import { ABOUT_PAGE, ADMIN, ADMIN_DASHBOARD, BLOGS_PAGE, CONTEST_PAGE, HOME_PAGE, LOGIN_PAGE, PROBLEM_SET_PAGE, SETTINGS_PAGE, SIGNUP_PAGE, SUPER_ADMIN, USER_DASHBOARD } from "../utils/constants";
import { useSelector } from "react-redux";
import { logoutUser } from "../store/loginStore";
import store from "../store/baseStore";
import BackdropLoader from "./BackdropLoader";

function getPath(role) {
  return (role === ADMIN || role === SUPER_ADMIN) ? ADMIN_DASHBOARD : USER_DASHBOARD;
}

function Navbar() {
  const { asPath } = useRouter();
  const {role,loggedIn}  = useSelector(state => state.login);


  return (

    <nav>
      <div className="custom-navbar">
        <div className="navbar-logo">
          <Link
            href="/"
            onClick={() => {
              toggleLoaderBackdrop(asPath, HOME_PAGE);
            }}
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
          <li onClick={() => {
            toggleLoaderBackdrop(asPath, CONTEST_PAGE);
          }}>
            <Link href={CONTEST_PAGE} >Contest</Link>
          </li>
          <li onClick={() => {
            toggleLoaderBackdrop(asPath, PROBLEM_SET_PAGE);
          }}>
            <Link href={PROBLEM_SET_PAGE} >Problem Set</Link>
          </li>
          <li onClick={() => {
            toggleLoaderBackdrop(asPath, BLOGS_PAGE);
          }}>
            <Link href={BLOGS_PAGE} >Blogs</Link>
          </li>
          <li onClick={() => {
            toggleLoaderBackdrop(asPath, ABOUT_PAGE);
          }}>
            <Link href={ABOUT_PAGE}>About</Link>
          </li>
          {loggedIn && <UserMenu role={role} asPath={asPath}/>}
          {!loggedIn && <>
            <li onClick={() => {
              toggleLoaderBackdrop(asPath, LOGIN_PAGE);
            }}>
              <Link href={LOGIN_PAGE} >Login</Link>
            </li>
            <li onClick={() => {
              toggleLoaderBackdrop(asPath, SIGNUP_PAGE);
            }}>
              <Link href={SIGNUP_PAGE}>SignUp</Link>
            </li>
          </>}
        </ul>
        <div className="custom-navbar-hamburger" onClick={() => {
          document.querySelector(".custom-navbar-items-offscreen").classList.toggle("active");
          document.querySelector(".custom-backdrop").classList.toggle("active");
        }}><GiHamburgerMenu size={35} /></div>

      </div>
      <ul className="custom-navbar-items-offscreen" >
        <li onClick={() => {
          toggleLoaderBackdrop(asPath, CONTEST_PAGE);
        }}>
          <Link href={CONTEST_PAGE}>Contest</Link>
        </li>
        <li onClick={() => {
          toggleLoaderBackdrop(asPath, PROBLEM_SET_PAGE);
        }}>
          <Link href={PROBLEM_SET_PAGE}>Problem Set</Link>
        </li>
        <li onClick={() => {
          toggleLoaderBackdrop(asPath, BLOGS_PAGE);
        }}>
          <Link href={BLOGS_PAGE}>Blogs</Link>
        </li>
        <li onClick={() => {
          toggleLoaderBackdrop(asPath, ABOUT_PAGE);
        }}>
          <Link href={ABOUT_PAGE}>About</Link>
        </li>
        {loggedIn && <><li onClick={() => {
          toggleLoaderBackdrop(asPath, getPath(role));
        }}>
          <Link href={getPath(role)}>Dashboard</Link>
        </li>
          <li onClick={() => {
            toggleLoaderBackdrop(asPath, SETTINGS_PAGE);
          }}>
            <Link href={SETTINGS_PAGE}>Settings</Link>
          </li>
          <li onClick={() => {
            toggleLoaderBackdrop(asPath, HOME_PAGE);
          }}>
            <Link href={HOME_PAGE} onClick={()=>{
              store.dispatch(logoutUser());
            }}>Logout</Link>
          </li></>}
        {!loggedIn && <>
          <li onClick={() => {
            toggleLoaderBackdrop(asPath, LOGIN_PAGE);
          }}>
            <Link href={LOGIN_PAGE} >Login</Link>
          </li>
          <li onClick={() => {
            toggleLoaderBackdrop(asPath, SIGNUP_PAGE);
          }}>
            <Link href={SIGNUP_PAGE}>SignUp</Link>
          </li>
        </>}

      </ul>

      <div className="custom-backdrop"></div>
      <BackdropLoader/>
    </nav>
  );
}

function UserMenu(props) {
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
        <li onClick={() => {
          toggleLoaderBackdrop(props.asPath, getPath(props.role));
        }}>
          <Link href={getPath(props.role)}>Dashboard</Link>
        </li>
        <li onClick={() => {
          toggleLoaderBackdrop(props.asPath, SETTINGS_PAGE);
        }}>
          <Link href={SETTINGS_PAGE}>Settings</Link>
        </li>
        <li onClick={() => {
          toggleLoaderBackdrop(props.asPath, HOME_PAGE);
        }}>
          <Link href={HOME_PAGE} onClick={()=>{
              store.dispatch(logoutUser());
            }}>Logout</Link>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;


