import { useRouter } from "next/router";
import Navbar from "../../components/Navbar";
import Head from "next/head";
import { useEffect, useState } from "react";
import { baseUrl } from "../../utils/constants";
import axios from "axios";

const contestPage = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true);

    axios
      .get(`${baseUrl}/contest`)
      .then((res) => {
        // divide as upcoming, ongoing and past contests and display on the screen
        console.log(res);
        console.log("Here at contest folder");
        setIsLoading(false);
      })
      .catch((err) => {
        // do something based on error
        console.log(err);
      });
  }, []);

  if (isLoading) return <div>Loading...</div>;
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
