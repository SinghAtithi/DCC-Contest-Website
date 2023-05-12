// Import necessary dependencies
import GeneralLoading from "../public/GeneralLoading.json"; // Importing the JSON animation data from the "../public" directory
import Lottie from "lottie-react"; // Importing the Lottie component from the lottie-react library

// Define the BackdropLoader component
export default function BackdropLoader() {
  // Render the animated loading indicator
  return (
    <div className="custom-backdrop-loader">
      <Lottie animationData={GeneralLoading} className="rabbit-loader" />
    </div>
  );
}
