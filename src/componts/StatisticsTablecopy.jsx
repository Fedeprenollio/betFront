/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Switch from "@mui/material/Switch"; // Importar Switch de MUI
import createTeamStatsStore from "../stores/statsStore";
import createTeamStore from "../stores/teamStore";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import "dayjs/locale/es"; // Importar la localización en español
import { useBoundStore } from "../stores";
import { useState, useEffect, useMemo } from "react";
import * as ss from "simple-statistics";
import { Label } from "@mui/icons-material";
import { FormControlLabel } from "@mui/material";

export const calculateStats = (values) => {
  console.log("VALUE", values);
  if (!Array.isArray(values)) {
    console.error("El parámetro proporcionado no es un array");
    return {};
  }
  const stats = {
    matchesTotalFinished: values?.length,
    total: ss.sum(values),
    values: values,
    mediana: ss.median(values),
    desviacion: parseFloat(ss.standardDeviation(values).toFixed(2)),
    promedio: parseFloat(ss.mean(values).toFixed(2)),
  };

  return stats;
};

export const StatsTable = ({
  homeStats,
  awayStats,
  statsLessThan,
  isAdvanced,
}) => {
  const homeFilteredStats = Object.keys(homeStats).filter(
    (key) =>
      key !== "total" &&
      key !== "matchesTotalFinished" &&
      key !== "receivedStats" &&
      key !== "values"
  );

  const awayFilteredStats = Object.keys(awayStats).filter(
    (key) =>
      key !== "total" &&
      key !== "matchesTotalFinished" &&
      key !== "receivedStats" &&
      key !== "values"
  );

  const getDisplayName = ({ key, statsLessThan, min = 4.5 }) => {
    const stringType = statsLessThan ? "menos" : "más";
    switch (key) {
      case "few":
        return `Partidos con ${stringType} de ${min}`;
      case "many":
        return `Partidos con ${stringType} de ...`;
      case "matchesTotalFinished":
        return "Partidos finalizados contados";
      case "matchesWith0_5":
        return `Partidos con 0.5 o ${stringType}`;
      case "matchesWith1_5":
        return `Partidos con 1.5 o ${stringType}`;
      case "matchesWith2_5":
        return `Partidos con 2.5 o ${stringType}`;
      case "matchesWith3_5":
        return `Partidos con 3.5 o ${stringType}`;
      case "matchesWith4_5":
        return `Partidos con 4.5 o ${stringType}`;
      case "matchesWith5_5":
        return `Partidos con 5.5 o ${stringType}`;
      case "matchesWith6_5":
        return `Partidos con 6.5 o ${stringType}`;
      case "matchesWith7_5":
        return `Partidos con 7.5 o ${stringType}`;
      case "matchesWith8_5":
        return `Partidos con 8.5 o ${stringType}`;
      case "matchesWith9_5":
        return `Partidos con 9.5 o ${stringType}`;
      case "matchesWith10_5":
        return `Partidos con 10.5 o ${stringType}`;
      case "matchesWith11_5":
        return `Partidos con 11.5 o ${stringType}`;
      case "matchesWith12_5":
        return `Partidos con 12.5 o ${stringType}`;
      case "matchesWith13_5":
        return `Partidos con 13.5 o ${stringType}`;
      case "matchesWith14_5":
        return `Partidos con 14.5 o ${stringType}`;
      case "matchesWith15_5":
        return `Partidos con 15.5 o ${stringType}`;
      case "matchesWith16_5":
        return `Partidos con 16.5 o ${stringType}`;
      case "matchesWith17_5":
        return `Partidos con 17.5 o ${stringType}`;
      case "matchesWith18_5":
        return `Partidos con 18.5 o ${stringType}`;
      case "matchesWith19_5":
        return `Partidos con 19.5 o ${stringType}`;
      case "matchesWith20_5":
        return `Partidos con 20.5 o ${stringType}`;
      case "matchesWith21_5":
        return `Partidos con 21.5 o ${stringType}`;
      case "matchesWith22_5":
        return `Partidos con 22.5 o ${stringType}`;
      case "matchesWith23_5":
        return `Partidos con 23.5 o ${stringType}`;
      case "matchesWith24_5":
        return `Partidos con 24.5 o ${stringType}`;
      case "matchesWith25_5":
        return `Partidos con 25.5 o ${stringType}`;
      case "matchesWith26_5":
        return `Partidos con 26.5 o ${stringType}`;
      case "matchesWith27_5":
        return `Partidos con 27.5 o ${stringType}`;
      case "matchesWith28_5":
        return `Partidos con 28.5 o ${stringType}`;
      case "matchesWith29_5":
        return `Partidos con 29.5 o ${stringType}`;
      case "matchesWith30_5":
        return `Partidos con 30.5 o ${stringType}`;
      default:
        return key;
    }
  };

  return (
    <>
      {homeFilteredStats.map((key) => (
        <TableRow key={key}>
          <TableCell style={{ textAlign: "center" }}>
            {homeStats[key]}
          </TableCell>
          <TableCell align="center">
            {getDisplayName({ key, statsLessThan })}
          </TableCell>
          <TableCell style={{ textAlign: "center" }}>
            {awayStats[key]}
          </TableCell>
        </TableRow>
      ))}
      {isAdvanced && (
        <TableRow>
          <TableCell
            style={{
              fontWeight: "bold",
              fontSize: "1.2rem",
              textAlign: "center",
            }}
          >
            {homeStats.matchesTotalFinished}
          </TableCell>
          <TableCell
            align="center"
            style={{ fontWeight: "bold", fontSize: "1.2rem" }}
          >
            Partidos contabilizados finalizados
          </TableCell>
          <TableCell
            style={{
              fontWeight: "bold",
              fontSize: "1.2rem",
              textAlign: "center",
            }}
          >
            <b>{awayStats.matchesTotalFinished}</b>
          </TableCell>
        </TableRow>
      )}
    </>
  );
};

export function Row({
  homeStatistics,
  awayStatistics,
  name,
  statsLessThan,
  isAdvanced,
  homeTeamName,
  awayTeamName,
  isSingle,
}) {
  const [open, setOpen] = useState(false);
  const homeCalculatedStats = useMemo(
    () => calculateStats(homeStatistics?.values),
    [homeStatistics]
  );
  const awayCalculatedStats = useMemo(
    () => calculateStats(awayStatistics?.values),
    [awayStatistics]
  );
  const homeCalculatedReceivedStats = useMemo(
    () => calculateStats(homeStatistics?.receivedStats?.values),
    [homeStatistics]
  );
  const awayCalculatedReceivedStats = useMemo(
    () => calculateStats(awayStatistics?.receivedStats?.values),
    [awayStatistics]
  );
  console.log("isSigle", isSingle);
  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="center">
          <span>{homeCalculatedStats?.total}</span> (
          <span style={{ color: "red" }}>
            {homeCalculatedReceivedStats?.total}
          </span>
          )
        </TableCell>
        <TableCell align="center" style={{ fontWeight: "bold" }}>
          <span>{homeCalculatedStats?.promedio}</span> (
          <span style={{ color: "red" }}>
            {homeCalculatedReceivedStats?.promedio}
          </span>
          )
        </TableCell>
  
        <>
          {isAdvanced && (
            <>
              <TableCell align="center">
                <span>{homeCalculatedStats?.mediana}</span> (
                <span style={{ color: "red" }}>
                  {homeCalculatedReceivedStats?.mediana}
                </span>
                )
              </TableCell>
              <TableCell align="center">
                <span>{homeCalculatedStats?.desviacion}</span> (
                <span style={{ color: "red" }}>
                  {homeCalculatedReceivedStats?.desviacion}
                </span>
                )
              </TableCell>
            </>
          )}
          <TableCell align="center">{name}</TableCell>
          {!isSingle ? (
            <>
              <TableCell align="center">
                <span>{awayCalculatedStats?.total}</span> (
                <span style={{ color: "red" }}>
                  {awayCalculatedReceivedStats?.total}
                </span>
                )
              </TableCell>
              <TableCell align="center">
                <span>{awayCalculatedStats?.promedio}</span> (
                <span style={{ color: "red" }}>
                  {awayCalculatedReceivedStats?.promedio}
                </span>
                )
              </TableCell>
              {isAdvanced && (
                <>
                  <TableCell align="center">
                    <span>{awayCalculatedStats?.mediana}</span> (
                    <span style={{ color: "red" }}>
                      {awayCalculatedReceivedStats?.mediana}
                    </span>
                    )
                  </TableCell>
                  <TableCell align="center">
                    <span>{awayCalculatedStats?.desviacion}</span> (
                    <span style={{ color: "red" }}>
                      {awayCalculatedReceivedStats?.desviacion}
                    </span>
                    )
                  </TableCell>
                </>
              )}
            </>
          ) : null}
        </>
      </TableRow>
  
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Box sx={{ margin: 1, width: "fit-content" }}>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow style={{ width: "100%" }}>
                      <TableCell align="center">Veces</TableCell>
                      <TableCell align="center"></TableCell>
                      {!isSingle && <TableCell align="center">Veces</TableCell>}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <StatsTable
                      homeStats={homeStatistics}
                      awayStats={awayStatistics}
                      statsLessThan={statsLessThan}
                      isAdvanced={isAdvanced}
                    />
                  </TableBody>
                </Table>
              </Box>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
  
}

export default function StatisticsTablecopy({
  statsLessThan,
  idHomeTeam,
  idAwayTeam,
  isSingle,
}) {
  const { getTeamDetails, teamDetails } = useBoundStore((state) => state);
  const [isAdvanced, setIsAdvanced] = useState(false); // Estado para alternar entre estadísticas simples y avanzadas
  console.log("idAwayTeam", idAwayTeam);
  useEffect(() => {
    idHomeTeam && getTeamDetails(idHomeTeam);
    idAwayTeam && getTeamDetails(idAwayTeam);
    return () => {
      getTeamDetails(null);
    };
  }, [idHomeTeam, idAwayTeam, getTeamDetails]);

  const [teamDetails1, setTeamDetails1] = useState({});
  const [teamDetails2, setTeamDetails2] = useState({});

  useEffect(() => {
    if (teamDetails) {
      idHomeTeam && setTeamDetails1(teamDetails[idHomeTeam]);
      idAwayTeam && setTeamDetails2(teamDetails[idAwayTeam]);
    }
    return () => {
      setTeamDetails1({});
      setTeamDetails2({});
    };
  }, [idHomeTeam, idAwayTeam, teamDetails]);

  const {
    homeStatYellowCard,
    awayStatYellowCard,
    homeStatGoals,
    homeStatCorners,
    awayStatCorners,
    awayStatGoals,
    homeStatShots,
    homeStatShotsOnTarget,
    homeStatPossession,
    homeStatFouls,
    homeStatOffsides,
    awayStatShots,
    awayStatShotsOnTarget,
    awayStatPossession,
    awayStatFouls,
    awayStatOffsides,
  } = useBoundStore((state) => state);
  console.log("homeStatYellowCard", homeStatYellowCard.yellowCards);
  console.log("awayStatShotsOnTarget", homeStatShotsOnTarget);
  const data = [
    {
      homeStatistics: homeStatGoals,
      awayStatistics: awayStatGoals || null,
      name: "Goles",
      statsLessThan,
    },
    {
      homeStatistics: homeStatCorners,
      awayStatistics: awayStatCorners || null,
      name: "Corners",
      statsLessThan,
    },
    {
      homeStatistics: homeStatYellowCard.yellowCards,
      awayStatistics: awayStatYellowCard || null,
      name: "Tarjetas Amarillas",
      statsLessThan,
    },
    {
      homeStatistics: homeStatShots,
      awayStatistics: awayStatShots || null,
      name: "Disparos",
      statsLessThan,
    },
    {
      homeStatistics: homeStatShotsOnTarget,
      awayStatistics: awayStatShotsOnTarget || null,
      name: "Disparos al Arco",
      statsLessThan,
    },
    {
      homeStatistics: homeStatPossession,
      awayStatistics: awayStatPossession || null,
      name: "Posesión",
      statsLessThan,
    },
    {
      homeStatistics: homeStatFouls,
      awayStatistics: awayStatFouls || null,
      name: "Faltas",
      statsLessThan,
    },
    {
      homeStatistics: homeStatOffsides,
      awayStatistics: awayStatOffsides || null,
      name: "Offsides",
      statsLessThan,
    },
  ];

  return (
    <>
      <FormControlLabel
        control={
          <Switch
            checked={isAdvanced}
            onChange={() => setIsAdvanced(!isAdvanced)}
            name="isAdvanced"
            color="primary"
          />
        }
        label="Activar estadísticas avanzadas"
      />
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell />
              {isAdvanced && (
                <>
                  <TableCell />
                  <TableCell />
                </>
              )}
              <TableCell align="center">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Avatar
                    src={teamDetails1?.logoUrl}
                    alt={teamDetails1?.name}
                  />
                  <Typography
                    variant="h5"
                    style={{ fontWeight: "bold", marginLeft: "8px" }}
                  >
                    {teamDetails1?.name}
                  </Typography>
                </div>
              </TableCell>
              <TableCell />
              {idAwayTeam && (
                <TableCell align="center">
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Avatar
                      src={teamDetails2?.logoUrl}
                      alt={teamDetails2?.name}
                    />
                    <Typography
                      variant="h5"
                      style={{ fontWeight: "bold", marginLeft: "8px" }}
                    >
                      {teamDetails2?.name}
                    </Typography>
                  </div>
                </TableCell>
              )}

              <TableCell />
              <TableCell />
            </TableRow>
            <TableRow>
              <TableCell />

              <TableCell align="center">Total(Rec)</TableCell>
              <TableCell align="center">Prom(Rec)</TableCell>
              {isAdvanced && (
                <>
                  <TableCell align="center">Mediana(Rec)</TableCell>
                  <TableCell align="center">Desv(Rec)</TableCell>
                </>
              )}

              <TableCell />
              {idAwayTeam && (
                <>
                  <TableCell align="center">Total(Rec) VIS</TableCell>
                  <TableCell align="center">Prom(Rec)</TableCell>
                  {isAdvanced && (
                    <>
                      <TableCell align="center">Mediana(Rec)</TableCell>
                      <TableCell align="center">Desv(Rec)</TableCell>
                    </>
                  )}
                </>
              )}
            </TableRow>
          </TableHead>

          <TableBody>
            {data.map((stat) => (
              <Row
                key={stat.name}
                homeStatistics={stat.homeStatistics}
                awayStatistics={stat.awayStatistics}
                isSingle={isSingle}
                name={stat.name}
                statsLessThan={stat.statsLessThan}
                isAdvanced={isAdvanced}
                homeTeamName={teamDetails1?.name}
                awayTeamName={teamDetails2?.name}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
