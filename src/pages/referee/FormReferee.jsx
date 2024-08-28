/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { createReferee, fetchReferees, updateReferee } from './refereeApi';

export const FormReferee = ({ referee, onClose, onSave }) => {
  const [name, setName] = useState('');

  useEffect(() => {
    if (referee) {
      setName(referee.name);
    }
  }, [referee]);

  const handleSave = async () => {
    try {
      const newReferee = referee
        ? await updateReferee(referee._id, { name })
        : await createReferee({ name });

      onSave(newReferee);
      onClose();
    } catch (error) {
      console.error('Error saving referee:', error);
    }finally{
        fetchReferees()
    }
  };

  return (
    <Dialog open onClose={onClose}>
      <DialogTitle>{referee ? 'Editar Árbitro' : 'Crear Árbitro'}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Nombre"
          fullWidth
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleSave}>Guardar</Button>
      </DialogActions>
    </Dialog>
  );
};
