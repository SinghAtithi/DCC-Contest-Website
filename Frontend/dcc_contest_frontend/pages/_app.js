import "../styles/globals.css";
import "../styles/EditorSkeleton.css";
import "../styles/SideNav.css";
import "../styles/test.css";
import "../styles/RabbitLoader.css";
import "../styles/ViewProblems.css";
import "../styles/SearchBar.css";
import { Provider } from "react-redux";
import store from "../store/baseStore";
import Auth from "../components/Auth";

export default function App({ Component, pageProps }) {
  console.log("Hello from _app.js");
  return (
    <>
      <Provider store={store}>
        <Auth>
          <Component {...pageProps} />
        </Auth>
      </Provider>
    </>
  );
}
