/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useBoundStore } from "../../../stores";
import { useParams } from "react-router-dom";
import {
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    TableSortLabel,
    Paper
  } from '@mui/material';

export const TableAllTeamSeason = () => {
    const {seasonId} = useParams()
  const { getTeamStatsForSeason, teamStatsForSeason } = useBoundStore(
    (state) => state
  );

  useEffect(() => {
    getTeamStatsForSeason({ seasonId });
  }, [seasonId, getTeamStatsForSeason]);
console.log("TABLA", teamStatsForSeason)



  
  const [orderBy, setOrderBy] = useState('teamName');
  const [order, setOrder] = useState('asc');

  const handleSortRequest = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortedTeams = teamStatsForSeason.sort((a, b) => {
    let comparison = 0;
    if (orderBy === 'teamName') {
      // Ordenar por nombre de equipo
      comparison = a.teamName.localeCompare(b.teamName);
    } else {
      // Ordenar por estadística
      const statA = a.statistics[orderBy];
      const statB = b.statistics[orderBy];
      comparison = statA - statB;
    }
    return order === 'desc' ? comparison * -1 : comparison;
  });
  

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <TableSortLabel
                active={orderBy === 'teamName'}
                direction={orderBy === 'teamName' ? order : 'asc'}
                onClick={() => handleSortRequest('teamName')}
              >
                Equipo
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === 'goals'}
                direction={orderBy === 'goals' ? order : 'asc'}
                onClick={() => handleSortRequest('goals')}
              >
                Goles
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === 'offsides'}
                direction={orderBy === 'offsides' ? order : 'asc'}
                onClick={() => handleSortRequest('offsides')}
              >
                OffSide
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === 'yellowCards'}
                direction={orderBy === 'yellowCards' ? order : 'asc'}
                onClick={() => handleSortRequest('yellowCards')}
              >
                Amarillas
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === 'redCards'}
                direction={orderBy === 'redCards' ? order : 'asc'}
                onClick={() => handleSortRequest('redCards')}
              >
                Rojas
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === 'corners'}
                direction={orderBy === 'corners' ? order : 'asc'}
                onClick={() => handleSortRequest('corners')}
              >
                Corners
              </TableSortLabel>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedTeams.map((team) => (
            <TableRow key={team.teamId}>
              <TableCell>{team.teamName}</TableCell>
              <TableCell>{team.statistics.goals}</TableCell>
              <TableCell>{team.statistics.offsides}</TableCell>
              <TableCell>{team.statistics.yellowCards}</TableCell>
              <TableCell>{team.statistics.redCards}</TableCell>
              <TableCell>{team.statistics.corners}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

