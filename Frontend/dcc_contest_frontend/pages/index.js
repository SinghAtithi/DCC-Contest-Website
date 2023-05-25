import Head from "next/head";
import Navbar from "../components/Navbar";

import HomePage from "./HomePage/Home";
import TheFooter from "../components/Footer";

export default function Home() {
  return (
    <>
      <Head>
        <title>DCC - Dream Code Conquer!</title>
      </Head>
      <Navbar />
      <HomePage />
      <TheFooter />
    </>
  );
}
