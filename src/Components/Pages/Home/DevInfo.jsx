import { FaFacebook } from "react-icons/fa";
import { FaGithub } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { FaTelegramPlane } from "react-icons/fa";
import { IoMailSharp } from "react-icons/io5";
import { IoMdCall } from "react-icons/io";

const DevInfo = () => {
  return (
    <div className="pt-16">
      <div className="max-w-7xl mx-auto shadow-lg bg-white flex group text-[#0095ff] gap-5">
        <div className="w-1/2 min-h-full bg-[#0095ff] relative overflow-hidden hidden lg:block">
          <h1 className="text-white text-2xl absolute bottom-3 right-3 text-right">
            Hey! <br /> Wanaa
            <br /> Contact me
          </h1>
          <span className="bg-sky-800/20 w-32 h-32 -top-8 -left-8 rounded-full absolute z-20 group-hover:w-56 group-hover:h-56 duration-500"></span>
          <span className="bg-sky-800/50 w-36 h-36 -top-5 -left-5  rounded-full absolute z-10"></span>
        </div>
        <div className="p-8 flex-1">
          <h1 className="text-4xl pb-4">Ahsan Mahmud Ashik</h1>

          <div className="space-y-5">
            <div className="relative">
              <input
                id="email_"
                type="email"
                defaultValue="ahsanmahmudashik@gmail.com"
                className="p-3 block pl-10  w-full shadow-lg outline-none border rounded-md  border-[#0095ff]"
              />
              <span className="absolute text-xl top-[30%] left-[10px]">
                <IoMailSharp />
              </span>
            </div>

            <div className="relative">
              <input
                id="email_"
                type="email"
                defaultValue="+880 1744-136454"
                className="p-3 block pl-8  w-full shadow-lg outline-none border rounded-md  border-[#0095ff]"
              />
              <span className="absolute text-xl top-[30%] left-[10px]">
                <IoMdCall />
              </span>
            </div>

            <div className="relative">
              <input
                id="email_"
                type="email"
                defaultValue="+880 1744-136454"
                className="p-3 block pl-8  w-full shadow-lg outline-none border rounded-md  border-[#0095ff]"
              />
              <span className="absolute text-xl top-[30%] left-[10px]">
                <FaWhatsapp />
              </span>
            </div>

            <div className="relative">
              <input
                id="email_"
                type="email"
                defaultValue="+880 1744-136454"
                className="p-3 block pl-8  w-full shadow-lg outline-none border rounded-md  border-[#0095ff]"
              />
              <span className="absolute text-xl top-[30%] left-[10px]">
                <FaTelegramPlane />
              </span>
            </div>
          </div>

          {/* buttons for social contact*/}
          <div className="flex items-center justify-start gap-4 text-3xl mt-7">
            <a
              className="text-blue-600"
              href="https://www.facebook.com/ahsanmahmud.ashik"
            >
              <FaFacebook />
            </a>
            <a className="text-black" href="https://github.com/ashik190141">
              <FaGithub />
            </a>
            <a href="https://www.linkedin.com/in/ashan-mahmud-ashik-33715a22a/">
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DevInfo;
