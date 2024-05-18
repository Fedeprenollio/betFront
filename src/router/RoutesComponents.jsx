import { Route, Routes } from "react-router-dom";
import App from "../App";
import FormTeam from "../pages/Teams/FormTeam";
import MatchesPage from "../pages/Match/MatchPages";
import { Teams } from "../pages/Teams/Teams";
import FormResult from "../pages/FormResults";
import { AdminMatch } from "../pages/Match/AdminMatch";
import { LeaguePage } from "../pages/League/LeaguePage";
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

const RoutesComponent = () => {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/teams">
        <Route index element={<Teams />} />

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
          <Route path="addResults" element={<FormResult />} />
          <Route path="results/:idSeason" element={<ResultsSeason />} />
          <Route path="newResults" element={<AddResults />} />

        </Route>
      </Route>
      <Route path="/league">
        <Route path="view" element={<ListLeagues />} />
        <Route path="showResults/:seasonId" element={<ShowResultsForFecha />} />


        <Route element={<PrivateRoute />}>
          {/* leaaguePage en espete momento es para administrar ligas */}
          <Route path="admin" element={<LeaguePage />} />
          <Route path="detail/:idLeague" element={<DetailLeague />} />
          {/* <Route path="new" element={<AdminMatch />} />
          <Route path="addResults" element={<FormResult />} />
          <Route path="detail/:idLeague" element={<DetailLeague />} /> */}
        </Route>
      </Route>
      <Route path="/stats">
        {/* <Route
          path=":idHomeTeam/:idAwayTeam/:idMatch"
          element={<TeamStatistics />}
        /> */}
        <Route
          path=":idHomeTeam/:idAwayTeam/:idMatch"
          element={<StatisticsPage />}
        />
          <Route path="teams/tableSeason/:seasonId" element={<TableAllTeamSeason />}
        />
        <Route element={<PrivateRoute />}>
          <Route path="form/:matchId" element={<FormResult />} />
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
