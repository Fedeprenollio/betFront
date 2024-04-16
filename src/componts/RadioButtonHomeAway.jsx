/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { FormGroup, FormControlLabel, Checkbox, Grid } from "@mui/material";
import Container from "@mui/material/Container"

export const RadioButtonHomeAway = ({
  handleChangeCheckbox,
  homeMateshAwayTeam,
  visitingMatchesAwayTeam,
  visitingmathgesLocalTeam,
  homeMatchesLocalTeam,
}) => {
  return (
    <Container >
      <FormGroup>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <h3>Equipo local:</h3>
            <FormControlLabel
              control={
                <Checkbox
                  checked={homeMatchesLocalTeam}
                  onChange={handleChangeCheckbox}
                  name="teamHome-home"
                />
              }
              label="Local"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={visitingmathgesLocalTeam}
                  onChange={handleChangeCheckbox}
                  name="teamHome-visitor"
                />
              }
              label="Visitante"
            />
          </Grid>
          <Grid item xs={6} >
            <h3>Equipo visitante</h3>
            <FormControlLabel
              control={
                <Checkbox
                  checked={homeMateshAwayTeam}
                  onChange={handleChangeCheckbox}
                  name="teamVisitor-home"
                />
              }
              label="Local"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={visitingMatchesAwayTeam}
                  onChange={handleChangeCheckbox}
                  name="teamVisitor-visitor"
                />
              }
              label="Visitante"
            />
          </Grid>
        </Grid>
      </FormGroup>
    </Container>
  );
};
