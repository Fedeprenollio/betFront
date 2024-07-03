/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { useBoundStore } from "../../../stores";
import {
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Typography,
} from "@mui/material";

export const SelectListCurrentSeasons = ({
  selectedSeasons,
  onSeasonChange,
}) => {
  const { getAllCurrentSeasons, allCurrentSeasons, error } = useBoundStore(
    (state) => state
  );

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
  console.log("allCurrentSeasons", allCurrentSeasons);
  return (
    <FormControl component="fieldset">
      <FormGroup>
        {allCurrentSeasons.map((season) => (
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
        ))}
      </FormGroup>
    </FormControl>
  );
};
