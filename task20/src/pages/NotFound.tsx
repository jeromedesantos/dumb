import { Annoyed } from "lucide-react";

function NotFound() {
  return (
    <div className="min-h-screen flex flex-col gap-5 items-center rounded-2xl mt-10">
      <h1 className="size-50 font-bold flex flex-col gap-5 justify-center items-center">
        <Annoyed className="size-30" />
        Page Not Found
      </h1>
    </div>
  );
}

export default NotFound;
