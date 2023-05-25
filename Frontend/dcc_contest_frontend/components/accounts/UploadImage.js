import ImageKit from "imagekit-javascript";
import { BASE_URL, IMAGEKIT_PUBLIC_KEY, IMAGEKIT_URL } from "../../utils/constants";

var imageKit = new ImageKit({
  publicKey: IMAGEKIT_PUBLIC_KEY,
  urlEndpoint: IMAGEKIT_URL,
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
