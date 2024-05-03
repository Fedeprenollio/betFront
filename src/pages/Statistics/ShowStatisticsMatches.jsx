import { Grid, Paper, styled, Typography, Box } from "@mui/material";
import React from "react";
import { useBoundStore } from "../../stores";
import { useState } from "react";
import { useEffect } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import dayjs from "dayjs";
import { TableMatches } from "./TableMatches";

export const ShowStatisticsMatches = ({ idHomeTeam, idAwayTeam }) => {
  const { localMatches, visitorMatches, teamDetails, getTeamDetails } =
    useBoundStore((state) => state);
  React.useEffect(() => {
    getTeamDetails(idHomeTeam);
    getTeamDetails(idAwayTeam);
    return () => {
      getTeamDetails(null);
    };
  }, [idHomeTeam, idAwayTeam, getTeamDetails]);

  // Utilizamos los selectores para obtener los detalles de cada equipo
  const [teamDetails1, setTeamDetails1] = useState({});
  const [teamDetails2, setTeamDetails2] = useState({});

  useEffect(() => {
    if (teamDetails) {
      setTeamDetails1(teamDetails[idHomeTeam]);
      setTeamDetails2(teamDetails[idAwayTeam]);
    }
    return () => {
      setTeamDetails1({});
      setTeamDetails2({});
    };
  }, [idHomeTeam, idAwayTeam, teamDetails]);

  

  return (
    <Grid container spacing={2}>
      <TableMatches
        teamMatches={localMatches}
        statistic="goals"
        teamDetail={teamDetails1}
      />
      <TableMatches
        teamMatches={visitorMatches}
        statistic="goals"
        teamDetail={teamDetails2}
      />

      <TableMatches
        teamMatches={localMatches}
        statistic="corners"
        teamDetail={teamDetails1}
      />
      <TableMatches
        teamMatches={visitorMatches}
        statistic="corners"
        teamDetail={teamDetails2}
      />
       <TableMatches
        teamMatches={localMatches}
        statistic="yellowCards"
        teamDetail={teamDetails1}
      />
      <TableMatches
        teamMatches={visitorMatches}
        statistic="yellowCards"
        teamDetail={teamDetails2}
      />
    </Grid>
  );
};
