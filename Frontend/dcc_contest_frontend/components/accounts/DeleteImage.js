import ImageKit from "imagekit-javascript";
import { BASE_URL, IMAGEKIT_PUBLIC_KEY, IMAGEKIT_URL } from "../../utils/constants";

var imageKit = new ImageKit({
  publicKey: IMAGEKIT_PUBLIC_KEY,
  urlEndpoint: IMAGEKIT_URL,
  authenticationEndpoint: `${BASE_URL}/auth/imagekitAuth`,
});

export default async function deleteImage(url) {
  try {
    const response = await imageKit.deleteFile(url);
    return "done";
  } catch (error) {
    return null;
  }
}
