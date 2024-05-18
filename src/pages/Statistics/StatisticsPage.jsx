import {  useState } from "react";
import { Tabs, Tab } from "@mui/material";
import { TeamStatistics } from "./TeamStatistics";
import { ShowStatisticsMatches } from "./ShowStatisticsMatches";
import { useParams } from "react-router-dom";
import { FilterStatistics } from "./FilterStatistics";


export const StatisticsPage = () => {
      const { idHomeTeam, idAwayTeam, idMatch } = useParams();

  const [statsLessThan, setStatsLessThan] = useState(false);

  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  return (
    <>
      <div>LeaguePage</div>
        <FilterStatistics idMatch={idMatch} idHomeTeam={idHomeTeam} idAwayTeam={idAwayTeam} setStatsLessThan={setStatsLessThan} statsLessThan={statsLessThan}/>
      <div>
        <Tabs value={activeTab} onChange={handleTabChange} aria-label="Tabs">
          <Tab label="Estadística" />
          <Tab label="Últimos partidos" />
          <Tab label="Algo mas?" />
        </Tabs>
        {/* Contenido de las pestañas */}
        {activeTab === 0 && <TeamStatistics idHomeTeam={idHomeTeam} idAwayTeam={idAwayTeam} idMatch={idMatch}/>}
        {activeTab === 1 && <ShowStatisticsMatches  idHomeTeam={idHomeTeam} idAwayTeam={idAwayTeam} />}
        {activeTab === 2 &&  <h2>OTRA COSA POR MOSTRAR?</h2>}
      </div>
    </>
  );
};
