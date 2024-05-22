import React, { useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useBoundStore } from '../../stores';

const ShowResultMatch = ({ matchId, visitorName, localName }) => {
  const { getMatchDetail, matchDetail } = useBoundStore((state) => state);

  useEffect(() => {
    const fetchMatchDetail = async () => {
      await getMatchDetail({ idMatch: matchId });
    };
    fetchMatchDetail();
  }, [getMatchDetail, matchId]);

  return (
    matchDetail && (
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={4}>
        <Typography variant="h6" gutterBottom align="center">
            {localName}
          </Typography>
          <Typography variant="body1" gutterBottom align="center">
            {matchDetail.teamStatistics?.local?.goals}
          </Typography>
          <Typography variant="body1" gutterBottom align="center">
             {matchDetail.teamStatistics?.local?.shots}
          </Typography>
          <Typography variant="body1" gutterBottom align="center">
            {matchDetail.teamStatistics?.local?.shotsOnTarget}
          </Typography>
          <Typography variant="body1" gutterBottom align="center">
        {matchDetail.teamStatistics?.local?.possession}
          </Typography>
          <Typography variant="body1" gutterBottom align="center">
           {matchDetail.teamStatistics?.local?.foults}
          </Typography>
          <Typography variant="body1" gutterBottom align="center">
            {matchDetail.teamStatistics?.local?.yellowCards}
          </Typography>
          {/* <Typography variant="body1" gutterBottom align="center">
            {matchDetail.teamStatistics?.local?.redCards}
          </Typography> */}
          <Typography variant="body1" gutterBottom align="center">
            {matchDetail.teamStatistics?.local?.corners}
          </Typography>
          <Typography variant="body1" gutterBottom align="center">
             {matchDetail.teamStatistics?.local?.offsides}
          </Typography>
          
        </Grid>
        <Grid item xs={4}>
          <Typography variant="h6" gutterBottom align="center">
            Estadísticas
          </Typography>
          {/* Puedes dejar esta columna en blanco o agregar un título */}
          <Typography variant="body1" gutterBottom align="center">
            Goles
          </Typography>
          <Typography variant="body1" gutterBottom align="center">
            Tiros Totales
          </Typography>
          <Typography variant="body1" gutterBottom align="center">
            Tiros al arco
          </Typography>
          <Typography variant="body1" gutterBottom align="center">
            Posesión (%)
          </Typography>
          <Typography variant="body1" gutterBottom align="center">
            Faltas
          </Typography>
          <Typography variant="body1" gutterBottom align="center">
            Tarjetas Amarillas
          </Typography>
          {/* <Typography variant="body1" gutterBottom align="center">
            Tarjetas Rojas
          </Typography> */}
          <Typography variant="body1" gutterBottom align="center">
            Córners
          </Typography>
          <Typography variant="body1" gutterBottom align="center">
            Offsides
          </Typography>
        </Grid>
        <Grid item xs={4}>
        <Typography variant="h6" gutterBottom align="center">
            {visitorName}
          </Typography>
          <Typography variant="body1" gutterBottom align="center">
            {matchDetail.teamStatistics?.visitor?.goals}
          </Typography>
          <Typography variant="body1" gutterBottom align="center">
             {matchDetail.teamStatistics?.visitor?.shots}
          </Typography>
          <Typography variant="body1" gutterBottom align="center">
            {matchDetail.teamStatistics?.visitor?.shotsOnTarget}
          </Typography>
          <Typography variant="body1" gutterBottom align="center">
            {matchDetail.teamStatistics?.visitor?.possession}
          </Typography>
          <Typography variant="body1" gutterBottom align="center">
          {matchDetail.teamStatistics?.visitor?.foults}
          </Typography>
          <Typography variant="body1" gutterBottom align="center">
            {matchDetail.teamStatistics?.visitor?.yellowCards}
          </Typography>
          {/* <Typography variant="body1" gutterBottom align="center">
             {matchDetail.teamStatistics?.visitor?.redCards}
          </Typography> */}
          <Typography variant="body1" gutterBottom align="center">
           {matchDetail.teamStatistics?.visitor?.corners}
          </Typography>
          <Typography variant="body1" gutterBottom align="center">
             {matchDetail.teamStatistics?.visitor?.offsides}
          </Typography>
        </Grid>
      </Grid>
    )
  );
};

export default ShowResultMatch;
