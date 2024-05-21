/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { Grid, Tabs, Tab, Box } from "@mui/material";
import { useBoundStore } from "../../stores";
import { TableMatches } from "./TableMatches";

export const ShowStatisticsMatches = ({ idHomeTeam, idAwayTeam, singleTeam }) => {
  const { localMatches, visitorMatches, teamDetails, getTeamDetails } =
    useBoundStore((state) => state);
  
  React.useEffect(() => {
    getTeamDetails(idHomeTeam);
    if (!singleTeam) {
      getTeamDetails(idAwayTeam);
    }
    return () => {
      getTeamDetails(null);
    };
  }, [idHomeTeam, idAwayTeam, singleTeam, getTeamDetails]);

  const [teamDetails1, setTeamDetails1] = useState({});
  const [teamDetails2, setTeamDetails2] = useState({});

  useEffect(() => {
    if (teamDetails) {
      setTeamDetails1(teamDetails[idHomeTeam]);
      if (!singleTeam) {
        setTeamDetails2(teamDetails[idAwayTeam]);
      }
    }
    return () => {
      setTeamDetails1({});
      setTeamDetails2({});
    };
  }, [idHomeTeam, idAwayTeam, singleTeam, teamDetails]);

  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Box>
      <Tabs value={activeTab} onChange={handleTabChange} aria-label="Statistics Tabs">
        <Tab label="Goles" />
        <Tab label="Corners" />
        <Tab label="Tarjetas Amarillas" />
      </Tabs>
      {activeTab === 0 && (
        <Grid container spacing={2}>
          {!singleTeam && (
            <TableMatches
              teamMatches={visitorMatches}
              statistic="goals"
              teamDetail={teamDetails2}
            />
          )}
          <TableMatches
            teamMatches={localMatches}
            statistic="goals"
            teamDetail={teamDetails1}
          />
        </Grid>
      )}
      {activeTab === 1 && (
        <Grid container spacing={2}>
          {!singleTeam && (
            <TableMatches
              teamMatches={visitorMatches}
              statistic="corners"
              teamDetail={teamDetails2}
            />
          )}
          <TableMatches
            teamMatches={localMatches}
            statistic="corners"
            teamDetail={teamDetails1}
          />
        </Grid>
      )}
      {activeTab === 2 && (
        <Grid container spacing={2}>
          {!singleTeam && (
            <TableMatches
              teamMatches={visitorMatches}
              statistic="yellowCards"
              teamDetail={teamDetails2}
            />
          )}
          <TableMatches
            teamMatches={localMatches}
            statistic="yellowCards"
            teamDetail={teamDetails1}
          />
        </Grid>
      )}
    </Box>
  );
};
