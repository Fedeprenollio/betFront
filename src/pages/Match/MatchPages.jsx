import MatchList from '../../componts/MatchList';
import { FilterDate } from '../../componts/FilterDate';

const MatchesPage = () => {

  return (
    <div>
      <h1>Página de Partidos</h1>
      {/* <FilterMatchs/> */}
      <FilterDate />
      <MatchList  />
    </div>
  );
};

export default MatchesPage;
