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
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

export const ZonaList = ({
  zone,
  handleRemoveTeam,
  selectedTeamsToAdd,
  setSelectedTeamsToAdd,
  teamsStore,
  handleConfirmAddTeams,
  selectedCountry
}) => {
  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Zona: {zone?.zoneName}
      </Typography>
      <List>
        {zone.teams.map((team, teamIndex) => (
          <ListItem key={teamIndex} divider>
            <ListItemText primary={team.name} />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => handleRemoveTeam(zone._id, team._id)}
              >
                <DeleteIcon color="secondary" />
              </IconButton>
            </ListItemSecondaryAction>
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
