import { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useBoundStore } from "../../stores";

// eslint-disable-next-line react/prop-types
const FormAddResult = ({ matchId, visitorName, localName }) => {
  const { addMatchResult, getMatchDetail, matchDetail } = useBoundStore((state) => state);
  const [initialValues, setInitialValues] = useState({
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
    foultsHome: "", // Updated to match form field name
  foultsAway: "", // Updated to match form field name
  });

  useEffect(() => {
    const fetchMatchDetail = async () => {
      await getMatchDetail({ idMatch: matchId });
    };
    fetchMatchDetail();
  }, [getMatchDetail, matchId]);

  useEffect(() => {
    if (matchDetail) {
      setInitialValues({
        goalsHome: matchDetail?.teamStatistics?.local?.goals || "",
        goalsAway: matchDetail?.teamStatistics?.visitor?.goals || "",
        offsidesHome: matchDetail?.teamStatistics?.local?.offsides || "",
        offsidesAway: matchDetail?.teamStatistics?.visitor?.offsides || "",
        yellowCardsHome: matchDetail?.teamStatistics?.local?.yellowCards || "",
        yellowCardsAway: matchDetail?.teamStatistics?.visitor?.yellowCards || "",
        redCardsHome: matchDetail?.teamStatistics?.local?.redCards || "",
        redCardsAway: matchDetail?.teamStatistics?.visitor?.redCards || "",
        cornersHome: matchDetail?.teamStatistics?.local?.corners || "",
        cornersAway: matchDetail?.teamStatistics?.visitor?.corners || "",
        possessionHome: matchDetail?.teamStatistics?.local?.possession || "",
        possessionAway: matchDetail?.teamStatistics?.visitor?.possession || "",
       
        shotsOnTargetHome: matchDetail?.teamStatistics?.local?.shotsOnTarget || "",
        shotsOnTargetAway: matchDetail?.teamStatistics?.visitor?.shotsOnTarget || "",
        totalShotsHome: matchDetail?.teamStatistics?.local?.shots || "",
        totalShotsAway: matchDetail?.teamStatistics?.visitor?.shots || "",
        foultsHome: matchDetail?.teamStatistics?.local?.foults || "", // Updated to match form field name
      foultsAway: matchDetail?.teamStatistics?.visitor?.foults || "", // Updated to match form field name
      });
    }
  }, [matchDetail]);
console.log(" matchDetail?.teamStatistics?.visitor?.foults",  matchDetail?.teamStatistics?.visitor?.foults)
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

  const handleSubmit = async (values) => {
    console.log("VALUES", values)
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
          foults: parseInt(values.faultsHome    ),
        },
        visitor: {
          goals: parseInt(values.goalsAway),
          totalShots: parseInt(values.totalShotsAway),
          shotsOnTarget: parseInt(values.shotsOnTargetAway),
          possession: parseInt(values.possessionAway),
          yellowCards: parseInt(values.yellowCardsAway),
          corners: parseInt(values.cornersAway),
          offsides: parseInt(values.offsidesAway),
          foults: parseInt(values.faultsAway ),
          redCards: parseInt(values.redCardsAway),
        },
      },
      isFinished: true,
    });
  };

  return (
    <Formik
      enableReinitialize
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
                name="foultsHome" // Updated to match initial values name
                label="Faltas local"
                type="number"
                variant="outlined"
                fullWidth
              />
              <ErrorMessage name="foultsHome" component="div" />
            </Grid>
            <Grid item xs={6}>
              <Field
                as={TextField}
                name="foultsAway" // Updated to match initial values name
                label="Faltas Visitante"
                type="number"
                variant="outlined"
                fullWidth
              />
              <ErrorMessage name="foultsAway" component="div" />
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
