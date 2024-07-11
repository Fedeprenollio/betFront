/* eslint-disable react/prop-types */
import { Box, Checkbox, FormControlLabel, Grid, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export const SelectStatistics = ({ stats, visibleStats, handleStatCheckboxChange }) => {
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
          Selecciona estadísticas:
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid
          container
          justifyContent="space-around"
          alignItems="center"
          spacing={1} // Espacio entre los Grid items
          mb={2}
        >
          {stats.map((stat) => (
            <Grid
              key={stat.key}
              item
              xs={6}
              sm={6}
              md={4}
              style={{ textAlign: "initial" }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={visibleStats[stat.key]}
                    onChange={() => handleStatCheckboxChange(stat.key)}
                  />
                }
                label={stat.label}
              />
            </Grid>
          ))}
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};
