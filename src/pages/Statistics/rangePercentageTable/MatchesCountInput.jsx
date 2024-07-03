/* eslint-disable react/prop-types */
import {
  Button,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  TextField,
} from "@mui/material";
import { useState } from "react";

export const MatchesCountInput = ({
  inputMatchesCount,
  handleInputMatchesCountChange,
  updateMatchesCount,
  updateIncludeOtherSeasons,
  handleIncludeAllSeasonMatches,
  inputChekBoxIncludeAllSeason,
}) => {
  const [enablEditing, setEnablEditing] = useState(false);
  const [includeOtherSeasons, setIncludeOtherSeasons] = useState(false);

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    if (name === "enablEditing") {
      setEnablEditing(checked);
    } else if (name === "includeOtherSeasons") {
      handleIncludeAllSeasonMatches(checked);
    }
  };

  const handleUpdateClick = () => {
    updateMatchesCount();
    updateIncludeOtherSeasons(includeOtherSeasons);
  };

  return (
    <Container
      sx={{ display: "flex", flexDirection: "column", alignItems: "start" }}
    >
      <FormControl>
        <FormLabel component="legend">Limitar número de partidos</FormLabel>
        <FormControlLabel
          control={
            <Checkbox
              name="enablEditing"
              checked={enablEditing}
              onChange={handleCheckboxChange}
            />
          }
          label="Habilitar edición"
        />
        <FormControlLabel
          control={
            <Checkbox
              name="includeOtherSeasons"
              checked={inputChekBoxIncludeAllSeason}
              onChange={handleCheckboxChange}
            />
          }
          label="Incluir todas los torneos y/o temporadas"
        />
      </FormControl>
      <TextField
        disabled={!enablEditing}
        label="Número de partidos"
        type="number"
        value={inputMatchesCount}
        onChange={handleInputMatchesCountChange}
        variant="outlined"
        margin="normal"
        sx={{ width: "100%", maxWidth: "300px", marginBottom: "10px" }} // Ajustes de estilo para el TextField
      />
      <Button
        disabled={!enablEditing}
        variant="contained"
        color="primary"
        onClick={handleUpdateClick}
        sx={{ width: "100%", maxWidth: "300px" }}
      >
        Actualizar
      </Button>
    </Container>
  );
};
