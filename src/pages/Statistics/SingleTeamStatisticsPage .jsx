/* eslint-disable react/prop-types */
import * as React from "react";
import {
  Box,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  Avatar,
  List,
  ListItem,
  ListItemText,
  Container,
} from "@mui/material";
import {
  KeyboardArrowDown as KeyboardArrowDownIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import "dayjs/locale/es"; // Importar la localización en español
import { useState, useEffect } from "react";
import { useBoundStore } from "../../stores";

const UnderlinedTypography = styled(Typography)({
  textDecoration: "underline",
});

const StatsTable = ({ homeStats, statsLessThan }) => {
  const homeFilteredStats = Object.keys(homeStats).filter(
    (key) => key !== "total" && key !== "matchesTotalFinished"
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
          <TableCell align="center">
            {getDisplayName({ key, statsLessThan })}
          </TableCell>
          <TableCell>{homeStats[key]}</TableCell>
        </TableRow>
      ))}
      <TableRow>
        <TableCell
          align="center"
          style={{ fontWeight: "bold", fontSize: "1.2rem" }}
        >
          Partidos contabilizados finalizados
        </TableCell>
        <TableCell style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
          {homeStats.matchesTotalFinished}
        </TableCell>
      </TableRow>
    </>
  );
};

const Row = ({ homeStatistics, name, statsLessThan }) => {
  const [open, setOpen] = useState(false);

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
        <TableCell align="center">{homeStatistics?.total}</TableCell>
        <TableCell align="center">{name}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell align="right"></TableCell>
                    <TableCell>Veces</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <StatsTable homeStats={homeStatistics} statsLessThan={statsLessThan} />
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

const StatisticsTable = ({ statsLessThan, idHomeTeam }) => {
  const { getTeamDetails, teamDetails } = useBoundStore((state) => state);
  const [teamDetails1, setTeamDetails1] = useState({});
  const {
    homeStatYellowCard,
    homeStatGoals,
    homeStatCorners,
    homeStatShots,
    awayStatShots,
    homeStatShotsOnTarget,
    awayStatShotsOnTarget,
    homeStatFouls,
    awayStatPossession,
    homeStatOffsides,
    awayStatOffsides,
    awayStatFouls,
    homeStatPossession  } = useBoundStore((state) => state);

  useEffect(() => {
    getTeamDetails(idHomeTeam);
    return () => {
      getTeamDetails(null);
    };
  }, [idHomeTeam, getTeamDetails]);

  useEffect(() => {
    if (teamDetails) {
      setTeamDetails1(teamDetails[idHomeTeam]);
    }
    return () => {
      setTeamDetails1({});
    };
  }, [idHomeTeam, teamDetails]);

  const displayResultDate = ({ match }) => {
    dayjs.extend(localizedFormat);
    dayjs.locale("es");
    const formatCustomDate = (dateString) => {
      const date = dayjs(dateString);
      const today = dayjs();
      if (date.isSame(today, "day")) {
        return `HOY ${date.format("HH:mm")}`;
      }
      return (
        <>
          <UnderlinedTypography fontWeight="bold">
            {date.format("dddd", { locale: "es" }).toUpperCase()}
          </UnderlinedTypography>
          <Typography>{date.format("DD MMM", { locale: "es" })}</Typography>
        </>
      );
    };

    if (match?.isFinished) {
      return (
        <List>
          <ListItem alignItems="flex-start">
            <ListItemText
              primary={
                <Typography align="center" variant="h6" color="text.primary">
                  FIN
                </Typography>
              }
              secondary={
                <>
                  <Typography variant="h3" fontWeight="bold" align="center">
                    {`${match?.teamStatistics?.local?.goals} - ${match?.teamStatistics?.visitor?.goals}`}
                  </Typography>
                  <Typography align="center" variant="h6" color="text.primary">
                    {` ${match?.league?.name}`}
                  </Typography>
                </>
              }
            />
          </ListItem>
        </List>
      );
    } else {
      return (
        <List>
          <ListItem alignItems="flex-start">
            <ListItemText
              primary={
                <Typography align="center" variant="h6" color="text.primary">
                  {formatCustomDate(match.date)} hola
                </Typography>
              }
              secondary={
                <Typography align="center" component="h5" variant="span" color="text.primary">
                  {` ${match?.league?.name}`} holaita
                </Typography>
              }
            />
          </ListItem>
        </List>
      );
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell align="center">
              <Container style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Avatar src={teamDetails1?.logoUrl} alt={teamDetails1?.name} />
                <Typography variant="h5" style={{ fontWeight: "bold", marginLeft: "8px" }}>
                  {teamDetails1?.name}
                </Typography>
               

              </Container>
            </TableCell>
            <TableCell />
          </TableRow>
          <TableRow>
            <TableCell />
            <TableCell align="center">Total</TableCell>
            <TableCell align="center">Descripción</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <Row
            homeStatistics={homeStatGoals}
            name="Goles"
            statsLessThan={statsLessThan}
          />
          <Row
            homeStatistics={homeStatYellowCard.yellowCards}
            name="Amarillas"
            statsLessThan={statsLessThan}
          />
          <Row
            homeStatistics={homeStatCorners}
            name="Corners"
            statsLessThan={statsLessThan}
          />
          <Row
            homeStatistics={homeStatShots}
            awayStatistics={awayStatShots}
            name="Tiros"
            statsLessThan={statsLessThan}
          />
          <Row
            homeStatistics={homeStatShotsOnTarget}
            awayStatistics={awayStatShotsOnTarget}
            name="Tiros al arco"
            statsLessThan={statsLessThan}
          />
          <Row
            homeStatistics={homeStatPossession}
            awayStatistics={awayStatPossession}
            name="Posesión"
            statsLessThan={statsLessThan}
          />
          <Row
            homeStatistics={homeStatFouls}
            awayStatistics={awayStatFouls}
            name="Faltas"
            statsLessThan={statsLessThan}
          />
          <Row
            homeStatistics={homeStatOffsides}
            awayStatistics={awayStatOffsides}
            name="Offsides"
            statsLessThan={statsLessThan}
          />
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default StatisticsTable;
