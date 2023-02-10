// import { loginUser, logoutUser } from "../store/loginStore";
// import store from "../store/baseStore";
// import axios from "axios";
// import { verify } from "jsonwebtoken";

const checkToken = async () => {
  if (localStorage.getItem("token")) {
    const config = {
      headers: {
        token: localStorage.getItem("token"),
      },
    };
    await axios
      .get("http://localhost:5000/auth/verifyToken", config)
      .then((res) => {
        console.log("Verified yet again");
        return true;
      })
      .catch((err) => {
        console.log("Not Verified");

        return false;
      });
  } else return false;
};

export default checkToken;
