import { Github, Instagram, Linkedin, Twitter } from "lucide-react";

function Profile() {
  return (
    <section id="about" className="py-20 ">
      <div className="max-w-250 lg:flex-row flex flex-col gap-10 mx-auto">
        <div className="flex flex-col gap-5 flex-2 px-10">
          <h2 className="text-2xl font-bold text-cyan-700">
            Welcome to Rent Waifu!
          </h2>
          <p className="text-muted-foreground text-justify">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sint
            officiis pariatur iusto reiciendis amet maxime totam? Doloribus
            rerum pariatur earum nostrum illo amet harum, mollitia magni
            voluptate vero inventore eos. Commodi qui dolorum, earum tempora ea
            quod doloremque consectetur sit modi fugiat itaque quis neque fugit.
            Sint aliquam vero ipsam placeat. Sapiente, nesciunt dolore porro
            necessitatibus quis doloribus quam tempora.
          </p>
        </div>
        <div className="flex flex-col gap-2 px-10">
          <h3 className="text-2xl font-bold text-cyan-700">Follow for more!</h3>
          <p className="text-muted-foreground text-base font-medium">
            To see more interesting content..
          </p>
          <div className="flex flex-wrap gap-2 mt-5">
            <a
              href="#"
              className="grid place-items-center w-10 h-10 text-white bg-cyan-500 rounded-full border-cyan-500 transition-all duration-300 hover:bg-cyan-700s0 hover:text-cyan-700"
            >
              <Github />
            </a>

            <a
              href="#"
              className="grid place-items-center w-10 h-10 text-white bg-cyan-500 border-box rounded-full border-cyan-500 transition-all duration-300 hover:bg-cyan-700 "
            >
              <Linkedin />
            </a>
            <a
              href="#"
              className="grid place-items-center w-10 h-10 text-white bg-cyan-500 border-box rounded-full border-cyan-500 transition-all duration-300 hover:bg-cyan-700"
            >
              <Instagram />
            </a>

            <a
              href="#"
              className="grid place-items-center w-10 h-10 text-white bg-cyan-500 border-box rounded-full border-cyan-500 transition-all duration-300 hover:bg-cyan-700 "
            >
              <Twitter />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Profile;
