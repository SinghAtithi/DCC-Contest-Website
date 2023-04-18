import React from "react";
import { AiFillGithub } from "react-icons/ai";
import { GrLinkedin } from "react-icons/gr";
import { FaTwitter } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { ImInstagram, ImWhatsapp } from "react-icons/im";

function Atithi() {
  return (
    <div className="flex px-8 mt-8 justify-between">
      <img src="/Atithi.jpeg" className="w-1/4 rounded-full" alt="" />
      <div className="text-start w-1/2 py-12 px-4 sm:px-6 lg:py-16 lg:px-8 z-20">
        <h2 className="text-2xl font-extrabold text-black dark:text-white sm:text-4xl">
          <span className="block">Atithi Kumar Singh</span>
          <span className="block text-indigo-500">
            - Full Stack Web Developer
          </span>
        </h2>
        <p className="text-xl mt-4 text-gray-400">
          One of my biggest project till now, 69+ hours invested in this
          project.
          <br />A small gift to my fellow community, a platform to compete and
          learn.
        </p>
        <a href="https://github.com/singhatithi" target="_blank">
          <button className="mt-8 mx-2">
            <AiFillGithub size={50} color="white" />
          </button>
        </a>
        <a
          href="https://www.linkedin.com/in/atithi-kumar-singh/"
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
          href="https://api.whatsapp.com/send?phone=918102960232"
          target="_blank"
        >
          <button className="mt-8 mx-2">
            <ImWhatsapp size={50} color="#25D366" />
          </button>
        </a>
      </div>
    </div>
  );
}

export default Atithi;
