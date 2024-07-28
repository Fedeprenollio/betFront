/* eslint-disable react/prop-types */
import { Box, Button, Typography } from '@mui/material';
import { useBoundStore } from '../../../../stores';
import { SelectTeamById } from '../SelectTeamById';

export const AddMoreTeamComparative = ({ onSetIdTeamSecond, secondTeamComparative, homeOnly, awayOnly ,homeOnlySecondTeamComparative,awayOnlySecondTeamComparative,firstTeam}) => {

  const {setTeams, teams } = useBoundStore((state) => state);
  
  const handleTeamSelect = (teamId) => {
    onSetIdTeamSecond(teamId); // O la función que maneja el ID del segundo equipo
  };

  return (
    <Box sx={{ my: 2 }}>
      <Typography variant="h6">Comparar con otro equipo</Typography>
      {/* <Button 
        variant="contained" 
        color="primary" 
        onClick={handleAddTeamClick}
        // disabled={secondTeamComparative !== null} // Deshabilita el botón si ya hay un segundo equipo
      >
       Seleccionar equipo para comparar
      </Button> */}
      <SelectTeamById onTeamSelect={handleTeamSelect} />
      <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle1">Estadísticas del equipo :</Typography>
          <Typography variant="body1">{firstTeam?.name}</Typography>
          {/* Aquí puedes añadir más detalles sobre las estadísticas del segundo equipo */}
          <Typography variant="body2">Partidos en casa: {homeOnly ? 'Sí' : 'No'}</Typography>
          <Typography variant="body2">Partidos fuera: {awayOnly ? 'Sí' : 'No'}</Typography>
        </Box>
      {secondTeamComparative && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle1">Estadísticas del equipo comparado:</Typography>
          <Typography variant="body1">{secondTeamComparative?.name}</Typography>
          {/* Aquí puedes añadir más detalles sobre las estadísticas del segundo equipo */}
          <Typography variant="body2">Partidos en casa: {homeOnlySecondTeamComparative ? 'Sí' : 'No'}</Typography>
          <Typography variant="body2">Partidos fuera: {awayOnlySecondTeamComparative ? 'Sí' : 'No'}</Typography>
        </Box>
      )}
    </Box>
  );
};