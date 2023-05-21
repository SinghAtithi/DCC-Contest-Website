import React from "react";
import { AiFillGithub } from "react-icons/ai";
import { GrLinkedin } from "react-icons/gr";
import { FaTwitter } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { ImInstagram, ImWhatsapp } from "react-icons/im";
import Image from "next/image";

function Atithi() {
  return (
    <div className="about-atithi-container">
      <div className="about-atithi-image">
        <img src="/Atithi.jpeg" alt="Atithi Kumar Singh" />
      </div>
      <div className="about-atithi-description">
        <h2 className="text-2xl font-extrabold text-white dark:text-white sm:text-4xl">
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
        <a href="https://github.com/singhatithi" target="_blank"  rel="noreferrer">
          <button className="mt-8 mx-2">
            <AiFillGithub size={40} color="white" />
          </button>
        </a>
        <a
          href="https://www.linkedin.com/in/atithi-kumar-singh/"
          target="_blank"
           rel="noreferrer"
        >
          <button className="mt-8 mx-2">
            <GrLinkedin size={40} color="#0077b5" />
          </button>
        </a>
        <a href="https://twitter.com/coder_ravan" target="_blank"  rel="noreferrer">
          <button className="mt-8 mx-2">
            <FaTwitter size={40} color="#1DA1F2" />
          </button>
        </a>
        <a href="https://www.instagram.com/arey_hum_hai/" target="_blank"  rel="noreferrer">
          <button className="mt-8 mx-2">
            <FaInstagramSquare size={40} color="white" />
          </button>
        </a>
        <a
          href="https://api.whatsapp.com/send?phone=918102960232"
          target="_blank"
           rel="noreferrer"
        >
          <button className="mt-8 mx-2">
            <ImWhatsapp size={40} color="#25D366" />
          </button>
        </a>
      </div>
    </div>
  );
}

export default Atithi;
