import Router ,{ useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import SideNav from "../../components/SideNavAdmin";
import { ADMIN, AdminSideNavMap, ADMIN_DASHBOARD, ASSIGN_REVOKE_ROLES_PAGE , SUPER_ADMIN, END_USER} from "../../utils/constants";
import toggleLoaderBackdrop from "../../utils/toggleCustomBackdrop";
import checkToken from "../../utils/checkToken";


export default function AssignRoles(){
    const {loggedIn,role} = useSelector(state=>state.login);
    const {asPath} = useRouter();
    

    useEffect(()=>{
        toggleLoaderBackdrop();
        if(loggedIn && role === ADMIN) toggleLoaderBackdrop();
        else if(loggedIn && role===END_USER) {
            alert("You are not authorised to access this page.");
            Router.push(USER_DASHBOARD);
        }
        else if(loggedIn && role===SUPER_ADMIN) {
            alert("You are not authorised to access this page.");
            Router.push(ADMIN_DASHBOARD);
        }
        else{
            checkToken().then((status)=>{
                if (status.verified) {
                    if(status.role === ADMIN) {

                        // FETCH data here

                        toggleLoaderBackdrop();
                    }
                    else if(status.role===SUPER_ADMIN) {
                        alert("You are not authorised to access this page.");
                        Router.push(ADMIN_DASHBOARD);
                    }
                    else {
                        alert("You are not authorised to access this page.");
                        Router.push(USER_DASHBOARD);
                    }
                }
                else Router.push(LOGIN_PAGE+"?next=admin/report");
            })
        }
    },[])

    return(
        <>
            <SideNav role = {role} highlight = {AdminSideNavMap.report}/>
            <div className="data-area">
                Hello from Report page
            </div>
        </>
    )
}