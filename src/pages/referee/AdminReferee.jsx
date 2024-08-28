import React, { useState, useEffect } from 'react';
import { Button, Grid, Typography, Container, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { FormReferee } from './FormReferee';
import { deleteReferee, fetchReferees } from './refereeApi';

export const AdminReferee = () => {
  const [referees, setReferees] = useState([]);
  const [selectedReferee, setSelectedReferee] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [refereeToDelete, setRefereeToDelete] = useState(null);

  useEffect(() => {
    const getReferees = async () => {
      try {
        const data = await fetchReferees();
        setReferees(data);
      } catch (error) {
        console.error('Error fetching referees:', error);
      }
    };

    getReferees();
  }, []);

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
    // Refrescar la lista de árbitros después de cerrar el formulario
    fetchReferees().then(data => setReferees(data));
  };

  const handleSave = (newReferee) => {
    // Actualizar el estado de árbitros con el nuevo árbitro creado o editado
    setReferees(prevReferees => 
      prevReferees.some(ref => ref._id === newReferee._id)
        ? prevReferees.map(ref => (ref._id === newReferee._id ? newReferee : ref))
        : [...prevReferees, newReferee]
    );
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Administrar Árbitros</Typography>
      <Button variant="contained" color="primary" onClick={() => setIsFormOpen(true)}>
        Crear Nuevo Árbitro
      </Button>

      {isFormOpen && (
        <FormReferee
          referee={selectedReferee}
          onClose={handleFormClose}
          onSave={handleSave}
        />
      )}

      <Grid container spacing={2} marginTop={2}>
        {referees.map(referee => (
          <Grid item xs={12} sm={6} md={4} key={referee._id}>
            <div>
              <Typography variant="h6">{referee.name}</Typography>
              <Button onClick={() => handleEdit(referee)}>Editar</Button>
              <Button color="error" onClick={() => handleDeleteClick(referee)}>Eliminar</Button>
            </div>
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
