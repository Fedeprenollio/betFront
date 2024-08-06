/* eslint-disable react/prop-types */
import React from 'react';
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Divider,
  Box,
  IconButton
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import dayjs from 'dayjs';

import { BACKEND_URL_BASE } from '../../stores/url_base';

export const ListMatchesCreates = ({ listMatchesCreated,setListMatchesCreated }) => {
    const onDelete= async(id)=>{
       const response = await axios.delete(`${BACKEND_URL_BASE}/match/${id}`)

       setListMatchesCreated(prevState=> prevState.flat().filter(match => match._id !== id))
       console.log("RESPONSED DELETE", response.data)
    }

console.log("listMatchesCreated",listMatchesCreated)
  return (
    <Box sx={{ width: '100%', bgcolor: 'background.paper', marginTop: 2 }}>
      <Typography variant="h6" gutterBottom>
        Lista de Partidos Creados Recientemente
      </Typography>
      <List>
        {listMatchesCreated.flat().map((match, index) => (
          <React.Fragment key={match._id}>
            <ListItem
              secondaryAction={
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => onDelete(match._id)}
                >
                  <DeleteIcon />
                </IconButton>
              }
            >
              <ListItemText
                primary={`${match.homeTeam.name} vs ${match.awayTeam.name}`}
                secondary={
                  <>
                    <Typography component="span" variant="body2" color="text.primary">
                      Fecha: {match.round} | Día: {dayjs(match.date).format('DD/MM/YYYY')} | Liga: {match.league.name} | Temporada: {match.seasonYear.year} 
                    </Typography>
                  </>
                }
              />
            </ListItem>
            {index < listMatchesCreated.flat().length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
};
