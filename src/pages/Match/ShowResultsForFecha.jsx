// import React, { useState, useEffect } from "react";
// import { Link, useParams } from "react-router-dom";
// import { useBoundStore } from "../../stores";
// import {
//   Button,
//   Typography,
//   List,
//   ListItem,
//   Container,
//   Card,
//   CardContent,
//   Grid,
//   useMediaQuery,
//   useTheme,
//   Accordion,
//   AccordionSummary,
//   AccordionDetails,
//   IconButton,
//   Tooltip
// } from "@mui/material";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import ShowResultMatch from "./ShowResultMatch";
// import BarChartIcon from "@mui/icons-material/BarChart";
// import VisibilityIcon from "@mui/icons-material/Visibility";
// import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

// export const ShowResultsForFecha = () => {
//   const { seasonId } = useParams();
//   const { seasonById, getSeasonById } = useBoundStore((state) => state);
//   const [selectedFecha, setSelectedFecha] = useState(null);
//   const [selectedSeason, setSelectedSeason] = useState("");
//   const [expandedMatchId, setExpandedMatchId] = useState(null);

//   const theme = useTheme();
//   const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

//   useEffect(() => {
//     getSeasonById(seasonId);
//   }, [seasonId, getSeasonById]);

//   useEffect(() => {
//     if (seasonById?.season?.fechas) {
//       const currentFecha = seasonById.season.fechas.find(
//         (fecha) => fecha.isCurrentFecha
//       );
//       setSelectedFecha(
//         currentFecha
//           ? { _id: currentFecha._id, number: currentFecha.number }
//           : null
//       );
//     }

//     if (seasonById?.season?.league?.season) {
//       const currentSeason = seasonById.season.league.season.find(
//         (season) => season._id === seasonId
//       );
//       setSelectedSeason(currentSeason?._id || "");
//     }
//   }, [seasonById, seasonId]);

//   const handleFechaClick = (fecha) => {
//     setSelectedFecha(fecha);
//   };

//   const handleSeasonClick = (seasonId) => {
//     setSelectedSeason(seasonId);
//     getSeasonById(seasonId);
//   };

//   const handleAccordionToggle = (matchId) => {
//     setExpandedMatchId(expandedMatchId === matchId ? null : matchId);
//   };

//   return (
//     <Container>
//       <Grid container alignItems="center">
//         <Typography variant="h6" gutterBottom>
//           Temporadas de {seasonById?.season?.league.name} :
//         </Typography>
//         <Grid item xs={12} sm={12}>
//           {seasonById?.season?.league?.season?.map((season) => (
//             <Button
//               style={{ padding: "2px" }}
//               color="inherit"
//               key={season._id}
//               onClick={() => handleSeasonClick(season._id)}
//               variant={selectedSeason === season._id ? "outlined" : "text"}
//             >
//               {season.year}
//             </Button>
//           ))}
//         </Grid>
//       </Grid>

//       <Grid container alignItems="center">
//         <Typography variant="h6" gutterBottom>
//           Fechas:
//         </Typography>
//         <Grid item xs={12} sm={10}>
//           {seasonById?.season?.fechas?.map((fecha) => (
//             <Button
//               style={{ padding: "2px" }}
//               color={selectedFecha?._id === fecha._id ? "primary" : "inherit"}
//               key={fecha._id}
//               onClick={() =>
//                 handleFechaClick({ _id: fecha._id, number: fecha.number })
//               }
//               variant={selectedFecha?._id === fecha._id ? "outlined" : "text"}
//             >
//               {fecha.number}
//             </Button>
//           ))}
//         </Grid>
//       </Grid>

//       {selectedFecha && (
//         <>
//           <Typography variant="h6">
//             Partidos para la Fecha {selectedFecha.number}
//           </Typography>
//           <List>
//             {seasonById?.season?.fechas
//               ?.find((fecha) => fecha._id === selectedFecha._id)
//               ?.matches?.map((match) => (
//                 <ListItem key={match._id} disableGutters>
//                   <Card style={{ width: "100%", marginBottom: "10px" }}>
//                     <CardContent>
//                       <Grid container alignItems="center">
//                         <Grid item xs={8}>
//                           <Typography variant="h6" component="div">
//                             {`${match.homeTeam.name} - ${match.awayTeam.name}`}
//                           </Typography>
//                         </Grid>
//                         <Grid item xs={4} container justifyContent="flex-end">
//                           <Tooltip title="Ver Estadísticas">
//                             <IconButton
//                               component={Link}
//                               to={`/stats/${match.homeTeam._id}/${match.awayTeam._id}/${match._id}`}
//                               color="primary"
//                             >
//                               <BarChartIcon />
//                             </IconButton>
//                           </Tooltip>
//                           {match.isFinished && (
//                             <Tooltip title={expandedMatchId === match._id ? "Ocultar Resultado" : "Ver Resultado"}>
//                               <IconButton
//                                 color="secondary"
//                                 onClick={() => handleAccordionToggle(match._id)}
//                               >
//                                 {expandedMatchId === match._id ? <VisibilityOffIcon /> : <VisibilityIcon />}
//                               </IconButton>
//                             </Tooltip>
//                           )}
//                         </Grid>
//                       </Grid>
//                       <Typography variant="body2" color="textSecondary">
//                         {match.date ? 
//                           new Date(match.date).toLocaleDateString("es-ES", {day: "numeric", month: "short"}) :
//                           "Fecha sin definir"
//                         }
//                       </Typography>
//                       <Typography variant="body2" color="textSecondary">
//                         {match.isFinished
//                           ? `${match.teamStatistics.local.goals} - ${match.teamStatistics.visitor.goals}`
//                           : "Esperando el resultado"}
//                       </Typography>
//                       {expandedMatchId === match._id && (
//                         <Accordion expanded>
//                           <AccordionSummary>
//                             <Typography>Detalles del Partido</Typography>
//                           </AccordionSummary>
//                           <AccordionDetails>
//                             <ShowResultMatch
//                               matchId={match._id}
//                               visitorName={match.awayTeam.name}
//                               localName={match.homeTeam.name}
//                             />
//                           </AccordionDetails>
//                         </Accordion>
//                       )}
//                     </CardContent>
//                   </Card>
//                 </ListItem>
//               ))}
//           </List>
//         </>
//       )}
//     </Container>
//   );
// };

// export default ShowResultsForFecha;


import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useBoundStore } from "../../stores";
import {
  Button,
  Typography,
  List,
  ListItem,
  Container,
  Card,
  CardContent,
  Grid,
  useMediaQuery,
  useTheme,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
  Tooltip,
  Box
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ShowResultMatch from "./ShowResultMatch";
import BarChartIcon from "@mui/icons-material/BarChart";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

export const ShowResultsForFecha = () => {
  const { seasonId } = useParams();
  const { seasonById, getSeasonById } = useBoundStore((state) => state);
  const [selectedFecha, setSelectedFecha] = useState(null);
  const [selectedSeason, setSelectedSeason] = useState("");
  const [expandedMatchId, setExpandedMatchId] = useState(null);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    getSeasonById(seasonId);
  }, [seasonId, getSeasonById]);

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

  return (
    <Container>
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
            padding: 2,
            marginBottom: 2,
            borderRadius: 2,
            boxShadow: 1,
            backgroundColor: "#f9f9f9",
          }}
        >
          <Typography variant="h6">
            Partidos para la Fecha {selectedFecha.number}
          </Typography>
          <List>
            {seasonById?.season?.fechas
              ?.find((fecha) => fecha._id === selectedFecha._id)
              ?.matches?.map((match) => (
                <ListItem key={match._id} disableGutters>
                  <Card style={{ width: "100%", marginBottom: "10px" }}>
                    <CardContent>
                      <Grid container alignItems="center">
                        <Grid item xs={8}>
                          <Typography variant="h6" component="div">
                            {`${match.homeTeam.name} - ${match.awayTeam.name}`}
                          </Typography>
                        </Grid>
                        <Grid item xs={4} container justifyContent="flex-end">
                          <Tooltip title="Ver Estadísticas">
                            <IconButton
                              component={Link}
                              to={`/stats/${match.homeTeam._id}/${match.awayTeam._id}/${match._id}`}
                              color="primary"
                            >
                              <BarChartIcon />
                            </IconButton>
                          </Tooltip>
                          {match.isFinished && (
                            <Tooltip title={expandedMatchId === match._id ? "Ocultar Resultado" : "Ver Resultado"}>
                              <IconButton
                                color="secondary"
                                onClick={() => handleAccordionToggle(match._id)}
                              >
                                {expandedMatchId === match._id ? <VisibilityOffIcon /> : <VisibilityIcon />}
                              </IconButton>
                            </Tooltip>
                          )}
                        </Grid>
                      </Grid>
                      <Typography variant="body2" color="textSecondary">
                        {match.date ? 
                          new Date(match.date).toLocaleDateString("es-ES", {day: "numeric", month: "short"}) :
                          "Fecha sin definir"
                        }
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {match.isFinished
                          ? `${match.teamStatistics.local.goals} - ${match.teamStatistics.visitor.goals}`
                          : "Esperando el resultado"}
                      </Typography>
                      {expandedMatchId === match._id && (
                        <Accordion expanded>
                          <AccordionSummary>
                            <Typography>Detalles del Partido</Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            <ShowResultMatch
                              matchId={match._id}
                              visitorName={match.awayTeam.name}
                              localName={match.homeTeam.name}
                            />
                          </AccordionDetails>
                        </Accordion>
                      )}
                    </CardContent>
                  </Card>
                </ListItem>
              ))}
          </List>
        </Box>
      )}
    </Container>
  );
};

export default ShowResultsForFecha;
