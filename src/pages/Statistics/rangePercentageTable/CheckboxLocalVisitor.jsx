/* eslint-disable react/prop-types */
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
} from "@mui/material";
import React from "react";

export const CheckboxLocalVisitor = ({
  homeOnly,
  awayOnly,
  handleHomeOnlyChange,
  handleAwayOnlyChange,
}) => {
  return (
    <>
      <Typography variant="h5" gutterBottom>
        Considerar local/visitante
      </Typography>

      <FormGroup row>
        <FormControlLabel
          control={
            <Checkbox
              checked={homeOnly}
              onChange={handleHomeOnlyChange}
              name="homeOnly"
              color="primary"
            />
          }
          label="Local"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={awayOnly}
              onChange={handleAwayOnlyChange}
              name="awayOnly"
              color="primary"
            />
          }
          label="Visitante"
        />
      </FormGroup>
    </>
  );
};
