/* eslint-disable react/prop-types */
import { Card, CardContent, Divider, Grid, Typography } from '@mui/material'
import { blue, green, red } from '@mui/material/colors'
import React from 'react'

export const RefereeStatistics = ({statistics}) => {
  console.log("statisticsstatistics",statistics)
    // Obtener una lista de ligas con temporadas únicas
    const uniqueTournaments = Array.from(
      new Set(
        statistics.consideredMatches?.map(
          (match) => `${match.leagueName} (${match.season})`
        )
      )
    );
  
  return (
    <Card variant="outlined" sx={{ marginBottom: 2}}>
    <CardContent>
      <Typography variant="h5" gutterBottom>
        Árbitro: {statistics.name}
      </Typography>
      <Typography variant="h6" gutterBottom>
        Partidos dirigidos contabilizados: {statistics.consideredMatches?.length}
      </Typography>
      <Typography variant="span" gutterBottom>
          Torneos: {uniqueTournaments.join(', ') || 'Por programar (Por ahora todos)'}
        </Typography>
      {/* <Typography variant="subtitle1" color={green[700]}>
        Nombre del Equipo: {statistics.teamName}
      </Typography> */}

      <Divider sx={{ marginY: 2 }} />

      <Grid container spacing={2}>
        {/* Título de las columnas */}
        <Grid item xs={4} sx={{ textAlign: 'center', fontWeight: 'bold', color: green[700] }}>
          <Typography variant="subtitle2">
            Equipo Local
          </Typography>
        </Grid>
        <Grid item xs={4} sx={{ textAlign: 'center', fontWeight: 'bold', color: green[700] }}>
          <Typography variant="subtitle2">
            Estadística
          </Typography>
        </Grid>
        <Grid item xs={4} sx={{ textAlign: 'center', fontWeight: 'bold', color: green[700] }}>
          <Typography variant="subtitle2">
            Equipo Visitante
          </Typography>
        </Grid>

        {/* Datos de las estadísticas */}
        {/* Faltas */}
        <Grid item xs={4} sx={{ textAlign: 'center', backgroundColor: green[50], padding: 1 }}>
          <Typography variant="body1">
            {statistics.totalFoulsHome}
          </Typography>
        </Grid>
        <Grid item xs={4} sx={{ textAlign: 'center', backgroundColor: green[50], padding: 1 }}>
          <Typography variant="body1" color={blue[600]}>
            Faltas
          </Typography>
        </Grid>
        <Grid item xs={4} sx={{ textAlign: 'center', backgroundColor: green[50], padding: 1 }}>
          <Typography variant="body1">
            {statistics.totalFoulsAway}
          </Typography>
        </Grid>

        <Grid item xs={4} sx={{ textAlign: 'center', backgroundColor: green[50], padding: 1 }}>
          <Typography variant="body1">
            {statistics.foulsHomeStats?.mean?.toFixed(2)}
          </Typography>
        </Grid>
        <Grid item xs={4} sx={{ textAlign: 'center', backgroundColor: green[50], padding: 1 }}>
          <Typography variant="body1" color={blue[600]}>
            Faltas Media
          </Typography>
        </Grid>
        <Grid item xs={4} sx={{ textAlign: 'center', backgroundColor: green[50], padding: 1 }}>
          <Typography variant="body1">
            {statistics.foulsAwayStats?.mean?.toFixed(2)}
          </Typography>
        </Grid>

        <Grid item xs={4} sx={{ textAlign: 'center', backgroundColor: green[50], padding: 1 }}>
          <Typography variant="body1">
            {statistics.foulsHomeStats?.median?.toFixed(2)}
          </Typography>
        </Grid>
        <Grid item xs={4} sx={{ textAlign: 'center', backgroundColor: green[50], padding: 1 }}>
          <Typography variant="body1" color={blue[600]}>
            Faltas Mediana
          </Typography>
        </Grid>
        <Grid item xs={4} sx={{ textAlign: 'center', backgroundColor: green[50], padding: 1 }}>
          <Typography variant="body1">
            {statistics.foulsAwayStats?.median?.toFixed(2)}
          </Typography>
        </Grid>

        <Grid item xs={4} sx={{ textAlign: 'center', backgroundColor: green[50], padding: 1 }}>
          <Typography variant="body1">
            {statistics.foulsHomeStats?.stdDev?.toFixed(2)}
          </Typography>
        </Grid>
        <Grid item xs={4} sx={{ textAlign: 'center', backgroundColor: green[50], padding: 1 }}>
          <Typography variant="body1" color={blue[600]}>
            Faltas DE
          </Typography>
        </Grid>
        <Grid item xs={4} sx={{ textAlign: 'center', backgroundColor: green[50], padding: 1 }}>
          <Typography variant="body1">
            {statistics.foulsAwayStats?.stdDev?.toFixed(2)}
          </Typography>
        </Grid>

        {/* Amarillas */}
        <Grid item xs={4} sx={{ textAlign: 'center', backgroundColor: red[50], padding: 1 }}>
          <Typography variant="body1">
            {statistics.totalYellowCardsHome}
          </Typography>
        </Grid>
        <Grid item xs={4} sx={{ textAlign: 'center', backgroundColor: red[50], padding: 1 }}>
          <Typography variant="body1" color={blue[600]}>
            Amarillas
          </Typography>
        </Grid>
        <Grid item xs={4} sx={{ textAlign: 'center', backgroundColor: red[50], padding: 1 }}>
          <Typography variant="body1">
            {statistics.totalYellowCardsAway}
          </Typography>
        </Grid>

        <Grid item xs={4} sx={{ textAlign: 'center', backgroundColor: red[50], padding: 1 }}>
          <Typography variant="body1">
            {statistics.yellowCardsHomeStats?.mean?.toFixed(2)}
          </Typography>
        </Grid>
        <Grid item xs={4} sx={{ textAlign: 'center', backgroundColor: red[50], padding: 1 }}>
          <Typography variant="body1" color={blue[600]}>
            Amarillas Media
          </Typography>
        </Grid>
        <Grid item xs={4} sx={{ textAlign: 'center', backgroundColor: red[50], padding: 1 }}>
          <Typography variant="body1">
            {statistics.yellowCardsAwayStats?.mean?.toFixed(2)}
          </Typography>
        </Grid>

        <Grid item xs={4} sx={{ textAlign: 'center', backgroundColor: red[50], padding: 1 }}>
          <Typography variant="body1">
            {statistics.yellowCardsHomeStats?.median?.toFixed(2)}
          </Typography>
        </Grid>
        <Grid item xs={4} sx={{ textAlign: 'center', backgroundColor: red[50], padding: 1 }}>
          <Typography variant="body1" color={blue[600]}>
            Amarillas Mediana
          </Typography>
        </Grid>
        <Grid item xs={4} sx={{ textAlign: 'center', backgroundColor: red[50], padding: 1 }}>
          <Typography variant="body1">
            {statistics.yellowCardsAwayStats?.median?.toFixed(2)}
          </Typography>
        </Grid>

        <Grid item xs={4} sx={{ textAlign: 'center', backgroundColor: red[50], padding: 1 }}>
          <Typography variant="body1">
            {statistics.yellowCardsHomeStats?.stdDev?.toFixed(2)}
          </Typography>
        </Grid>
        <Grid item xs={4} sx={{ textAlign: 'center', backgroundColor: red[50], padding: 1 }}>
          <Typography variant="body1" color={blue[600]}>
            Amarillas DE
          </Typography>
        </Grid>
        <Grid item xs={4} sx={{ textAlign: 'center', backgroundColor: red[50], padding: 1 }}>
          <Typography variant="body1">
            {statistics.yellowCardsAwayStats?.stdDev?.toFixed(2)}
          </Typography>
        </Grid>



        <Grid item xs={4} sx={{ textAlign: 'center', backgroundColor: blue[50], padding: 1 }}>
          <Typography variant="body1">
           {statistics.homeWinPercentage} % triunfo locales
          </Typography>
        </Grid>
        <Grid item xs={4} sx={{ textAlign: 'center', backgroundColor: blue[50], padding: 1 }}>
          <Typography variant="body1" color={blue[600]}>
            {statistics.drawPercentage} % empates
          </Typography>
        </Grid>
        <Grid item xs={4} sx={{ textAlign: 'center', backgroundColor: blue[50], padding: 1 }}>
          <Typography variant="body1">
           {statistics.awayWinPercentage  } % triunfo visitantes
          </Typography>
        </Grid>
      </Grid>
    </CardContent>
  </Card>
  )
}
