import React from 'react';
import img1 from '../../../Image/american1.jpeg';
import img2 from '../../../Image/american2.jpeg';
import img3 from '../../../Image/american3.jpeg';
import { FaGoogle , FaGithub, FaFacebook, FaInstagram, FaTwitter} from 'react-icons/fa';

const Footer = () => {
    return (
      <div className="bg-black mt-28">
        <div className="text-white pt-28">
          <p className="text-5xl font-bold text-center mb-5">American Recipe</p>
          <div className="flex md:flex-row flex-col items-center justify-center gap-10">
            <img src={img1} alt="" />
            <img src={img2} alt="" />
            <img src={img3} alt="" />
          </div>
        </div>
        <div className="flex gap-3 items-center justify-center mt-10">
          <a
            className="text-blue-600"
            href="https://www.facebook.com/ahsanmahmud.ashik"
          >
            <FaFacebook className="me-2 text-white" />
          </a>
          <a
            className="text-black"
            href="https://ahsan-mahmud-ashik.netlify.app/"
          >
            <FaGoogle className="me-2 text-white" />
          </a>
          <a className="text-black" href="https://github.com/ashik190141">
            <FaGithub className="me-2 text-white" />
          </a>
          <a
            className="text-black"
            href="https://www.instagram.com/ahsanmahmud_ashik?igsh=MXYxcXVhamgwY2ptMA=="
          >
            <FaInstagram className="me-2 text-white" />
          </a>
        </div>
        <div className="text-white flex md:flex-row flex-col items-center justify-center gap-8 mt-5">
          <p>Advertising</p>
          <p>Terms and Condition</p>
          <p>Privacy Policy</p>
          <p>Hosted by ashik190141</p>
        </div>
        <div className="text-white flex md:flex-row flex-col items-center justify-center gap-5 mt-5 pb-20">
          <p>@copyright 2024</p>
          <p>Developed by: Ahsan Mahmud Ashik</p>
        </div>
      </div>
    );
};

export default Footer;