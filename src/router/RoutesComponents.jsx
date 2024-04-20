import { Route, Routes } from "react-router-dom";
import App from "../App";
import FormTeam from "../pages/Teams/FormTeam";
import MatchesPage from "../pages/Match/MatchPages";
import { Teams } from "../pages/Teams/Teams";
import FormResult from "../pages/FormResults";
import { AdminMatch } from "../pages/Match/AdminMatch";
import { LeaguePage } from "../pages/League/LeaguePage";
import { TeamStatistics } from "../pages/TeamStatistics";
import { DetailLeague } from "../pages/League/DetailLeague";

const RoutesComponent = () => {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/teams">
        <Route index element={<Teams />} />
        <Route path="adm" element={<FormTeam />} />
        <Route path=":idTeam" />
      </Route>
      <Route path="/match">
        <Route index element={<MatchesPage />} />
        <Route path="new" element={<AdminMatch />} />
        <Route path="edit/:matchId" element={<AdminMatch />} />
        <Route path="addResults" element={<FormResult />} />
      </Route>
      <Route path="/league">
        <Route index element={<LeaguePage />} />
        <Route path="new" element={<AdminMatch />} />
        <Route path="addResults" element={<FormResult />} />
        <Route path="detail/:idLeague" element={<DetailLeague />} />

      </Route>
      <Route path="/stats">
        <Route path=":idHomeTeam/:idAwayTeam/:idMatch" element={<TeamStatistics />} />
        <Route path="form/:matchId" element={<FormResult />} />

      </Route>
    </Routes>
  );
};

export default RoutesComponent;
