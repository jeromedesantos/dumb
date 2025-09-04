import { Github, Instagram, Linkedin, Twitter } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-cyan-700 w-full pt-10 pb-10 mt-20">
      <div className="flex flex-wrap justify-center gap-2 mb-5">
        <a
          href="#"
          className="grid place-items-center w-10 h-10 text-white bg-cyan-700 rounded-full transition-all duration-300 hover:bg-cyan-500 border-2 border-white"
        >
          <Github />
        </a>

        <a
          href="#"
          className="grid place-items-center w-10 h-10 text-white bg-cyan-700 border-box rounded-full  transition-all duration-300 hover:bg-cyan-500 border-2 border-white"
        >
          <Linkedin />
        </a>
        <a
          href="#"
          className="grid place-items-center w-10 h-10 text-white bg-cyan-700 border-box rounded-full  transition-all duration-300 hover:bg-cyan-500 border-2 border-white"
        >
          <Instagram />
        </a>

        <a
          href="#"
          className="grid place-items-center w-10 h-10 text-white bg-cyan-700 border-box rounded-full  transition-all duration-300 hover:bg-cyan-500 border-2 border-white"
        >
          <Twitter />
        </a>
      </div>
      <p className="text-secondary hover:text-secondary-light text-sm font-medium text-center transition duration-300 ease-in-out">
        Made with &#9829; by{" "}
        <a href="https://github.com/jeromedesantos12" target="_blank">
          Jeremy Santoso
        </a>
      </p>
    </footer>
  );
}

export default Footer;
