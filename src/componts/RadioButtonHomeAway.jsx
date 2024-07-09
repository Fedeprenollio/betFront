/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  Typography,
  Container,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export const RadioButtonHomeAway = ({
  handleChangeCheckbox,
  homeMateshAwayTeam,
  visitingMatchesAwayTeam,
  visitingmathgesLocalTeam,
  homeMatchesLocalTeam,
  singleTeam,
}) => {
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography variant="h6" gutterBottom>
          Selección de Equipo
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Container
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <FormGroup>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography
                  variant="subtitle2"
                  component="div"
                  sx={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    width: '100%',
                  }}
                >
                  Equipo local:
                </Typography>
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
              {!singleTeam && (
                <Grid item xs={6}>
                  <Typography
                    variant="subtitle2"
                    component="div"
                    sx={{
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      width: '100%',
                    }}
                  >
                    Equipo visitante:
                  </Typography>
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
              )}
            </Grid>
          </FormGroup>
        </Container>
      </AccordionDetails>
    </Accordion>
  );
};
