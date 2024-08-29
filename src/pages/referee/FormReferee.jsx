/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem } from '@mui/material';
import { createReferee, fetchReferees, updateReferee } from './refereeApi';
import LogoUploader from '../../componts/uploaderImage/LogoUploader';
import { COUNTRIES } from '../Teams/utils';
import useLogoUpload from '../../customHooks/useLogoUpload ';

export const FormReferee = ({ referee, onClose, onSave }) => {
  const [name, setName] = useState('');
  const [nationality, setNationality] = useState('');
  const {
    logoUrl,
    setLogoUrl,
    uploadingLogoUrl,
    isUploading,
    handleFileChange,
    handleRemoveFile,
  } = useLogoUpload("dz3nlbqvo");
  useEffect(() => {
    if (referee) {
      setName(referee.name);
      setNationality(referee.nationality || '');
      setLogoUrl(referee.image || '');
    }
  }, [referee,setLogoUrl]);

  



  const handleSave = async () => {
    try {
      const updatedReferee = {
        name,
        nationality,
        image: uploadingLogoUrl || logoUrl,
      };
console.log("updatedReferee",updatedReferee)
      const newReferee = referee
        ? await updateReferee(referee._id, updatedReferee)
        : await createReferee(updatedReferee);

      onSave(newReferee);
      onClose();
    } catch (error) {
      console.error('Error saving referee:', error);
    } finally {
      fetchReferees();
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
       <TextField
          select
          margin="dense"
          label="Nacionalidad"
          fullWidth
          variant="outlined"
          value={nationality}
          onChange={(e) => setNationality(e.target.value)}
        >
          {COUNTRIES.map((country) => (
            <MenuItem key={country.value} value={country.value}>
              {country.label}
            </MenuItem>
          ))}
        </TextField>
        <LogoUploader
          logoUrl={logoUrl}
          uploadingLogoUrl={uploadingLogoUrl}
          handleFileChange={handleFileChange}
          handleRemoveFile={handleRemoveFile}
          setFieldValue={(field, value) => {
            if (field === 'image') {
              setLogoUrl(value);
            }
          }}
          cloudName="tu_cloud_name" // Configura esto según tu cuenta de Cloudinary
          isUploading={isUploading}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleSave} disabled={isUploading}>
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
};
