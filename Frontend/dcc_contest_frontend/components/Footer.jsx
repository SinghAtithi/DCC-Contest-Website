import React from 'react';
import { GrLinkedin } from "react-icons/gr";
import { FaTwitter } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { BsYoutube } from "react-icons/bs";
import { AiOutlineMail } from "react-icons/ai";
import { RxDiscordLogo } from "react-icons/rx";


function TheFooter() {
  return (
    <footer>
      <div className="footer-content">
        <h3>Code DCC</h3>
        <p>Developers & Coders Club - Dream Code Conquer</p>
        <div className='college'>
          <span>National Institute of Technology, Agartala</span>
          <span>Jirania, Tripura - 799046</span>
        </div>
        <ul className="socials">
          <li><a href="https://mail.google.com/mail/?view=cm&fs=1&to=dccnita@gmail.com" target='_blank' rel="noreferrer"><AiOutlineMail size={30} /></a></li>
          <li><a href="https://twitter.com/dccnita" target='_blank' rel="noreferrer"><FaTwitter size={30} /></a></li>
          <li><a href="https://www.instagram.com/dccnita/" target='_blank' rel="noreferrer"><FaInstagramSquare size={30} /></a></li>
          <li><a href="https://www.linkedin.com/company/dccnita/" target='_blank' rel="noreferrer"><GrLinkedin size={30} /></a></li>
          <li><a href="https://discord.com/invite/58qJhGtTaa" target='_blank' rel="noreferrer"><RxDiscordLogo size={30} /></a></li>
          <li><a href="https://www.youtube.com/@DCCNITA" target='_blank' rel="noreferrer"><BsYoutube size={30} /></a></li>
        </ul>
      </div>
      <div className="footer-bottom">
        <p>copyright &copy;2023 DCC. designed by <span>Atithi Kumar Singh,  Ritik Kaushal</span></p>
      </div>
    </footer>
  )
}

export default TheFooter;