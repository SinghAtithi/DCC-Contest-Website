import { useRouter } from "next/router";
import Navbar from "../../components/Navbar";
import Head from "next/head";
import { useEffect, useState } from "react";
import toggleLoaderBackdrop from "../../utils/toggleCustomBackdrop";
import { baseUrl } from "../../utils/constants";
import axios from "axios";

const contestPage = () => {
  const router = useRouter();

  useEffect(() => {
    toggleLoaderBackdrop();

    axios
      .get(`${baseUrl}/contest`)
      .then((res) => {
        // divide as upcoming, ongoing and past contests and display on the screen
        console.log(res);
        console.log("Here at contest folder");
        toggleLoaderBackdrop();
      })
      .catch((err) => {
        // do something based on error
        console.log(err);
        console.log(123);
        toggleLoaderBackdrop();
      });

  }, []);

  return (
    <>
      <div>
        <div>
          <Head>
            <title>Contests</title>
          </Head>
        </div>
      </div>
      <Navbar />
      General Contest Page
    </>
  );
};

export default contestPage;
