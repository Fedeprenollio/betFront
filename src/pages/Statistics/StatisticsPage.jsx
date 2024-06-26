import React, { useState, useEffect } from "react";
import { Tabs, Tab } from "@mui/material";
import { useParams } from "react-router-dom";
import { FilterStatistics } from "./FilterStatistics";
import { TeamStatistics } from "./TeamStatistics";
import { ShowStatisticsMatches } from "./ShowStatisticsMatches";
import StatisticsTablecopy from "../../componts/StatisticsTablecopy";
import SingleTeamStatisticsPage from "./SingleTeamStatisticsPage ";
import StatisticsTable from "./SingleTeamStatisticsPage ";

export const StatisticsPage = () => {
  const { idHomeTeam, idAwayTeam, idMatch } = useParams();
  const [statsLessThan, setStatsLessThan] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [singleTeam, setSingleTeam] = useState(null);

  useEffect(() => {
    if (!idAwayTeam) {
      setSingleTeam(idHomeTeam);
    } else {
      setSingleTeam(null);
    }
  }, [idHomeTeam, idAwayTeam]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <>
      <div>LeaguePage</div>
      <FilterStatistics
        idMatch={idMatch}
        idHomeTeam={idHomeTeam}
        idAwayTeam={idAwayTeam}
        setStatsLessThan={setStatsLessThan}
        statsLessThan={statsLessThan}
        singleTeam={singleTeam}
      />
      <div>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          aria-label="Tabs"
          variant="scrollable"
          scrollButtons
          allowScrollButtonsMobile
        >
          <Tab label="Estadística" />
          <Tab label="Últimos partidos" />
          <Tab label="Algo mas?" />
        </Tabs>
        {/* Contenido de las pestañas */}
        {activeTab === 0 &&
          (singleTeam ? (
            <StatisticsTablecopy
              idHomeTeam={singleTeam}
              statsLessThan={statsLessThan}
              isSingle={true}
            />
          ) : (
            <StatisticsTablecopy
              isSingle={false}
              statsLessThan={statsLessThan}
              idHomeTeam={idHomeTeam}
              idAwayTeam={idAwayTeam}
            ></StatisticsTablecopy>
          ))}
        {activeTab === 1 && (
          <ShowStatisticsMatches
            singleTeam={singleTeam}
            idHomeTeam={idHomeTeam}
            idAwayTeam={idAwayTeam}
          />
        )}
        {activeTab === 2 && <h2>OTRA COSA POR MOSTRAR?</h2>}
      </div>
    </>
  );
};
