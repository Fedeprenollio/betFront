import React, { useState, useEffect } from 'react';
import { Button, Grid, Typography, Container, Dialog, DialogActions, DialogContent, DialogTitle, Avatar, Box, TextField, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { FormReferee } from './FormReferee';
import { deleteReferee, fetchReferees } from './refereeApi';

export const AdminReferee = () => {
  const [referees, setReferees] = useState([]);
  const [filteredReferees, setFilteredReferees] = useState([]);
  const [selectedReferee, setSelectedReferee] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [refereeToDelete, setRefereeToDelete] = useState(null);
  const [searchName, setSearchName] = useState('');
  const [selectedNationality, setSelectedNationality] = useState('');

  useEffect(() => {
    const getReferees = async () => {
      try {
        const data = await fetchReferees();
        setReferees(data);
        setFilteredReferees(data);
      } catch (error) {
        console.error('Error fetching referees:', error);
      }
    };

    getReferees();
  }, []);

  useEffect(() => {
    filterReferees();
  }, [searchName, selectedNationality]);

  const handleEdit = (referee) => {
    setSelectedReferee(referee);
    setIsFormOpen(true);
  };

  const handleDeleteClick = (referee) => {
    setRefereeToDelete(referee);
    setIsConfirmDialogOpen(true);
  };

  const handleDelete = async () => {
    try {
      if (refereeToDelete) {
        await deleteReferee(refereeToDelete._id);
        setReferees(referees.filter(referee => referee._id !== refereeToDelete._id));
        setFilteredReferees(filteredReferees.filter(referee => referee._id !== refereeToDelete._id));
        setRefereeToDelete(null);
      }
    } catch (error) {
      console.error('Error deleting referee:', error);
    } finally {
      setIsConfirmDialogOpen(false);
    }
  };

  const handleFormClose = () => {
    setSelectedReferee(null);
    setIsFormOpen(false);
    fetchReferees().then(data => {
      setReferees(data);
      setFilteredReferees(data);
    });
  };

  const handleSave = (newReferee) => {
    setReferees(prevReferees => 
      prevReferees.some(ref => ref._id === newReferee._id)
        ? prevReferees.map(ref => (ref._id === newReferee._id ? newReferee : ref))
        : [...prevReferees, newReferee]
    );
    filterReferees();
  };

  const filterReferees = () => {
    let filtered = referees;
    
    if (searchName) {
      filtered = filtered.filter(referee => 
        referee.name.toLowerCase().includes(searchName.toLowerCase())
      );
    }

    if (selectedNationality) {
      filtered = filtered.filter(referee => 
        referee.nationality === selectedNationality
      );
    }

    setFilteredReferees(filtered);
  };

  const handleSearchNameChange = (e) => {
    setSearchName(e.target.value);
  };

  const handleNationalityChange = (e) => {
    let value = e.target.value
    if(e.target.value  ==="Sin definir"){
        value= undefined
    }
    console.log("VALUE", value)
    setSelectedNationality(value);
  };

// Asignar "Sin definir" a las nacionalidades vacías o indefinidas
const nationalities = [...new Set(referees.map(referee => referee.nationality || "Sin definir"))];

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Administrar Árbitros</Typography>
      <Button variant="contained" color="primary" onClick={() => setIsFormOpen(true)}>
        Crear Nuevo Árbitro
      </Button>

      <Box marginY={2}>
        <TextField
          label="Buscar por nombre"
          variant="outlined"
          value={searchName}
          onChange={handleSearchNameChange}
          style={{ marginRight: 16 }}
        />
        <FormControl variant="outlined" style={{ minWidth: 200, paddingTop:"1rem" }}>
          {/* <InputLabel>Nacionalidad</InputLabel> */}
          <TextField
          select
            value={selectedNationality}
            onChange={handleNationalityChange}
            label="Nacionalidad"
          >
            <MenuItem value="">
              <em>Todos</em>
            </MenuItem>
            {nationalities.map(nationality => (
              <MenuItem key={nationality} value={nationality}>
                {nationality}
              </MenuItem>
            ))}
          </TextField>
        </FormControl>
      </Box>

      {isFormOpen && (
        <FormReferee
          referee={selectedReferee}
          onClose={handleFormClose}
          onSave={handleSave}
        />
      )}

      <Grid container spacing={2} marginTop={2}>
        {filteredReferees.map(referee => (
          <Grid item xs={12} key={referee._id}>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              padding={2}
              border={1}
              borderRadius={2}
              borderColor="grey.300"
            >
              <Box>
                <Typography variant="h6">{referee.name}</Typography>
                <Typography variant="body2" color="textSecondary">{referee.nationality}</Typography>
                <Box marginTop={1}>
                  <Button variant="contained" onClick={() => handleEdit(referee)} size="small" style={{ marginRight: 8 }}>
                    Editar
                  </Button>
                  <Button variant="contained" color="error" onClick={() => handleDeleteClick(referee)} size="small">
                    Eliminar
                  </Button>
                </Box>
              </Box>
              <Avatar alt={`Imagen de ${referee.name}`} src={referee.image} style={{ width: 64, height: 64 }} />
            </Box>
          </Grid>
        ))}
      </Grid>

      <Dialog
        open={isConfirmDialogOpen}
        onClose={() => setIsConfirmDialogOpen(false)}
      >
        <DialogTitle>Confirmar Eliminación</DialogTitle>
        <DialogContent>
          <Typography>¿Estás seguro de que quieres eliminar a este árbitro?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsConfirmDialogOpen(false)}>Cancelar</Button>
          <Button color="error" onClick={handleDelete}>Eliminar</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};
