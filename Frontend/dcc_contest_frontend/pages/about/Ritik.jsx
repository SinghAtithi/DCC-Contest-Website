import React from "react";
import { AiFillGithub } from "react-icons/ai";
import { GrLinkedin } from "react-icons/gr";
import { FaTwitter } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { ImInstagram, ImWhatsapp } from "react-icons/im";

function Ritik() {
  return (
    <div className="px-12 mt-16">
      <div className="overflow-hidden relative ">
        <div className="text-start w-1/2 py-12 px-4 sm:px-6 lg:py-16 lg:px-8 z-20">
          <h2 className="text-3xl font-extrabold text-black dark:text-white sm:text-4xl">
            <span className="block">Want to be miladfsflionaire ?</span>
            <span className="block text-indigo-500">
              It&#x27;s today or never.
            </span>
          </h2>
          <p className="text-xl mt-4 text-gray-400">
            I had noticed that both in the very poor and very rich extremes of
            society the mad were often allowed to mingle freely
          </p>
          <a href="https://github.com/Ritik-Kaushal" target="_blank">
            <button className="mt-8 mx-2">
              <AiFillGithub size={50} color="white" />
            </button>
          </a>
          <a
            href="https://www.linkedin.com/in/ritik-kaushal-52aa6521a/"
            target="_blank"
          >
            <button className="mt-8 mx-2">
              <GrLinkedin size={50} color="#0077b5" />
            </button>
          </a>
          <a href="https://twitter.com/coder_ravan" target="_blank">
            <button className="mt-8 mx-2">
              <FaTwitter size={50} color="#1DA1F2" />
            </button>
          </a>
          <a href="https://www.instagram.com/arey_hum_hai/" target="_blank">
            <button className="mt-8 mx-2">
              <FaInstagramSquare size={50} color="white" />
            </button>
          </a>
          <a
            href="https://api.whatsapp.com/send?phone=919110015821"
            target="_blank"
          >
            <button className="mt-8 mx-2">
              <ImWhatsapp size={50} color="#25D366" />
            </button>
          </a>
        </div>
        <img
          src="/Ritik.jpeg"
          className="absolute rounded-full top-0 right-0 hidden h-full max-w-1/2 lg:block"
        />
      </div>
    </div>
  );
}

export default Ritik;
