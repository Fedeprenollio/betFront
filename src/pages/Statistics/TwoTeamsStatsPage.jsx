/* eslint-disable react/prop-types */
import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const getDisplayName = (key, statsLessThan) => {
  const stringType = statsLessThan ? "menos" : "más";

  const displayNames = {
    few: `Partidos con ${stringType} de 4.5`,
    many: `Partidos con ${stringType} de ...`,
    matchesTotalFinished: "Partidos finalizados contados",
    matchesWith0_5: `Partidos con 0.5 o ${stringType}`,
    matchesWith1_5: `Partidos con 1.5 o ${stringType}`,
    matchesWith2_5: `Partidos con 2.5 o ${stringType}`,
    matchesWith3_5: `Partidos con 3.5 o ${stringType}`,
    matchesWith4_5: `Partidos con 4.5 o ${stringType}`,
    matchesWith5_5: `Partidos con 5.5 o ${stringType}`,
    matchesWith6_5: `Partidos con 6.5 o ${stringType}`,
    matchesWith7_5: `Partidos con 7.5 o ${stringType}`,
    matchesWith8_5: `Partidos con 8.5 o ${stringType}`,
    matchesWith9_5: `Partidos con 9.5 o ${stringType}`,
    matchesWith10_5: `Partidos con 10.5 o ${stringType}`,
    matchesWith11_5: `Partidos con 11.5 o ${stringType}`,
    matchesWith12_5: `Partidos con 12.5 o ${stringType}`,
    matchesWith13_5: `Partidos con 13.5 o ${stringType}`,
    matchesWith14_5: `Partidos con 14.5 o ${stringType}`,
    matchesWith15_5: `Partidos con 15.5 o ${stringType}`,
    matchesWith16_5: `Partidos con 16.5 o ${stringType}`,
    matchesWith17_5: `Partidos con 17.5 o ${stringType}`,
    matchesWith18_5: `Partidos con 18.5 o ${stringType}`,
    matchesWith19_5: `Partidos con 19.5 o ${stringType}`,
    matchesWith20_5: `Partidos con 20.5 o ${stringType}`,
    matchesWith21_5: `Partidos con 21.5 o ${stringType}`,
    matchesWith22_5: `Partidos con 22.5 o ${stringType}`,
    matchesWith23_5: `Partidos con 23.5 o ${stringType}`,
    matchesWith24_5: `Partidos con 24.5 o ${stringType}`,
    matchesWith25_5: `Partidos con 25.5 o ${stringType}`,
    matchesWith26_5: `Partidos con 26.5 o ${stringType}`,
    matchesWith27_5: `Partidos con 27.5 o ${stringType}`,
    matchesWith28_5: `Partidos con 28.5 o ${stringType}`,
    matchesWith29_5: `Partidos con 29.5 o ${stringType}`,
    matchesWith30_5: `Partidos con 30.5 o ${stringType}`,
  };

  return displayNames[key] || key;
};

const TwoTeamsStatsPage = ({ homeStats, awayStats, statsLessThan }) => {
  if (!homeStats || !awayStats) {
    return null;
  }

  const homeFilteredStats = Object.keys(homeStats).filter(
    (key) => key !== "total" && key !== "matchesTotalFinished"
  );

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Estadística</TableCell>
            <TableCell align="right">Local</TableCell>
            <TableCell align="right">Visitante</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {homeFilteredStats.map((key) => (
            <TableRow key={key}>
              <TableCell>{getDisplayName(key, statsLessThan)}</TableCell>
              <TableCell align="right">{homeStats[key]}</TableCell>
              <TableCell align="right">{awayStats[key]}</TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell style={{ fontWeight: "bold" }}>
              Partidos contabilizados finalizados
            </TableCell>
            <TableCell style={{ fontWeight: "bold" }} align="right">
              {homeStats.matchesTotalFinished}
            </TableCell>
            <TableCell style={{ fontWeight: "bold" }} align="right">
              {awayStats.matchesTotalFinished}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TwoTeamsStatsPage;
