/* eslint-disable react/prop-types */
import { Button, IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";
import AlertDialog from "./feedback/AlertDialog";

const MoreVertIconComponent = ({ idItem, onDelete, onUpdate }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
   
  };

  const handleDelete = async (id) => {
    if (onDelete) {
      const infoDelete = await onDelete(id);
      return infoDelete
    }
    // handleClose();
  };

  const handleUpdate = () => {
    if (onUpdate) {
      onUpdate(idItem);
    }
    handleClose();
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        aria-controls="menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="menu"
        anchorEl={anchorEl}
        keepMounted={true}       
         open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem>
        <AlertDialog
          handleSubmit={handleDelete}
          onClick={handleDelete}
          formValues={idItem}
          textDialog={"¿Estás seguro en eliminar la liga?"}
          textButton={"Eliminar liga"}
          textSuccess={`Liga eliminada exitosamente`}
          textError={"Error al eliminar la liga"}
          >
          Eliminar
        </AlertDialog>
          </MenuItem>
          <MenuItem>
        <AlertDialog onClick={handleUpdate}>Modificar</AlertDialog>
          </MenuItem>
      </Menu>
    </div>
  );
};

export default MoreVertIconComponent;
