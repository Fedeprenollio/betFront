/* eslint-disable react/prop-types */
import { Formik, Form, Field, ErrorMessage } from "formik";
import { TextField, Button, Grid, Typography } from "@mui/material";
import * as Yup from "yup";
import { useEffect } from "react";
import { useBoundStore } from "../../stores";

const FormAddResult = ({ matchId, visitorName, localName }) => {
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

    faultsHome: "",
    faultsAway: "",

    shotsOnTargetHome: "",
    shotsOnTargetAway: "",
    
    totalShotsHome: "",
    totalShotsAway: "",


    foultsHome: "",
    foultsAway: "",

  };

  const validationSchema = Yup.object().shape({
    goalsHome: Yup.number().required("Campo requerido").min(0),
    goalsAway: Yup.number().required("Campo requerido").min(0),
    offsidesHome: Yup.number().min(0),
    offsidesAway: Yup.number().min(0),
    yellowCardsHome: Yup.number().min(0),
    yellowCardsAway: Yup.number().min(0),
    // redCardsHome: Yup.number().min(0),
    // redCardsAway: Yup.number().min(0),faults
    cornersHome: Yup.number().min(0),
    cornersAway: Yup.number().min(0),
    possessionHome: Yup.number().min(0).max(100),
    possessionAway: Yup.number().min(0).max(100),
    faultsHome: Yup.number().min(0),
    faultsAway: Yup.number().min(0),
    shotsOnTargetHome: Yup.number().min(0),
    shotsOnTargetAway: Yup.number().min(0),
    totalShotsHome: Yup.number().min(0),
    totalShotsAway: Yup.number().min(0),
    foultsHome: Yup.number().min(0),
    foultsAway: Yup.number().min(0),
  });

  const { addMatchResult, getMatchDetail } = useBoundStore(
    (state) => state
  );
  useEffect(() => {
    getMatchDetail({ idMatch: matchId });
  }, [getMatchDetail, matchId]);

  const handleSubmit = async (values) => {
    console.log("VALUES DEL RESULTAD", values)
    await addMatchResult(matchId, {
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
          totalShots: parseInt(values.totalShotsHome),
          shotsOnTarget: parseInt(values.shotsOnTargetHome),
          foults: parseInt(values.foultsHome),
        },
        visitor: {
          goals: parseInt(values.goalsAway),
          totalShots: parseInt(values.totalShotsAway),
          shotsOnTarget: parseInt(values.shotsOnTargetAway),
          possession: parseInt(values.possessionAway),
          //faltas
          yellowCards: parseInt(values.yellowCardsAway),
          corners: parseInt(values.cornersAway),
          offsides: parseInt(values.offsidesAway),
          foults: parseInt(values.foultsAway),

          redCards: parseInt(values.redCardsAway),
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
      {() => (
        <Form>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={6} sx={{ maxWidth: "200px" }}>
              <Typography variant="h6" gutterBottom align="center">
                {localName}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h6" gutterBottom align="center">
                {visitorName}
              </Typography>
            </Grid>

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
                name="totalShotsHome"
                label="Tiros Total Equipo Local"
                type="number"
                variant="outlined"
                fullWidth
              />
              <ErrorMessage name="shotsHome" component="div" />
            </Grid>
            <Grid item xs={6}>
              <Field
                as={TextField}
                name="totalShotsAway"
                label="Tiros Total Equipo Visitante"
                type="number"
                variant="outlined"
                fullWidth
              />
              <ErrorMessage name="shotsAway" component="div" />
            </Grid>

            <Grid item xs={6}>
              <Field
                as={TextField}
                name="shotsOnTargetHome"
                label="Tiros al arco Equipo Local"
                type="number"
                variant="outlined"
                fullWidth
              />
              <ErrorMessage name="shotsOnTargetHome" component="div" />
            </Grid>
            <Grid item xs={6}>
              <Field
                as={TextField}
                name="shotsOnTargetAway"
                label="Tiros al arco Equipo Visitante"
                type="number"
                variant="outlined"
                fullWidth
              />
              <ErrorMessage name="shotsOnTargetAway" component="div" />
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
                name="faultsHome"
                label="Faltas local"
                type="number"
                variant="outlined"
                fullWidth
              />
              <ErrorMessage name="possessionHome" component="div" />
            </Grid>
            <Grid item xs={6}>
              <Field
                as={TextField}
                name="faultsAway"
                label="Faltas Visitante"
                type="number"
                variant="outlined"
                fullWidth
              />
              <ErrorMessage name="possessionAway" component="div" />
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
            {/* <Grid item xs={6}>
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
            </Grid> */}
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
                name="foultsHome"
                label="Faltas Equipo Local"
                type="number"
                variant="outlined"
                fullWidth
              />
              <ErrorMessage name="foultsHome" component="div" />
            </Grid>
            <Grid item xs={6}>
              <Field
                as={TextField}
                name="foultsAway"
                label="Pases Equipo Visitante"
                type="number"
                variant="outlined"
                fullWidth
              />
              <ErrorMessage name="foultsAway" component="div" />
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

export default FormAddResult;
