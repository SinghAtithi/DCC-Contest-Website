import "../styles/globals.css";
import "../styles/EditorSkeleton.css";
import "../styles/SideNav.css";
import "../styles/test.css";
import { Provider } from "react-redux";
import store from "../store/baseStore";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </>
  );
}
