/* eslint-disable react/prop-types */
import  { useState, useEffect } from "react";
import { Grid, Tabs, Tab, Box } from "@mui/material";
import { useBoundStore } from "../../stores";
import { TableMatches } from "./TableMatches";

export const ShowStatisticsMatches = ({
  idHomeTeam,
  idAwayTeam,
  singleTeam,
}) => {
  const { localMatches, visitorMatches, teamDetails, getTeamDetails } =
    useBoundStore((state) => state);

 useEffect(() => {
    getTeamDetails(idHomeTeam);
    if (idAwayTeam) {
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
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        aria-label="Statistics Tabs"
        variant="scrollable"
        scrollButtons
        allowScrollButtonsMobile
      >
        <Tab label="Goles" />
        <Tab label="Corners" />
        <Tab label="Tarjetas Amarillas" />
        <Tab label="Disparos" />
        <Tab label="Disparos al arco" />
        <Tab label="Posesión" />
        <Tab label="Faltas" />
        <Tab label="Offsides" />
      </Tabs>
      {activeTab === 0 && (
        <Grid container spacing={2}>
          <TableMatches
            teamMatches={localMatches}
            statistic="goals"
            teamDetail={teamDetails1}
          />
          {idAwayTeam && (
            <TableMatches
              teamMatches={visitorMatches}
              statistic="goals"
              teamDetail={teamDetails2}
            />
          )}
        </Grid>
      )}
      {activeTab === 1 && (
        <Grid container spacing={2}>
          <TableMatches
            teamMatches={localMatches}
            statistic="corners"
            teamDetail={teamDetails1}
          />
          {idAwayTeam && (
            <TableMatches
              teamMatches={visitorMatches}
              statistic="corners"
              teamDetail={teamDetails2}
            />
          )}
        </Grid>
      )}
      {activeTab === 2 && (
        <Grid container spacing={2}>
          <TableMatches
            teamMatches={localMatches}
            statistic="yellowCards"
            teamDetail={teamDetails1}
          />
          {idAwayTeam && (
            <TableMatches
              teamMatches={visitorMatches}
              statistic="yellowCards"
              teamDetail={teamDetails2}
            />
          )}
        </Grid>
      )}
      {activeTab === 3 && (
        <Grid container spacing={2}>
          <TableMatches
            teamMatches={localMatches}
            statistic="shots"
            teamDetail={teamDetails1}
          />
          {idAwayTeam && (
            <TableMatches
              teamMatches={visitorMatches}
              statistic="shots"
              teamDetail={teamDetails2}
            />
          )}
        </Grid>
      )}
      {activeTab === 4 && (
        <Grid container spacing={2}>
          <TableMatches
            teamMatches={localMatches}
            statistic="shotsOnTarget"
            teamDetail={teamDetails1}
          />
          {idAwayTeam && (
            <TableMatches
              teamMatches={visitorMatches}
              statistic="shotsOnTarget"
              teamDetail={teamDetails2}
            />
          )}
        </Grid>
      )}
      {activeTab === 5 && (
        <Grid container spacing={2}>
          <TableMatches
            teamMatches={localMatches}
            statistic="possession"
            teamDetail={teamDetails1}
          />
          {idAwayTeam && (
            <TableMatches
              teamMatches={visitorMatches}
              statistic="possession"
              teamDetail={teamDetails2}
            />
          )}
        </Grid>
      )}
      {activeTab === 6 && (
        <Grid container spacing={2}>
          <TableMatches
            teamMatches={localMatches}
            statistic="foults"
            teamDetail={teamDetails1}
          />
          {idAwayTeam && (
            <TableMatches
              teamMatches={visitorMatches}
              statistic="foults"
              teamDetail={teamDetails2}
            />
          )}
        </Grid>
      )}
      {activeTab === 7 && (
        <Grid container spacing={2}>
          <TableMatches
            teamMatches={localMatches}
            statistic="offsides"
            teamDetail={teamDetails1}
          />
          {idAwayTeam && (
            <TableMatches
              teamMatches={visitorMatches}
              statistic="offsides"
              teamDetail={teamDetails2}
            />
          )}
        </Grid>
      )}
    </Box>
  );
};
