/* eslint-disable react/prop-types */
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import { green } from '@mui/material/colors'
import React from 'react'

export const StatisticsOfRefereeTeams = ({statistics}) => {
  return (
    <>
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

    </>
  )
}
