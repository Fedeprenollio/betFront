/* eslint-disable react/prop-types */
import React from 'react';
import { Box, Checkbox, FormControlLabel, Grid, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export const AdvancedOptions = ({ showAdvancedStats, handleCheckboxChange }) => {
  return (

    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography variant="span" gutterBottom sx={{
          fontFamily: 'Roboto, Helvetica, Arial, sans-serif'
        }}>
          Opciones avanzadas:
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid
          container
          justifyContent="space-around"
          alignItems="center"
          mb={2}
        >
          <Grid item xs={12} style={{ textAlign: "initial" }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={showAdvancedStats.promedio}
                  onChange={() => handleCheckboxChange("promedio")}
                />
              }
              label="Promedio"
            />
          </Grid>
          <Grid item xs={12} style={{ textAlign: "initial" }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={showAdvancedStats.mediana}
                  onChange={() => handleCheckboxChange("mediana")}
                />
              }
              label="Mediana"
            />
          </Grid>
          <Grid item xs={12} style={{ textAlign: "initial" }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={showAdvancedStats.desviacion}
                  onChange={() => handleCheckboxChange("desviacion")}
                />
              }
              label="Desviación Estándar"
            />
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};
