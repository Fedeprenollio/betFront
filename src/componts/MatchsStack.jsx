/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import "../App.css";
import DeleteIcon from "@mui/icons-material/Delete";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import { useMediaQuery } from "@mui/material";
import FormAddResult from "../pages/Match/FormAddResult";
import { useBoundStore } from "../stores";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export const MatchList3 = ({ match }) => {
  const { onDeleteMatch, isAuthenticated,initializeAuthState } = useBoundStore((state) => state);
console.log("isAuthenticated",isAuthenticated)

useEffect(() => {
  initializeAuthState();
}, [initializeAuthState]);

  const [isOpen, setIsOpen] = useState(false);
  const fecha = new Date(match.date);
  const hora = dayjs(fecha).format("HH:mm");

  // Utilizamos useMediaQuery para detectar si estamos en un dispositivo móvil
  const isMobile = useMediaQuery((theme) => theme?.breakpoints?.down("sm"));

  const toggleForm = () => {
    setIsOpen(!isOpen);
  };

  const handleDelete = (idMatch) => {
    // Ejecutar la función onDelete pasada como prop
    onDeleteMatch(idMatch);
  };
  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={10} sx={{ paddingX: "0rem" }}>
        <Link
          to={`/stats/${match?.homeTeam?._id}/${match?.awayTeam?._id}/${match._id}`}
          className="link-no-underline"
        >
          <ListItemButton component="div" sx={{ paddingX: "0.2rem" }}>
            <Grid
              container
              spacing={2}
              alignItems="center"
              sx={{ paddingX: "0.2rem" }}
            >
              <Grid item xs={5}>
                <ListItemText
                  sx={{ paddingX: "0.2rem" }}
                  align="end"
                  primary={
                    <>
                      <Typography
                        sx={{
                          display: "inline",
                          fontSize: isMobile ? "0.8rem" : "inherit",
                        }}
                        component="h6"
                        variant="h6"
                        color="grey"
                      >
                        {match?.homeTeam?.name}
                      </Typography>
                    </>
                  }
                />
              </Grid>
              <Grid item xs={2} sx={{ paddingX: "0.2rem" }}>
                <ListItemText
                  sx={{ paddingX: "0.3rem" }}
                  align="center"
                  primary={
                    <>
                      <Typography
                        sx={{
                          display: "inline",
                          fontSize: isMobile ? "0.9rem" : "inherit",
                        }}
                        component="h6"
                        variant="h5"
                        color="green"
                      >
                        {match.isFinished
                          ? `${match.teamStatistics.local.goals}-${match.teamStatistics.visitor.goals} `
                          : hora}
                      </Typography>
                    </>
                  }
                />
              </Grid>
              <Grid item xs={5} sx={{ paddingX: "0.2rem" }}>
                <ListItemText
                  sx={{ paddingX: "0.2rem" }}
                  align="start"
                  primary={
                    <>
                      <Typography
                        sx={{
                          display: "inline",
                          fontSize: isMobile ? "0.8rem" : "inherit",
                        }}
                        component="h6"
                        variant="h6"
                        color="grey"
                      >
                        {match?.awayTeam?.name}
                      </Typography>
                    </>
                  }
                />
              </Grid>
            </Grid>
          </ListItemButton>
        </Link>
      </Grid>

      {isAuthenticated && (
        <>
          <Grid item xs={2}>
            {/* <Tooltip title="Delete">
          <IconButton  onClick={()=>handleDelete(match._id)}>
            <DeleteIcon  />
          </IconButton>
        </Tooltip> */}
            <Tooltip title="Agregar resultado">
              <IconButton onClick={toggleForm}>
                {isOpen ? <ExpandLess /> : <ExpandMore />}
              </IconButton>
            </Tooltip>
          </Grid>
          <Grid item xs={12}>
            <Collapse in={isOpen} timeout="auto" unmountOnExit>
              <FormAddResult
                matchId={match._id}
                localName={match.homeTeam?.name}
                visitorName={match.awayTeam?.name}
              />
            </Collapse>
          </Grid>
        </>
      )}
    </Grid>
  );
};

export const MatchsStack = () => {
  const { matches } = useBoundStore((state) => state);
  const [myMatches, setMyMatches] = useState([]);

  useEffect(() => {
    setMyMatches(matches);
  }, [matches]);
  return (
    <Container
      sx={{ backgroundColor: "#84828244", height: "100vh", padding: "0.3rem" }}
    >
      {Object.entries(
        myMatches.reduce((acc, match) => {
          console.log("PARTIDOS", match);
          const leagueName = match?.league?.name;
          const leagueSeason = match?.seasonYear?.year;

          const leagueId = match?.league?._id;
          const leagueCountry = match?.league?.country;
          if (!acc[leagueName]) {
            acc[leagueName] = {
              country: leagueCountry,
              matches: [],
              leagueId,
              leagueSeason,
            };
          }
          acc[leagueName].matches.push(match);
          return acc;
        }, {})
      ).map(([leagueName, { country, matches, leagueId, leagueSeason }]) => (
        <Box key={leagueName} sx={{ width: "100%", backgroundColor: "white" }}>
          <Stack
            spacing={1}
            sx={{ margin: "2rem 0" }}
            divider={<Divider orientation="horizontal" />}
          >
            <Item
              elevation={3}
              sx={{
                margin: "1rem 0",
                padding: "10px0",
                backgroundColor: "#94BE1F",
              }}
            >
              <Link
                to={`/league/detail/${leagueId}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Typography variant="h5" color="white">
                  {leagueName} ({leagueSeason}) - {country}
                </Typography>
              </Link>
            </Item>
          </Stack>

          {matches.map((match) => (
            <MatchList3 key={match._id} match={match} />
          ))}
        </Box>
      ))}
    </Container>
  );
};
