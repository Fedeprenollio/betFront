import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { BACKEND_URL_BASE } from '../../stores/url_base';
import { Container, Typography, Card, CardContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

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
          <Card variant="outlined" sx={{ marginBottom: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Árbitro: {statistics.name}
              </Typography>
              <Typography variant="subtitle1">
                Nombre del Equipo: {statistics.teamName}
              </Typography>
              <Typography variant="body1">
                Faltas Totales Local: {statistics.totalFoulsHome}
              </Typography>
              <Typography variant="body1">
                Faltas Totales Visitante: {statistics.totalFoulsAway}
              </Typography>
              <Typography variant="body1">
                Tarjetas Amarillas Totales Local: {statistics.totalYellowCardsHome}
              </Typography>
              <Typography variant="body1">
                Tarjetas Amarillas Totales Visitante: {statistics.totalYellowCardsAway}
              </Typography>
            </CardContent>
          </Card>

          <Typography variant="h5" gutterBottom>
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

          <Typography variant="h5" gutterBottom>
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
                    <TableCell>{match.teamStatistics.local.foults || 0}</TableCell>
                    <TableCell>{match.teamStatistics.visitor.foults || 0}</TableCell>
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
