/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { TextField, Button, MenuItem, Container, Accordion, AccordionSummary, Typography, AccordionDetails } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ExpandMore } from "@mui/icons-material";
import { useBoundStore } from "../../stores";
import FormAddResult from "./FormAddResult";


// Componente de formulario con Formik y Yup
const RoundForm = ({ arrayOfRounds, setRoundSelect }) => {
  // Esquema de validación con Yup
  const validationSchema = Yup.object().shape({
    round: Yup.number().required("Round is required"),
  });

  const handleRoundChange = (e) => {
    const newRound = e.target.value;

    setRoundSelect(newRound);
  };

  return (
    <Formik
      initialValues={{ round: "" }}
      validationSchema={validationSchema}
    >
      {({ values, handleChange }) => (
        <Form>
          <Field
            as={TextField}
            select
            name="round"
            label="Select Round"
            variant="outlined"
            fullWidth
            margin="normal"
            value={values.round}
            onChange={(e) => {
              handleRoundChange(e);
              handleChange(e);
            }}
          >
            <MenuItem value="">Select Round</MenuItem>
            {arrayOfRounds.map((round) => (
              <MenuItem key={round} value={round}>
                Round {round}
              </MenuItem>
            ))}
          </Field>
          <ErrorMessage name="round" component="div" />

          {/* <Button type="submit" variant="contained" color="primary">
            Submit
          </Button> */}
        </Form>
      )}
    </Formik>
  );
};

export const ResultsSeason = () => {
  const { idSeason } = useParams();
  const { matchesByRound, setMatchesByRound, getSeasonById, seasonById } =
    useBoundStore((state) => state);
  const [arrayOfRounds, setArrayOfRounds] = useState([]);
  const [roundSelect, setRoundSelect] = useState(1);
  useEffect(() => {
    getSeasonById(idSeason);
  }, [idSeason, getSeasonById]);

  useEffect(() => {
    const roundsLength = seasonById.numberOfRounds || 20; // Si numberOfRounds es null o undefined, toma el valor predeterminado de 20
    const listOfRounds = Array.from(
      { length: roundsLength },
      (_, index) => index + 1
    );
    setArrayOfRounds(listOfRounds);
  }, [seasonById]);
  

  useEffect(() => {
    setMatchesByRound({ seasonId: idSeason, round: roundSelect });
  }, [setMatchesByRound, idSeason, roundSelect]);

  console.log(matchesByRound);

  return (
    <Container>
      <h2>Results</h2>
      <RoundForm
        arrayOfRounds={arrayOfRounds}
        setRoundSelect={setRoundSelect}
      />
      {matchesByRound?.matches?.map((match) => (
        <Accordion key={match._id}>
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls={`panel-${match._id}-content`}
            id={`panel-${match._id}-header`}
          >
            <Typography>
              {match.homeTeam.name} - {match.awayTeam.name}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <FormAddResult matchId={match._id} localName={match.homeTeam.name} visitorName={match.awayTeam.name} />
          </AccordionDetails>
        </Accordion>
      ))}
    </Container>
  );
};