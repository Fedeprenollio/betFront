import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Paper,
} from "@mui/material";
import axios from "axios";
import { BACKEND_URL_BASE } from "../../stores/url_base";

const RefereeStatisticsTable = () => {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("name");
  const [referees, setReferees] = useState([]);

  useEffect(() => {
    const fetchRefereeStatistics = async () => {
      try {
        const response = await axios.get(
          `${BACKEND_URL_BASE}/referees/statistics`
        );
        setReferees(response.data);
      } catch (error) {
        console.error("Error fetching referee statistics:", error);
      }
    };

    fetchRefereeStatistics();
  }, []);

 const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const getComparator = (order, orderBy) => {
    return order === "desc"
      ? (a, b) => compare(a, b, orderBy, -1)
      : (a, b) => compare(a, b, orderBy, 1);
  };

  const compare = (a, b, orderBy, multiplier) => {
    if (orderBy.includes('.')) {
      const [mainKey, subKey] = orderBy.split('.');
      if (a[mainKey] && b[mainKey]) {
        return (a[mainKey][subKey] < b[mainKey][subKey] ? -1 : 1) * multiplier;
      }
    } else {
      return (a[orderBy] < b[orderBy] ? -1 : 1) * multiplier;
    }
    return 0;
  };

  const sortReferees = (referees, comparator) => {
    const stabilizedReferees = referees.map((ref, index) => [ref, index]);
    stabilizedReferees.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedReferees.map((el) => el[0]);
  };
  const sortedReferees = sortReferees(referees, getComparator(order, orderBy));
console.log("sortedReferees",sortedReferees)
  return (
    <TableContainer component={Paper}>
      <Table>
      <TableHead>
          <TableRow>
            <TableCell>
              <TableSortLabel
                active={orderBy === "name"}
                direction={orderBy === "name" ? order : "asc"}
                onClick={() => handleRequestSort("name")}
              >
                Árbitro
              </TableSortLabel>
            </TableCell>
            <TableCell align="right">
              <TableSortLabel
                active={orderBy === "totalMatches"}
                direction={orderBy === "totalMatches" ? order : "asc"}
                onClick={() => handleRequestSort("totalMatches")}
              >
                PD
              </TableSortLabel>
            </TableCell>
            <TableCell align="right">
              <TableSortLabel
                active={orderBy === "totalFoulsHome"}
                direction={orderBy === "totalFoulsHome" ? order : "asc"}
                onClick={() => handleRequestSort("totalFoulsHome")}
              >
                Faltas Local
              </TableSortLabel>
            </TableCell>
            <TableCell align="right">
              <TableSortLabel
                active={orderBy === "foulsHomeStats.mean"}
                direction={orderBy === "foulsHomeStats.mean" ? order : "asc"}
                onClick={() => handleRequestSort("foulsHomeStats.mean")}
              >
                Media Faltas Local
              </TableSortLabel>
            </TableCell>
            <TableCell align="right">
              <TableSortLabel
                active={orderBy === "foulsHomeStats.median"}
                direction={orderBy === "foulsHomeStats.median" ? order : "asc"}
                onClick={() => handleRequestSort("foulsHomeStats.median")}
              >
                Mediana Faltas Local
              </TableSortLabel>
            </TableCell>
            <TableCell align="right">
              <TableSortLabel
                active={orderBy === "foulsHomeStats.stdDev"}
                direction={orderBy === "foulsHomeStats.stdDev" ? order : "asc"}
                onClick={() => handleRequestSort("foulsHomeStats.stdDev")}
              >
                DE Faltas Local
              </TableSortLabel>
            </TableCell>

            <TableCell align="right">
              <TableSortLabel
                active={orderBy === "totalFoulsAway"}
                direction={orderBy === "totalFoulsAway" ? order : "asc"}
                onClick={() => handleRequestSort("totalFoulsAway")}
              >
                Faltas Visitante
              </TableSortLabel>
            </TableCell>
            <TableCell align="right">
              <TableSortLabel
                active={orderBy === "foulsAwayStats.mean"}
                direction={orderBy === "foulsAwayStats.mean" ? order : "asc"}
                onClick={() => handleRequestSort("foulsAwayStats.mean")}
              >
                Media Faltas Visitante
              </TableSortLabel>
            </TableCell>
            <TableCell align="right">
              <TableSortLabel
                active={orderBy === "foulsAwayStats.median"}
                direction={orderBy === "foulsAwayStats.median" ? order : "asc"}
                onClick={() => handleRequestSort("foulsAwayStats.median")}
              >
                Mediana Faltas Visitante
              </TableSortLabel>
            </TableCell>
            <TableCell align="right">
              <TableSortLabel
                active={orderBy === "foulsAwayStats.stdDev"}
                direction={orderBy === "foulsAwayStats.stdDev" ? order : "asc"}
                onClick={() => handleRequestSort("foulsAwayStats.stdDev")}
              >
                DE Faltas Visitante
              </TableSortLabel>
            </TableCell>

            <TableCell align="right">
              <TableSortLabel
                active={orderBy === "totalYellowCardsHome"}
                direction={orderBy === "totalYellowCardsHome" ? order : "asc"}
                onClick={() => handleRequestSort("totalYellowCardsHome")}
              >
                Amarillas Local
              </TableSortLabel>
            </TableCell>
            <TableCell align="right">
              <TableSortLabel
                active={orderBy === "yellowCardsHomeStats.mean"}
                direction={orderBy === "yellowCardsHomeStats.mean" ? order : "asc"}
                onClick={() => handleRequestSort("yellowCardsHomeStats.mean")}
              >
                Media Amarillas Local
              </TableSortLabel>
            </TableCell>
            <TableCell align="right">
              <TableSortLabel
                active={orderBy === "yellowCardsHomeStats.median"}
                direction={orderBy === "yellowCardsHomeStats.median" ? order : "asc"}
                onClick={() => handleRequestSort("yellowCardsHomeStats.median")}
              >
                Mediana Amarillas Local
              </TableSortLabel>
            </TableCell>
            <TableCell align="right">
              <TableSortLabel
                active={orderBy === "yellowCardsHomeStats.stdDev"}
                direction={orderBy === "yellowCardsHomeStats.stdDev" ? order : "asc"}
                onClick={() => handleRequestSort("yellowCardsHomeStats.stdDev")}
              >
                DE Amarillas Local
              </TableSortLabel>
            </TableCell>

            <TableCell align="right">
              <TableSortLabel
                active={orderBy === "totalYellowCardsAway"}
                direction={orderBy === "totalYellowCardsAway" ? order : "asc"}
                onClick={() => handleRequestSort("totalYellowCardsAway")}
              >
                Amarillas Visitante
              </TableSortLabel>
            </TableCell>
            <TableCell align="right">
              <TableSortLabel
                active={orderBy === "yellowCardsAwayStats.mean"}
                direction={orderBy === "yellowCardsAwayStats.mean" ? order : "asc"}
                onClick={() => handleRequestSort("yellowCardsAwayStats.mean")}
              >
                Media Amarillas Visitante
              </TableSortLabel>
            </TableCell>
            <TableCell align="right">
              <TableSortLabel
                active={orderBy === "yellowCardsAwayStats.median"}
                direction={orderBy === "yellowCardsAwayStats.median" ? order : "asc"}
                onClick={() => handleRequestSort("yellowCardsAwayStats.median")}
              >
                Mediana Amarillas Visitante
              </TableSortLabel>
            </TableCell>
            <TableCell align="right">
              <TableSortLabel
                active={orderBy === "yellowCardsAwayStats.stdDev"}
                direction={orderBy === "yellowCardsAwayStats.stdDev" ? order : "asc"}
                onClick={() => handleRequestSort("yellowCardsAwayStats.stdDev")}
              >
                DE Amarillas Visitante
              </TableSortLabel>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedReferees.map((referee) => (
            <TableRow key={referee.refereeId}>
              <TableCell>{referee.name}</TableCell>
              <TableCell align="right">{referee.totalMatches}</TableCell>

              <TableCell align="right">{referee.totalFoulsHome}</TableCell>
              <TableCell align="right">
                {referee.foulsHomeStats.mean.toFixed(2)}
              </TableCell>
              <TableCell align="right">
                {referee.foulsHomeStats.median.toFixed(2)}
              </TableCell>
              <TableCell align="right">
                {referee.foulsHomeStats.stdDev.toFixed(2)}
              </TableCell>

              <TableCell align="right">{referee.totalFoulsAway}</TableCell>
              <TableCell align="right">
                {referee.foulsAwayStats.mean.toFixed(2)}
              </TableCell>
              <TableCell align="right">
                {referee.foulsAwayStats.median.toFixed(2)}
              </TableCell>
              <TableCell align="right">
                {referee.foulsAwayStats.stdDev.toFixed(2)}
              </TableCell>

              <TableCell align="right">
                {referee.totalYellowCardsHome}
              </TableCell>
              <TableCell align="right">
                {referee.yellowCardsHomeStats.mean.toFixed(2)}
              </TableCell>
              <TableCell align="right">
                {referee.yellowCardsHomeStats.median.toFixed(2)}
              </TableCell>
              <TableCell align="right">
                {referee.yellowCardsHomeStats.stdDev.toFixed(2)}
              </TableCell>

              <TableCell align="right">
                {referee.totalYellowCardsAway}
              </TableCell>
              <TableCell align="right">
                {referee.yellowCardsAwayStats.mean.toFixed(2)}
              </TableCell>
              <TableCell align="right">
                {referee.yellowCardsAwayStats.median.toFixed(2)}
              </TableCell>
              <TableCell align="right">
                {referee.yellowCardsAwayStats.stdDev.toFixed(2)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default RefereeStatisticsTable;
