/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Tabs, Tab, Box, Avatar, Typography, Paper } from "@mui/material";
import { useParams } from "react-router-dom";
import { ShowStatisticsMatches } from "./ShowStatisticsMatches";
import { FilterComponent } from "../../componts/tableFilters/FilterComponent";
import { RangePercentageTable } from "./rangePercentageTable/RangePercentageTable";
import { TableAllTeamSeason } from "./tableAllTeamSeason/TableAllTeamSeason";
import { useCurrentSeasonTeam } from "../../customHooks/useCurrentSeasonTeam";
import { BACKEND_URL_BASE } from "../../stores/url_base";
import { useFilters } from "../../customHooks/useFilters";
import { useBoundStore } from "../../stores";
import { InfoFilterTeam } from "../../componts/tableFilters/InfoFilterTeam";
import { AddMoreTeamComparative } from "./rangePercentageTable/addMoreTeamComparative/AddMoreTeamComparative";
import axios from "axios";
export const fetchTeamStats = async (
  seasonId,
  homeOnly,
  awayOnly,
  matchesCount,
  includeAllSeasonMatches
) => {
  const response = await axios.get(
    `${BACKEND_URL_BASE}/match/stats?season=${seasonId}&statistics=goals,offsides,yellowCards,corners,shots,shotsOnTarget,possession&matchesCount=${matchesCount}&homeOnly=${homeOnly}&awayOnly=${awayOnly}&includeAllSeasonMatches=${includeAllSeasonMatches}`
  );
  return response.data;
};

export const StatisticsPage = ({ someProp, listCurrentSeason }) => {
  const { idHomeTeam: idTeam, idAwayTeam, seasonId } = useParams();
  const { completeListCurrentSeason, currentSeasonTeam } =
    useCurrentSeasonTeam(idTeam);
  const {
    homeOnly,
    setHomeOnly,
    awayOnly,
    setAwayOnly,
    homeOnlySecondTeamComparative,
    setHomeOnlySecondTeamComparative,
    awayOnlySecondTeamComparative,
    setAwayOnlySecondTeamComparative,
    matchesCountSecondTeamComparative,
    setMatchesCountSecondTeamComparative,
    matchesCount,
    setMatchesCount,
  } = useFilters();
  const {
    getLocalTeamStats,
    getVisitorTeamStats,
    allCurrentSeasons,
    getAllCurrentSeasons,
    listAllCurrentSeason,

    getLocalTeamMoreStats,
    getVisitorTeamMoreStats,
  } = useBoundStore((state) => state);
  const {
    getTeamStatsForSeason,
    teamStatsForSeason,
    // getTeamStatsForTwoTeam,
    teamStatsForTwoTeam,
    clearStats
  } = useBoundStore((state) => state);

  const [stats, setStats] = useState([]);
  const [moreStats, setMoreStats] = useState([]);

  const [idTeamSecondTeam, setIdTeamSecondTeam] = useState(idAwayTeam);

  useEffect(() => {
    getAllCurrentSeasons();
  }, [getAllCurrentSeasons]);

  const [activeTab, setActiveTab] = useState(1);
  const [singleTeam, setSingleTeam] = useState(null);
  const [updatedListSeasonTeam1, setUpdatedListSeasonTeam1] = useState(false);
  const [updatedListSeasonTeam2, setUpdatedListSeasonTeam2] = useState(false);
  const [positionFilterTeam1, setPositionFilterTeam1] = useState("1-50");
  const handlePositionFilterChangeTeam1 = (event) => {
    setPositionFilterTeam1(event);
  };
  const [positionFilterTeam2, setPositionFilterTeam2] = useState("1-50");
  const handlePositionFilterChangeTeam2 = (event) => {
    setPositionFilterTeam2(event);
  };
  const [shouldFetch, setShouldFetch] = useState(true);
  // const initialStateSelectedSeason = () => {
  //   if (someProp === "allTeams") {
  //     setUpdatedListSeasonTeam1(true);

  //     const seasonsArray = listAllCurrentSeason
  //       ?.join(",")
  //       ?.split(",")
  //       .map((season) => season.trim());
  //     return seasonsArray || []
  //   } else {
  //     return seasonId || []
  //   }
  // };
  const [selectedSeasons, setSelectedSeasons] = useState([]);
  const [selectedSeasonsSecondTeam, setSelectedSeasonsSecondTeam] = useState(
    []
  );
  console.log("CACA", listAllCurrentSeason);

  const [includeAllSeasonMatches, setIncludeAllSeasonMatches] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [
    includeAllSeasonMatchesSecondTeamComparative,
    setIncludeAllSeasonMatchesSecondTeamComparative,
  ] = useState(false);
  const [inputMatchesCount, setInputMatchesCount] = useState(0);
  const [inputChekBoxIncludeAllSeason, setInputChekBoxIncludeAllSeason] =
    useState(false);
  const [filters, setFilters] = useState({
    goals: {
      scored: {},
      received: {},
    },
    corners: {
      scored: {},
      received: {},
    },
    shots: {
      scored: {},
      received: {},
    },
    shotsOnTarget: {
      scored: {},
      received: {},
    },
    possession: {
      scored: {},
      received: {},
    },
    offsides: {
      scored: {},
      received: {},
    },
    yellowCards: {
      scored: {},
      received: {},
    },
  });
  const { completeListCurrentSeason: completeListCurrentSeason2 } =
    useCurrentSeasonTeam(idTeamSecondTeam);
  const [pathPage, setPathPage] = useState("");
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("team.country");
  const [isSelectedEditedSeasons, setIsSelectedEditedSeasons] = useState(false);
  const [matchType, setMatchType] = useState("both");

  const [selectedTeams, setSelectedTeams] = useState([]); // Estado para los equipos seleccionados
  useEffect(() => {
       if (homeOnly && awayOnly) {
      setMatchType("both");
    } else if (!homeOnly && awayOnly) {
      setMatchType("away");
    } else if (homeOnly && !awayOnly) {
      setMatchType("home");
    } else {
      setMatchType("both");
    }
    // Extract the last part of the pathname to determine the active tab
    const currentPath = location.pathname;
    if (currentPath.includes("league")) {
      console.log("Viendo una Liga");
      setPathPage("league");
      setSelectedSeasons(seasonId);
    } else if (currentPath.includes("teams")  || currentPath.includes("stats") ) {
      console.log("Viendo hasta un par de equipos", completeListCurrentSeason);

      setPathPage("teams");
      setSelectedSeasons(completeListCurrentSeason);
    } else {
      setPathPage("home");
      if (isSelectedEditedSeasons) return;
      if (someProp === "allTeams" && listAllCurrentSeason.length > 0) {
        setIsSelectedEditedSeasons(true);
        console.log("caca 2", listAllCurrentSeason);
        setUpdatedListSeasonTeam1(true);
        const seasonsArray = listAllCurrentSeason
          ?.join(",")
          ?.split(",")
          .map((season) => season.trim());
        setSelectedSeasons(seasonsArray);
      }
    }
  }, [
    listAllCurrentSeason,
    isSelectedEditedSeasons,
    completeListCurrentSeason,seasonId, someProp
  ]);

  useEffect(() => {
    if (!idAwayTeam) {
      setSingleTeam(idTeam);
    } else {
      setSingleTeam(null);
    }
  }, [idTeam, idAwayTeam]);

  // useEffect(() => {
  //   // Parse listCurrentSeason to an array of seasons if it's not empty
  //   if (updatedListSeasonTeam1) {
  //     return;
  //   }

  //   if (someProp === "allTeams" && listAllCurrentSeason.length >0) {
  //     setUpdatedListSeasonTeam1(true);
  //     const seasonsArray = listAllCurrentSeason?.join(",")
  //       ?.split(",")
  //       .map((season) => season.trim());
  //     setSelectedSeasons(seasonsArray);
  //   } else if (idTeam) {
  //     // const array =completeListCurrentSeason?.split(",")
  //     setSelectedSeasons(completeListCurrentSeason);
  //   }
  // }, [

  //   completeListCurrentSeason,
  //   idTeam,
  //   updatedListSeasonTeam1,
  //   someProp,listAllCurrentSeason
  // ]);

  useEffect(() => {
    // Parse listCurrentSeason to an array of seasons if it's not empty
    if (updatedListSeasonTeam2) {
      return;
    }
    if (idTeamSecondTeam) {
      setSelectedSeasonsSecondTeam(completeListCurrentSeason2);
    }
  }, [idTeamSecondTeam, completeListCurrentSeason2, updatedListSeasonTeam2]);
console.log("teamStatsForSeason",teamStatsForSeason)
  useEffect(() => {
    //Obtencion de estadisticas para una season

    if (seasonId && !listCurrentSeason && shouldFetch) {
      const loadStats = async () => {
        try {
          const moreStats = await  getTeamStatsForSeason({ seasonId, matchType });
          const data = await fetchTeamStats(
            seasonId,
            homeOnly,
            awayOnly,
            matchesCount,
            includeAllSeasonMatches
          );
          setStats(data);
          setMoreStats(moreStats)
          setLoading(false);
        } catch (err) {
          setError(err);
          setLoading(false);
        }
      };
      loadStats();
    }
    return ()=>{
      clearStats()
    }
  }, [
    seasonId,
    homeOnly,
    awayOnly,
    matchesCount,
    includeAllSeasonMatches,
    shouldFetch,
    listCurrentSeason,
    getTeamStatsForSeason,
    matchType,clearStats
  ]);
  useEffect(() => {
    //Obtencion de estadisticas para todas las temporadas actuales (Home en este momento)
    if (pathPage === "home") {
      const loadStats = async () => {
        
        try {
          console.log("Stats Home", seasonId);

         
          const selectedSeasonsString = selectedSeasons.join(",")
            ? selectedSeasons.join(",")
            : listAllCurrentSeason.join(",");
            const moreStats = await  getTeamStatsForSeason({ seasonId:selectedSeasonsString , matchType });
            console.log("Stats Home", moreStats);
          const data = await fetchTeamStats(
            selectedSeasonsString,
            homeOnly,
            awayOnly,
            matchesCount,
            includeAllSeasonMatches
          );
          setStats(data);
          setMoreStats(moreStats)
          setLoading(false);
        } catch (err) {
          setError(err);
          setLoading(false);
        }
      };
      loadStats();
    }
    return ()=>{
      clearStats()
    }
  }, [
    pathPage,
    listCurrentSeason,
    selectedSeasons,
    homeOnly,
    awayOnly,
    matchesCount,
    includeAllSeasonMatches,
    shouldFetch,
    idTeam,
    idAwayTeam,
    someProp,
    clearStats
  ]);
  useEffect(() => {
    
    if (idTeam !== undefined && shouldFetch) {
      console.log("Stats idTeam", idTeam);
      // if (idTeam) {
      //   console.log("seasonId,teamFilters",seasonId, teamFilters )
      //   getTeamStatsForTwoTeam({
      //     seasonId,
      //     teamFilters,
      //   });
      // }
      const loadStats = async () => {
        try {
          console.log("selectedSeasons",selectedSeasons)
          const a = await getLocalTeamStats({
            season: selectedSeasons.join(","),
            idTeam,
            homeOnly,
            awayOnly,
            matchesCount,
            includeAllSeasonMatches,
            position: positionFilterTeam1,
          });

          const moreStatsLocal = await getLocalTeamMoreStats({
            season: selectedSeasons.join(","),
            idTeam,
            homeOnly,
            awayOnly,
            matchesCount,
            includeAllSeasonMatches,
            position: positionFilterTeam1,
          });

          if (idTeamSecondTeam) {
            const b = await getVisitorTeamStats({
              season: selectedSeasonsSecondTeam.join(","),
              position: positionFilterTeam2,
              idTeam: idTeamSecondTeam,
              homeOnly: homeOnlySecondTeamComparative,
              awayOnly: awayOnlySecondTeamComparative,
              matchesCount: matchesCountSecondTeamComparative,
              includeAllSeasonMatches:
                includeAllSeasonMatchesSecondTeamComparative,
            });
            const moreStatsVisitor = await getVisitorTeamMoreStats({
              season: selectedSeasonsSecondTeam.join(","),
              position: positionFilterTeam2,
              idTeam: idTeamSecondTeam,
              homeOnly: homeOnlySecondTeamComparative,
              awayOnly: awayOnlySecondTeamComparative,
              matchesCount: matchesCountSecondTeamComparative,
              includeAllSeasonMatches:
                includeAllSeasonMatchesSecondTeamComparative,
            });
            console.log("moreStatsLocal",moreStatsLocal)
            setStats([...a, b[0]]);
            setMoreStats([...moreStatsLocal, moreStatsVisitor[0]]);
          } else {
            setStats([...a]);
            setMoreStats([...moreStatsLocal]);
          }

          setLoading(false);
        } catch (err) {
          setError(err);
          setLoading(false);
        }
      };
      loadStats();
    }
    return ()=>{
      clearStats()
    }
  }, [
    clearStats,
    getLocalTeamMoreStats,
    getVisitorTeamMoreStats,
    idTeam,
    homeOnly,
    awayOnly,
    matchesCount,
    includeAllSeasonMatches,
    shouldFetch,
    getLocalTeamStats,
    idTeamSecondTeam,
    homeOnlySecondTeamComparative,
    awayOnlySecondTeamComparative,
    includeAllSeasonMatchesSecondTeamComparative,
    getVisitorTeamStats,
    matchesCountSecondTeamComparative,

    selectedSeasons,
    selectedSeasonsSecondTeam,
    positionFilterTeam1,
    positionFilterTeam2,
    seasonId,
  ]);

  console.log("moreStats", moreStats);

  useEffect(() => {
    if (idTeam) {
      // setListTeams(teamStatsForTwoTeam);
      } else {
      console.log("SI DEBERIA RENDERIZAR", teamStatsForTwoTeam);
      setMoreStats(teamStatsForSeason);
    }
  }, [teamStatsForSeason, teamStatsForTwoTeam, idTeam]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  const handleHomeOnlyChange = (event) => {
    setHomeOnly(event.target.checked);
  };
  const handleAwayOnlyChange = (event) => {
    setAwayOnly(event.target.checked);
  };
  const handleInputMatchesCountChange = (event) => {
    setInputMatchesCount(event.target?.value);
  };

  const updateMatchesCount = () => {
    setMatchesCount(inputMatchesCount);
  };

  const handleIncludeAllSeasonMatches = (event) => {
    setInputChekBoxIncludeAllSeason(event);
  };

  const updateIncludeOtherSeasons = () => {
    setIncludeAllSeasonMatches(inputChekBoxIncludeAllSeason);
  };

  const handleSeasonChange = (seasonId, checked) => {
    setSelectedSeasons((prevSelectedSeasons) =>
      checked
        ? [...prevSelectedSeasons, seasonId]
        : prevSelectedSeasons.filter((id) => id !== seasonId)
    );
    setUpdatedListSeasonTeam1(true);
  };
  const handleSeasonChangeTeam2 = (seasonId, checked) => {
    setSelectedSeasonsSecondTeam((prevSelectedSeasons) =>
      checked
        ? [...prevSelectedSeasons, seasonId]
        : prevSelectedSeasons.filter((id) => id !== seasonId)
    );
    setUpdatedListSeasonTeam2(true);
  };
  const handleFilterChange = (statisticKey, matchType, newFilter) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [statisticKey]: {
        ...prevFilters[statisticKey],
        [matchType]: newFilter,
      },
    }));
  };

  return (
    <>
      {someProp !== "allTeams" ? (
        <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
          <Box
            display="flex"
            flexDirection={"row"}
            alignItems="flex-start"
            mb={2}
          >
            <InfoFilterTeam
              team={stats[0]?.team}
              homeOnly={homeOnly}
              awayOnly={awayOnly}
              selectedSeasons={selectedSeasons}
              positionFilter={positionFilterTeam1}
            />
            <FilterComponent
              filterName={["local/visitor", "MatchesCountInput"]}
              homeOnly={homeOnly}
              awayOnly={awayOnly}
              handleHomeOnlyChange={handleHomeOnlyChange}
              handleAwayOnlyChange={handleAwayOnlyChange}
              inputMatchesCount={inputMatchesCount}
              handleInputMatchesCountChange={handleInputMatchesCountChange}
              handleIncludeAllSeasonMatches={handleIncludeAllSeasonMatches}
              updateMatchesCount={updateMatchesCount}
              updateIncludeOtherSeasons={updateIncludeOtherSeasons}
              inputChekBoxIncludeAllSeason={inputChekBoxIncludeAllSeason}
              handleFilterChange={handleFilterChange}
              listCurrentSeason={completeListCurrentSeason}
              selectedSeasons={selectedSeasons}
              handleSeasonChange={handleSeasonChange}
              idTeam={idTeam}
              positionFilter={positionFilterTeam1}
              handlePositionFilterChange={handlePositionFilterChangeTeam1}
              pathPage={pathPage}
              //Para la tabla de estadisticas no porcentuales
            />
          </Box>
        </Paper>
      ) : (
        <FilterComponent
          filterName={["local/visitor", "MatchesCountInput"]}
          homeOnly={homeOnly}
          awayOnly={awayOnly}
          handleHomeOnlyChange={handleHomeOnlyChange}
          handleAwayOnlyChange={handleAwayOnlyChange}
          inputMatchesCount={inputMatchesCount}
          handleInputMatchesCountChange={handleInputMatchesCountChange}
          handleIncludeAllSeasonMatches={handleIncludeAllSeasonMatches}
          updateMatchesCount={updateMatchesCount}
          updateIncludeOtherSeasons={updateIncludeOtherSeasons}
          inputChekBoxIncludeAllSeason={inputChekBoxIncludeAllSeason}
          handleFilterChange={handleFilterChange}
          listCurrentSeason={completeListCurrentSeason}
          selectedSeasons={selectedSeasons}
          handleSeasonChange={handleSeasonChange}
          idTeam={idTeam}
          positionFilter={positionFilterTeam1}
          handlePositionFilterChange={handlePositionFilterChangeTeam1}
          pathPage={pathPage}
          //Para la tabla de estadisticas no porcentuales
        />
      )}

      {idTeamSecondTeam && (
        <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
          <Box
            display="flex"
            flexDirection={"row"}
            alignItems="flex-start"
            mb={2}
          >
            {/* <Avatar
            alt={stats[1]?.team?.name}
            src={stats[1]?.team?.logo}
            sx={{ mr: 2 }}
          /> */}
            {/* <Typography variant="h6">{stats[1]?.team?.name}</Typography> */}

            <InfoFilterTeam
              team={stats[1]?.team}
              homeOnly={homeOnlySecondTeamComparative}
              awayOnly={awayOnlySecondTeamComparative}
              selectedSeasons={selectedSeasonsSecondTeam}
              positionFilter={positionFilterTeam2}
            />
            <FilterComponent
              filterName={["local/visitor", "MatchesCountInput"]}
              homeOnly={homeOnlySecondTeamComparative}
              awayOnly={awayOnlySecondTeamComparative}
              handleHomeOnlyChange={(event) =>
                setHomeOnlySecondTeamComparative(event.target.checked)
              }
              handleAwayOnlyChange={(event) =>
                setAwayOnlySecondTeamComparative(event.target.checked)
              }
              inputMatchesCount={matchesCountSecondTeamComparative}
              handleInputMatchesCountChange={(event) =>
                setMatchesCountSecondTeamComparative(event.target?.value)
              }
              handleIncludeAllSeasonMatches={(event) =>
                setIncludeAllSeasonMatchesSecondTeamComparative(
                  event.target.checked
                )
              }
              updateMatchesCount={() =>
                setMatchesCountSecondTeamComparative(
                  matchesCountSecondTeamComparative
                )
              }
              updateIncludeOtherSeasons={() =>
                setIncludeAllSeasonMatchesSecondTeamComparative(
                  includeAllSeasonMatchesSecondTeamComparative
                )
              }
              inputChekBoxIncludeAllSeason={
                includeAllSeasonMatchesSecondTeamComparative
              }
              handleFilterChange={(statisticKey, matchType, newFilter) =>
                handleFilterChange(statisticKey, matchType, newFilter)
              }
              listCurrentSeason={completeListCurrentSeason2}
              selectedSeasons={selectedSeasonsSecondTeam}
              handleSeasonChange={handleSeasonChangeTeam2}
              idTeam={idTeamSecondTeam}
              positionFilter={positionFilterTeam2}
              handlePositionFilterChange={handlePositionFilterChangeTeam2}
            />
          </Box>
        </Paper>
      )}
      {idTeam && (
        <>
          <AddMoreTeamComparative
            onSetIdTeamSecond={setIdTeamSecondTeam}
            firstTeam={stats[0]?.team}
            homeOnlySecondTeamComparative={homeOnlySecondTeamComparative}
            awayOnlySecondTeamComparative={awayOnlySecondTeamComparative}
            homeOnly={homeOnly}
            awayOnly={awayOnly}
            idSecondTeam={idAwayTeam}
          />
        </>
      )}

      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        aria-label="Tabs"
        variant="scrollable"
        scrollButtons
        allowScrollButtonsMobile
      >
        <Tab label="Estadística Porcentuales" />
        <Tab label="Estadísticas" />
      </Tabs>

      {/* Contenido de las pestañas */}
      {activeTab === 0 &&
        (singleTeam ? (
          <RangePercentageTable
            idTeam={singleTeam}
            isSingle={true}
            setInputChekBoxIncludeAllSeason={setInputChekBoxIncludeAllSeason}
            setIncludeAllSeasonMatches={setIncludeAllSeasonMatches}
            inputChekBoxIncludeAllSeason={inputChekBoxIncludeAllSeason}
            stats={stats}
            setFilters={setFilters}
            loading={loading}
            filters={filters}
            selectedSeasons={selectedSeasons}
            shouldFetch={shouldFetch}
            fetchTeamStats={fetchTeamStats}
            homeOnly={homeOnly}
            awayOnly={awayOnly}
            matchesCount={matchesCount}
            includeAllSeasonMatches={includeAllSeasonMatches}
            setStats={setStats}
            setLoading={setLoading}
            setError={setError}
            setOrder={setOrder}
            order={order}
            setOrderBy={setOrderBy}
            orderBy={orderBy}
          />
        ) : (
          <RangePercentageTable
            isSingle={false}
            idTeam={idTeam}
            idSecondTeam={idAwayTeam}
            setInputChekBoxIncludeAllSeason={setInputChekBoxIncludeAllSeason}
            setIncludeAllSeasonMatches={setIncludeAllSeasonMatches}
            inputChekBoxIncludeAllSeason={inputChekBoxIncludeAllSeason}
            stats={stats}
            setFilters={setFilters}
            loading={loading}
            filters={filters}
            selectedSeasons={selectedSeasons}
            shouldFetch={shouldFetch}
            fetchTeamStats={fetchTeamStats}
            homeOnly={homeOnly}
            awayOnly={awayOnly}
            matchesCount={matchesCount}
            includeAllSeasonMatches={includeAllSeasonMatches}
            setStats={setStats}
            setLoading={setLoading}
            setError={setError}
            setOrder={setOrder}
            order={order}
            setOrderBy={setOrderBy}
            orderBy={orderBy}
          ></RangePercentageTable>
        ))}
      {activeTab === 1 && pathPage === "teams" && (
        <TableAllTeamSeason
          idHomeTeam={idTeam}
          idAwayTeam={idTeamSecondTeam}
          seasonId={selectedSeasons}
          //Probando:
          homeOnly={homeOnly}
          awayOnly={awayOnly}
          awayOnlySecondTeamComparative={awayOnlySecondTeamComparative}
          homeOnlySecondTeamComparative={homeOnlySecondTeamComparative}
          setAwayOnly={setAwayOnly}
          setHomeOnly={setHomeOnly}
          setAwayOnlySecondTeamComparative={setAwayOnlySecondTeamComparative}
          setHomeOnlySecondTeamComparative={setHomeOnlySecondTeamComparative}
          setSelectedTeams={setSelectedTeams}
          selectedTeams={selectedTeams}
          listTeams={moreStats}
          stats={moreStats}
        />
      )}
      {activeTab === 1 && pathPage === "league" && (
        <TableAllTeamSeason
          idHomeTeam={idTeam}
          idAwayTeam={idAwayTeam}
          seasonId={seasonId}
          //PROBANDO:
          homeOnly={homeOnly}
          awayOnly={awayOnly}
          awayOnlySecondTeamComparative={awayOnlySecondTeamComparative}
          homeOnlySecondTeamComparative={homeOnlySecondTeamComparative}
          setAwayOnly={setAwayOnly}
          setHomeOnly={setHomeOnly}
          setAwayOnlySecondTeamComparative={setAwayOnlySecondTeamComparative}
          setHomeOnlySecondTeamComparative={setHomeOnlySecondTeamComparative}
          listTeams={moreStats}

        />
      )}
      {activeTab === 1 && pathPage === "home" && (
        <TableAllTeamSeason
          idHomeTeam={idTeam}
          idAwayTeam={idAwayTeam}
          seasonId={selectedSeasons}
          //PROBANDO:
          homeOnly={homeOnly}
          awayOnly={awayOnly}
          awayOnlySecondTeamComparative={awayOnlySecondTeamComparative}
          homeOnlySecondTeamComparative={homeOnlySecondTeamComparative}
          setAwayOnly={setAwayOnly}
          setHomeOnly={setHomeOnly}
          setAwayOnlySecondTeamComparative={setAwayOnlySecondTeamComparative}
          setHomeOnlySecondTeamComparative={setHomeOnlySecondTeamComparative}
          listTeams={moreStats}

        />
      )}
      {idTeam && (
        <ShowStatisticsMatches
          // singleTeam={singleTeam}

          idHomeTeam={idTeam}
          idAwayTeam={idTeamSecondTeam}
        />
      )}
    </>
  );
};
