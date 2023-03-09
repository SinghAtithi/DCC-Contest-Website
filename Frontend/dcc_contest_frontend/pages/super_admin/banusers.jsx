import Router, { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import SideNav from "../../components/SideNavAdmin";
import { ADMIN, AdminSideNavMap, ADMIN_DASHBOARD, ASSIGN_REVOKE_ROLES_PAGE , SUPER_ADMIN, END_USER,USER_DASHBOARD} from "../../utils/constants";
import toggleLoaderBackdrop from "../../utils/toggleCustomBackdrop";
import checkToken from "../../utils/checkToken";

export default function AssignRoles(){
    const {loggedIn,role} = useSelector(state=>state.login);
    const {asPath} = useRouter();
    

    useEffect(()=>{
        toggleLoaderBackdrop();
        if(loggedIn && role === SUPER_ADMIN) toggleLoaderBackdrop();
        else if(loggedIn && role===END_USER) {
            alert("You are not authorised to access this page.");
            Router.push(USER_DASHBOARD);
        }
        else if(loggedIn && role===ADMIN) {
            alert("You are not authorised to access this page.");
            Router.push(ADMIN_DASHBOARD);
        }
        else{
            checkToken().then((status)=>{
                if (status.verified) {
                    if(status.role === SUPER_ADMIN) {

                        // FETCH data here

                        toggleLoaderBackdrop();
                    }
                    else if(status.role===ADMIN) {
                        alert("You are not authorised to access this page.");
                        Router.push(ADMIN_DASHBOARD);
                    }
                    else {
                        alert("You are not authorised to access this page.");
                        Router.push(USER_DASHBOARD);
                    }
                }
                else Router.push(LOGIN_PAGE+"?next=super_admin/banusers");
            })
        }
    },[])

    return(
        <>
            <SideNav role = {role} highlight = {AdminSideNavMap.ban_users}/>
            <div className="data-area">
                Hello from Ban users page
            </div>
        </>
    )
}