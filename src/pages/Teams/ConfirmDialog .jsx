/* eslint-disable react/prop-types */
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';

export const ConfirmDialog  = ({ open, onClose, onConfirm,idTeam  }) => {
  return (
    <Dialog open={open} onClose={onClose}>
    <DialogTitle>Confirmar Acción</DialogTitle>
    <DialogContent>
      <DialogContentText>
        ¿Estás seguro de que deseas {idTeam ? 'actualizar' : 'crear'} este equipo?
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose} color="secondary">Cancelar</Button>
      <Button onClick={onConfirm} color="primary">Confirmar</Button>
    </DialogActions>
  </Dialog>
  )
}
