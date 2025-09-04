import { Annoyed } from "lucide-react";

function NotFound() {
  return (
    <div className="bg-white flex flex-col gap-5  justify-center items-center rounded-2xl mt-10">
      <h1 className="size-50 text-cyan-700 font-bold flex flex-col gap-5 justify-center items-center">
        <Annoyed className="size-30 text-cyan-700" />
        Page Not Found
      </h1>
    </div>
  );
}

export default NotFound;
