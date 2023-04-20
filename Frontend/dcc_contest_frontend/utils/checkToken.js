import axios from 'axios';
import store from '../store/baseStore';
import { loginUser, setLoading } from '../store/loginStore';

const checkToken = async () => {
  if (localStorage.getItem("token")) {
    const config = {
      headers: {
        token: localStorage.getItem("token"),
      },
    };
    var response = { verified: false };
    await axios
      .get("https://0894-4-240-84-221.ngrok-free.app/auth/verifyToken", config)
      .then((res) => {
        store.dispatch(loginUser({ role: res.data.role, profile_pic: res.data.profile_pic, username: res.data.username }));
        response.verified = true;
        response.role = res.data.role;
      })
      .catch((err) => {
        console.log(err);
        console.log("Not Verified");
        store.dispatch(setLoading(false));
      });
    return response;
  } else return { verified: false };
};

export default checkToken;

