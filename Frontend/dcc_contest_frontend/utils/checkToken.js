import axios from 'axios';

const checkToken = async () => {
  if (localStorage.getItem("token")) {
    const config = {
      headers: {
        token: localStorage.getItem("token"),
      },
    };
    var status = false;
    await axios
      .get("http://localhost:5000/auth/verifyToken/admin", config)
      .then((res) => {
        console.log("Verified yet again");
        status = true;
      })
      .catch((err) => {
        console.log("Not Verified");
      });
      return status;

  } else return false;
};

export default checkToken;
