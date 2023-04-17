import "../styles/globals.css";
import "../styles/EditorSkeleton.css";
import "../styles/SideNav.css";
import "../styles/test.css";
import "../styles/RabbitLoader.css";
import "../styles/ViewProblems.css";
import "../styles/SearchBar.css";
import "../styles/ContestHomePage.css";

import { Provider } from "react-redux";
import store from "../store/baseStore";
import Auth from "../components/Auth";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  console.log("Hello from _app.js");
  return (
    <>
      <Head>
        <title>DCC - Dream Code Create!</title>
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
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, user-scalable=no"
        />
        <link
          rel="stylesheet"
          href="path/to/assets/content-styles.css"
          type="text/css"
        />
        <link rel="apple-touch-icon" href="/icons/touch-icon-iphone.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/DCC_LOGO.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/DCC_LOGO.png" />
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
