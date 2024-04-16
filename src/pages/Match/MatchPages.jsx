import MatchList from '../../componts/MatchList';
import { FilterDate } from '../../componts/FilterDate';

const MatchesPage = () => {
  // const setMatches = useMatchesStore((state) => state.setMatches);

  // const [matches, setMatches] = useState([])

  // useEffect(() => {
    
  //   setMatches({league: "all"})
   
  // }, [setMatches])
  


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
