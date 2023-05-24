import ImageKit from "imagekit-javascript";
import { BASE_URL } from "../../utils/constants";

var imageKit = new ImageKit({
  publicKey: "public_/8n1ylBbpeZ+hb/0ttpwZxVDshE=",
  urlEndpoint: "https://ik.imagekit.io/pqymxdgbi/Code-DCC",
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
