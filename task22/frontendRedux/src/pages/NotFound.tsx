import { Error } from "../components/atoms";

function NotFound() {
  return (
    <div className="w-full max-w-xs">
      <Error>Page not found</Error>
    </div>
  );
}

export default NotFound;
