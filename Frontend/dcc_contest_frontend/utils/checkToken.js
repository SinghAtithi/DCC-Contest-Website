// import { loginUser, logoutUser } from "../store/loginStore";
// import store from "../store/baseStore";
// import axios from "axios";
import { verify } from "jsonwebtoken";

const checkToken = () => {
  const jwt_secret = process.env.NEXT_PUBLIC_JWT_SECRET_KEY;
  // if (localStorage.getItem("token")) {
  //   const config = {
  //     headers: {
  //       token: localStorage.getItem("token"),
  //     },
  //   };
  //   await axios
  //     .get("http://localhost:5000/auth/verifyToken", config)
  //     .then((res) => {
  //       console.log("Verified yet again");
  //       store.dispatch(loginUser(localStorage.getItem("userName")));
  //       return true;
  //     })
  //     .catch((err) => {
  //       console.log("Not Verified");
  //       store.dispatch(logoutUser());
  //       return false;
  //     });
  // } else return false;
  const token = localStorage.getItem("token");
  console.log(token);
  console.log(jwt_secret);
  if (token) {
    try {
      const decoded = verify(token, jwt_secret);
      console.log(decoded);
      return true;
    } catch (e) {
      console.log("error : ",e);
      return false;
    }
  } else return false;
};

export default checkToken;
