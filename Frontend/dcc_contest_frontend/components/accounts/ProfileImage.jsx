import { useRef, useState } from "react";
import uploadImage from "./UploadImage";
import { BASE_URL, UPDATE_USER_ENDPOINT_BACKEND } from "../../utils/constants";
import store from "../../store/baseStore";
import deleteImage from "./DeleteImage";
import { setProfilePic } from "../../store/loginStore";
import axios from "axios";

export default function ProfileImage(props) {
    const [profilePic, setNewProfilePic] = useState("");
    const [showUpload, setShowUpload] = useState(false);
    const [uploadButtonLoading, setUploadButtonLoading] = useState("");
    const inputRef = useRef(null);


    function handleImageClick() {
        inputRef.current.click();
    }

    function handleImageChange(event) {
        setShowUpload(true);
        setNewProfilePic(event.target.files[0]);
    }

    async function handleImageUpload() {
        setUploadButtonLoading("loading");
        const imageURL = await uploadImage(profilePic, props.username);

        if (imageURL) {
            const url = BASE_URL + UPDATE_USER_ENDPOINT_BACKEND;

            const options = {
                headers: {
                    "Content-Type": "application/json",
                    "token": localStorage.getItem("token")
                },
            };
            const body = {
                update_field: "profile_pic",
                new_value: imageURL
            };

            axios.put(url, body, options).then((res) => {
                props.setToastClass("alert alert-success relative");
                props.setToastMessage(`Profile Pic updated successfully.`);
                setUploadButtonLoading("");

                localStorage.setItem("token",res.data.token);


                // This is not working as imagekit-javascript doesnot provide delete feature
                // Delete the previous image
                // if (props.profile_pic.includes("imagekit") && props.profile_pic != "https://ik.imagekit.io/pqymxdgbi/avtar.png") deleteImage(props.profile_pic);

                store.dispatch(setProfilePic({ profile_pic: imageURL }));
                setShowUpload(false);


            }).catch((error) => {
                props.setToastClass("alert alert-error relative");
                if (error.response) {
                    const statusCode = error.response.status;
                    if (statusCode == 400) props.setToastMessage(`Bad Request for ${props.heading}`);
                    else if (statusCode == 401) props.setToastMessage("Your session has expired. Please relogin.");
                    else props.setToastMessage("Internal Server Error");
                }
                else if (error.request) props.setToastMessage("Network Error. Please check your internet connectivity.");
                else props.setToastMessage("Something went wrong. Please reload.");

                // This is not working as imagekit-javascript doesnot provide delete feature
                // Delete the uploaded image
                // deleteImage(imageURL);

                setNewProfilePic("");
                setUploadButtonLoading("");
                setShowUpload(false);
            })
        }
        else {
            props.setToastClass("alert alert-error relative");
            props.setToastMessage("Image Upload Failed. Please refresh and try again.");
            setNewProfilePic("");
            setUploadButtonLoading("");
            setShowUpload(false);
        }
    }

    return (
        <>
            <div className="account-image-div" >
                <div className="account-image" onClick={handleImageClick}>
                    {profilePic
                        ?
                        <img src={URL.createObjectURL(profilePic)} alt="profile_pic" className="account-image" />
                        :
                        <img src={props.profile_pic} alt="profile_pic" className="account-image" />
                    }
                    <input type="file" ref={inputRef} style={{ display: "none" }} onChange={handleImageChange} />
                    <div class="edit-overlay">
                        <span>Change</span>
                    </div>
                </div>
                {showUpload && <div className="image-upload-button">
                    <button className={`btn btn-outline btn-info btn-sm rounded ${uploadButtonLoading}`} onClick={handleImageUpload}>Upload</button>
                </div>}
            </div>
        </>
    )
}