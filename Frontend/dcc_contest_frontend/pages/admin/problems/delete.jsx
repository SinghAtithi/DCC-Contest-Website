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
    USER_DASHBOARD,
    ADMIN_DASHBOARD,
    AdminSideNavMap,
} from "../../../utils/constants";
import toggleLoaderBackdrop from "../../../utils/toggleCustomBackdrop";

const DeleteProblem = () => {
    const { role, isLoading, loggedIn } = useSelector((state) => state.login);

    const { asPath } = useRouter();
    useEffect(() => {
        toggleLoaderBackdrop();
        if (loggedIn && (role === ADMIN || role === SUPER_ADMIN))
            toggleLoaderBackdrop();
        else if (loggedIn && role === END_USER) Router.push(USER_DASHBOARD);
        else {
            checkToken().then((status) => {
                if (status.verified) {
                    if (status.role === ADMIN || status.role === SUPER_ADMIN) {
                        // FETCH data here

                        toggleLoaderBackdrop();
                    } else Router.push(USER_DASHBOARD);
                } else Router.push(LOGIN_PAGE + "?next=admin/problems/delete");
            });
        }
    }, []);

    return (
        <>
            <SideNav
                role={role}
                highlight={AdminSideNavMap["delete_problem"]}
            />
            <div className="data-area">Hello from Delete Problem Page</div>
        </>
    );
};

export default DeleteProblem;
