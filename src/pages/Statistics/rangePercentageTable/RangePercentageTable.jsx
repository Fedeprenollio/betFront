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
import { useCurrentSeasonTeam } from "../../../customHooks/useCurrentSeasonTeam";
import { InfoFilterTeam } from "../../../componts/tableFilters/InfoFilterTeam";
import { useFilters } from "../../../customHooks/useFilters";
import { fetchTeamStats } from "../StatisticsPage";
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


const TabPanel = ({ children, value, index }) => (
  <div className="prueba" role="tabpanel" hidden={value !== index}>
    {value === index && <Box p={0.2}>{children}</Box>}
  </div>
);

export const RangePercentageTable = ({
  listCurrentSeason,
  idTeam,
  idSecondTeam,
  setInputChekBoxIncludeAllSeason,
  setIncludeAllSeasonMatches,inputChekBoxIncludeAllSeason,
  stats,setFilters,loading,filters,

  selectedSeasons,
  shouldFetch,
  
  homeOnly,
  awayOnly,
  matchesCount,
  includeAllSeasonMatches,
  setStats,
  setLoading,
  setError

}) => {
  const { seasonId } = useParams();
  console.log("seasonId en hija",seasonId)
  // const { getLocalTeamStats, getVisitorTeamStats, crearVisitorTeamStats } =
  //   useBoundStore((state) => state);
  const [idTeamSecondTeam, setIdTeamSecondTeam] = useState(idSecondTeam);

  // const { completeListCurrentSeason } = useCurrentSeasonTeam(idTeam);
  // const { completeListCurrentSeason: completeListCurrentSeason2 } =  useCurrentSeasonTeam(idTeamSecondTeam);
  
  // const {
  //   homeOnly,
  //   setHomeOnly,
  //   awayOnly,
  //   setAwayOnly,
  //   homeOnlySecondTeamComparative,
  //   setHomeOnlySecondTeamComparative,
  //   awayOnlySecondTeamComparative,
  //   setAwayOnlySecondTeamComparative,
  //   matchesCountSecondTeamComparative,
  //   setMatchesCountSecondTeamComparative,
  //   matchesCount,
  //   setMatchesCount,
  // } = useFilters();

  // const [stats, setStats] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);
  const [tabIndex, setTabIndex] = useState(0);
  console.log("CACA",idTeam)
  console.log("CACA DATA", selectedSeasons)

  // useEffect(() => {
  //   // listCurrentSeason && selectedSeasons.length > 0 && shouldFetch
  //   if (idTeam === undefined) {
  //     const loadStats = async () => {
  //       try {
  //         const selectedSeasonsString = selectedSeasons.join(",");
  //         const data = await fetchTeamStats(
  //           selectedSeasonsString,
  //           homeOnly,
  //           awayOnly,
  //           matchesCount,
  //           includeAllSeasonMatches
  //         );
  //         console.log("CACA data",data)

  //         setStats(data);
  //         setLoading(false);
  //       } catch (err) {
  //         // setError(err);
  //         // setLoading(false);
  //       }
  //     };
  //     loadStats();
  //   }
  // }, [
  //   listCurrentSeason,
  //   selectedSeasons,
  //   homeOnly,
  //   awayOnly,
  //   matchesCount,
  //   includeAllSeasonMatches,
  //   shouldFetch,
  //    setError, setLoading, setStats,idTeam
  // ]);
  // const [
  //   includeAllSeasonMatchesSecondTeamComparative,
  //   setIncludeAllSeasonMatchesSecondTeamComparative,
  // ] = useState(false);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("team.country");
  // const [inputMatchesCount, setInputMatchesCount] = useState(0);
  // const [includeAllSeasonMatches, setIncludeAllSeasonMatches] = useState(false);
  // const [inputChekBoxIncludeAllSeason, setInputChekBoxIncludeAllSeason] =
  //   useState(false);
  // const [filters, setFilters] = useState({
  //   goals: {
  //     scored: {},
  //     received: {},
  //   },
  //   corners: {
  //     scored: {},
  //     received: {},
  //   },
  //   shots: {
  //     scored: {},
  //     received: {},
  //   },
  //   shotsOnTarget: {
  //     scored: {},
  //     received: {},
  //   },
  //   possession: {
  //     scored: {},
  //     received: {},
  //   },
  //   offsides: {
  //     scored: {},
  //     received: {},
  //   },
  //   yellowCards: {
  //     scored: {},
  //     received: {},
  //   },
  // });

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // const [selectedSeasons, setSelectedSeasons] = useState([]);
  // const [selectedSeasonsSecondTeam, setSelectedSeasonsSecondTeam] = useState(
  //   []
  // );

  // const [shouldFetch, setShouldFetch] = useState(true);
  const [nameFilters, setNameFilters] = useState([]);
  // const [updatedListSeasonTeam1, setUpdatedListSeasonTeam1] = useState(false);
  // const [updatedListSeasonTeam2, setUpdatedListSeasonTeam2] = useState(false);
  // const [positionFilterTeam1, setPositionFilterTeam1] = useState("1-50");
  // const handlePositionFilterChangeTeam1 = (event) => { setPositionFilterTeam1(event); };
  // const [positionFilterTeam2, setPositionFilterTeam2] = useState("1-50");
  // const handlePositionFilterChangeTeam2 = (event) => { setPositionFilterTeam2(event); };

  // useEffect(() => {
  //   // Parse listCurrentSeason to an array of seasons if it's not empty
  //   if (updatedListSeasonTeam1) {
  //     return;
  //   }
  //   if (listCurrentSeason) {
  //     setUpdatedListSeasonTeam1(true);
  //     const seasonsArray = listCurrentSeason
  //       .split(",")
  //       .map((season) => season.trim());
  //     setSelectedSeasons(seasonsArray);
  //   } else if (idTeam) {
  //     // const array =completeListCurrentSeason?.split(",")
  //     setSelectedSeasons(completeListCurrentSeason);
  //   }
  // }, [
  //   listCurrentSeason,
  //   completeListCurrentSeason,
  //   idTeam,
  //   updatedListSeasonTeam1,
  // ]);

  // useEffect(() => {
  //   // Parse listCurrentSeason to an array of seasons if it's not empty
  //   if (updatedListSeasonTeam2) {
  //     return;
  //   }
  //   if (idTeamSecondTeam) {
  //     setSelectedSeasonsSecondTeam(completeListCurrentSeason2);
  //   }
  // }, [idTeamSecondTeam, completeListCurrentSeason2, updatedListSeasonTeam2]);

  // useEffect(() => {
  //   if (seasonId && !listCurrentSeason && shouldFetch) {
  //     const loadStats = async () => {
  //       try {
  //         const data = await fetchTeamStats(
  //           seasonId,
  //           homeOnly,
  //           awayOnly,
  //           matchesCount,
  //           includeAllSeasonMatches
  //         );
  //         setStats(data);
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
  //   shouldFetch,
  //   listCurrentSeason,
  // ]);
  // useEffect(() => {
  //   if (listCurrentSeason && selectedSeasons.length > 0 && shouldFetch) {
  //     const loadStats = async () => {
  //       try {
  //         const selectedSeasonsString = selectedSeasons.join(",");
  //         const data = await fetchTeamStats(
  //           selectedSeasonsString,
  //           homeOnly,
  //           awayOnly,
  //           matchesCount,
  //           includeAllSeasonMatches
  //         );
  //         setStats(data);
  //         setLoading(false);
  //       } catch (err) {
  //         setError(err);
  //         setLoading(false);
  //       }
  //     };
  //     loadStats();
  //   }
  // }, [
  //   listCurrentSeason,
  //   selectedSeasons,
  //   homeOnly,
  //   awayOnly,
  //   matchesCount,
  //   includeAllSeasonMatches,
  //   shouldFetch,
  // ]);

  // useEffect(() => {
  //   if (idTeam !== undefined && shouldFetch) {
  //     const loadStats = async () => {
  //       try {
  //         const a = await getLocalTeamStats({
  //           season: selectedSeasons.join(","),
  //           idTeam,
  //           homeOnly,
  //           awayOnly,
  //           matchesCount,
  //           includeAllSeasonMatches,
  //           position: positionFilterTeam1,
  //         });
  //         if (idTeamSecondTeam) {
  //           const b = await getVisitorTeamStats({
  //             season: selectedSeasonsSecondTeam.join(","),
  //             position: positionFilterTeam2,

  //             idTeam: idTeamSecondTeam,
  //             homeOnly: homeOnlySecondTeamComparative,
  //             awayOnly: awayOnlySecondTeamComparative,
  //             matchesCount: matchesCountSecondTeamComparative,
  //             includeAllSeasonMatches:
  //               includeAllSeasonMatchesSecondTeamComparative,
  //           });
  //           setStats([...a, b[0]]);
  //         } else {
  //           setStats([...a]);
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
  //   idTeam,
  //   homeOnly,
  //   awayOnly,
  //   matchesCount,
  //   includeAllSeasonMatches,
  //   shouldFetch,
  //   getLocalTeamStats,
  //   idTeamSecondTeam,
  //   homeOnlySecondTeamComparative,
  //   awayOnlySecondTeamComparative,
  //   includeAllSeasonMatchesSecondTeamComparative,
  //   getVisitorTeamStats,
  //   matchesCountSecondTeamComparative,
  //   crearVisitorTeamStats,
  //   selectedSeasons,
  //   selectedSeasonsSecondTeam,
  //   positionFilterTeam1,
  //   positionFilterTeam2,
  // ]);

  //   if (loading) return <Typography>Loading...</Typography>;
  // if (error) return <Typography>Error: {error.message}</Typography>;
  // if (stats?.length === 0) return <Typography>No data available</Typography>;
  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  // const handleHomeOnlyChange = (event) => {
  //   setHomeOnly(event.target.checked);
  // };

  // const handleAwayOnlyChange = (event) => {
  //   setAwayOnly(event.target.checked);
  // };

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
  // const handleInputMatchesCountChange = (event) => {
  //   setInputMatchesCount(event.target?.value);
  // };

  // const updateMatchesCount = () => {
  //   setMatchesCount(inputMatchesCount);
  // };

  const handleIncludeAllSeasonMatches = (event) => {
    setInputChekBoxIncludeAllSeason(event);
  };

  const updateIncludeOtherSeasons = () => {
    setIncludeAllSeasonMatches(inputChekBoxIncludeAllSeason);
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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // const handleSeasonChange = (seasonId, checked) => {
  //   setSelectedSeasons((prevSelectedSeasons) =>
  //     checked
  //       ? [...prevSelectedSeasons, seasonId]
  //       : prevSelectedSeasons.filter((id) => id !== seasonId)
  //   );
  //   setUpdatedListSeasonTeam1(true);
  // };
  // const handleSeasonChangeTeam2 = (seasonId, checked) => {
  //   setSelectedSeasonsSecondTeam((prevSelectedSeasons) =>
  //     checked
  //       ? [...prevSelectedSeasons, seasonId]
  //       : prevSelectedSeasons.filter((id) => id !== seasonId)
  //   );
  //   setUpdatedListSeasonTeam2(true);
  // };

  const handleNamesChange = (names) => {
    setNameFilters(names);
  };

  // const handleAddTeamClick = () => {
  //   const teamId = prompt("Introduce el ID del equipo para agregar:");
  //   setIdTeamSecondTeam(teamId);
  //  };

  return (
    <>
      {listCurrentSeason && (
        <Typography variant="p" gutterBottom>
          {listCurrentSeason
            ? "Estadisticas generales de todos los equipos en temporadas actuales activas"
            : "Estadísticas de la Temporada"}
        </Typography>
      )}

      {/* {DESCOMENTAR PARA TRATAR TEMPORADAS} */}
      {/* {!idTeam  && (
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
      )} */}

      {/* {idTeamSecondTeam && (
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
      )} */}

      {idTeam && (
        <>
          {/* <AddMoreTeamComparative
            onSetIdTeamSecond={setIdTeamSecondTeam}
            firstTeam={stats[0]?.team}
            homeOnlySecondTeamComparative={homeOnlySecondTeamComparative}
            awayOnlySecondTeamComparative={awayOnlySecondTeamComparative}
            homeOnly={homeOnly}
            awayOnly={awayOnly}
            idSecondTeam={idSecondTeam}
          /> */}

          {/* <InfoFilterTeam
            team={stats[0]?.team}
            homeOnly={homeOnly}
            awayOnly={awayOnly}
            selectedSeasons={selectedSeasons}
            positionFilter={positionFilterTeam1}
          /> */}

          {/* {idTeamSecondTeam && (
            // <InfoFilterTeam
            //   team={stats[1]?.team}
            //   homeOnly={homeOnlySecondTeamComparative}
            //   awayOnly={awayOnlySecondTeamComparative}
            //   selectedSeasons={selectedSeasonsSecondTeam}
            //   positionFilter={positionFilterTeam2}
            // />
          )} */}
        </>
      )}
      {!idTeam && <GroupByName onNamesChange={handleNamesChange} />}
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
      <HelpIconWithModal
        title="Ayuda sobre la tabla"
        content={tableHelpContent}
      />

      { stats && statisticKeys.map((key, index) => (
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

      {/* {idTeam && (
        <ShowStatisticsMatches
          // singleTeam={singleTeam}

          idHomeTeam={idTeam}
          idAwayTeam={idTeamSecondTeam}
        />
      )} */}
    </>
  );
};
