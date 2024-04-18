import { useParams } from "react-router-dom";
import FormMatch from "../FormMatch";

export const AdminMatch = () => {
  const { matchId } = useParams();
  return (
    <>
      <div>AdminMatch</div>
      <button>Crear partido</button>
      <button>Editar partido</button>
      <FormMatch matchId={matchId} />
    </>
  );
};
