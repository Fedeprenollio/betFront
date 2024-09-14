/* eslint-disable react/prop-types */
import React, { useEffect, useState, useCallback, useMemo } from "react";
import { Formik, Field, Form, ErrorMessage, FastField } from "formik";
import * as Yup from "yup";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useBoundStore } from "../../stores";
import AlertDialogCopy from "../../componts/feedback/AlertDialogCopy";
import { AlertMessageCopy } from "../../componts/feedback/AlertMessageCopy";
import { AddRefereeToMatch } from "../referee/AddRefereeToMatch";
import { ScrapeURLForm } from "./ScrapeURLForm";

const FormAddResult = ({ matchId, visitorName, localName,onSuccess }) => {
  const { addMatchResult, getMatchDetail, matchDetail, loading, error, getReferees, referees,setMatches } = useBoundStore((state) => state );
  const [initialValues, setInitialValues] = useState({
    goalsHome: "",
    goalsAway: 0,
    offsidesHome: 0,
    offsidesAway: 0,
    yellowCardsHome: 0,
    yellowCardsAway: 0,
    redCardsHome: 0,
    redCardsAway: 0,
    cornersHome: 0,
    cornersAway: 0,
    possessionHome: 0,
    possessionAway: 0,
    foultsHome: 0,
    foultsAway: 0,
    shotsOnTargetHome: 0,
    shotsOnTargetAway: 0,
    totalShotsHome: 0,
    totalShotsAway: 0,
    penaltiesHome: 0,
    penaltiesAway: 0, // Añadimos campos de penales
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState("success");
  const [alertText, setAlertText] = useState("");
  const [penaltiesEnabled, setPenaltiesEnabled] = useState(false); // Estado para habilitar/deshabilitar penales
  const [refereeSelected, setRefereeSelected] = useState("")

console.log("matchDetail",matchDetail)
  useEffect(() => {
    const fetchMatchDetail = async () => {
      await getMatchDetail({ idMatch: matchId });
    };
    fetchMatchDetail();
    
    getReferees()
  }, [getMatchDetail, matchId,getReferees]);

  useEffect(() => {
    setRefereeSelected(matchDetail.referee)
  }, [matchDetail.referee])
  
  useEffect(() => {
    if (matchDetail && matchDetail._id === matchId) {
      setInitialValues({
        goalsHome: matchDetail?.teamStatistics?.local?.goals || "",
        goalsAway: matchDetail?.teamStatistics?.visitor?.goals || "",
        offsidesHome: matchDetail?.teamStatistics?.local?.offsides || "",
        offsidesAway: matchDetail?.teamStatistics?.visitor?.offsides || "",
        yellowCardsHome: matchDetail?.teamStatistics?.local?.yellowCards || "",
        yellowCardsAway:
          matchDetail?.teamStatistics?.visitor?.yellowCards || "",
        redCardsHome: matchDetail?.teamStatistics?.local?.redCards || "",
        redCardsAway: matchDetail?.teamStatistics?.visitor?.redCards || "",
        cornersHome: matchDetail?.teamStatistics?.local?.corners || "",
        cornersAway: matchDetail?.teamStatistics?.visitor?.corners || "",
        possessionHome: matchDetail?.teamStatistics?.local?.possession || "",
        possessionAway: matchDetail?.teamStatistics?.visitor?.possession || "",
        shotsOnTargetHome:
          matchDetail?.teamStatistics?.local?.shotsOnTarget || "",
        shotsOnTargetAway:
          matchDetail?.teamStatistics?.visitor?.shotsOnTarget || "",
        foultsHome: matchDetail?.teamStatistics?.local?.foults || "",
        foultsAway: matchDetail?.teamStatistics?.visitor?.foults || "",
        totalShotsHome: matchDetail?.teamStatistics?.local?.shots || "",
        totalShotsAway: matchDetail?.teamStatistics?.visitor?.shots || "",
        penaltiesHome: matchDetail?.penaltyResult?.homePenalties || "",
        penaltiesAway: matchDetail?.penaltyResult?.awayPenalties || "",
      });
    }
  }, [matchDetail, matchId]);

  const validationSchema = useMemo(
    () =>
      Yup.object().shape({
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
        shotsOnTargetHome: Yup.number().min(0),
        shotsOnTargetAway: Yup.number().min(0),
        totalShotsHome: Yup.number().min(0),
        totalShotsAway: Yup.number().min(0),
        foultsHome: Yup.number().min(0),
        foultsAway: Yup.number().min(0),
        penaltiesHome: Yup.number(),
        penaltiesAway: Yup.number(),
      }),
    []
  );

  const handleSubmit = useCallback(async (values) => {
    setIsDialogOpen(true);
  }, []);

  const handleConfirm = useCallback(
    async (values) => {
      setIsDialogOpen(false);
      console.log("values para resultado:", values)
      try {
      const updatedMatch =   await addMatchResult(matchId, {
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
              yellowCards: parseInt(values.yellowCardsAway),
              corners: parseInt(values.cornersAway),
              offsides: parseInt(values.offsidesAway),
              foults: parseInt(values.foultsAway),
              redCards: parseInt(values.redCardsAway),
            },
          },
          isFinished: true,
          penaltyResult: {
            homePenalties: parseInt(values.penaltiesHome),
            awayPenalties: parseInt(values.penaltiesAway),
          },
          refereeId: values.referee
        });
        console.log("updatedMatch",updatedMatch)
        onSuccess(updatedMatch)
        // getMatchDetail({idMatch:matchId})
        // console.log("matchDetail.date",matchDetail.date)
        // setMatches({date: matchDetail.date})
        
        setAlertSeverity("success");
        setAlertText("Resultado actualizado con éxito");
      } catch (error) {
        setAlertSeverity("error");
        setAlertText("Error al actualizar el resultado");
      } finally {
        setIsAlertOpen(true);
      }
    },
    [addMatchResult, matchId]
  );

  const handleWheel = (event) => {
    event.preventDefault(); // Prevenir scroll en los campos numéricos mientras están enfocados
  };
  const togglePenalties = () => {
    setPenaltiesEnabled((prev) => !prev);
  };
  const handleRefereeChange = (e) => {
    console.log(e.target.value);
    setRefereeSelected(e.target.value);
  };
  return (
    <>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue,handleChange }) => (
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
                <FastField
                  as={TextField}
                  name="goalsHome"
                  label="Goles Equipo Local"
                  type="number"
                  variant="outlined"
                  fullWidth
                  onWheel={(e) => e.target.blur()} // Manejar evento de rueda para prevenir scroll
                />
                <ErrorMessage name="goalsHome" component="div" />
              </Grid>
              <Grid item xs={6}>
                <FastField
                  as={TextField}
                  name="goalsAway"
                  label="Goles Equipo Visitante"
                  type="number"
                  variant="outlined"
                  fullWidth
                  onWheel={(e) => e.target.blur()}
                />
                <ErrorMessage name="goalsAway" component="div" />
              </Grid>
              <Grid item xs={6}>
                <FastField
                  as={TextField}
                  name="totalShotsHome"
                  label="Tiros Total Equipo Local"
                  type="number"
                  variant="outlined"
                  fullWidth
                  onWheel={(e) => e.target.blur()}
                />
                <ErrorMessage name="totalShotsHome" component="div" />
              </Grid>
              <Grid item xs={6}>
                <FastField
                  as={TextField}
                  name="totalShotsAway"
                  label="Tiros Total Equipo Visitante"
                  type="number"
                  variant="outlined"
                  fullWidth
                  onWheel={(e) => e.target.blur()}
                />
                <ErrorMessage name="totalShotsAway" component="div" />
              </Grid>
              <Grid item xs={6}>
                <FastField
                  as={TextField}
                  name="shotsOnTargetHome"
                  label="Tiros al arco Equipo Local"
                  type="number"
                  variant="outlined"
                  fullWidth
                  onWheel={(e) => e.target.blur()}
                />
                <ErrorMessage name="shotsOnTargetHome" component="div" />
              </Grid>
              <Grid item xs={6}>
                <FastField
                  as={TextField}
                  name="shotsOnTargetAway"
                  label="Tiros al arco Equipo Visitante"
                  type="number"
                  variant="outlined"
                  fullWidth
                  onWheel={(e) => e.target.blur()}
                />
                <ErrorMessage name="shotsOnTargetAway" component="div" />
              </Grid>
              <Grid item xs={6}>
                <FastField
                  as={TextField}
                  name="possessionHome"
                  label="Posesión (%) Equipo Local"
                  type="number"
                  variant="outlined"
                  fullWidth
                  onWheel={(e) => e.target.blur()}
                />
                <ErrorMessage name="possessionHome" component="div" />
              </Grid>
              <Grid item xs={6}>
                <FastField
                  as={TextField}
                  name="possessionAway"
                  label="Posesión (%) Equipo Visitante"
                  type="number"
                  variant="outlined"
                  fullWidth
                  onWheel={(e) => e.target.blur()}
                />
                <ErrorMessage name="possessionAway" component="div" />
              </Grid>
              <Grid item xs={6}>
                <FastField
                  as={TextField}
                  name="foultsHome"
                  label="Faltas Equipo Local"
                  type="number"
                  variant="outlined"
                  fullWidth
                  onWheel={(e) => e.target.blur()}
                />
                <ErrorMessage name="foultsHome" component="div" />
              </Grid>
              <Grid item xs={6}>
                <FastField
                  as={TextField}
                  name="foultsAway"
                  label="Faltas Equipo Visitante"
                  type="number"
                  variant="outlined"
                  fullWidth
                  onWheel={(e) => e.target.blur()}
                />
                <ErrorMessage name="foultsAway" component="div" />
              </Grid>
              <Grid item xs={6}>
                <FastField
                  as={TextField}
                  name="yellowCardsHome"
                  label="Tarjetas Amarillas Equipo Local"
                  type="number"
                  variant="outlined"
                  fullWidth
                  onWheel={(e) => e.target.blur()}
                />
                <ErrorMessage name="yellowCardsHome" component="div" />
              </Grid>
              <Grid item xs={6}>
                <FastField
                  as={TextField}
                  name="yellowCardsAway"
                  label="Tarjetas Amarillas Equipo Visitante"
                  type="number"
                  variant="outlined"
                  fullWidth
                  onWheel={(e) => e.target.blur()}
                />
                <ErrorMessage name="yellowCardsAway" component="div" />
              </Grid>

              <Grid item xs={6}>
                <FastField
                  as={TextField}
                  name="offsidesHome"
                  label="Offsides Equipo Local"
                  type="number"
                  variant="outlined"
                  fullWidth
                  onWheel={(e) => e.target.blur()}
                />
                <ErrorMessage name="offsidesHome" component="div" />
              </Grid>
              <Grid item xs={6}>
                <FastField
                  as={TextField}
                  name="offsidesAway"
                  label="Offsides Equipo Visitante"
                  type="number"
                  variant="outlined"
                  fullWidth
                  onWheel={(e) => e.target.blur()}
                />
                <ErrorMessage name="offsidesAway" component="div" />
              </Grid>
              <Grid item xs={6}>
                <FastField
                  as={TextField}
                  name="cornersHome"
                  label="Córners Equipo Local"
                  type="number"
                  variant="outlined"
                  fullWidth
                  onWheel={(e) => e.target.blur()}
                />
                <ErrorMessage name="cornersHome" component="div" />
              </Grid>
              <Grid item xs={6}>
                <FastField
                  as={TextField}
                  name="cornersAway"
                  label="Córners Equipo Visitante"
                  type="number"
                  variant="outlined"
                  fullWidth
                  onWheel={(e) => e.target.blur()}
                />
                <ErrorMessage name="cornersAway" component="div" />
              </Grid>

              {
                // Penales
              }

              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={togglePenalties}
                >
                  {penaltiesEnabled
                    ? "Deshabilitar Penales"
                    : "Habilitar Penales"}
                </Button>
              </Grid>
              {penaltiesEnabled && (
                <>
                  <Grid item xs={6}>
                    <FastField
                      as={TextField}
                      name="penaltiesHome"
                      label="Penales Equipo Local"
                      type="number"
                      variant="outlined"
                      fullWidth
                      onWheel={(e) => e.target.blur()}
                    />
                    <ErrorMessage name="penaltiesHome" component="div" />
                  </Grid>
                  <Grid item xs={6}>
                    <FastField
                      as={TextField}
                      name="penaltiesAway"
                      label="Penales Equipo Visitante"
                      type="number"
                      variant="outlined"
                      fullWidth
                      onWheel={(e) => e.target.blur()}
                    />
                    <ErrorMessage name="penaltiesAway" component="div" />
                  </Grid>
                </>
              )}

              
              <Grid item xs={9} md={6} >
                <AddRefereeToMatch
                  refereeSelected={refereeSelected}
                  referees={referees}
                  handleChange={handleChange}
                  handleRefereeChange={handleRefereeChange}
                />
                </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary">
                  Actualizar Resultado
                </Button>
              </Grid>
            </Grid>
            <AutoFillPossession values={values} setFieldValue={setFieldValue} />
            <ScrapeURLForm setFieldValue={setFieldValue} />

            <AlertDialogCopy
              open={isDialogOpen}
              onClose={() => setIsDialogOpen(false)}
              onConfirm={() => handleConfirm(values)}
              message="Confirmar actualización"
              contentText={`¿Estás seguro de que quieres actualizar el resultado de "${localName} vs ${visitorName}"?`}
            />
          </Form>
        )}
      </Formik>
      {isAlertOpen && (
        <AlertMessageCopy
          isAlertOpen={isAlertOpen}
          severity={alertSeverity}
          textAlert={alertText}
          setIsAlertOpen={setIsAlertOpen}
        />
      )}
    </>
  );
};
const AutoFillPossession = ({ values, setFieldValue }) => {
  useEffect(() => {
    if (values.possessionHome !== 0) {
      const updatedPossessionAway = 100 - parseInt(values.possessionHome);
      setFieldValue(
        "possessionAway",
        updatedPossessionAway > 0 ? updatedPossessionAway : 0
      );
    }
  }, [values.possessionHome, setFieldValue]);

  // useEffect(() => {
  //   if (values.possessionAway !== 0 ) {
  //     const updatedPossessionHome = 100 - parseInt(values.possessionAway);
  //     setFieldValue("possessionHome", updatedPossessionHome > 0 ? updatedPossessionHome : 0);
  //   }
  // }, [values.possessionAway, setFieldValue]);

  return null;
};

// Asignar un nombre al componente memoizado
const MemoizedFormAddResult = React.memo(FormAddResult);
MemoizedFormAddResult.displayName = "FormAddResult";

export default MemoizedFormAddResult;
