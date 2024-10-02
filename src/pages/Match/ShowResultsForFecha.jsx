import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useBoundStore } from "../../stores";
import {
  Button,
  Typography,
  List,
  ListItem,
  Card,
  CardContent,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
  Tooltip,
  Box,
  Avatar,
} from "@mui/material";
import ShowResultMatch from "./ShowResultMatch";
import BarChartIcon from "@mui/icons-material/BarChart";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { AddRefereeToMatch } from "../referee/AddRefereeToMatch";
import { Form, Formik } from "formik";
import { updateMach } from "./matchApi";
import { ScrapeMatchResult } from "./ScrapeMatchResult";
import SecuencialClickButton from "./SecuencialClickButton";

export const ShowResultsForFecha = () => {
  const { seasonId } = useParams();
  const { seasonById, getSeasonById, referees, getReferees, isAuthenticated } =
    useBoundStore((state) => state);
  const [selectedFecha, setSelectedFecha] = useState(null);
  const [selectedSeason, setSelectedSeason] = useState("");
  const [expandedMatchId, setExpandedMatchId] = useState(null);
  // const [refereeSelected, setRefereeSelected] = useState(null);
  // const [refereeSelected, setRefereeSelected] = useState({}); // Cambiado a objeto
  const [refereesSelectedByMatch, setRefereesSelectedByMatch] = useState({});
  const [updatedMatches, setUpdatedMatches] = useState({}); // Nuevo estado para los partidos actualizados

  useEffect(() => {
    getSeasonById(seasonId);
    getReferees();
  }, [seasonId, getSeasonById, getReferees]);

  useEffect(() => {
    if (seasonById?.season?.fechas) {
      const currentFecha = seasonById.season.fechas.find(
        (fecha) => fecha.isCurrentFecha
      );
      setSelectedFecha(
        currentFecha
          ? { _id: currentFecha._id, number: currentFecha.number }
          : null
      );
    }

    if (seasonById?.season?.league?.season) {
      const currentSeason = seasonById.season.league.season.find(
        (season) => season._id === seasonId
      );
      setSelectedSeason(currentSeason?._id || "");
    }
  }, [seasonById, seasonId]);

  useEffect(() => {
    if (seasonById?.season?.matches) {
      const refereesMap = {};

      seasonById.season.matches.forEach((match) => {
        if (match.referee) {
          // Asumiendo que match.referee contiene el ID del árbitro
          refereesMap[match._id] = match.referee;
        }
      });

      setRefereesSelectedByMatch(refereesMap);
    }
  }, [seasonById]);
  const handleFechaClick = (fecha) => {
    setSelectedFecha(fecha);
  };

  const handleSeasonClick = (seasonId) => {
    setSelectedSeason(seasonId);
    getSeasonById(seasonId);
  };

  const handleAccordionToggle = (matchId) => {
    setExpandedMatchId(expandedMatchId === matchId ? null : matchId);
  };

  const handleOpenInNewTab = (match) => {
    const url = `/stats/${match.homeTeam._id}/${match.awayTeam._id}/${match._id}`;
    // window.open(url, '_blank', 'noopener,noreferrer');
    window.open(url);
  };

  // Lógica para manejar cambios adicionales al seleccionar un árbitro
  // Lógica para manejar cambios adicionales al seleccionar un árbitro
  const handleRefereeChange = (matchId, selectedRefereeId) => {
    setRefereesSelectedByMatch((prev) => ({
      ...prev,
      [matchId]: selectedRefereeId,
    }));
  };

  const handleSubmit = async (values, matchId) => {
    try {
      let response;

      // Actualizar partido existente
      response = await updateMach({
        matchId: matchId,
        updatedData: values,
        token: JSON.parse(localStorage.getItem("loggedUser")),
      });
      console.log("RESPONSE", response);
      // setMatches()

      // if (response?.state === "ok") {
      //   setSeverity("success");
      //   setMsgAlert(matchId ? "Partido editado exitosamente":"Partido creado exitosamente");
      //   setIsAlertOpen(true);
      // } else {
      //   setSeverity("error");
      //   setMsgAlert("Error al crear partido");
      //   setIsAlertOpen(true);
      // }
    } catch (error) {
      // if (error.name === "ValidationError") {
      //   const errorMessage = error.errors.join(", ");
      //   setSeverity("error");
      //   setMsgAlert(errorMessage);
      //   setIsAlertOpen(true);
      // } else {
      //   console.error("Error al validar el formulario:", error);
      // }
      console.error(error); // handle error
    }
  };

  // Actualiza los partidos después del scraping
  const handleScrapeSuccess = (matchId, newMatchData) => {
    console.log("QUE HAY HANDLE",matchId, newMatchData)
    setUpdatedMatches((prevMatches) => ({
      ...prevMatches,
      [matchId]: newMatchData,
    }));
  };
console.log("updated", updatedMatches)
  return (
    <>
      <Box
        sx={{
          border: "1px solid #ddd",
          padding: 2,
          marginBottom: 2,
          borderRadius: 2,
          boxShadow: 1,
          backgroundColor: "#f9f9f9",
        }}
      >
        <Grid container alignItems="center">
          <Typography variant="h6" gutterBottom>
            Temporadas de {seasonById?.season?.league.name} :
          </Typography>
          <Grid item xs={12} sm={12}>
            {seasonById?.season?.league?.season?.map((season) => (
              <Button
                style={{ padding: "2px" }}
                color="inherit"
                key={season._id}
                onClick={() => handleSeasonClick(season._id)}
                variant={selectedSeason === season._id ? "outlined" : "text"}
              >
                {season.year}
              </Button>
            ))}
          </Grid>
        </Grid>
      </Box>

      <Box
        sx={{
          border: "1px solid #ddd",
          padding: 2,
          marginBottom: 2,
          borderRadius: 2,
          boxShadow: 1,
          backgroundColor: "#f9f9f9",
        }}
      >
        <Grid container alignItems="center">
          <Typography variant="h6" gutterBottom>
            Fechas:
          </Typography>
          <Grid item xs={12} sm={10}>
            {seasonById?.season?.fechas?.map((fecha) => (
              <Button
                style={{ padding: "2px" }}
                color={selectedFecha?._id === fecha._id ? "primary" : "inherit"}
                key={fecha._id}
                onClick={() =>
                  handleFechaClick({ _id: fecha._id, number: fecha.number })
                }
                variant={selectedFecha?._id === fecha._id ? "outlined" : "text"}
              >
                {fecha.number}
              </Button>
            ))}
          </Grid>
        </Grid>
      </Box>

      {selectedFecha && (
        <Box
          sx={{
            border: "1px solid #ddd",
            padding: 0,
            marginBottom: 2,
            borderRadius: 2,
            boxShadow: 1,
            backgroundColor: "#fff",
            transition: "box-shadow 0.3s",
            "&:hover": {
              boxShadow: 4,
            },
          }}
        >
          <Typography variant="h5" gutterBottom>
            Partidos para la Fecha {selectedFecha.number}
          </Typography>
          <SecuencialClickButton />

          <List>
            {seasonById?.season?.fechas
              ?.find((fecha) => fecha._id === selectedFecha._id)
              ?.matches?.map((match) => {
                const updatedMatch = updatedMatches[match._id] || match; // Usa los datos actualizados si existen
                console.log("updatedMatch completo",updatedMatch)

                console.log("updatedMatch",updatedMatch?.teamStatistics?.local?.goals)
                console.log("match",match)

                
                
                 return (
                <ListItem key={updatedMatch._id} disableGutters>
                  <Card sx={{ width: "100%", marginBottom: 2 }}>
                    <CardContent sx={{ padding: 0 }}>
                      <Grid container alignItems="center" spacing={1}>
                        <Grid
                          item
                          xs={4}
                          container
                          justifyContent="center"
                          alignItems="center"
                          sx={{
                            flexDirection: { xs: "column", sm: "row" },
                            overflow: "hidden",
                            whiteSpace: "nowrap",
                            textOverflow: "ellipsis",
                          }}
                        >
                          <Avatar
                            src={match.homeTeam?.logo}
                            alt={match.homeTeam?.name}
                            sx={{
                              marginRight: { xs: 0, sm: 1 },
                              marginBottom: { xs: 1, sm: 0 },
                            }}
                          />
                          <Typography
                            variant="body1"
                            sx={{
                              fontWeight: "bold",
                              textOverflow: "ellipsis",
                              overflow: "hidden",
                              whiteSpace: "nowrap",
                              textAlign: { xs: "center", sm: "left" },
                            }}
                          >
                            {match.homeTeam.name}
                          </Typography>
                        </Grid>
                        <Grid
                          item
                          xs={2}
                          container
                          alignItems={"center"}
                          justifyContent="center"
                          display={"flex"}
                          flexDirection={"column"}
                        >
                          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                            {updatedMatch?.isFinished
                              ? `${updatedMatch?.teamStatistics?.local?.goals}    ${updatedMatch?.teamStatistics?.visitor?.goals}`
                              : "-"}
                          </Typography>
                          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                            {match?.penaltyResult?.homePenalties !==
                            match.penaltyResult.awayPenalties
                              ? `(${match?.penaltyResult?.homePenalties})   ( ${match.penaltyResult.awayPenalties})`
                              : null}
                          </Typography>
                        </Grid>
                        <Grid
                          item
                          xs={4}
                          container
                          justifyContent="center"
                          alignItems="center"
                          sx={{
                            flexDirection: { xs: "column-reverse", sm: "row" },
                            overflow: "hidden",
                            whiteSpace: "nowrap",
                            textOverflow: "ellipsis",
                          }}
                        >
                          <Typography
                            variant="body1"
                            sx={{
                              fontWeight: "bold",
                              textOverflow: "ellipsis",
                              overflow: "hidden",
                              whiteSpace: "nowrap",
                              textAlign: { xs: "center", sm: "left" },
                            }}
                          >
                            {match.awayTeam.name}
                          </Typography>
                          <Avatar
                            src={match.awayTeam?.logo}
                            alt={match.awayTeam?.name}
                            sx={{
                              marginLeft: { xs: 0, sm: 1 },
                              marginBottom: { xs: 1, sm: 0 },
                            }}
                          />
                        </Grid>
                        <Grid item xs={2} container justifyContent="flex-end">
                          <Tooltip title="Ver Estadísticas">
                            <IconButton
                              // component={Link}
                              onClick={() => handleOpenInNewTab(match)}
                              to={`/stats/${match.homeTeam._id}/${match.awayTeam._id}/${match._id}`}
                              color="primary"
                            >
                              <BarChartIcon />
                            </IconButton>
                          </Tooltip>
                          {match.isFinished && (
                            <Tooltip
                              title={
                                expandedMatchId === match._id
                                  ? "Ocultar Resultado"
                                  : "Ver Resultado"
                              }
                            >
                              <IconButton
                                color="secondary"
                                onClick={() => handleAccordionToggle(match._id)}
                              >
                                {expandedMatchId === match._id ? (
                                  <VisibilityOffIcon />
                                ) : (
                                  <VisibilityIcon />
                                )}
                              </IconButton>
                            </Tooltip>
                          )}
                        </Grid>
                      </Grid>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        sx={{ marginTop: 1 }}
                      >
                        {match.date
                          ? new Date(match.date).toLocaleDateString("es-ES", {
                              day: "numeric",
                              month: "short",
                            })
                          : "Fecha sin definir"}
                      </Typography>
                      {isAuthenticated && (
                        <Formik
                          initialValues={{ referee: match.referee || "" }}
                          onSubmit={(values) => handleSubmit(values, match._id)}
                        >
                          {({ values, handleChange, setFieldValue }) => (
                            <Form>
                              {console.log("Values prbando", values)}
                              <AddRefereeToMatch
                                refereeSelected={
                                  refereesSelectedByMatch[match._id] || ""
                                }
                                referees={referees}
                                handleChange={handleChange}
                                handleRefereeChange={handleRefereeChange}
                              />
                              <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                              >
                                Agregar arbitro
                              </Button>
                            </Form>
                          )}
                        </Formik>
                      )}

                      {isAuthenticated && (
                        <ScrapeMatchResult
                          // matchId={match._id}
                          // urlScrape={match?.urlScrape}
                          matchId={updatedMatch._id}

                          urlScrape={updatedMatch?.urlScrape}

                          onSuccess={(newMatchData) =>
                            handleScrapeSuccess(updatedMatch._id, newMatchData)
                          }
                        />
                      )}
                      {expandedMatchId === match._id && (
                        <Accordion expanded>
                          <AccordionSummary>
                            <Typography>Detalles del Partido</Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            <ShowResultMatch
                              matchId={match._id}
                              visitorName={match.awayTeam.name}
                              logoVisitor={match.awayTeam.logo}
                              localName={match.homeTeam.name}
                              logoLocal={match.homeTeam.logo}
                            />
                          </AccordionDetails>
                        </Accordion>
                      )}
                    </CardContent>
                  </Card>
                </ListItem>
              )})}
          </List>
        </Box>
      )}
    </>
  );
};

export default ShowResultsForFecha;
