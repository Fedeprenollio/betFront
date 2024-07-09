/* eslint-disable react/prop-types */
import React from "react";
import Button from "@mui/material/Button";
import SaveAltIcon from '@mui/icons-material/SaveAlt';
const ExportExcelButton = ({ onClick }) => {
  return (
    <Button
      variant="contained"
      color="primary"
      startIcon={<SaveAltIcon />} // Agrega el icono de SaveAlt como startIcon
      onClick={onClick}
      style={{ margin: "10px" }}
    >
      Exportar a Excel
    </Button>
  );
};

export default ExportExcelButton;
