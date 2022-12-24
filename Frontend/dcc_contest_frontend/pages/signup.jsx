import React from "react";
import Navbar from "../components/Navbar";
import signupQues from "../components/signupQues";
import heroSignupLottie from "../public/heroSignupLottie.json";
import Lottie from "lottie-react";

function signup() {
  const [quesInd, setQuesInd] = React.useState(0);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [userName, setUserName] = React.useState("");
  const [githubURL, setGithubURL] = React.useState("");
  const [linkedinURL, setLinkedinURL] = React.useState("");
  const [codeforcesURL, setCodeforcesURL] = React.useState("");
  const [codechefURL, setCodechefURL] = React.useState("");
  const [bio, setBio] = React.useState("");
  const [text, setText] = React.useState("");

  const onNextClick = () => {
    if (quesInd > signupQues.length - 1) {
      return;
    }

    switch (quesInd) {
      case 0:
        setName(text);
        break;
      case 1:
        setEmail(text);
        break;
      case 2:
        setPassword(text);
        break;
      case 3:
        setConfirmPassword(text);
      case 4:
        setUserName(text);
        break;
      case 5:
        setGithubURL(text);
        break;
      case 6:
        setLinkedinURL(text);
        break;
      case 7:
        setCodeforcesURL(text);
        break;
      case 8:
        setCodechefURL(text);
        break;
      case 9:
        setBio(text);
        break;
      default:
        break;
    }
    if (quesInd < signupQues.length - 1) {
      setQuesInd(quesInd + 1);
    }
    if (quesInd === signupQues.length - 1) {
      onSubmit();
    }
    setText("");
  };

  const onSubmit = () => {
    console.log(name);
  };

  return (
    <div className="">
      <Navbar />
      <div className="container min-w-full mt-16 flex justify-around items-center">
        <Lottie animationData={heroSignupLottie} className="w-4/12" />
        <div className={`${quesInd < signupQues.length - 1 ? "" : "hidden"}`}>
          <div className="heroForm mt-8 text-3xl">
            {signupQues[quesInd].question}
          </div>
          <div className="flex justify-center items-center">
            <input
              type="text"
              className="input text-2xl rounded-lg my-4 bg-inherit input-success h-16 w-full max-w-lg"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") onNextClick();
              }}
            />
            <button
              className="btn btn-outline btn-success rounded-full mx-6"
              onClick={onNextClick}
            >
              {">|"}
            </button>
          </div>
        </div>
        <div
          className={`${
            quesInd === signupQues.length - 1
              ? "flex justify-center items-center flex-col"
              : "hidden"
          }`}
        >
          <p className="text-xl my-5">
            By clicking on the button you accept to our terms and conditions!
          </p>
          <button className="btn btn-outline btn-success rounded-full mx-6">
            {"Yay Lets Go!"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default signup;
