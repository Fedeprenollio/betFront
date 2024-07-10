/* eslint-disable react/prop-types */
import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export const CheckboxLocalVisitor = ({
  homeOnly,
  awayOnly,
  handleHomeOnlyChange,
  handleAwayOnlyChange,
}) => {
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography variant="span" gutterBottom  sx={{ 
    fontFamily: 'Roboto, Helvetica, Arial, sans-serif' 
  }}>
          Considerar local/visitante
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
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
      </AccordionDetails>
    </Accordion>
  );
};
