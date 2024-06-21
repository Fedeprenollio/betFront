/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
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
} from "@mui/material";
import { median } from "simple-statistics";
import { BACKEND_URL_BASE } from "../../../stores/url_base";
import { EnhancedTableHead } from "./EnhancedTableHead";
import { CheckboxLocalVisitor } from "./CheckboxLocalVisitor";
import { MatchesCountInput } from "./MatchesCountInput";
import LoadingSpinner from "../../../componts/loading/LoadingSpinner";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
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
  includeOtherSeasons
) => {
  if (includeOtherSeasons) {
    const response = await axios.get(
      `${BACKEND_URL_BASE}/match/stats?statistics=goals,offsides,yellowCards,corners,shots,shotsOnTarget&matchesCount=${matchesCount}&homeOnly=${homeOnly}&awayOnly=${awayOnly}`
    );
    return response.data;
  } else {
    const response = await axios.get(
      `${BACKEND_URL_BASE}/match/stats?season=${seasonId}&statistics=goals,offsides,yellowCards,corners,shots,shotsOnTarget&matchesCount=${matchesCount}&homeOnly=${homeOnly}&awayOnly=${awayOnly}`
    );
    return response.data;
  }
};

// const descendingComparator = (a, b, orderBy) => {
//   if (b[orderBy] < a[orderBy]) return -1;
//   if (b[orderBy] > a[orderBy]) return 1;
//   return 0;
// };

const descendingComparator = (a, b, orderBy) => {
  let valueA, valueB;

  switch (orderBy) {
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
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
};

const renderTable = (
  stats,
  statisticKey,
  matchesType,
  order,
  orderBy,
  onRequestSort,
  loading
) => {
  const exampleTeamStats = stats[0]?.stats[statisticKey][matchesType];
  const overRangesKeys = exampleTeamStats
    ? Object.keys(exampleTeamStats.overRanges)
    : [];
  const underRangesKeys = exampleTeamStats
    ? Object.keys(exampleTeamStats.underRanges)
    : [];

  const rows = stats.map(({ team, stats }) => {
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

  return (
    <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
      <Table stickyHeader size="small">
        <EnhancedTableHead
          order={order}
          orderBy={orderBy}
          onRequestSort={onRequestSort}
          matchesType={matchesType}
          overRangesKeys={overRangesKeys}
          underRangesKeys={underRangesKeys}
          rows={rows}
        />

        {!loading ? (
          <TableBody>
            {stableSort(rows, getComparator(order, orderBy)).map(
              (row, index) => (
                <StyledTableRow key={index}>
                  <TableCell>{row.team.country}</TableCell>
                  <TableCell
                    style={{
                      width: "100px",
                      position: "sticky",
                      top: 0,
                      left: 0,
                      backgroundColor: "#fff",
                      zIndex: 2,
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
                        ? row.totalScored / row.matchesTotalFinished
                        : 0}
                    </TableCell>
                  )}
                  {matchesType === "received" && (
                    <TableCell>
                      {row.matchesTotalFinished !== 0
                        ? row.totalReceived / row.matchesTotalFinished
                        : 0}
                    </TableCell>
                  )}
                  {matchesType === "total" && (
                    <TableCell>
                      {row.matchesTotalFinished !== 0
                        ? (row.totalScored + row.totalReceived) /
                          row.matchesTotalFinished
                        : 0}
                    </TableCell>
                  )}
                  <TableCell>{row.medianValue}</TableCell>
                  {overRangesKeys.map((rangeKey) => {
                    //   console.log("row[`over-${rangeKey}`]",row[`over-${rangeKey}`])
                    return (
                      <TableCell key={`over-${rangeKey}-${index}`}>
                        {row[`over-${rangeKey}`]?.percentage}
                      </TableCell>
                    );
                  })}
                  {filteredUnderRangesKeys.map((rangeKey) => (
                    <TableCell key={`under-${rangeKey}-${index}`}>
                      {row[`under-${rangeKey}`]?.percentage}
                    </TableCell>
                  ))}
                </StyledTableRow>
              )
            )}
          </TableBody>
        ) : (
          <LoadingSpinner />
        )}
      </Table>
    </TableContainer>
  );
};

const TabPanel = ({ children, value, index }) => (
  <div role="tabpanel" hidden={value !== index}>
    {value === index && <Box p={3}>{children}</Box>}
  </div>
);

export const RangePercentageTable = () => {
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
  const [includeOtherSeasons, setIncludeOtherSeasons] = useState(false);

  useEffect(() => {
    const loadStats = async () => {
      try {
        setLoading(true);
        const data = await fetchTeamStats(
          seasonId,
          homeOnly,
          awayOnly,
          matchesCount,
          includeOtherSeasons
        );
        setStats(data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    loadStats();
  }, [seasonId, homeOnly, awayOnly, matchesCount,includeOtherSeasons]);
  console.log("stats", stats);

  //   if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error: {error.message}</Typography>;
  if (stats.length === 0) return <Typography>No data available</Typography>;
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
  ];
  const handleInputMatchesCountChange = (event) => {
    setInputMatchesCount(event.target?.value);
  };

  const updateMatchesCount = () => {
    console.log("matchesCount", matchesCount);
    console.log("inputMatchesCount", inputMatchesCount);

    setMatchesCount(inputMatchesCount);
  };

 

  const updateIncludeOtherSeasons = () => {
    setIncludeOtherSeasons(!includeOtherSeasons);
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Estadísticas de la Temporada
      </Typography>
      <CheckboxLocalVisitor
        homeOnly={homeOnly}
        awayOnly={awayOnly}
        handleHomeOnlyChange={handleHomeOnlyChange}
        handleAwayOnlyChange={handleAwayOnlyChange}
      />
      <MatchesCountInput
        inputMatchesCount={inputMatchesCount}
        handleInputMatchesCountChange={handleInputMatchesCountChange}
        updateMatchesCount={updateMatchesCount}
        updateIncludeOtherSeasons={updateIncludeOtherSeasons}
      />
      <Tabs value={tabIndex} onChange={handleTabChange} aria-label="stat-tabs">
        {statisticKeys.map((key, index) => (
          <Tab label={key.charAt(0).toUpperCase() + key.slice(1)} key={key} />
        ))}
      </Tabs>

      {statisticKeys.map((key, index) => (
        <TabPanel value={tabIndex} index={index} key={key}>
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
            loading
          )}
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
            loading
          )}
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
            loading
          )}
        </TabPanel>
      ))}
    </div>
  );
};
