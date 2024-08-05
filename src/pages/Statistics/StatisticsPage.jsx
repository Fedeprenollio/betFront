/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Tabs, Tab, Box, Avatar, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { FilterStatistics } from "./FilterStatistics";
import { ShowStatisticsMatches } from "./ShowStatisticsMatches";
import StatisticsTablecopy from "../../componts/StatisticsTablecopy";
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
  const { completeListCurrentSeason } = useCurrentSeasonTeam(idTeam);
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
    crearVisitorTeamStats,
    allCurrentSeasons,
    getAllCurrentSeasons,listAllCurrentSeason
  } = useBoundStore((state) => state);
  const [stats, setStats] = useState([]);
  const [idTeamSecondTeam, setIdTeamSecondTeam] = useState(idAwayTeam);
  useEffect(() => {
    getAllCurrentSeasons();
  }, [getAllCurrentSeasons]);

  const [activeTab, setActiveTab] = useState(0);
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
  const [selectedSeasons, setSelectedSeasons] = useState([]);
  const [selectedSeasonsSecondTeam, setSelectedSeasonsSecondTeam] = useState(
    []
  );
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
 console.log("selectedSeasons",seasonId,selectedSeasons)
  useEffect(() => {
    if (!idAwayTeam) {
      setSingleTeam(idTeam);
    } else {
      setSingleTeam(null);
    }
  }, [idTeam, idAwayTeam]);


  useEffect(() => {
    // Parse listCurrentSeason to an array of seasons if it's not empty
    if (updatedListSeasonTeam1) {
      return;
    }
    if (someProp === "allTeams" && listAllCurrentSeason.length >0) {
      setUpdatedListSeasonTeam1(true);
      console.log("listAllCurrentSeason",listAllCurrentSeason)
      const seasonsArray = listAllCurrentSeason?.join(",")
        ?.split(",")
        .map((season) => season.trim());
      setSelectedSeasons(seasonsArray);
    } else if (idTeam) {
      // const array =completeListCurrentSeason?.split(",")
      setSelectedSeasons(completeListCurrentSeason);
    }
  }, [
    
    completeListCurrentSeason,
    idTeam,
    updatedListSeasonTeam1,
    someProp,listAllCurrentSeason
  ]);

  useEffect(() => {
    // Parse listCurrentSeason to an array of seasons if it's not empty
    if (updatedListSeasonTeam2) {
      return;
    }
    if (idTeamSecondTeam) {
      setSelectedSeasonsSecondTeam(completeListCurrentSeason2);
    }
  }, [idTeamSecondTeam, completeListCurrentSeason2, updatedListSeasonTeam2]);

  useEffect(() => {
    if (seasonId && !listCurrentSeason && shouldFetch) {
      console.log("CACA3");
      const loadStats = async () => {
        try {
          const data = await fetchTeamStats(
            seasonId,
            homeOnly,
            awayOnly,
            matchesCount,
            includeAllSeasonMatches
          );
          setStats(data);
          setLoading(false);
        } catch (err) {
          setError(err);
          setLoading(false);
        }
      };
      loadStats();
    }
  }, [
    seasonId,
    homeOnly,
    awayOnly,
    matchesCount,
    includeAllSeasonMatches,
    shouldFetch,
    listCurrentSeason,
  ]);
  useEffect(() => {
    if (someProp === "allTeams") {
      console.log("CACA PADRE");
      const loadStats = async () => {
        try {
          const selectedSeasonsString = selectedSeasons.join(",") ? selectedSeasons.join(",") :listAllCurrentSeason.join(",") ;
          const data = await fetchTeamStats(
            selectedSeasonsString,
            homeOnly,
            awayOnly,
            matchesCount,
            includeAllSeasonMatches
          );
          setStats(data);
          setLoading(false);
        } catch (err) {
          setError(err);
          setLoading(false);
        }
      };
      loadStats();
    }
  }, [
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
  ]);

  useEffect(() => {
    if (idTeam !== undefined && shouldFetch) {
      const loadStats = async () => {
        console.log("CACA2");
        try {
          const a = await getLocalTeamStats({
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
            setStats([...a, b[0]]);
          } else {
            setStats([...a]);
          }

          setLoading(false);
        } catch (err) {
          setError(err);
          setLoading(false);
        }
      };
      loadStats();
    }
  }, [
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
    crearVisitorTeamStats,
    selectedSeasons,
    selectedSeasonsSecondTeam,
    positionFilterTeam1,
    positionFilterTeam2,
  ]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  const handleHomeOnlyChange = (event) => {
    setHomeOnly(event.target.checked);
  };
  console.log("seasonId", seasonId);
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
      />
      {someProp !== "allTeams" && (
        <Box
          display="flex"
          flexDirection={"column"}
          alignItems="flex-start"
          mb={2}
        >
          <Avatar
            alt={stats[0]?.team?.name}
            src={stats[0]?.team?.logo}
            sx={{ mr: 2 }}
          />
          <Typography variant="h6">{stats[0]?.team?.name}</Typography>

          <InfoFilterTeam
            team={stats[0]?.team}
            homeOnly={homeOnly}
            awayOnly={awayOnly}
            selectedSeasons={selectedSeasons}
            positionFilter={positionFilterTeam1}
          />
        </Box>
      )}

      {idTeamSecondTeam && (
        <Box
          display="flex"
          flexDirection={"column"}
          alignItems="flex-start"
          mb={2}
        >
          <Avatar
            alt={stats[1]?.team?.name}
            src={stats[1]?.team?.logo}
            sx={{ mr: 2 }}
          />
          <Typography variant="h6">{stats[1]?.team?.name}</Typography>
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
          <InfoFilterTeam
            team={stats[1]?.team}
            homeOnly={homeOnlySecondTeamComparative}
            awayOnly={awayOnlySecondTeamComparative}
            selectedSeasons={selectedSeasonsSecondTeam}
            positionFilter={positionFilterTeam2}
          />
        </Box>
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
          ></RangePercentageTable>
        ))}
      {activeTab === 1 && (
        <TableAllTeamSeason idHomeTeam={idTeam} idAwayTeam={idAwayTeam}  seasonId={selectedSeasons}/>
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
