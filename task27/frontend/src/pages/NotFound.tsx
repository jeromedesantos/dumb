import { LayoutAuth } from "../components/template";
import { Error } from "../components/atoms";

function NotFound() {
  return (
    <LayoutAuth>
      <Error>Page not found</Error>
    </LayoutAuth>
  );
}

export default NotFound;
