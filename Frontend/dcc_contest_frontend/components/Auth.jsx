import { useEffect } from "react"
import store from "../store/baseStore";
import checkToken from "../utils/checkToken";
import { setLoading } from "../store/loginStore";
import { useSelector } from "react-redux";

export default function Auth(props) {
    const loggedIn = useSelector(state => state.login.loggedIn);
    useEffect(() => {
        if (!loggedIn) {
            checkToken().then((res) => {
                console.log("From useEffect of Auth");
                console.log(Date());
            }).catch((err) => {
                console.log(err);

            })
        };
    })

    return (<>{props.children}</>)
}