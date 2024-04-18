import MatchList from '../../componts/MatchList';
import { FilterDate } from '../../componts/FilterDate';
import { Container } from '@mui/material';

const MatchesPage = () => {

  return (
    <Container>
      <h1>Página de Partidos</h1>
      {/* <FilterMatchs/> */}
      <FilterDate />
      <MatchList  />
    </Container>
  );
};

export default MatchesPage;
