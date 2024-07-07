import React, { useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper } from '@mui/material';
import { useBoundStore } from '../../stores';

const ShowResultMatch = ({ matchId, visitorName, localName }) => {
  const { getMatchDetail, matchDetail } = useBoundStore((state) => state);

  useEffect(() => {
    const fetchMatchDetail = async () => {
      await getMatchDetail({ idMatch: matchId });
    };
    fetchMatchDetail();
  }, [getMatchDetail, matchId]);
console.log("matchDetail.teamStatistics?.visitor?",matchDetail.teamStatistics?.visitor)
  return (
    matchDetail && (
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{maxWidth:"75px"}} align="center" className="team-name">{localName}</TableCell>
              <TableCell align="center" className="stats-column"></TableCell>
              <TableCell sx={{maxWidth:"75px"}} align="center" className="team-name">{visitorName}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell align="center">{matchDetail.teamStatistics?.local?.goals}</TableCell>
              <TableCell align="center">Goles</TableCell>
              <TableCell align="center">{matchDetail.teamStatistics?.visitor?.goals}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center">{matchDetail.teamStatistics?.local?.shots}</TableCell>
              <TableCell align="center">Tiros Totales</TableCell>
              <TableCell align="center">{matchDetail.teamStatistics?.visitor?.shots}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center">{matchDetail.teamStatistics?.local?.shotsOnTarget}</TableCell>
              <TableCell align="center">Tiros al arco</TableCell>
              <TableCell align="center">{matchDetail.teamStatistics?.visitor?.shotsOnTarget}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center">{matchDetail.teamStatistics?.local?.possession}</TableCell>
              <TableCell align="center">Posesión (%)</TableCell>
              <TableCell align="center">{matchDetail.teamStatistics?.visitor?.possession}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center">{matchDetail.teamStatistics?.local?.foults}</TableCell>
              <TableCell align="center">Faltas</TableCell>
              <TableCell align="center">{matchDetail.teamStatistics?.visitor?.foults}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center">{matchDetail.teamStatistics?.local?.yellowCards}</TableCell>
              <TableCell align="center">Tarjetas Amarillas</TableCell>
              <TableCell align="center">{matchDetail.teamStatistics?.visitor?.yellowCards}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center">{matchDetail.teamStatistics?.local?.corners}</TableCell>
              <TableCell align="center">Córners</TableCell>
              <TableCell align="center">{matchDetail.teamStatistics?.visitor?.corners}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center">{matchDetail.teamStatistics?.local?.offsides}</TableCell>
              <TableCell align="center">Offsides</TableCell>
              <TableCell align="center">{matchDetail.teamStatistics?.visitor?.offsides}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    )
  );
};

export default ShowResultMatch;
