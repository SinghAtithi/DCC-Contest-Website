import { useSelector } from "react-redux";
import SideNav from "../../components/SideNavAdmin";
import store from "../../store/baseStore"


const admin_dashboad = ()=>{
    const isLoading = useSelector(state=>state.login.isLoading);
    const role = useSelector(state=>state.login.role);
    console.log("Dashboard : ",Date());

    if(isLoading) return(<>Loading...</>)
    return (
        <>
            <SideNav role={role}/>
            <div className="admin-dashboard-container">
                Hello

            </div>
        </>
    )
}

export default admin_dashboad;