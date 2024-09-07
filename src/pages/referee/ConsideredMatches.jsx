/* eslint-disable react/prop-types */
import React from 'react';
import { Box, Paper, Typography, Grid } from '@mui/material';
import { green, grey } from '@mui/material/colors';

export const ConsideredMatches = ({ statistics }) => {
  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom color={green[800]} sx={{ fontWeight: 'bold', textAlign: 'center' }}>
        Partidos Considerados
      </Typography>
      {statistics.consideredMatches.map((match, index) => (
        <Paper
          key={index}
          elevation={3}
          sx={{
            borderRadius: 2,
            p: 4,
            mb: 4,
            backgroundColor: grey[100],
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {/* Información de los equipos */}
          <Grid container spacing={4} alignItems="center" justifyContent="center">
            {/* Equipo Local: Logo + Estadísticas */}
            <Grid item xs={3} textAlign="right">
              <Box display="flex" flexDirection="column" alignItems="center">
                <Box
                  component="img"
                  src={match.homeLogo}
                  alt={`${match.homeTeam} logo`}
                  sx={{
                    width: { xs: 50, sm: 70, md: 100 }, // Tamaño responsivo
                    height: 'auto',
                    mb: 1,
                  }}
                />
                <Typography variant="h6" fontWeight="bold">
                  {match.homeTeam}
                </Typography>
                <Typography variant="body1">Faltas: {match.teamStatistics.local.foults || 0}</Typography>
                <Typography variant="body1">Tarjetas Amarillas: {match.teamStatistics.local.yellowCards || 0}</Typography>
              </Box>
            </Grid>

            {/* Información central: VS y detalles del partido */}
            <Grid item xs={6} textAlign="center">
              <Typography variant="h5" fontWeight="bold">
                VS
              </Typography>
              <Typography variant="body2">{match.leagueName}</Typography>
              <Typography variant="body2">Fecha: {new Date(match.date).toLocaleDateString()}</Typography>
              <Typography variant="body2">Ronda: {match.round}</Typography>
              <Typography variant="body2">Temporada: {match.season}</Typography>
            </Grid>

            {/* Equipo Visitante: Logo + Estadísticas */}
            <Grid item xs={3} textAlign="left">
              <Box display="flex" flexDirection="column" alignItems="center">
                <Box
                  component="img"
                  src={match.awayLogo}
                  alt={`${match.awayTeam} logo`}
                  sx={{
                    width: { xs: 50, sm: 70, md: 100 }, // Tamaño responsivo
                    height: 'auto',
                    mb: 1,
                  }}
                />
                <Typography variant="h6" fontWeight="bold">
                  {match.awayTeam}
                </Typography>
                <Typography variant="body1">Faltas: {match.teamStatistics.visitor.foults || 0}</Typography>
                <Typography variant="body1">Tarjetas Amarillas: {match.teamStatistics.visitor.yellowCards || 0}</Typography>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      ))}
    </Box>
  );
};
