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
import { ConsideredMatches } from './ConsideredMatches';
import { RefereeStatistics } from './RefereeStatistics';
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
          
        <RefereeStatistics statistics={statistics}/>

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

         <ConsideredMatches statistics={statistics}/>
        </div>
      ) : (
        <Typography>Cargando...</Typography>
      )}
    </Container>
  );
};
