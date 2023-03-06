import GeneralLoading from "../public/GeneralLoading.json";
import Lottie from "lottie-react";
export default function BackdropLoader(){
    return(
        <div className="custom-backdrop-loader">
        <Lottie animationData={GeneralLoading} className="rabbit-loader" />
      </div>
    )
}