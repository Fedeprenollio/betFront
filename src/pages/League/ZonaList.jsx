/* eslint-disable react/prop-types */
import React from 'react';
import {
  Button,
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  Box
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import { BACKEND_URL_BASE } from '../../stores/url_base';

export const ZonaList = ({
  zone,
  handleRemoveTeam,
  handleRemoveZone,
  selectedTeamsToAdd,
  setSelectedTeamsToAdd,
  teamsStore,
  handleConfirmAddTeams,
  selectedCountry
}) => {


  const deleteZone = async (seasonId, zoneId) => {
    try {
      await axios.delete(`${BACKEND_URL_BASE}/zones/seasons/${seasonId}/zones/${zoneId}`);
      handleRemoveZone(zoneId); // Llama la función para actualizar el estado en el frontend
    } catch (error) {
      console.error('Error al eliminar la zona:', error);
    }
  };

  return (
    <div>
      <Box display="flex" alignItems="center" mb={2}>
        <Typography variant="h5" gutterBottom sx={{ mr: 1 }}>
          Zona: {zone?.zoneName}
        </Typography>
        <IconButton
          aria-label="delete"
          onClick={() => deleteZone( "2313",zone._id)}
        >
          <DeleteIcon color="secondary" />
        </IconButton>
      </Box>
      <List>
        {zone.teams.map((team, teamIndex) => (
          <ListItem key={teamIndex} divider sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <ListItemText primary={team.name} sx={{ mr: 1 }} />
            <IconButton
              aria-label="delete"
              onClick={() => handleRemoveTeam(zone._id, team._id)}
            >
              <DeleteIcon color="secondary" />
            </IconButton>
          </ListItem>
        ))}
      </List>
      <FormControl fullWidth sx={{ m: 2, minWidth: 120 }}>
        <InputLabel>Agregar equipo</InputLabel>
        <Select
          value={selectedTeamsToAdd[zone._id] || []}
          multiple
          onChange={(event) => {
            const selectedTeams = event.target.value;
            setSelectedTeamsToAdd((prev) => ({
              ...prev,
              [zone._id]: selectedTeams,
            }));
          }}
          renderValue={(selected) =>
            selected
              .map(
                (teamId) => teamsStore.find((team) => team._id === teamId)?.name
              )
              .join(", ") || <em>Selecciona un equipo</em>
          }
        >
          {teamsStore
            ?.filter(
              (team) =>
                team.country === selectedCountry &&
                !zone.teams.some((zTeam) => zTeam._id === team._id)
            )
            .map((team) => (
              <MenuItem key={team._id} value={team._id}>
                <Checkbox
                  checked={
                    selectedTeamsToAdd[zone._id]?.includes(team._id) || false
                  }
                />
                <ListItemText primary={team.name} />
              </MenuItem>
            ))}
        </Select>
      </FormControl>
      <Button
        onClick={() => handleConfirmAddTeams(zone._id)}
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        sx={{ m: 2 }}
      >
        Aceptar
      </Button>
    </div>
  );
};
