import Router, { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import SideNav from "../../components/SideNavAdmin";
import {
    ADMIN,
    AdminSideNavMap,
    ADMIN_DASHBOARD,
    ASSIGN_REVOKE_ROLES_PAGE,
    SUPER_ADMIN,
    END_USER,
    USER_DASHBOARD,
} from "../../utils/constants";
import toggleLoaderBackdrop from "../../utils/toggleCustomBackdrop";
import checkToken from "../../utils/checkToken";

export default function ChangeEmail() {
    const { loggedIn, role } = useSelector((state) => state.login);
    const { asPath } = useRouter();

    useEffect(() => {
        toggleLoaderBackdrop();
        if (loggedIn && role === SUPER_ADMIN) toggleLoaderBackdrop();
        else if (loggedIn && role === END_USER) {
            alert("Ypu are not authorised to access this page.");
            Router.push(USER_DASHBOARD);
        } else if (loggedIn && role === ADMIN) {
            alert("Ypu are not authorised to access this page.");
            Router.push(ADMIN_DASHBOARD);
        } else {
            checkToken().then((status) => {
                if (status.verified) {
                    if (status.role === SUPER_ADMIN) {
                        // FETCH data here

                        toggleLoaderBackdrop();
                    } else if (status.role === ADMIN) {
                        alert("Ypu are not authorised to access this page.");
                        Router.push(ADMIN_DASHBOARD);
                    } else {
                        alert("Ypu are not authorised to access this page.");
                        Router.push(USER_DASHBOARD);
                    }
                } else
                    Router.push(LOGIN_PAGE + "?next=super_admin/changeemail");
            });
        }
    }, []);

    return (
        <>
            <SideNav
                role={role}
                highlight={AdminSideNavMap["change_email_request"]}
            />
            <div className="data-area">
                Hello from change email request page
            </div>
        </>
    );
}
