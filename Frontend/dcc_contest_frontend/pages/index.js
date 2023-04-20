import Head from "next/head";
import Navbar from "../components/Navbar";

import HomePage from "./HomePage/Home";

export default function Home() {
  return (
    <>
      <Head>
        <title>DCC - Dream Code Create!</title>
      </Head>
      <Navbar />
      <HomePage />
    </>
  );
}
