import Link from "next/link";
import Image from "next/image";
import {
    HOME_PAGE,
} from "../utils/constants";

import { useRouter } from "next/router";
import BackdropLoader from "./BackdropLoader";
import store from "../store/baseStore";
import { logoutUser } from "../store/loginStore";
import { useSelector } from "react-redux";

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
                    <Link href={`/${props.username}`}>User Dashboard</Link>
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
            </ul>
        </div>
    );
}

export default function SideNavSettings(props) {

    const { profile_pic, username } = useSelector((state) => state.login);
    const { asPath } = useRouter();
    return (
        <>
            <BackdropLoader />
            <div className="navbar-top-side">
                <div className="navbar-logo-side">
                    <Link
                        href={HOME_PAGE}
                    >
                        <Image
                            src="/DCC_LOGO01.png"
                            alt="Picture of the author"
                            width={100}
                            height={0}
                        />
                    </Link>
                </div>
                <div className="custom-navbar-items !block">
                    <UserMenu asPath={asPath} profile_pic={profile_pic} username={username}/>
                </div>
                <div className="custom-backdrop"></div>
            </div>

        </>
    );
}
