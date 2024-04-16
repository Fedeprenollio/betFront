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
import useTeamStatsStore from "../stores/statsStore";
import useTeamStore from "../stores/teamStore";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import "dayjs/locale/es"; // Importar la localización en español
import { styled } from '@mui/material/styles';


const StatsTable = ({ homeStats, awayStats, statsLessThan }) => {
  const homeFilteredStats = Object.keys(homeStats).filter(
    (key) => key !== "total" && key !== "matchesTotalFinished"
  );

  const awayFilteredStats = Object.keys(awayStats).filter(
    (key) => key !== "total" && key !== "matchesTotalFinished"
  );

  const getDisplayName = ({ key, statsLessThan, min = 4.5 }) => {
    //statsLessThan puede ser "menos" o "más" según buscamos "partidos con menos de "equis" cantidad de goles o más" y es un booleano
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
          <TableCell>{homeStats[key]}</TableCell>
          <TableCell align="center">
            {getDisplayName({ key, statsLessThan })}
          </TableCell>
          <TableCell align="right">{awayStats[key]}</TableCell>
        </TableRow>
      ))}
      <TableRow>
        <TableCell style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
          {homeStats.matchesTotalFinished}
        </TableCell>
        <TableCell
          align="center"
          style={{ fontWeight: "bold", fontSize: "1.2rem" }}
        >
          Partidos contabilizados finalizados
        </TableCell>
        <TableCell
          align="right"
          style={{ fontWeight: "bold", fontSize: "1.2rem" }}
        >
          {" "}
          <b>{awayStats.matchesTotalFinished}</b>
        </TableCell>
      </TableRow>
    </>
  );
};

function Row({ homeStatistics, awayStatistics, name, statsLessThan }) {
  const [open, setOpen] = React.useState(false);

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
        {/* <TableCell component="th" scope="row">
          {name}
        </TableCell> */}
        <TableCell align="center">{homeStatistics?.total}</TableCell>
        <TableCell align="center">{name}</TableCell>
        <TableCell align="center">{awayStatistics?.total}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              {/* <Typography variant="h6" gutterBottom component="div">
                History
              </Typography> */}
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Veces</TableCell>
                    <TableCell align="right">Cantidad</TableCell>
                    <TableCell align="right">Veces</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <StatsTable
                    homeStats={homeStatistics}
                    awayStats={awayStatistics}
                    statsLessThan={statsLessThan}
                  ></StatsTable>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

export default function StatisticsTablecopy({
  match,
  statsLessThan,
  idHomeTeam,
  idAwayTeam,
}) {
  const { getTeamDetails, teamDetails } = useTeamStore((state) => state);

  //Valor para definir si las estadisticas son "mas de" o "menos de", True es lessThan
  React.useEffect(() => {
    getTeamDetails(idHomeTeam);
    getTeamDetails(idAwayTeam);
    return()=>{
      getTeamDetails(null)
    }
  }, [idHomeTeam, idAwayTeam, getTeamDetails]);

  // Utilizamos los selectores para obtener los detalles de cada equipo
  const teamDetails1 = teamDetails && teamDetails[idHomeTeam];
  const teamDetails2 = teamDetails && teamDetails[idAwayTeam];
  const {
    homeStatYellowCard,
    awayStatYellowCard,
    homeStatGoals,
    homeStatCorners,
    awayStatCorners,
    awayStatGoals,
  } = useTeamStatsStore((state) => state);

  const UnderlinedTypography = styled(Typography)({
    textDecoration: 'underline',
  });
  const displayResultDate = ({ match }) => {
    dayjs.extend(localizedFormat);
    // Configurar dayjs para usar la localización en español
    dayjs.locale("es");
    const formatCustomDate = (dateString) => {
      const date = dayjs(dateString);
      const today = dayjs();

      // Comprobar si la fecha es hoy
      if (date.isSame(today, "day")) {
        return `HOY ${date.format("HH:mm")}`;
      }

      // Formatear la fecha según el formato deseado
      // return
      return (
        <>
          <UnderlinedTypography  fontWeight="bold">{date.format("dddd", { locale: "es" }).toUpperCase()}</UnderlinedTypography>
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
                <Typography
                  align="center"
                  // sx={{ display: "inline" }}
                  // component="span"
                  variant="h6"
                  color="text.primary"
                >
                  FIN
                </Typography>
              }
              secondary={
                <React.Fragment>
                  <Typography variant="h3" fontWeight="bold" align="center">
                    {`${match?.teamStatistics?.local?.goals} - ${match?.teamStatistics?.visitor?.goals}`}
                  </Typography>
                  <Typography
                    align="center"
                    // sx={{ display: "inline" }}
                    // component="span"
                    variant="h6"
                    color="text.primary"
                  >
                    {` ${match?.league?.name}`}
                  </Typography>
                </React.Fragment>
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
                <Typography
                  align="center"
                  // sx={{ display: "inline" }}
                  // component="span"
                  variant="h6"
                  color="text.primary"
                >
                  {formatCustomDate(match.date)}
                </Typography>
              }
              secondary={
                <React.Fragment>
                  <Typography
                    align="center"
                    // sx={{ display: "inline" }}
                    component="h5"
                    variant="span"
                    color="text.primary"
                  >
                    {` ${match?.league?.name}`}
                  </Typography>
                </React.Fragment>
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
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Avatar src={teamDetails1?.logoUrl} alt={teamDetails1?.name} />
                <Typography
                  variant="h5"
                  style={{ fontWeight: "bold", marginLeft: "8px" }}
                >
                  {teamDetails1?.name}
                </Typography>
              </div>
            </TableCell>
            <TableCell align="center">
              {match && displayResultDate({ match })}
            </TableCell>
            <TableCell align="center">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Avatar src={teamDetails2?.logoUrl} alt={teamDetails2?.name} />
                <Typography
                  variant="h5"
                  style={{ fontWeight: "bold", marginLeft: "8px" }}
                >
                  {teamDetails2?.name}
                </Typography>
              </div>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell />
            <TableCell align="center">Total</TableCell>
            <TableCell align="center">-</TableCell>
            <TableCell align="center">Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <Row
            homeStatistics={homeStatGoals}
            awayStatistics={awayStatGoals}
            name="Goles"
            statsLessThan={statsLessThan}
          />
          {/* <Row
            homeStatistics={homeStatistics.offsides}
            awayStatistics={awayStatistics.offsides}
            name="Offsides"
          /> */}
          <Row
            homeStatistics={homeStatYellowCard.yellowCards}
            awayStatistics={awayStatYellowCard.yellowCards}
            name="Amarillas"
            statsLessThan={statsLessThan}
          />
          <Row
            homeStatistics={homeStatCorners}
            awayStatistics={awayStatCorners}
            name="Corners"
            statsLessThan={statsLessThan}
          />

          {/* <Row
            homeStatistics={homeStatistics.redCards}
            awayStatistics={awayStatistics.redCards}
            name="Rojas"
          />
          */}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
