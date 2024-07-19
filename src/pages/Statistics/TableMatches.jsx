/* eslint-disable react/prop-types */
import React, { useState } from "react";
import {
  Divider,
  Grid,
  Paper,
  Typography,
  styled,
  Collapse,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import dayjs from "dayjs";

export const TableMatches = ({ teamMatches, statistic, teamDetail }) => {
  const [selectedMatch, setSelectedMatch] = useState(null);

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#52991b",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: "#ffffff",
  }));

  const getMatchResult = (homeStat, awayStat) => {
    if (homeStat > awayStat) return "G";
    if (homeStat < awayStat) return "P";
    return "E";
  };

  const formatDate = (dateString) => {
    const date = dayjs(dateString);
    const currentYear = dayjs().year();

    if (date.year() !== currentYear) {
      return date.format("DD/MM/YY");
    } else {
      return date.format("DD/MM");
    }
  };
  console.log("DETALLE DE LOS PARTIDOS;", teamMatches);
  const getResultIcon = (team, match, statistic) => {
    const isHomeTeam = match?.homeTeam?._id === team?._id;
    const homeStat = match.teamStatistics.local[statistic];
    const awayStat = match.teamStatistics.visitor[statistic];

    const matchResult = getMatchResult(homeStat, awayStat);

    if (isHomeTeam) {
      switch (matchResult) {
        case "G":
          return <CheckCircleIcon style={{ color: "green" }} />;
        case "E":
          return <RemoveCircleIcon style={{ color: "grey" }} />;
        case "P":
          return <HighlightOffIcon style={{ color: "red" }} />;
        default:
          return null;
      }
    } else {
      switch (matchResult) {
        case "G":
          return <HighlightOffIcon style={{ color: "red" }} />;
        case "E":
          return <RemoveCircleIcon style={{ color: "grey" }} />;
        case "P":
          return <CheckCircleIcon style={{ color: "green" }} />;
        default:
          return null;
      }
    }
  };

  const getNameOfCategoryStatist = (statistic) => {
    switch (statistic) {
      case "goals":
        return "Goles";
      case "corners":
        return "Corners";
      case "yellowCards":
        return "Tarjetas amarillas";
      default:
        return "Sin nombre";
    }
  };

  const handleMatchClick = (match) => {
    if (selectedMatch && selectedMatch._id === match._id) {
      setSelectedMatch(null); // Deselect if clicking the same match
    } else {
      setSelectedMatch(match);
    }
  };

  return (
    <Grid item xs={12}>
      <Item style={{ marginBottom: "0.5rem" }}>
        <Typography variant="h6" style={{ fontWeight: "bold" }}>
          {getNameOfCategoryStatist(statistic)} de {teamDetail?.name}
        </Typography>
      </Item>
      {teamMatches?.map((match) => {
        const homeStat = match.teamStatistics.local[statistic];
        const penaltyLocal = statistic === "goals" ? ((match?.penaltyResult?.homePenalties!== match.penaltyResult.awayPenalties) ? match?.penaltyResult?.homePenalties : null) : null
        const penaltyVisitor = statistic === "goals" ?( (match?.penaltyResult?.homePenalties!== match.penaltyResult.awayPenalties) ? match?.penaltyResult?.awayPenalties : null) : null

        const awayStat = match.teamStatistics.visitor[statistic];
        const homeTeamWins = homeStat > awayStat;
        const awayTeamWins = awayStat > homeStat;

        return (
          <React.Fragment key={match._id}>
            <Grid
              container
              sx={{ display: "flex", justifyContent: "center" }}
              onClick={() => handleMatchClick(match)}
            >
              <Grid item xs={2}>
                <Typography style={{ marginRight: "auto" }}>
                  {formatDate(match.date)}
                </Typography>{" "}
              </Grid>

              <Grid
                item
                xs={8}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <Grid container>
                  <Grid item xs={5}>
                    <Typography
                      textAlign={"right"}
                      style={{ fontWeight: homeTeamWins ? "bold" : "normal" }}
                    >
                      {match.homeTeam.name}
                    </Typography>
                  </Grid>

                  <Grid item xs={2}>
                    <Typography
                      textAlign={"center"}
                      style={{ fontWeight: "bold" }}
                    >
                      {`${homeStat}`}  { penaltyLocal && ( `(${penaltyLocal}) `) } -  { penaltyLocal && ( ` (${penaltyVisitor})`) } {`${awayStat}`}
                     
                    </Typography>
                  </Grid>
                  <Grid item xs={5}>
                    <Typography
                      style={{ fontWeight: awayTeamWins ? "bold" : "normal" }}
                    >
                      {match.awayTeam.name}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={2}>
                {getResultIcon(teamDetail, match, statistic)}
              </Grid>
              <Grid item xs={12}>
                <Divider
                  variant="middle"
                  sx={{ width: "100%", marginY: "0.5rem" }}
                />
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Collapse in={selectedMatch?._id === match._id}>
                <Paper
                  style={{
                    padding: "1rem",
                    backgroundColor:
                      selectedMatch?._id === match._id
                        ? "#f0f0f0"
                        : "transparent",
                    // backgroundColor:"red",
                    cursor: "pointer",
                  }}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={4}>
                      <Typography>Liga: {match?.league?.name}</Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography>
                        Temporada: {match?.seasonYear?.year}
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography>Fecha: {match.round}</Typography>
                    </Grid>
                  </Grid>
                </Paper>
              </Collapse>
            </Grid>
          </React.Fragment>
        );
      })}
    </Grid>
  );
};
