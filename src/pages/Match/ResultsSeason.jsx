/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  TextField,
  Button,
  MenuItem,
  Container,
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ExpandMore } from "@mui/icons-material";
import { useBoundStore } from "../../stores";
import FormAddResult from "./FormAddResult";
import { SelectedCurrentFecha } from "./SelectedCurrentFecha";
import { FechaAccordion } from "./FechaAccordion";

// Componente de formulario con Formik y Yup
const RoundForm = ({ arrayOfRounds, setRoundSelect, roundSelect }) => {
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
      initialValues={{ round: roundSelect }}
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
  const [currentFechaId, setCurrentFechaId] = useState("");

  useEffect(() => {
    getSeasonById(idSeason);
    return ()=>{
      getSeasonById(undefined)
    }
  }, [idSeason, getSeasonById]);

  useEffect(() => {
    const roundsLength = seasonById?.season?.numberOfRounds || 20; // Si numberOfRounds es null o undefined, toma el valor predeterminado de 20
    const listOfRounds = Array.from(
      { length: roundsLength },
      (_, index) => index + 1
    );
    setCurrentFechaId(seasonById?.currentFecha?._id);
    setArrayOfRounds(listOfRounds);
  }, [seasonById]);

  useEffect(() => {
    setMatchesByRound({ seasonId: idSeason, round: roundSelect });
  }, [setMatchesByRound, idSeason, roundSelect]);

  console.log(seasonById);

  return (
    <Container>
      {/* <h2>Results</h2>
      <RoundForm
        arrayOfRounds={arrayOfRounds}
        setRoundSelect={setRoundSelect}
        roundSelect={roundSelect}
      /> */}
      {seasonById.season && 
      
      <Typography variant="h6">{`Torneo ${seasonById?.season?.league?.name} - Temporada ${seasonById?.season?.year}`}</Typography>
      }

      {/* {seasonById?.season?.fechas?.map((fecha) => (
        <div key={fecha._id}>
          <h3>
            Fecha {fecha.number}
            <SelectedCurrentFecha
              fechaId={fecha._id}
              idSeason={idSeason}
              isCurrent={fecha._id === currentFechaId}
              setCurrentFechaId={setCurrentFechaId}
            />
          </h3>
          {fecha.matches.map((match) => (
            <Accordion key={match._id}>
              <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls={`panel-${match._id}-content`}
                id={`panel-${match._id}-header`}
              >
                <Typography>
                  {match.homeTeam.name} - {match.awayTeam.name}
                </Typography>
                {match.isFinished ? (
                  <Typography sx={{ marginLeft: "1rem" }}>
                    {match.teamStatistics.local.goals} -{" "}
                    {match.teamStatistics.visitor.goals}
                  </Typography>
                ) : null}
              </AccordionSummary>
              <AccordionDetails>
                <FormAddResult
                  matchId={match._id}
                  localName={match.homeTeam.name}
                  visitorName={match.awayTeam.name}
                />
              </AccordionDetails>
            </Accordion>
          ))}
        </div>
      ))} */}

{seasonById?.season?.fechas?.map((fecha) => (
  <FechaAccordion
    idSeason={idSeason}
    key={fecha._id}
    fecha={fecha}
    currentFechaId={currentFechaId}
    setCurrentFechaId={setCurrentFechaId}
  />
))}

  
    </Container>
  );
};
