import { Clover, Github, Instagram, Linkedin, Twitter } from "lucide-react";

function About() {
  return (
    <div className="min-h-screen">
      <div className="bg-white dark:bg-zinc-900 flex gap-4 flex-col max-w-100 md:flex-row md:max-w-220 rounded-2xl border-2 mt-10">
        <div className="p-10 flex flex-col gap-5 flex-2">
          <h1 className="text-2xl font-black text-cyan-700 dark:text-zinc-300">
            About Us
          </h1>
          <p className="text-justify text-muted-foreground">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sint
            officiis pariatur iusto reiciendis amet maxime totam? Doloribus
            rerum pariatur earum nostrum illo amet harum, mollitia magni
            voluptate vero inventore eos. Commodi qui dolorum, earum tempora ea
            quod doloremque consectetur sit modi fugiat itaque quis neque fugit.
            Sint aliquam vero ipsam placeat. Sapiente, nesciunt dolore porro
            necessitatibus quis doloribus quam tempora.
          </p>
          <div className="flex flex-wrap gap-2 justify-center md:justify-start mt-5">
            <a
              href="#"
              className="grid place-items-center w-10 h-10 text-white bg-cyan-500 dark:bg-cyan-700 rounded-full transition-all duration-300 hover:bg-cyan-700  dark:hover:bg-cyan-500"
            >
              <Github />
            </a>

            <a
              href="#"
              className="grid place-items-center w-10 h-10 text-white bg-cyan-500 dark:bg-cyan-700  border-box rounded-full transition-all duration-300 hover:bg-cyan-700  dark:hover:bg-cyan-500"
            >
              <Linkedin />
            </a>
            <a
              href="#"
              className="grid place-items-center w-10 h-10 text-white bg-cyan-500 dark:bg-cyan-700 border-box rounded-full transition-all duration-300 hover:bg-cyan-700  dark:hover:bg-cyan-500"
            >
              <Instagram />
            </a>

            <a
              href="#"
              className="grid place-items-center w-10 h-10 text-white bg-cyan-500 dark:bg-cyan-700 border-box rounded-full transition-all duration-300 hover:bg-cyan-700 dark:hover:bg-cyan-500"
            >
              <Twitter />
            </a>
          </div>
        </div>
        <div className="p-10">
          <div className="cursor-pointer bg-transparent flex flex-col items-center rounded-2xl overflow-hidden shadow-lg group">
            <img
              src="img/profile/jeremy.jpg"
              className="object-cover object-center h-70 transition-all duration-300 group-hover:scale-102"
              alt="Profile picture"
            />
            <section className="border-box px-2 py-4 bg-transparent dark:bg-zinc-800 z-10 w-full flex flex-col items-center transition-all duration-300 group-hover:bg-muted">
              <p className="font-bold font-saira text-shadow-2xl flex flex-row items-center justify-center gap-3 text-cyan-700 dark:text-cyan-500 text-2xl">
                <Clover />
                <span>My Store</span>
              </p>
              <p className="text-center text-muted-foreground">
                Unlock your future dream
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
