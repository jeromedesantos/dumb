import { useParams } from "react-router-dom";
import { ResetForm } from "../components/organisms";

export default function Reset() {
  const { id } = useParams();
  return (
    <div className="w-full max-w-xs">
      <ResetForm id={id || ""} />
    </div>
  );
}
