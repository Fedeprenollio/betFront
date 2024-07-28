/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  TableRow,
  Typography,
  Tabs,
  Tab,
  Box,
  styled,
  Avatar,
} from "@mui/material";
import { BACKEND_URL_BASE } from "../../../stores/url_base";
import { GroupByName } from "./GroupByName";
import { FilterComponent } from "../../../componts/tableFilters/FilterComponent";
import HelpIconWithModal from "../../../componts/helpIconWithModal/HelpIconWithModal";
import { renderTable } from "./renderTable";
import { AddMoreTeamComparative } from "./addMoreTeamComparative/AddMoreTeamComparative";
import { tableHelpContent } from "./TableHelpContent";
import { useBoundStore } from "../../../stores";
import { ShowStatisticsMatches } from "../ShowStatisticsMatches";
// import GroupByName from "./GroupByName";

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const fetchTeamStats = async (
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

// const fetchOneTeamStats = async (

//   homeOnly,
//   awayOnly,
//   matchesCount,
//   includeAllSeasonMatches,
//   idTeam
// ) => {
//   const response = await axios.get(
//     `${BACKEND_URL_BASE}/team/stats/${idTeam}?statistics=goals,offsides,yellowCards,corners,shots,shotsOnTarget,possession&matchesCount=${matchesCount}&homeOnly=${homeOnly}&awayOnly=${awayOnly}&includeAllSeasonMatches=${includeAllSeasonMatches}`
//   );
//   return response.data;
// };

const TabPanel = ({ children, value, index }) => (
  <div className="prueba" role="tabpanel" hidden={value !== index}>
    {value === index && <Box p={0.2}>{children}</Box>}
  </div>
);

export const RangePercentageTable = ({
  listCurrentSeason,
  idTeam,
  idSecondTeam,
}) => {
  const { seasonId } = useParams();
  const { getLocalTeamStats, getVisitorTeamStats, crearVisitorTeamStats } =
    useBoundStore((state) => state);
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tabIndex, setTabIndex] = useState(0);
  const [homeOnly, setHomeOnly] = useState(true);
  const [awayOnly, setAwayOnly] = useState(true);

  const [homeOnlySecondTeamComparative, setHomeOnlySecondTeamComparative] =
    useState(true);
  const [awayOnlySecondTeamComparative, setAwayOnlySecondTeamComparative] =
    useState(true);
  const [
    matchesCountSecondTeamComparative,
    setMatchesCountSecondTeamComparative,
  ] = useState(0);
  const [
    includeAllSeasonMatchesSecondTeamComparative,
    setIncludeAllSeasonMatchesSecondTeamComparative,
  ] = useState(false);
  const [idTeamSecondTeam, setIdTeamSecondTeam] = useState(idSecondTeam);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("team.country");
  const [matchesCount, setMatchesCount] = useState(0);
  const [inputMatchesCount, setInputMatchesCount] = useState(0);
  const [includeAllSeasonMatches, setIncludeAllSeasonMatches] = useState(false);
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

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [selectedSeasons, setSelectedSeasons] = useState([]);
  const [shouldFetch, setShouldFetch] = useState(true);
  const [nameFilters, setNameFilters] = useState([]);
  const [activeTab2, setActiveTab2] = useState(0);

  const [secondTeamComparative, setSecondTeamComparative] = useState([]);
  useEffect(() => {
    // Parse listCurrentSeason to an array of seasons if it's not empty
    if (listCurrentSeason) {
      const seasonsArray = listCurrentSeason
        .split(",")
        .map((season) => season.trim());
      setSelectedSeasons(seasonsArray);
    }
  }, [listCurrentSeason]);

  // useEffect(() => {
  //   if (shouldFetch) {
  //     const loadStats = async () => {
  //       try {
  //         // setLoading(true);
  //         let data;
  //         if (seasonId && !listCurrentSeason) {
  //           data = await fetchTeamStats(
  //             seasonId,
  //             homeOnly,
  //             awayOnly,
  //             matchesCount,
  //             includeAllSeasonMatches
  //           );
  //           setStats(data);
  //         } else if (listCurrentSeason && selectedSeasons.length > 0) {
  //           const selectedSeasonsString = selectedSeasons.join(",");
  //           data = await fetchTeamStats(
  //             selectedSeasonsString,
  //             homeOnly,
  //             awayOnly,
  //             matchesCount,
  //             includeAllSeasonMatches
  //           );
  //           setStats(data);
  //         } else if (idTeam !== undefined) {
  //           getLocalTeamStats({
  //             idTeam,

  //             homeOnly,
  //             awayOnly,
  //             matchesCount,
  //             includeAllSeasonMatches,
  //           });
  //           // data = await fetchOneTeamStats(

  //           //   homeOnly,
  //           //   awayOnly,
  //           //   matchesCount,
  //           //   includeAllSeasonMatches,
  //           //   idTeam
  //           // );
  //           if (secondTeamComparative?.team?.name) {

  //             setStats([...data, secondTeamComparative]);
  //             } else {
  //             console.log("localTeamPercentageStatistics",localTeamPercentageStatistics)
  //             setStats(localTeamPercentageStatistics);
  //           }
  //         }

  //         setLoading(false);
  //       } catch (err) {
  //         setError(err);
  //         setLoading(false);
  //       }
  //     };
  //     loadStats();
  //   }
  // }, [
  //   seasonId,
  //   homeOnly,
  //   awayOnly,
  //   matchesCount,
  //   includeAllSeasonMatches,
  //   selectedSeasons,
  //   listCurrentSeason,
  //   shouldFetch,
  //   idTeam,
  //   secondTeamComparative,
  //   // localTeamPercentageStatistics
  // ]);

  useEffect(() => {
    if (seasonId && !listCurrentSeason && shouldFetch) {
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
    if (listCurrentSeason && selectedSeasons.length > 0 && shouldFetch) {
      const loadStats = async () => {
        try {
          const selectedSeasonsString = selectedSeasons.join(",");
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
  ]);

  useEffect(() => {
    if (idTeam !== undefined && shouldFetch) {
      const loadStats = async () => {
        try {
          const a = await getLocalTeamStats({
            idTeam,
            homeOnly,
            awayOnly,
            matchesCount,
            includeAllSeasonMatches,
          });
          if (idTeamSecondTeam) {
            const b = await getVisitorTeamStats({
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

          // const data = await fetchOneTeamStats(
          //   homeOnly,
          //   awayOnly,
          //   matchesCount,
          //   includeAllSeasonMatches,
          //   idTeam
          // );
          // if (secondTeamComparative?.team?.name) {
          //   setStats((prevStats) => [...prevStats, secondTeamComparative]);
          // } else {
          //   setStats(a);
          // }
          setLoading(false);
        } catch (err) {
          setError(err);
          setLoading(false);
        }
      };
      loadStats();
    }

    // return ()=>{
    //   crearVisitorTeamStats()
    //   // setIdTeamSecondTeam("")
    // }
  }, [
    idTeam,
    homeOnly,
    awayOnly,
    matchesCount,
    includeAllSeasonMatches,
    shouldFetch,
    secondTeamComparative,
    getLocalTeamStats,
    idTeamSecondTeam,
    homeOnlySecondTeamComparative,
    awayOnlySecondTeamComparative,
    includeAllSeasonMatchesSecondTeamComparative,
    getVisitorTeamStats,
    matchesCountSecondTeamComparative,
    crearVisitorTeamStats,
    // localTeamPercentageStatistics
  ]);
  console.log("idTeamSecondTeam", idTeamSecondTeam);
  // useEffect(() => {
  //   const newFetch = async (idTeamSecondTeam) => {
  //    const b = await getVisitorTeamStats({
  //       idTeam: idTeamSecondTeam,
  //       homeOnly:homeOnlySecondTeamComparative,
  //       awayOnly: awayOnlySecondTeamComparative,
  //       matchesCount: matchesCountSecondTeamComparative,
  //       includeAllSeasonMatches:includeAllSeasonMatchesSecondTeamComparative,

  //     });
  //     // const newTeamData = await fetchOneTeamStats(
  //     //   homeOnlySecondTeamComparative,
  //     //   awayOnlySecondTeamComparative,
  //     //   matchesCountSecondTeamComparative,
  //     //   includeAllSeasonMatchesSecondTeamComparative,
  //     //   idTeamSecondTeam
  //     // );
  //     setSecondTeamComparative(b[0]);
  //     setStats((prevState) => [...prevState.slice(0, 1), b[0]]);
  //   };
  //   if (idTeamSecondTeam) {
  //     newFetch(idTeamSecondTeam);
  //   }
  // }, [
  //   idTeamSecondTeam,
  //   homeOnlySecondTeamComparative,
  //   awayOnlySecondTeamComparative,
  //   includeAllSeasonMatchesSecondTeamComparative,
  //   matchesCountSecondTeamComparative,
  //   seasonId,
  //   getVisitorTeamStats
  // ]);
  console.log("STATT,", stats);
  //   if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error: {error.message}</Typography>;
  // if (stats?.length === 0) return <Typography>No data available</Typography>;
  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const handleHomeOnlyChange = (event) => {
    setHomeOnly(event.target.checked);
  };

  const handleAwayOnlyChange = (event) => {
    setAwayOnly(event.target.checked);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const statisticKeys = [
    "goals",
    "offsides",
    "yellowCards",
    "corners",
    "shots",
    "shotsOnTarget",
    "possession",
  ];
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

  // const handleFilterChange = (newFilter) => {
  //   setFilters((prevFilters) => ({
  //     ...prevFilters,
  //     ...newFilter,
  //   }));
  // };

  // const handleFilterChange = (statisticKey, newFilter) => {
  //   setFilters((prevFilters) => ({
  //     ...prevFilters,
  //     [statisticKey]: newFilter
  //   }));
  // };

  const handleFilterChange = (statisticKey, matchType, newFilter) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [statisticKey]: {
        ...prevFilters[statisticKey],
        [matchType]: newFilter,
      },
    }));
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSeasonChange = (seasonId, checked) => {
    setSelectedSeasons((prevSelectedSeasons) =>
      checked
        ? [...prevSelectedSeasons, seasonId]
        : prevSelectedSeasons.filter((id) => id !== seasonId)
    );
  };

  const handleNamesChange = (names) => {
    setNameFilters(names);
  };

  const handleAddTeamClick = () => {
    const teamId = prompt("Introduce el ID del equipo para agregar:");
    setIdTeamSecondTeam(teamId);
    // if (teamId) {
    //   addTeam(teamId);
    // }
  };

  return (
    <>
      <h1>
        {" "}
        {idTeam &&
          `Estadisticas de un solo equipo en fase de prueba, falta agregar la posibilidad de agregar mas equpos para compararlos`}{" "}
      </h1>
      {listCurrentSeason && (
        <Typography variant="p" gutterBottom>
          {listCurrentSeason
            ? "Estadisticas generales de todos los equipos en temporadas actuales activas"
            : "Estadísticas de la Temporada"}
        </Typography>
      )}

      {idTeam && (
        <Avatar alt={stats[0]?.team?.name} src={stats[0]?.team?.logo} />
      )}

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
        listCurrentSeason={listCurrentSeason}
        selectedSeasons={selectedSeasons}
        handleSeasonChange={handleSeasonChange}
      />
      {idTeamSecondTeam && (
        <Avatar alt={stats[1]?.team?.name} src={stats[1]?.team?.logo} />
      )}
      {idTeamSecondTeam && (
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
          listCurrentSeason={listCurrentSeason}
          selectedSeasons={selectedSeasons}
          handleSeasonChange={handleSeasonChange}
        />
      )}

      <GroupByName onNamesChange={handleNamesChange} />
      <HelpIconWithModal
        title="Ayuda sobre la tabla"
        content={tableHelpContent}
      />

      <Tabs
        value={tabIndex}
        onChange={handleTabChange}
        aria-label="stat-tabs"
        variant="scrollable"
        scrollButtons
        allowScrollButtonsMobile
      >
        {statisticKeys.map((key) => (
          <Tab label={key.charAt(0).toUpperCase() + key.slice(1)} key={key} />
        ))}
      </Tabs>

      {/* <AddMoreTeamComparative

  idTeam={idTeam}
  handleAddTeamClick={handleAddTeamClick}

/> */}
      {idTeam && (
        <AddMoreTeamComparative
          handleAddTeamClick={handleAddTeamClick}
          secondTeamComparative={stats[1]?.team}
          firstTeam={stats[0]?.team}
          homeOnlySecondTeamComparative={homeOnlySecondTeamComparative}
          awayOnlySecondTeamComparative={awayOnlySecondTeamComparative}
          homeOnly={homeOnly}
          awayOnly={awayOnly}
        />
      )}
      {statisticKeys.map((key, index) => (
        <TabPanel value={tabIndex} index={index} key={key}>
          <Box
            sx={{
              border: "1px solid #ddd",
              padding: 0.3,
              marginBottom: 2,
              borderRadius: 2,
              boxShadow: 1,
              backgroundColor: "#f9f9f9",
            }}
          >
            <Typography variant="h6" gutterBottom>
              {key.charAt(0).toUpperCase() + key.slice(1)} - Marcado
            </Typography>
            {renderTable(
              stats?.map((teamData) => ({
                team: teamData.team,
                stats: {
                  [key]: teamData.stats?.[key],
                },
              })),
              key,
              "scored",
              order,
              orderBy,
              handleRequestSort,
              loading,
              filters[key]?.scored || {},
              (newFilter) => handleFilterChange(key, "scored", newFilter),
              page,
              rowsPerPage,
              handleChangePage,
              handleChangeRowsPerPage,
              nameFilters
            )}
          </Box>
          <Box
            sx={{
              border: "1px solid #ddd",
              padding: 2,
              marginBottom: 2,
              borderRadius: 2,
              boxShadow: 1,
              backgroundColor: "#f9f9f9",
            }}
          >
            <Typography variant="h6" gutterBottom>
              {key.charAt(0).toUpperCase() + key.slice(1)} - Recibido
            </Typography>
            {renderTable(
              stats?.map((teamData) => ({
                team: teamData.team,
                stats: {
                  [key]: teamData.stats?.[key],
                },
              })),
              key,
              "received",
              order,
              orderBy,
              handleRequestSort,
              loading,
              filters[key]?.received || {}, // Filtros específicos para "received"
              (newFilter) => handleFilterChange(key, "received", newFilter),
              page,
              rowsPerPage,
              handleChangePage,
              handleChangeRowsPerPage,
              nameFilters
            )}
          </Box>

          {/* <Box
            sx={{
              border: "1px solid #ddd",
              padding: 2,
              marginBottom: 2,
              borderRadius: 2,
              boxShadow: 1,
              backgroundColor: "#f9f9f9",
            }}
          >
            <Typography variant="h6" gutterBottom>
              {key.charAt(0).toUpperCase() + key.slice(1)} - Totales
            </Typography>
            {renderTable(
               stats?.map((teamData) => ({
                team: teamData.team,
                stats: {
                  [key]: teamData.stats?.[key], 
                },
              })),
              key,
              "total",
              order,
              orderBy,
              handleRequestSort,
              loading,
              filters[key] || {},
              (newFilter) => handleFilterChange(key, newFilter),
              page,
              rowsPerPage,
              handleChangePage,
              handleChangeRowsPerPage,
              nameFilters
            )}
          </Box> */}
        </TabPanel>
      ))}
      <ShowStatisticsMatches
        // singleTeam={singleTeam}
        idHomeTeam={idTeam}
        idAwayTeam={idSecondTeam}
      />
    </>
  );
};
