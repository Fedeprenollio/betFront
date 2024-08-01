import { useState } from "react";
import { useSeasons } from "../../customHooks/useSeasons";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, List, ListItem, ListItemText, Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

export const SeasonPage = () => {
    const { seasons, error, deleteSeason } = useSeasons();
    const [open, setOpen] = useState(false);
    const [selectedSeason, setSelectedSeason] = useState(null);
  
    const handleClickOpen = (seasonId) => {
      setSelectedSeason(seasonId);
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
      setSelectedSeason(null);
    };
  
    const handleDelete = async () => {
      await deleteSeason(selectedSeason);
      handleClose();
    };
  
    if (error) {
      return <Typography color="error">Error: {error.message}</Typography>;
    }
  
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          List of Seasons
        </Typography>
        <List>
          {seasons?.map((season) => (
            <ListItem key={season._id} divider>
              <ListItemText primary={`${season.league.name} - ${season.year}`} />
              <IconButton edge="end" aria-label="delete" onClick={() => handleClickOpen(season._id)}>
                <DeleteIcon color="secondary" />
              </IconButton>
            </ListItem>
          ))}
        </List>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Confirmar eliminación"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              ¿Estás seguro de que deseas eliminar esta temporada? Esta acción no se puede deshacer.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancelar
            </Button>
            <Button onClick={handleDelete} color="secondary" autoFocus>
              Eliminar
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    );
  };