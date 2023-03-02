import "../styles/globals.css";
import dynamic from "next/dynamic";
import { Provider } from "react-redux";
import store from "../store/baseStore";

const AnimatedCursor = dynamic(() => import("react-animated-cursor"), {
  ssr: false,
});
export default function App({ Component, pageProps }) {
  return (
    <>
      {/* <Auth0Provider
        domain="dcc-nita.us.auth0.com"
        clientId="2j0gMvxqLVAMtufQAIpEzaNc9i0GsYE5"
        authorizationParams={{
          redirect_uri: window.location.origin,
        }}
      > */}
      <Provider store={store}>
        {/* <AnimatedCursor
          innerSize={12}
          outerSize={10}
          color='255, 255, 255'
          outerAlpha={0.2}
          innerScale={0.7}
          outerScale={4}
        /> */}
        <Component {...pageProps} />
      </Provider>
      {/* </Auth0Provider> */}
    </>
  );
}
