import { LayoutHome } from "../components/template";
import { ThreadID } from "../components/organisms";
import { useParams } from "react-router-dom";

export default function HomeID() {
  const { id } = useParams();
  return (
    <LayoutHome>
      <ThreadID id={id as string} />
    </LayoutHome>
  );
}
