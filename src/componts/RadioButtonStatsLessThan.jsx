/* eslint-disable react/prop-types */
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  RadioGroup,
  Radio,
  FormControlLabel,
  FormControl,
  FormLabel,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export const RadioButtonStatsLessThan = ({ handleChangeRadioButton, statsLessThan }) => {
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="stats-filter-content"
        id="stats-filter-header"
      >
        <Typography variant="h6" gutterBottom>
          Selecciona una opción
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <FormControl component="fieldset">
          {/* <FormLabel component="legend">Selecciona una opción:</FormLabel> */}
          <RadioGroup
            row
            aria-label="switch-options"
            name="switch-options"
            value={statsLessThan}
            onChange={handleChangeRadioButton}
          >
            <FormControlLabel value={false} control={<Radio />} label="Más de..." />
            <FormControlLabel value={true} control={<Radio />} label="Menos de..." />
          </RadioGroup>
        </FormControl>
      </AccordionDetails>
    </Accordion>
  );
};
