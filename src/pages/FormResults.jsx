import { Formik, Form, Field, ErrorMessage } from "formik";
import { TextField, Button, Grid } from "@mui/material";
import * as Yup from "yup";
import useMatchesStore from "../stores/matchesStore";
import { useParams } from "react-router-dom";

const FormResult = () => {
  const { matchId } = useParams();
  console.log("MATCH ID", matchId);
  const initialValues = {
    goalsHome: "",
    goalsAway: "",
    offsidesHome: "",
    offsidesAway: "",
    yellowCardsHome: "",
    yellowCardsAway: "",
    redCardsHome: "",
    redCardsAway: "",
    cornersHome: "",
    cornersAway: "",
    possessionHome: "",
    possessionAway: "",
    shotsHome: "",
    shotsAway: "",
    passesHome: "",
    passesAway: "",
  };

  const validationSchema = Yup.object().shape({
    goalsHome: Yup.number().required("Campo requerido").min(0),
    goalsAway: Yup.number().required("Campo requerido").min(0),
    offsidesHome: Yup.number().min(0),
    offsidesAway: Yup.number().min(0),
    yellowCardsHome: Yup.number().min(0),
    yellowCardsAway: Yup.number().min(0),
    redCardsHome: Yup.number().min(0),
    redCardsAway: Yup.number().min(0),
    cornersHome: Yup.number().min(0),
    cornersAway: Yup.number().min(0),
    possessionHome: Yup.number().min(0),
    possessionAway: Yup.number().min(0),
    shotsHome: Yup.number().min(0),
    shotsAway: Yup.number().min(0),
    passesHome: Yup.number().min(0),
    passesAway: Yup.number().min(0),
  });

  const { addMatchResult } = useMatchesStore((state) => state);

  const handleSubmit = async(values) => {
    console.log("VALUE", values);
 await   addMatchResult(matchId, {
      goalsHome: parseInt(values.goalsHome),
      goalsAway: parseInt(values.goalsAway),
      teamStatistics: {
        local: {
          goals: parseInt(values.goalsHome),
          offsides: parseInt(values.offsidesHome),
          yellowCards: parseInt(values.yellowCardsHome),
          redCards: parseInt(values.redCardsHome),
          corners: parseInt(values.cornersHome),
          possession: parseInt(values.possessionHome),
          shots: parseInt(values.shotsHome),
          passes: parseInt(values.passesHome),
        },
        visitor: {
          goals: parseInt(values.goalsAway),
          offsides: parseInt(values.offsidesAway),
          yellowCards: parseInt(values.yellowCardsAway),
          redCards: parseInt(values.redCardsAway),
          corners: parseInt(values.cornersAway),
          possession: parseInt(values.possessionAway),
          shots: parseInt(values.shotsAway),
          passes: parseInt(values.passesAway),
        },
      },
      isFinished: true,
    });
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, handleChange }) => (
        <Form>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={6}>
              <Field
                as={TextField}
                name="goalsHome"
                label="Goles Equipo Local"
                type="number"
                variant="outlined"
                fullWidth
              />
              <ErrorMessage name="goalsHome" component="div" />
            </Grid>
            <Grid item xs={6}>
              <Field
                as={TextField}
                name="goalsAway"
                label="Goles Equipo Visitante"
                type="number"
                variant="outlined"
                fullWidth
              />
              <ErrorMessage name="goalsAway" component="div" />
            </Grid>

            <Grid item xs={6}>
              <Field
                as={TextField}
                name="yellowCardsHome"
                label="Tarjetas Amarillas Equipo Local"
                type="number"
                variant="outlined"
                fullWidth
              />
              <ErrorMessage name="yellowCardsHome" component="div" />
            </Grid>

            <Grid item xs={6}>
              <Field
                as={TextField}
                name="yellowCardsAway"
                label="Tarjetas Amarillas Equipo Visitante"
                type="number"
                variant="outlined"
                fullWidth
              />
              <ErrorMessage name="yellowCardsAway" component="div" />
            </Grid>
            <Grid item xs={6}>
              <Field
                as={TextField}
                name="redCardsHome"
                label="Tarjetas Rojas Equipo Local"
                type="number"
                variant="outlined"
                fullWidth
              />
              <ErrorMessage name="redCardsHome" component="div" />
            </Grid>
            <Grid item xs={6}>
              <Field
                as={TextField}
                name="redCardsAway"
                label="Tarjetas Rojas Equipo Visitante"
                type="number"
                variant="outlined"
                fullWidth
              />
              <ErrorMessage name="redCardsAway" component="div" />
            </Grid>
            <Grid item xs={6}>
              <Field
                as={TextField}
                name="cornersHome"
                label="Córners Equipo Local"
                type="number"
                variant="outlined"
                fullWidth
              />
              <ErrorMessage name="cornersHome" component="div" />
            </Grid>
            <Grid item xs={6}>
              <Field
                as={TextField}
                name="cornersAway"
                label="Córners Equipo Visitante"
                type="number"
                variant="outlined"
                fullWidth
              />
              <ErrorMessage name="cornersAway" component="div" />
            </Grid>
            <Grid item xs={6}>
              <Field
                as={TextField}
                name="possessionHome"
                label="Posesión (%) Equipo Local"
                type="number"
                variant="outlined"
                fullWidth
              />
              <ErrorMessage name="possessionHome" component="div" />
            </Grid>
            <Grid item xs={6}>
              <Field
                as={TextField}
                name="possessionAway"
                label="Posesión (%) Equipo Visitante"
                type="number"
                variant="outlined"
                fullWidth
              />
              <ErrorMessage name="possessionAway" component="div" />
            </Grid>
            <Grid item xs={6}>
              <Field
                as={TextField}
                name="shotsHome"
                label="Tiros Equipo Local"
                type="number"
                variant="outlined"
                fullWidth
              />
              <ErrorMessage name="shotsHome" component="div" />
            </Grid>
            <Grid item xs={6}>
              <Field
                as={TextField}
                name="shotsAway"
                label="Tiros Equipo Visitante"
                type="number"
                variant="outlined"
                fullWidth
              />
              <ErrorMessage name="shotsAway" component="div" />
            </Grid>
            <Grid item xs={6}>
              <Field
                as={TextField}
                name="passesHome"
                label="Pases Equipo Local"
                type="number"
                variant="outlined"
                fullWidth
              />
              <ErrorMessage name="passesHome" component="div" />
            </Grid>
            <Grid item xs={6}>
              <Field
                as={TextField}
                name="passesAway"
                label="Pases Equipo Visitante"
                type="number"
                variant="outlined"
                fullWidth
              />
              <ErrorMessage name="passesAway" component="div" />
            </Grid>
            <Grid item xs={6}>
              <Field
                as={TextField}
                name="offsidesHome"
                label="Offsides Equipo Local"
                type="number"
                variant="outlined"
                fullWidth
              />
              <ErrorMessage name="offsidesHome" component="div" />
            </Grid>
            <Grid item xs={6}>
              <Field
                as={TextField}
                name="offsidesAway"
                label="Offsides Equipo Visitante"
                type="number"
                variant="outlined"
                fullWidth
              />
              <ErrorMessage name="offsidesAway" component="div" />
            </Grid>

            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                Actualizar Resultado
              </Button>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

export default FormResult;
