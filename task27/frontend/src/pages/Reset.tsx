import { useParams } from "react-router-dom";
import { LayoutAuth } from "../components/template";
import { FormReset } from "../components/organisms";

export default function Reset() {
  const { id } = useParams();
  return (
    <LayoutAuth>
      <FormReset id={id || ""} />
    </LayoutAuth>
  );
}
