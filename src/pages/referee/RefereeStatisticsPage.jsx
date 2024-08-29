import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { BACKEND_URL_BASE } from '../../stores/url_base';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Divider,
  Box,
  Grid,
} from '@mui/material';
import { green, red, blue } from '@mui/material/colors';
export const RefereeStatisticsPage = () => {
  const { idReferee } = useParams(); // Obtener el idReferee de los parámetros de la URL
  const [statistics, setStatistics] = useState(null);

  useEffect(() => {
    // Llamada a la API para obtener las estadísticas del árbitro
    const fetchStatistics = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL_BASE}/referees/statistics`, {
          params: {
            refereeId: idReferee,
          }
        });
        setStatistics(response.data);
      } catch (error) {
        console.error('Error al obtener las estadísticas del árbitro:', error);
      }
    };

    fetchStatistics();
  }, [idReferee]);
console.log("statistics",statistics)
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Estadísticas del Árbitro
      </Typography>
      {statistics ? (
        <div>
          
          <Card variant="outlined" sx={{ marginBottom: 2}}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Árbitro: {statistics.name}
            </Typography>
            <Typography variant="h6" gutterBottom>
              Partidos dirigidos: {statistics.totalMatches}
            </Typography>
            <Typography variant="span"  gutterBottom>
              Torneos: POR PROGRAMAR (Por ahora todos)
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
                  Por Programar
                </Typography>
              </Grid>
              <Grid item xs={4} sx={{ textAlign: 'center', backgroundColor: blue[50], padding: 1 }}>
                <Typography variant="body1" color={blue[600]}>
                  % Triunfo
                </Typography>
              </Grid>
              <Grid item xs={4} sx={{ textAlign: 'center', backgroundColor: blue[50], padding: 1 }}>
                <Typography variant="body1">
                  Por Programar
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

          <Typography variant="h5" gutterBottom color={green[800]}>
            Estadísticas de Equipos
          </Typography>
          <TableContainer component={Paper} sx={{ marginBottom: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Nombre del Equipo</TableCell>
                  <TableCell>Faltas Locales</TableCell>
                  <TableCell>Faltas Visitantes</TableCell>
                  <TableCell>Tarjetas Amarillas Locales</TableCell>
                  <TableCell>Tarjetas Amarillas Visitantes</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {statistics.teamStatistics.map((teamStat, index) => (
                  <TableRow key={index}>
                    <TableCell>{teamStat.teamName}</TableCell>
                    <TableCell>{teamStat.totalFoulsHome}</TableCell>
                    <TableCell>{teamStat.totalFoulsAway}</TableCell>
                    <TableCell>{teamStat.totalYellowCardsHome}</TableCell>
                    <TableCell>{teamStat.totalYellowCardsAway}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Typography variant="h5" gutterBottom color={green[800]}>
            Partidos Considerados
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Equipo Local</TableCell>
                  <TableCell>Equipo Visitante</TableCell>
                  <TableCell>Fecha</TableCell>
                  <TableCell>Faltas Local</TableCell>
                  <TableCell>Faltas Visitante</TableCell>
                  <TableCell>Tarjetas Amarillas Locales</TableCell>
                  <TableCell>Tarjetas Amarillas Visitantes</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {statistics.consideredMatches.map((match, index) => (
                  <TableRow key={index}>
                    <TableCell>{match.homeTeam}</TableCell>
                    <TableCell>{match.awayTeam}</TableCell>
                    <TableCell>{new Date(match.date).toLocaleDateString()}</TableCell>
                    <TableCell>{match.teamStatistics.local.fouls || 0}</TableCell>
                    <TableCell>{match.teamStatistics.visitor.fouls || 0}</TableCell>
                    <TableCell>{match.teamStatistics.local.yellowCards || 0}</TableCell>
                    <TableCell>{match.teamStatistics.visitor.yellowCards || 0}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      ) : (
        <Typography>Cargando...</Typography>
      )}
    </Container>
  );
};
