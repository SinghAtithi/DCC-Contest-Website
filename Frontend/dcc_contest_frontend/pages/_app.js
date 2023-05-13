import "../styles/globals.css";
import "../styles/EditorSkeleton.css";
import "../styles/SideNav.css";
import "../styles/test.css";
import "../styles/RabbitLoader.css";
import "../styles/ViewProblems.css";
import "../styles/SearchBar.css";
import "../styles/ContestHomePage.css";
import "../styles/AboutRitik.css";
import "../styles/AboutAtithi.css";
import "../styles/NavBar.css";
import "../styles/Login.css";
import "../styles/HomePage.css";

import { Provider } from "react-redux";
import store from "../store/baseStore";
import Auth from "../components/Auth";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, user-scalable=no"
        />
        <meta name="application-name" content="Code-DCC" />
        <meta
          name="description"
          content="Developers and Coders Club, NIT Agartala"
        />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Code-DCC" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#2B5797" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="theme-color" content="#000000" />
        <link
          rel="stylesheet"
          href="path/to/assets/content-styles.css"
          type="text/css"
        />
        <link rel="apple-touch-icon" href="/DCC_LOGO_DARK.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/DCC_LOGO_DARK.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/DCC_LOGO_DARK.png" />
        <link rel="manifest" href="/manifest.json" />

        <script src="https://canvasjs.com/assets/script/canvasjs.min.js"></script>
        <script
          src="https://kit.fontawesome.com/5d9d1ab027.js"
          crossorigin="anonymous"
        ></script>
      </Head>
      <Provider store={store}>
        <Auth>
          <Component {...pageProps} />
        </Auth>
      </Provider>
    </>
  );
}
