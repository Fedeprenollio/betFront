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
      
    </Box>
  );
};