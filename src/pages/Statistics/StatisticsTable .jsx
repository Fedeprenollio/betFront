/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import SingleTeamStats from "./SingleTeamStats";
import TwoTeamsStats from "./TwoTeamsStats";
import { useBoundStore } from "bound-store";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";

const StatisticsTable = ({ match, statsLessThan, idHomeTeam, idAwayTeam }) => {
  const { getTeamDetails, teamDetails } = useBoundStore((state) => state);

  useEffect(() => {
    getTeamDetails(idHomeTeam);
    if (idAwayTeam) {
      getTeamDetails(idAwayTeam);
    }
    return () => {
      getTeamDetails(null);
    };
  }, [idHomeTeam, idAwayTeam, getTeamDetails]);

  const [teamDetails1, setTeamDetails1] = useState({});
  const [teamDetails2, setTeamDetails2] = useState({});

  useEffect(() => {
    if (teamDetails) {
      setTeamDetails1(teamDetails[idHomeTeam]);
      if (idAwayTeam) {
        setTeamDetails2(teamDetails[idAwayTeam]);
      }
    }
    return () => {
      setTeamDetails1({});
      setTeamDetails2({});
    };
  }, [idHomeTeam, idAwayTeam, teamDetails]);

  const displayResultDate = (match) => {
    const formatCustomDate = (dateString) => {
      const date = new Date(dateString);
      const options = { weekday: "long", day: "numeric", month: "short" };
      return date.toLocaleDateString("es-ES", options).toUpperCase();
    };

    if (match?.isFinished) {
      return (
        <Box textAlign="center">
          <Typography variant="h6" color="text.primary">
            FIN
          </Typography>
          <Typography variant="h3" fontWeight="bold">
            {`${match?.teamStatistics?.local?.goals} - ${match?.teamStatistics?.visitor?.goals}`}
          </Typography>
          <Typography variant="h6" color="text.primary">
            {match?.league?.name}
          </Typography>
        </Box>
      );
    } else {
      return (
        <Box textAlign="center">
          <Typography variant="h6" color="text.primary">
            {formatCustomDate(match.date)}
          </Typography>
          <Typography variant="h6" color="text.primary">
            {match?.league?.name}
          </Typography>
        </Box>
      );
    }
  };

  return (
    <Box>
      <Box display="flex" justifyContent="center" alignItems="center" mb={2}>
        <Avatar src={teamDetails1?.logoUrl} alt={teamDetails1?.name} />
        <Typography variant="h5" fontWeight="bold" ml={1}>
          {teamDetails1?.name}
        </Typography>
        {idAwayTeam && (
          <>
            <Box mx={2}>{displayResultDate(match)}</Box>
            <Avatar src={teamDetails2?.logoUrl} alt={teamDetails2?.name} />
            <Typography variant="h5" fontWeight="bold" ml={1}>
              {teamDetails2?.name}
            </Typography>
          </>
        )}
      </Box>
      {idAwayTeam ? (
        <TwoTeamsStats
          homeStats={teamDetails1?.statistics}
          awayStats={teamDetails2?.statistics}
          statsLessThan={statsLessThan}
        />
      ) : (
        <SingleTeamStats
          stats={teamDetails1?.statistics}
          statsLessThan={statsLessThan}
        />
      )}
    </Box>
  );
};

export default StatisticsTable;
