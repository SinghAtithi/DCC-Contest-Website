import { useSelector } from "react-redux";
import SideNavSettings from "../../components/SideNavSettings";
import { useRouter } from "next/router";
import AccountSection from "../../components/accounts/AccountSection";
import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import ProfileImage from "../../components/accounts/ProfileImage";
import { BASE_URL, GET_USER_ENDPOINT_BACKEND } from "../../utils/constants";
import axios from "axios";
import SettingsSkeleton from "../../components/skeleton/SettingsSkeleton";
import Head from "next/head";
import TheFooter from "../../components/Footer";

const toastCross = {
  position: "absolute",
  top: "2px",
  right: "2px",
};

export default function Settings() {
  const { profile_pic, username, role } = useSelector((state) => state.login);
  const router = useRouter();

  const [toastMessage, setToastMessage] = useState("");
  const [toastClass, setToastClass] = useState("alert alert-error relative");

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [githubURL, setGithubURL] = useState("");
  const [linkedinURL, setLinkedinURL] = useState("");
  const [codeforcesURL, setCodeforcesURL] = useState("");
  const [codechefURL, setCodechefURL] = useState("");
  const [bio, setBio] = useState("");
  const [severeError, setSevereError] = useState("");
  const [skeletonLoading , setSkeletonLoading] = useState(true);

  useEffect(() => {
    const url = BASE_URL + GET_USER_ENDPOINT_BACKEND;
    const options = {
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
    };

    axios
      .get(url, options)
      .then((res) => {
        setName(res.data.name);
        setEmail(res.data.email);
        setGithubURL(res.data.githubURL);
        setLinkedinURL(res.data.linkedinURL);
        setCodeforcesURL(res.data.codeforcesURL);
        setCodechefURL(res.data.codechefURL);
        setBio(res.data.bio);
        setSkeletonLoading(false);
      })
      .catch((error) => {
        if (error.response) {
          const statusCode = error.response.status;
          if (statusCode == 400) setSevereError("Bad Request");
          else if (statusCode == 401)
            setSevereError("Your session has expired. Please relogin.");
          else setSevereError("Internal Server Error");
        } else if (error.request)
          setSevereError(
            "Network Error. Please check your internet connectivity."
          );
        else setSevereError("Something went wrong. Please reload.");
      });
  }, []);

  return (
    <>
    <Head><title>DCC : Settings</title></Head>
      <SideNavSettings />
      <div className="content-area-top">
        {severeError ? (
          <div className="flex justify-center p-2">
            <div className="alert alert-error shadow-lg w-fit">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current flex-shrink-0 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>{severeError}</span>
              </div>
            </div>
          </div>
        ) : (
          skeletonLoading ? <SettingsSkeleton /> : (<div className="m-2">
            {toastMessage && (
              <div className="toast toast-start z-50">
                <div className={toastClass}>
                  <div>
                    <span>{toastMessage}</span>
                  </div>
                  <div style={toastCross}>
                    <AiOutlineClose
                      onClick={() => {
                        setToastMessage("");
                      }}
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="account-top-div">
              <ProfileImage
                profile_pic={profile_pic}
                setToastMessage={setToastMessage}
                setToastClass={setToastClass}
                username={username}
              />
              <div className="profile-info-div">
                <div className="user-name">
                  <div>{name}</div>{" "}
                  <div
                    className="user-go"
                    onClick={() => router.push(`/${username}`)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      fill="currentColor"
                      class="bi bi-box-arrow-right"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"
                      />
                      <path
                        fill-rule="evenodd"
                        d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"
                      />
                    </svg>
                  </div>{" "}
                </div>
                <p className="user-username">
                  <strong>username :</strong> {username}
                </p>
                <p className="user-email">
                  <strong>email :</strong> {email}
                </p>
                <p className="user-role">
                  <strong>role :</strong> {role}
                </p>
              </div>
            </div>

            <AccountSection
              heading={"Username"}
              value={username}
              disable_edit={true}
            />
            <AccountSection
              heading={"Email"}
              value={email}
              disable_edit={true}
            />
            <AccountSection
              heading={"Name"}
              value={name}
              setValue={setName}
              update_field={"name"}
              setToastMessage={setToastMessage}
              setToastClass={setToastClass}
            />
            <AccountSection
              heading={"GitHub URL"}
              value={githubURL}
              setValue={setGithubURL}
              update_field={"githubURL"}
              setToastMessage={setToastMessage}
              setToastClass={setToastClass}
            />
            <AccountSection
              heading={"LinkedIn URL"}
              value={linkedinURL}
              setValue={setLinkedinURL}
              update_field={"linkedinURL"}
              setToastMessage={setToastMessage}
              setToastClass={setToastClass}
            />
            <AccountSection
              heading={"Codeforces URL"}
              value={codeforcesURL}
              setValue={setCodeforcesURL}
              update_field={"codeforcesURL"}
              setToastMessage={setToastMessage}
              setToastClass={setToastClass}
            />
            <AccountSection
              heading={"Codechef URL"}
              value={codechefURL}
              setValue={setCodechefURL}
              update_field={"codechefURL"}
              setToastMessage={setToastMessage}
              setToastClass={setToastClass}
            />
            <AccountSection
              heading={"Bio"}
              value={bio}
              setBio={setBio}
              update_field={"bio"}
              setToastMessage={setToastMessage}
              setToastClass={setToastClass}
            />
          </div>)
        )}
      </div>
      <TheFooter />
    </>
  );
}
