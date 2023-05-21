import React from "react";
import { AiFillGithub } from "react-icons/ai";
import { GrLinkedin } from "react-icons/gr";
import { FaTwitter } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { ImInstagram, ImWhatsapp } from "react-icons/im";
import Image from "next/image";

function Ritik() {
  return (
    <div className="about-ritik-container">
      <div className="about-ritik-description">
        <h2 className="text-2xl font-extrabold text-black dark:text-white sm:text-4xl">
          <span className="block text-white">Ritik Kaushal</span>
          <span className="block text-indigo-500">
            - Full Stack Web Developer
          </span>
        </h2>
        <p className="text-xl mt-4 text-gray-400">
        {"I'm a passionate web developer and machine learning enthusiast. Welcome to DCC's coding contest platform, where innovation meets competition. Join us as we challenge and inspire programmers to showcase their skills. Let's push the boundaries of coding together and create an engaging space for the coding community to thrive."}
        </p>
        <a href="https://github.com/Ritik-Kaushal" target="_blank"  rel="noreferrer">
          <button className="mt-8 mx-2">
            <AiFillGithub size = {40} color="white" />
          </button>
        </a>
        <a
          href="https://www.linkedin.com/in/ritik-kaushal-52aa6521a/"
          target="_blank"
           rel="noreferrer"
        >
          <button className="mt-8 mx-2">
            <GrLinkedin size = {40} color="#0077b5" />
          </button>
        </a>
        <a href="https://twitter.com/ritik_kaushal01" target="_blank"  rel="noreferrer">
          <button className="mt-8 mx-2">
            <FaTwitter size = {40} color="#1DA1F2" />
          </button>
        </a>
        <a href="https://www.instagram.com/ritik_kaushal01/" target="_blank"  rel="noreferrer">
          <button className="mt-8 mx-2">
            <FaInstagramSquare size = {40} color="white" />
          </button>
        </a>
        <a
          href="https://api.whatsapp.com/send?phone=919110015821"
          target="_blank"
           rel="noreferrer"
        >
          <button className="mt-8 mx-2">
            <ImWhatsapp size = {40} color="#25D366" />
          </button>
        </a>
      </div>
      <div className="about-ritik-image">
          <img
            src="/Ritik.jpeg"
            alt="Ritik Kaushal"
          />
        </div>
    </div>
  );
}

export default Ritik;
