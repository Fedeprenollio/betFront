/* eslint-disable react/prop-types */
import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Tooltip from "@mui/material/Tooltip";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { useBoundStore } from "../../stores";

const DeleteMatchButton = ({
  onClick,
  tooltipText = "Eliminar",
  disabled = false,
}) => {
  const { isAuthenticated } = useBoundStore((state) => state);
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleConfirmDelete = () => {
    onClick(); // Llama la función de eliminación
    handleCloseDialog(); // Cierra el diálogo después de confirmar
  };

  return (
    <>
      {isAuthenticated && (
        <>
          <Tooltip title={tooltipText} placement="top">
            <IconButton
              onClick={handleOpenDialog} // Abre el diálogo de confirmación
              aria-label="delete"
              disabled={disabled}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>

          {/* Diálogo de confirmación */}
          <Dialog
            open={openDialog}
            onClose={handleCloseDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Eliminar Partido"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                ¿Estás seguro de que deseas eliminar este partido? Esta acción no se puede deshacer.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog} color="primary">
                Cancelar
              </Button>
              <Button
                onClick={handleConfirmDelete}
                color="error"
                autoFocus
              >
                Confirmar
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </>
  );
};

export default DeleteMatchButton;
