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
import { Alert, CircularProgress, useMediaQuery } from "@mui/material";
import FormAddResult from "../pages/Match/FormAddResult";
import { useBoundStore } from "../stores";
import LoadingErrorWrapper from "./loadingErrorWrapper/LoadingErrorWrapper";
import LoadingSpinner from "./loading/LoadingSpinner";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export const MatchList3 = ({ match }) => {
  const { onDeleteMatch, isAuthenticated, initializeAuthState } = useBoundStore(
    (state) => state
  );
console.log("match",match)
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
    <Box
    sx={{
      marginY: 2, // Margen vertical entre partidos
      padding: 2, // Espaciado interno para que los contenidos no queden pegados al borde
      boxShadow: 3, // Relieve
      borderRadius: 2, // Bordes redondeados para suavizar el contenedor
      backgroundColor: "background.paper", // Fondo blanco
    }}
  >
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
              <Grid item xs={6} sx={{ padding: "0.0rem", marginTop: isMobile ? "0.1rem" : "1rem" }}>
                <Typography
                  sx={{
                    fontSize: isMobile ? "0.75rem" : "0.85rem",
                    textAlign: "center",
                    color: "gray",
                    // fontStyle: "italic",
                     paddingX: "0.0rem"
                  }}
                >
                  Árbitro: {match?.referee?.name ? match.referee.name : "Sin registro"}
                </Typography>
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
    </Box>
  );
};

export const MatchsStack = () => {
  const { matches, loading, error, clearMatches } = useBoundStore(
    (state) => state
  );

  useEffect(() => {
    return () => {
      clearMatches();
    };
  }, [clearMatches]);

  console.log("loagind", loading);

  // if (error) {
  //   return <Alert severity="error">{error}</Alert>;
  // }

  return (
    <Container
      sx={{ backgroundColor: "#84828244",minHeight: "100vh", padding: "0.3rem" }}
    >
      {loading && <LoadingSpinner />}
      {!loading & (matches.length === 0) ? (
        <Box
          sx={{
            height: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            flexDirection: "column",
          }}
        >
          <SportsSoccerIcon sx={{ fontSize: 80, color: "#94BE1F" }} />
          <Typography variant="h4" color="textSecondary" sx={{ mt: 2 }}>
            No hay partidos disponibles
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Por favor, intenta nuevamente más tarde.
          </Typography>
        </Box>
      ) : null}

      {Object.entries(
        matches.reduce((acc, match) => {
          const leagueName = match?.league?.name;
          const leagueSeason = match?.seasonYear?.year;
          const leagueSeasonId = match?.seasonYear?._id;

          const leagueId = match?.league?._id;
          const leagueCountry = match?.league?.country;
          if (!acc[leagueName]) {
            acc[leagueName] = {
              country: leagueCountry,
              matches: [],
              leagueId,
              leagueSeason,
              leagueSeasonId,
            };
          }
          acc[leagueName].matches.push(match);
          return acc;
        }, {})
      ).map(
        ([
          leagueName,
          { country, matches, leagueId, leagueSeason, leagueSeasonId },
        ]) => (
          <Box
            key={leagueName}
            sx={{ width: "100%", backgroundColor: "white" }}
          >
            <Stack
              spacing={1}
              sx={{ margin: "2rem 0" }}
              divider={<Divider orientation="horizontal" />}
            >
              <Item
                elevation={3}
                sx={{
                  margin: "1rem 0",
                  padding: "10px 0",
                  backgroundColor: "#94BE1F",
                }}
              >
                <Link
                  to={`/league/${leagueSeasonId}/showResults`}
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
        )
      )}
    </Container>
  );
};
