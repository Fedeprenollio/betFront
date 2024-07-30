/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { useBoundStore } from "../../../stores";
import {
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Typography,
  TextField,
} from "@mui/material";
import { useCurrentSeasonTeam } from "../../../customHooks/useCurrentSeasonTeam";

export const SelectListCurrentSeasons = ({
  selectedSeasons,
  onSeasonChange,
  idTeam,
  listCurrentSeason,
  handlePositionFilterChange, positionFilter
  
}) => {
  const { getAllCurrentSeasons, allCurrentSeasons, error } = useBoundStore(
    (state) => state
  );
  const {currentSeasonTeam,completeListCurrentSeason} = useCurrentSeasonTeam(idTeam)
  console.log("ID SELECT", idTeam,"--", selectedSeasons)

  useEffect(() => {
    getAllCurrentSeasons();
  }, [getAllCurrentSeasons]);

  const handleChange = (event) => {
    const { name, checked } = event.target;
    onSeasonChange(name, checked);
  }; 

  if (error) {
    return <Typography>Error: {error.message}</Typography>;
  }
  console.log("completeListCurrentSeason", completeListCurrentSeason);
  return (
    <FormControl component="fieldset">
      <FormGroup>
        { completeListCurrentSeason.length=== 0 ? allCurrentSeasons.map((season) => (
          <FormControlLabel
            control={
              <Checkbox
                checked={selectedSeasons.includes(season._id)}
                onChange={handleChange}
                name={season._id}
              />
            }
            label={`${season.league.name} - ${season.year}`}
            key={season._id}
          />
        )) : currentSeasonTeam.map((season) => (
          <FormControlLabel
            control={
              <Checkbox
                checked={selectedSeasons.includes(season._id)}
                onChange={handleChange}
                name={season._id}
              />
            }
            label={`${season?.league?.name} - ${season.year}`}
            key={season._id}
          />
        ))}

      </FormGroup>



      {selectedSeasons.length === 1 && (
        <TextField
          label="Filtrar por puesto (e.g., 1-3)"
          value={positionFilter}
          onChange={handlePositionFilterChange}
          variant="outlined"
          fullWidth
        />
      )}
    </FormControl>
  );
};
