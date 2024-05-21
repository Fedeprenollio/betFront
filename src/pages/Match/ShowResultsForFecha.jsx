import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
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
} from "@mui/material";

export const ShowResultsForFecha = () => {
  const { seasonId } = useParams();
  const { seasonById, getSeasonById } = useBoundStore((state) => state);
  const [selectedFecha, setSelectedFecha] = useState(null);
  const [selectedSeason, setSelectedSeason] = useState("");
  const navigate = useNavigate();

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

    // Identificar la temporada actual y establecerla como seleccionada
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

  return (
    <Container>
      <Grid container spacing={3} alignItems="center">
        <Grid item xs={12} sm={2}>
          <Typography variant="h6" gutterBottom>
            Temporadas:
          </Typography>
        </Grid>
        <Grid item xs={12} sm={10}>
          <Container style={{ display: "flex", flexWrap: "wrap", gap: "10px", padding: 0 }}>
            {seasonById?.season?.league?.season?.map((season) => (
              <Button
                color="inherit"
                key={season._id}
                onClick={() => handleSeasonClick(season._id)}
                variant={selectedSeason === season._id ? "outlined" : "text"}
              >
                {season.year}
              </Button>
            ))}
          </Container>
        </Grid>
      </Grid>

      <Grid container spacing={1} alignItems="center">
        <Grid item xs={12} sm={2}>
          <Typography variant="h6" gutterBottom>
            Fechas:
          </Typography>
        </Grid>
        <Grid item xs={12} sm={10}>
          <Container style={{ display: "flex", flexWrap: "wrap", gap: "6px", padding: 0 }}>
            {seasonById?.season?.fechas?.map((fecha) => (
              <Button
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
          </Container>
        </Grid>
      </Grid>

      <Container>
        {selectedFecha && (
          <Container>
            <Typography variant="h6" gutterBottom>
              Partidos para la Fecha {selectedFecha.number}
            </Typography>
            <List>
              {seasonById?.season?.fechas
                ?.find((fecha) => fecha._id === selectedFecha._id)
                ?.matches?.map((match) => (
                  <ListItem key={match._id} disableGutters>
                    <Link
                      className="link-no-underline"
                      style={{ width: "100%" }}
                      to={`/stats/${match.homeTeam._id}/${match.awayTeam._id}/${match._id}`}
                    >
                      <Card style={{ width: "100%", marginBottom: "10px" }}>
                        <CardContent>
                          <Typography variant="h6" component="div">
                            {`${match.homeTeam.name} - ${match.awayTeam.name}`}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            {match.isFinished
                              ? `${match.teamStatistics.local.goals} - ${match.teamStatistics.visitor.goals}`
                              : "Upcoming Match"}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Link>
                  </ListItem>
                ))}
            </List>
          </Container>
        )}
      </Container>
    </Container>
  );
};
