import { loginUser, logoutUser } from "../store/loginStore";
import store from "../store/baseStore";
import axios from "axios";

const checkToken = () => {
  if (localStorage.getItem("token")){
    const config = {
      headers: {
        "token" : localStorage.getItem('token')
      }
    };
    axios
      .get("http://localhost:5000/auth/verifyToken", config)
      .then((res) => {
        console.log("Verified");
        return true;
      })
      .catch((err) => {
        console.log("Not Verified");
        return false;
      });
  }
  else return false;
};
export default checkToken;
