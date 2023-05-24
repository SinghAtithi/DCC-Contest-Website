import axios from "axios";
import store from "../store/baseStore";
import { loginUser, setLoading } from "../store/loginStore";
import { BASE_URL } from "./constants";

const checkToken = async () => {
  if (localStorage.getItem("token")) {
    const config = {
      headers: {
        token: localStorage.getItem("token"),
      },
    };
    var response = { verified: false };
    await axios
      .get(`${BASE_URL}/auth/verifyToken`, config)
      .then((res) => {
        store.dispatch(
          loginUser({
            role: res.data.role,
            profile_pic: res.data.profile_pic,
            username: res.data.username,
          })
        );
        response.verified = true;
        response.role = res.data.role;
      })
      .catch((err) => {
        store.dispatch(setLoading(false));
      });
    return response;
  } else return { verified: false };
};

export default checkToken;
