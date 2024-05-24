/* eslint-disable react/prop-types */
import { RadioGroup, Radio, FormControlLabel, FormGroup, FormControl, FormLabel } from '@mui/material';

export const RadioButtonStatsLessThan = ({handleChangeRadioButton,statsLessThan}) => {

  

  return (
    <FormGroup>
      <FormControl component="fieldset">
        <FormLabel component="legend">Selecciona una opción:</FormLabel>
        <RadioGroup
          row
          aria-label="switch-options"
          name="switch-options"
          value={statsLessThan}
          onChange={handleChangeRadioButton}
        >
          <FormControlLabel value={false} control={<Radio />} label="Más de..."  />
          <FormControlLabel value={true} control={<Radio />} label="Menos de..." />
        </RadioGroup>
      </FormControl>
    </FormGroup>
  );
};

