import { useState, useEffect } from "react";
import { Tabs, Tab } from "@mui/material";
import { useParams } from "react-router-dom";
import { FilterStatistics } from "./FilterStatistics";
import { ShowStatisticsMatches } from "./ShowStatisticsMatches";
import StatisticsTablecopy from "../../componts/StatisticsTablecopy";
import { FilterComponent } from "../../componts/tableFilters/FilterComponent";
import { RangePercentageTable } from "./rangePercentageTable/RangePercentageTable";

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
     
      {/* <FilterStatistics
        idMatch={idMatch}
        idHomeTeam={idHomeTeam}
        idAwayTeam={idAwayTeam}
        setStatsLessThan={setStatsLessThan}
        statsLessThan={statsLessThan}
        singleTeam={singleTeam}
      /> */}
    
        {/* <Tabs
          value={activeTab}
          onChange={handleTabChange}
          aria-label="Tabs"
          variant="scrollable"
          scrollButtons
          allowScrollButtonsMobile
        >
          <Tab label="Estadística" />
          <Tab label="Últimos partidos" />
        </Tabs> */}

        {/* Contenido de las pestañas */}
        {activeTab === 0 &&
          (singleTeam ? (
            <RangePercentageTable
              idTeam={singleTeam}
              statsLessThan={statsLessThan}
              isSingle={true}
            />
          ) : (
            <RangePercentageTable
              isSingle={false}
              statsLessThan={statsLessThan}
              idTeam={idHomeTeam}
              idSecondTeam={idAwayTeam}
            ></RangePercentageTable>
          ))}
        {activeTab === 1 && (
          <ShowStatisticsMatches
            singleTeam={singleTeam}
            idHomeTeam={idHomeTeam}
            idAwayTeam={idAwayTeam}
          />
        )}
        {/* {activeTab === 2 && <h2>OTRA COSA POR MOSTRAR?</h2>} */}
      
    </>
  );
};
