/* eslint-disable react/prop-types */
import { MatchsStack } from "./MatchsStack";

const MatchList = () => {
  // const { matches } = useMatchesStore();
  return (
    <div>
      <h2>Lista de Partidos</h2>

      <MatchsStack />
    </div>
  );
};

export default MatchList;
