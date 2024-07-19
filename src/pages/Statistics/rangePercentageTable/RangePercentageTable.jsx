/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { TableRow, Typography, Tabs, Tab, Box, styled } from "@mui/material";
import { BACKEND_URL_BASE } from "../../../stores/url_base";
import { GroupByName } from "./GroupByName";
import { FilterComponent } from "../../../componts/tableFilters/FilterComponent";
import HelpIconWithModal from "../../../componts/helpIconWithModal/HelpIconWithModal";
import { renderTable } from "./renderTable";
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

const TabPanel = ({ children, value, index }) => (
  <div className="prueba" role="tabpanel" hidden={value !== index}>
    {value === index && <Box p={0.2}>{children}</Box>}
  </div>
);

export const RangePercentageTable = ({ listCurrentSeason }) => {
  const { seasonId } = useParams();
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tabIndex, setTabIndex] = useState(0);
  const [homeOnly, setHomeOnly] = useState(true);
  const [awayOnly, setAwayOnly] = useState(true);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("team.country");
  const [matchesCount, setMatchesCount] = useState(0);
  const [inputMatchesCount, setInputMatchesCount] = useState(0);
  const [includeAllSeasonMatches, setIncludeAllSeasonMatches] = useState(false);
  const [inputChekBoxIncludeAllSeason, setInputChekBoxIncludeAllSeason] =
    useState(false);
  // const [filters, setFilters] = useState({});
  // const [filters, setFilters] = useState({
  //   goals: {},
  //   corners: {},
  //   shots: {},
  //   shotsOnTarget:{},
  //   offsides:{},
  //   possession:{},
  //   yellowCards:{}
  // });
  const [filters, setFilters] = useState({
    goals: {
      scored: {},
      received: {}
    },
    corners: {
      scored: {},
      received: {}
    },
    shots: {
      scored: {},
      received: {}
    },
    shotsOnTarget: {
      scored: {},
      received: {}
    },
    possession: {
      scored: {},
      received: {}
    },
    offsides: {
      scored: {},
      received: {}
    },
    yellowCards: {
      scored: {},
      received: {}
    }
  });
  
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [selectedSeasons, setSelectedSeasons] = useState([]);
  const [shouldFetch, setShouldFetch] = useState(true);
  const [nameFilters, setNameFilters] = useState([]);

  const [specificFilters, setSpecificFilters] = useState({});

  useEffect(() => {
    // Parse listCurrentSeason to an array of seasons if it's not empty
    if (listCurrentSeason) {
      const seasonsArray = listCurrentSeason
        .split(",")
        .map((season) => season.trim());
      setSelectedSeasons(seasonsArray);
    }
  }, [listCurrentSeason]);

  useEffect(() => {
    if (shouldFetch) {
      const loadStats = async () => {
        try {
          setLoading(true);
          let data;
          if (seasonId && !listCurrentSeason) {
            data = await fetchTeamStats(
              seasonId,
              homeOnly,
              awayOnly,
              matchesCount,
              includeAllSeasonMatches
            );
            console.log("DATA1", data);
          } else if (listCurrentSeason && selectedSeasons.length > 0) {
            const selectedSeasonsString = selectedSeasons.join(",");
            console.log("selectedSeasonsString", selectedSeasonsString);
            data = await fetchTeamStats(
              selectedSeasonsString,
              homeOnly,
              awayOnly,
              matchesCount,
              includeAllSeasonMatches
            );
            console.log("DATA", data);
          }
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
    selectedSeasons,
    listCurrentSeason,
    shouldFetch,
  ]);

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
    console.log("property",property)
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
    console.log("event", event);
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
    console.log("handleFilterChange",statisticKey, matchType, newFilter)

    setFilters((prevFilters) => ({
      ...prevFilters,
      [statisticKey]: {
        ...prevFilters[statisticKey],
        [matchType]: newFilter
      }
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
  const tableHelpContent = (
    <Box>
      <Typography variant="subtitle1" gutterBottom>
        En estas tablas, se muestran los porcentajes de partidos por encima o
        debajo del valor indicado en cada columna:
      </Typography>
      <Typography variant="body1" component="ul" gutterBottom>
        <li>
          <strong>O8.5/9.5/10.5:</strong> Porcentaje de partidos por encima de
          la línea (8.5, 9.5, 10.5).
        </li>
        <Typography variant="body2" gutterBottom>
          Un valor del 80% en la columna de O1.5 significa que en el 80% de los
          partidos evaluados, el equipo superó la marca de 1.5 goles, corners,
          tiros al arco, etc.
        </Typography>
        <li>
          <strong>U8.5/9.5/10.5:</strong> Porcentaje de partidos por debajo de
          la línea (8.5, 9.5, 10.5).
        </li>
        <Typography variant="body2" gutterBottom>
          Un valor del 60% en la columna de U3.5 significa que en el 60% de los
          partidos evaluados, el equipo estuvo por debajo de la marca de 3.5
          goles, corners, tiros al arco, etc.
        </Typography>
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Utilidad en Apuestas Deportivas:
      </Typography>
      <Typography variant="body1" gutterBottom>
        Estas estadísticas son útiles , ya que permiten identificar patrones y
        tendencias en el rendimiento de los equipos. Por ejemplo, si un equipo
        tiene un alto porcentaje en O8.5, significa que es más probable que los
        partidos de ese equipo tengan muchos corners, lo cual puede ser
        información valiosa al realizar apuestas.
      </Typography>
      <Typography variant="body1" gutterBottom>
        Puedes combinar estas estadísticas con filtros para considerar solo
        partidos de local, visitante o ambos. Además, limitar el número de
        partidos para ver la tendencia reciente o, si estamos al inicio de la
        temporada, incluir también la temporada anterior.
      </Typography>
    </Box>
  );
  const formattedStats = stats?.map((teamData) => ({
    team: teamData.team,
    stats: teamData.stats?.["goals"],
  }));
  console.log("formattedStats", formattedStats);
  return (
    <>
      {listCurrentSeason && (
        <Typography variant="p" gutterBottom>
          {listCurrentSeason
            ? "Estadisticas generales de todos los equipos en temporadas actuales activas"
            : "Estadísticas de la Temporada"}
        </Typography>
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
    </>
  );
};
