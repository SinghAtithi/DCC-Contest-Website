import ImageKit from "imagekit-javascript";
import { BASE_URL } from "../../utils/constants";

var imageKit = new ImageKit({
  publicKey: "public_/8n1ylBbpeZ+hb/0ttpwZxVDshE=",
  urlEndpoint: "https://ik.imagekit.io/pqymxdgbi/Code-DCC",
  authenticationEndpoint: `${BASE_URL}/auth/imagekitAuth`,
});

export default async function uploadImage(profilePic, name) {
  try {
    const response = await imageKit.upload({
      file: profilePic,
      fileName: `${name}`,
    });


    // Access the uploaded image URL from the response object
    const imageURL = response.url;

    return imageURL;
  } catch (error) {
    return null;
  }
}
