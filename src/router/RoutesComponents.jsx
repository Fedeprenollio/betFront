import { Route, Routes } from "react-router-dom";
import App from "../App";
import FormTeam from "../pages/Teams/FormTeam";
import MatchesPage from "../pages/Match/MatchPages";
import { Teams } from "../pages/Teams/Teams";
import FormResult from "../pages/FormResults";
import { AdminMatch } from "../pages/Match/AdminMatch";
import { DetailLeague } from "../pages/League/DetailLeague";
import { ListLeagues } from "../pages/League/ListLeagues";
import { Login } from "../pages/user/Login";
import { Register } from "../pages/user/Register";
import PrivateRoute from "./PrivateRoute";
import { TeamStatistics } from "../pages/Statistics/TeamStatistics";
import { StatisticsPage } from "../pages/Statistics/StatisticsPage";
import { ResultsSeason } from "../pages/Match/ResultsSeason";
import { TableAllTeamSeason } from "../pages/Statistics/tableAllTeamSeason/TableAllTeamSeason";
import { AddResults } from "../pages/results/AddResults";
import { ShowResultsForFecha } from "../pages/Match/ShowResultsForFecha";
import FormAddResult from "../pages/Match/FormAddResult";
import { Standings } from "../pages/standings/Standings";
import StatisticsPageTab from "../pages/standings/StatisticsPage";
import { LeaguePage } from "../pages/League/LeaguePage";
import { RangePercentageTable } from "../pages/Statistics/rangePercentageTable/RangePercentageTable";
import { HomePage } from "../pages/home/HomePage";

const RoutesComponent = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      <Route path="/teams">
        <Route index element={<Teams />} />
        <Route path=":idHomeTeam/statistics" element={<StatisticsPage />} />

        <Route element={<PrivateRoute />}>
          <Route path="adm" element={<FormTeam />} />
          <Route path=":idTeam" />
        </Route>
      </Route>
      <Route path="/match">
        <Route index element={<MatchesPage />} />

        <Route element={<PrivateRoute />}>
          <Route path="new" element={<AdminMatch />} />
          <Route path="edit/:matchId" element={<AdminMatch />} />
          <Route path="results/:idSeason" element={<ResultsSeason />} />
          <Route path="newResults" element={<AddResults />} />
        </Route>
      </Route>
      <Route path="/league">
        <Route path="view" element={<ListLeagues />} />
        {/* Esta: */}
        {/* <Route path="showResults/:seasonId" element={<ShowResultsForFecha />} />
        <Route path="positions/:seasonId" element={<Standings />} />
        <Route path="teams/tableSeason/:seasonId"  element={<TableAllTeamSeason />}/> */}
        <Route path=":seasonId" element={<StatisticsPageTab />}>
            <Route path="positions" element={<Standings />} />
            <Route path="showResults" element={<ShowResultsForFecha />} />
            <Route path="tableSeason" element={<TableAllTeamSeason />} />
            <Route path="tableRange" element={<RangePercentageTable />} />


            
          </Route>
        <Route element={<PrivateRoute />}>
          <Route path="admin" element={<LeaguePage />} />
          <Route path="detail/:idLeague" element={<DetailLeague />} />
        </Route>
      </Route>
      <Route path="/stats">
        <Route
          path=":idHomeTeam/:idAwayTeam/:idMatch"
          element={<StatisticsPage />}
        />
        {/* Esta: */}
        {/* <Route
          path="teams/tableSeason/:seasonId"
          element={<TableAllTeamSeason />}
        /> */}
        <Route element={<PrivateRoute />}>
          <Route path="form/:matchId" element={<FormAddResult />} />
        </Route>
      </Route>

      <Route path="/user">
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
    </Routes>
  );
};

export default RoutesComponent;
