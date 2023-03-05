import { useEffect } from "react"
import store from "../store/baseStore";
import loginstore from "../store/loginStore";
import { useSelector } from "react-redux";
import checkToken from "../utils/checkToken";

export default function Auth(props){
    useEffect(()=>{
        console.log(store.getState().login.isAdmin);
        checkToken().then((res)=>{
            console.log(res)
        });


        // console.log("Inside Auth component");
    })
    return(<>{props.children}</>)
}