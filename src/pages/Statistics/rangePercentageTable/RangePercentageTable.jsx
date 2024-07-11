/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Typography,
  Tabs,
  Tab,
  Box,
  styled,
  TablePagination,
  Modal,
  Button,
  IconButton,
} from "@mui/material";
import { median } from "simple-statistics";
import { BACKEND_URL_BASE } from "../../../stores/url_base";
import { EnhancedTableHead } from "./EnhancedTableHead";
import { CheckboxLocalVisitor } from "./CheckboxLocalVisitor";
import { MatchesCountInput } from "./MatchesCountInput";
import LoadingSpinner from "../../../componts/loading/LoadingSpinner";
import { SelectListCurrentSeasons } from "./SelectListCurrentSeasons";
import CloseIcon from "@mui/icons-material/Close";
import { GroupByName } from "./GroupByName";
import { FilterComponent } from "../../../componts/tableFilters/FilterComponent";
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
// 664acc7b81ee69cfdd0b068d
// 664acd3b81ee69cfdd0b06ca
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

const descendingComparator = (a, b, orderBy) => {
  let valueA, valueB;
  switch (orderBy) {
    case "total":
      valueA = a.team?.totalScored ? a.team.totalScored.toLowerCase() : "";
      valueB = b.team?.totalScored ? b.team.totalScored.toLowerCase() : "";
      break;
    case "team.country":
      valueA = a.team?.country ? a.team.country.toLowerCase() : "";
      valueB = b.team?.country ? b.team.country.toLowerCase() : "";
      break;
    case "team.name":
      valueA = a.team?.name ? a.team.name.toLowerCase() : "";
      valueB = b.team?.name ? b.team.name.toLowerCase() : "";
      break;
    case "mediaFavor":
      valueA =
        a.matchesTotalFinished !== 0
          ? a.totalScored / a.matchesTotalFinished
          : 0;
      valueB =
        b.matchesTotalFinished !== 0
          ? b.totalScored / b.matchesTotalFinished
          : 0;
      break;
    case "mediaContra":
      valueA =
        a.matchesTotalFinished !== 0
          ? a.totalReceived / a.matchesTotalFinished
          : 0;
      valueB =
        b.matchesTotalFinished !== 0
          ? b.totalReceived / b.matchesTotalFinished
          : 0;
      break;
    case "mediaTotal":
      valueA =
        a.matchesTotalFinished !== 0
          ? (a.totalScored + a.totalReceived) / a.matchesTotalFinished
          : 0;
      valueB =
        b.matchesTotalFinished !== 0
          ? (b.totalScored + b.totalReceived) / b.matchesTotalFinished
          : 0;
      break;
    default:
      valueA =
        orderBy.includes("over-") || orderBy.includes("under-")
          ? a[orderBy]?.percentage || 0
          : a[orderBy] || 0;
      valueB =
        orderBy.includes("over-") || orderBy.includes("under-")
          ? b[orderBy]?.percentage || 0
          : b[orderBy] || 0;
  }

  if (valueB < valueA) return -1;
  if (valueB > valueA) return 1;
  return 0;
};

const getComparator = (order, orderBy) =>
  order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);

const stableSort = (array, comparator) => {
  const stabilizedThis = array?.map((el, index) => [el, index]);
  stabilizedThis?.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis?.map((el) => el[0]);
};

const renderTable = (
  stats,
  statisticKey,
  matchesType,
  order,
  orderBy,
  onRequestSort,
  loading,
  filters,
  handleFilterChange,
  page,
  rowsPerPage,
  handleChangePage,
  handleChangeRowsPerPage,
  nameFilters 
) => {
  const exampleTeamStats = stats
    ? stats[0]?.stats[statisticKey][matchesType]
    : null;
  const overRangesKeys = exampleTeamStats
    ? Object.keys(exampleTeamStats.overRanges)
    : [];
  const underRangesKeys = exampleTeamStats
    ? Object.keys(exampleTeamStats.underRanges)
    : [];

  const rows = stats?.map(({ team, stats }) => {
    const matchesTotalFinished =
      stats[statisticKey][matchesType]?.values?.length || 0;
    const totalScored = stats[statisticKey][matchesType]?.total || 0;
    const totalReceived = stats[statisticKey][matchesType]?.total || 0;
    const values = stats[statisticKey][matchesType]?.values || [];
    const medianValue = values.length > 0 ? median(values) : 0;

    const percentages = overRangesKeys.reduce((acc, key) => {
      acc[`over-${key}`] = stats[statisticKey][matchesType].overRanges[key];
      return acc;
    }, {});

    const underPercentages = underRangesKeys.reduce((acc, key) => {
      acc[`under-${key}`] = stats[statisticKey][matchesType].underRanges[key];
      return acc;
    }, {});

    return {
      team,
      matchesTotalFinished,
      totalScored,
      totalReceived,
      medianValue,
      ...percentages,
      ...underPercentages,
    };
  });

  // Filtrar las claves de underRangesKeys que tienen valores no null en las filas de datos
  const filteredUnderRangesKeys = underRangesKeys.filter((key) => {
    return rows.some((row) => row[`under-${key}`] !== null);
  });


  // Función para filtrar las filas basado en los filtros aplicados
  const filterRows = (rows, filters,nameFilters ) => {
    return rows?.filter((row) => {
  // Apply name filters
      if (nameFilters.length > 0 && !nameFilters.includes(row.team.name)) {
        return false;
      }

      for (let filterKey in filters) {
        // eslint-disable-next-line no-prototype-builtins
        if (filters.hasOwnProperty(filterKey)) {
          const [type, range, limit] = filterKey.split("-");
          const filterValue = parseFloat(filters[filterKey]);

          if (isNaN(filterValue)) {
            continue;
          }

          const rowKey = `${type}-${range}`;
          const rowValue = row[rowKey]?.percentage;

          if (rowValue === undefined || rowValue === null || isNaN(rowValue)) {
            return false;
          }

          if (limit === "from" && type === "over" && rowValue < filterValue) {
            return false;
          }

          if (limit === "to" && type === "over" && rowValue > filterValue) {
            return false;
          }

          if (limit === "from" && type === "under" && rowValue < filterValue) {
            return false;
          }

          if (limit === "to" && type === "under" && rowValue > filterValue) {
            return false;
          }
        }
      }
      return true;
    });
  };

  // Aplicar filtrado a las filas basado en los filtros actuales
  let filteredRows = filterRows(rows, filters,nameFilters);

  // Ordenar las filas según el orden y el criterio de orden
  filteredRows = stableSort(filteredRows, getComparator(order, orderBy));

  // Aplicar paginación a las filas filtradas y ordenadas
  const paginatedRows = filteredRows?.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <TableContainer
      component={Paper}
      sx={{ maxHeight: 840 }}
      style={{ overflowX: "auto" }}
    >
      <Table stickyHeader size="small">
        <EnhancedTableHead
          order={order}
          orderBy={orderBy}
          onRequestSort={onRequestSort}
          matchesType={matchesType}
          overRangesKeys={overRangesKeys}
          underRangesKeys={underRangesKeys}
          rows={rows}
          onFilterChange={handleFilterChange}
        />

        {!loading ? (
          <TableBody>
            {paginatedRows?.map((row, index) => (
              <StyledTableRow key={index}>
                <TableCell>{row.team.league}</TableCell>
                <TableCell
                  style={{
                    width: "100px",
                    position: "sticky",
                    top: 0,
                    left: 0,
                    backgroundColor: "#fff",
                    zIndex: 1,
                  }}
                >
                  {row.team.name}
                </TableCell>
                <TableCell>{row.matchesTotalFinished}</TableCell>
                <TableCell>
                  {matchesType === "scored"
                    ? row.totalScored
                    : row.totalReceived}
                </TableCell>
                {matchesType === "scored" && (
                  <TableCell>
                    {row.matchesTotalFinished !== 0
                      ? (row.totalScored / row.matchesTotalFinished).toFixed(1)
                      : 0}
                  </TableCell>
                )}
                {matchesType === "received" && (
                  <TableCell>
                    {row.matchesTotalFinished !== 0
                      ? (row.totalReceived / row.matchesTotalFinished).toFixed(2)
                      : 0}
                  </TableCell>
                )}
                {matchesType === "total" && (
                  <TableCell>
                    {row.matchesTotalFinished !== 0
                      ? ((row.totalScored + row.totalReceived) /
                        row.matchesTotalFinished).toFixed(2)
                      : 0}
                  </TableCell>
                )}
                <TableCell>{row.medianValue}</TableCell>
                {overRangesKeys.map((rangeKey) => (
                  <TableCell key={`over-${rangeKey}-${index}`}>
                    {row[`over-${rangeKey}`]?.percentage}
                  </TableCell>
                ))}
                {filteredUnderRangesKeys.map((rangeKey) => (
                  <TableCell key={`under-${rangeKey}-${index}`}>
                    {row[`under-${rangeKey}`]?.percentage}
                  </TableCell>
                ))}
              </StyledTableRow>
            ))}
          </TableBody>
        ) : (
          <LoadingSpinner />
        )}
      </Table>
      <TablePagination
        rowsPerPageOptions={[10, 20, 30]}
        component="div"
        count={filteredRows?.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
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
  const [filters, setFilters] = useState({});
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [selectedSeasons, setSelectedSeasons] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [shouldFetch, setShouldFetch] = useState(true);
  const [nameFilters, setNameFilters] = useState([]);

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
  //   if (seasonId && !selectedSeasons) {
  //     const loadStats = async () => {
  //       try {
  //         setLoading(true);
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

  //   if (!seasonId && selectedSeasons) {
  //     const loadStats = async () => {
  //       try {
  //         setLoading(true);
  //         const data = await fetchTeamStats(
  //           selectedSeasons,
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
  //   selectedSeasons,
  // ]);
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
    shouldFetch
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

  const handleFilterChange = (newFilter) => {
    console.log("Nuevo filtro recibido", newFilter); // Añadir esta línea para depurar

    setFilters((prevFilters) => ({
      ...prevFilters,
      ...newFilter,
    }));
    // Aquí puedes agregar lógica para filtrar las filas según los nuevos filtros
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

  const handleOpenModal = () => {
    setOpenModal(true);
    setShouldFetch(false); 
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setShouldFetch(true); 
  };
  const handleNamesChange = (names) => {
    console.log("NAMES", names)
    setNameFilters(names);
  };
  return (
    <>
     { listCurrentSeason && <Typography variant="p" gutterBottom>
        {listCurrentSeason
          ? "Estadisticas generales de todos los equipos en temporadas actuales activas"
          : "Estadísticas de la Temporada"}
      </Typography>}
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
        <CheckboxLocalVisitor
          homeOnly={homeOnly}
          awayOnly={awayOnly}
          handleHomeOnlyChange={handleHomeOnlyChange}
          handleAwayOnlyChange={handleAwayOnlyChange}
        />
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
        <MatchesCountInput
          inputMatchesCount={inputMatchesCount}
          handleInputMatchesCountChange={handleInputMatchesCountChange}
          handleIncludeAllSeasonMatches={handleIncludeAllSeasonMatches}
          updateMatchesCount={updateMatchesCount}
          updateIncludeOtherSeasons={updateIncludeOtherSeasons}
          inputChekBoxIncludeAllSeason={inputChekBoxIncludeAllSeason}
          onFilterChange={handleFilterChange}
        />
      </Box> */}
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

      <GroupByName onNamesChange={handleNamesChange}/>


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

     
      {/* {listCurrentSeason && (
        <>
          <Button variant="contained" color="primary" onClick={handleOpenModal}>
            Seleccionar temporadas
          </Button>
          <Modal open={openModal} onClose={handleCloseModal}>
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "80%",
                maxWidth: 400,
                bgcolor: "background.paper",
                border: "2px solid #000",
                boxShadow: 24,
                p: 4,
              }}
            >
              <SelectListCurrentSeasons
                selectedSeasons={selectedSeasons}
                onSeasonChange={handleSeasonChange}
              />
              <IconButton
                aria-label="close"
                onClick={handleCloseModal}
                sx={{
                  position: "absolute",
                  right: 8,
                  top: 8,
                }}
              >
                <CloseIcon />
              </IconButton>
            </Box>
          </Modal>
        </>
      )} */}

      {statisticKeys.map((key, index) => (
        <TabPanel  value={tabIndex} index={index} key={key}>
          <Box
            sx={{
              border: "1px solid #ddd",
              padding: 0.3,
              marginBottom: 2,
              borderRadius: 2,
              boxShadow: 1,
              backgroundColor: "#f9f9f9"
            }}
          >
            <Typography variant="h6" gutterBottom>
              {key.charAt(0).toUpperCase() + key.slice(1)} - Marcado
            </Typography>
            {renderTable(
              stats,
              key,
              "scored",
              order,
              orderBy,
              handleRequestSort,
              loading,
              filters,
              handleFilterChange,
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
              stats,
              key,
              "received",
              order,
              orderBy,
              handleRequestSort,
              loading,
              filters,
              handleFilterChange,
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
              {key.charAt(0).toUpperCase() + key.slice(1)} - Totales
            </Typography>
            {renderTable(
              stats,
              key,
              "total",
              order,
              orderBy,
              handleRequestSort,
              loading,
              filters,
              handleFilterChange,
              page,
              rowsPerPage,
              handleChangePage,
              handleChangeRowsPerPage,
              nameFilters 
            )}
          </Box>
        </TabPanel>
      ))}
    </>
  );
};
