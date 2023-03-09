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
    var response = {verified : false};
    await axios
      .get("http://localhost:5000/auth/verifyToken", config)
      .then((res) => {
        store.dispatch(loginUser({role:res.data.role, profile_pic:res.data.profile_pic}));
        response.verified = true;
        response.role = res.data.role;
      })
      .catch((err) => {
        console.log(err);
        console.log("Not Verified");
        store.dispatch(setLoading(false));
      });
      return response;
  } else return {verified : false};
};

export default checkToken;

