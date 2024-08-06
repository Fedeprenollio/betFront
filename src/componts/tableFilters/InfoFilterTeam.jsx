/* eslint-disable react/prop-types */
import { Box, Typography, Paper, Divider, Chip } from "@mui/material";
import { useBoundStore } from "../../stores";
import { useEffect, useState } from "react";

export const InfoFilterTeam = ({
  team,
  homeOnly,
  awayOnly,
  selectedSeasons,
  positionFilter
}) => {
  const { getAllCurrentSeasons, allCurrentSeasons, error, seasons, fetchSeasons } = useBoundStore((state) => state);
  const [infoSeasonSelected, setInfoSeasonSelected] = useState([]);

  useEffect(() => {
    fetchSeasons();
    const seasonSelected = seasons.filter(season => selectedSeasons.includes(season?._id));
    setInfoSeasonSelected(seasonSelected);
    console.log("seasonSelected", seasonSelected);
  }, [fetchSeasons, selectedSeasons]);


  return (
    <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
      <Box sx={{ mt: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>Filtros del equipo:</Typography>
        <Typography variant="h5" sx={{ mb: 1, color: 'primary.main' }}>{team?.name}</Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="body1" sx={{ mb: 1 }}>
          <strong>Partidos en casa:</strong> {homeOnly ? "Sí" : "No"}
        </Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>
          <strong>Partidos fuera:</strong> {awayOnly ? "Sí" : "No"}
        </Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>
          <strong>Temporadas seleccionadas:</strong>
          <Box component="span" sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
            {infoSeasonSelected.map(season => (
              <Chip
                key={season._id}
                label={`${season.league.name} (${season.year})`}
                variant="outlined"
                sx={{ borderRadius: 1 }}
              />
            ))}
          </Box>
          {infoSeasonSelected.length === 1 && (
            <Typography  variant="body1"  sx={{ mb: 1 }}>
              Rango de búsqueda de posisión de los rivales: {positionFilter}
            </Typography>
          )}
        </Typography>
      </Box>
    </Paper>
  );
};

// {secondTeamComparative && (
//     <Box sx={{ mt: 2 }}>
//       <Typography variant="subtitle1">Estadísticas del equipo comparado:</Typography>
//       <Typography variant="body1">{secondTeamComparative?.name}</Typography>
//       {/* Aquí puedes añadir más detalles sobre las estadísticas del segundo equipo */}
//       <Typography variant="body2">Partidos en casa: {homeOnlySecondTeamComparative ? 'Sí' : 'No'}</Typography>
//       <Typography variant="body2">Partidos fuera: {awayOnlySecondTeamComparative ? 'Sí' : 'No'}</Typography>
//     </Box>
//   )}
