import Router, { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import SideNav from "../../../components/SideNavAdmin";
import checkToken from "../../../utils/checkToken";
import {
    ADMIN,
    END_USER,
    LOGIN_PAGE,
    SUPER_ADMIN,
    ADMIN_DASHBOARD,
    AdminSideNavMap,
} from "../../../utils/constants";
import toggleLoaderBackdrop from "../../../utils/toggleCustomBackdrop";

const ViewContest = () => {
    const { role, isLoading, loggedIn } = useSelector((state) => state.login);

    const { asPath } = useRouter();
    useEffect(() => {
        toggleLoaderBackdrop();
        if (loggedIn && (role === ADMIN || role === SUPER_ADMIN))
            toggleLoaderBackdrop();
        else if (loggedIn && role === END_USER) Router.push(`/${username}`);
        else {
            checkToken().then((status) => {
                if (status.verified) {
                    if (status.role === ADMIN || status.role === SUPER_ADMIN) {
                        // FETCH data here

                        toggleLoaderBackdrop();
                    } else Router.push(`/${username}`);
                } else Router.push(LOGIN_PAGE + "?next=admin/contest/view");
            });
        }
    }, []);

    return (
        <>
            <SideNav role={role} highlight={AdminSideNavMap.view_contests} />
            <div className="data-area">Hello from View Contest Page</div>
        </>
    );
};

export default ViewContest;
