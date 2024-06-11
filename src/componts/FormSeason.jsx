import { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import { TextField } from "@mui/material";
import * as yup from "yup";
import { Button, FormControl, MenuItem, Typography } from "@mui/material";
import { useBoundStore } from "../stores";
import AlertDialogCopy from "./feedback/AlertDialogCopy";
import { AlertMessageCopy } from "./feedback/AlertMessageCopy";

const validationSchema = yup.object({
  country: yup.string().required("El país es obligatorio"),
  league: yup.string().required("La liga es obligatoria"),
  year: yup.string().required("El año es obligatorio"),
  numberOfRounds: yup
    .number()
    .required("La cantidad de rondas es obligatoria")
    .positive("La cantidad de rondas debe ser un número positivo")
    .integer("La cantidad de rondas debe ser un número entero"),
});

const FormSeason = () => {
  // const { leagues, fetchLeagues } = crateLeagueStore();
  const { leagues, fetchLeagues, createSeason } = useBoundStore(
    (state) => state
  );

  //CUADRO DE DIALOGO:
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [severity, setSeverity] = useState("");
  const [msgAlert, setMsgAlert] = useState("");

  //------

  const [countries, setCountries] = useState([]);
  const [leaguesByCountry, setLeaguesByCountry] = useState({});
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedLeague, setSelectedLeague] = useState("");
  useEffect(() => {
    const uniqueCountries = Array.from(
      new Set(leagues.map((league) => league.country))
    );
    setCountries(uniqueCountries);

    const leaguesData = {};
    uniqueCountries.forEach((country) => {
      leaguesData[country] = leagues
        .filter((league) => league.country === country)
        .map((league) => ({ id: league._id, name: league.name }));
    });
    setLeaguesByCountry(leaguesData);
  }, [leagues]);

  const handleCountryChange = (event, setFieldValue) => {
    const selectedCountry = event.target.value;
    setSelectedCountry(selectedCountry);
    setSelectedLeague("");
    setFieldValue("country", selectedCountry);
    setFieldValue("league", ""); // Limpiar el valor de la liga al cambiar de país
  };

  const handleLeagueChange = (event, setFieldValue) => {
    const selectedLeague = event.target.value;
    setSelectedLeague(selectedLeague);
    setFieldValue("league", selectedLeague);
  };

  const handleSubmit = async (values) => {
    try {
      await validationSchema.validate(values, { abortEarly: false }); // Validar los valores con Yup

      const response = await createSeason(values);
      await fetchLeagues();
      setOpenCreateDialog(false);
      if (response?.state === "ok") {
        setSeverity("success");
        setMsgAlert("Temporada creada exitosamente");
        setIsAlertOpen(true);
      } else {
        setSeverity("error");
        setMsgAlert("Error al crear la temporada");
        setIsAlertOpen(true);
      }
    } catch (error) {
      if (error.name === "ValidationError") {
        // Capturar errores de validación de Yup
        const errorMessage = error.errors.join(", ");
        setSeverity("error");
        setMsgAlert(errorMessage);
        setIsAlertOpen(true);
      } else {
        console.error("Error al validar el formulario:", error);
      }
    }
  };

  return (
    <Formik
      initialValues={{
        country: "",
        league: "",
        year: "",
        numberOfRounds: "",
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, errors, touched, setFieldValue }) => (
        <Form>
          <Typography variant="h6" gutterBottom>
            Crear Temporada
          </Typography>

          <FormControl fullWidth margin="normal">
            <Field
              label="País"
              as={TextField}
              select
              id="country"
              name="country"
              value={selectedCountry}
              onChange={(event) => handleCountryChange(event, setFieldValue)}
            >
              <MenuItem value="">Selecciona un país</MenuItem>
              {countries.map((country) => (
                <MenuItem key={country} value={country}>
                  {country}
                </MenuItem>
              ))}
            </Field>
            {touched.country && errors.country && (
              <Typography variant="caption" color="error">
                {errors.country}
              </Typography>
            )}
          </FormControl>

          <FormControl fullWidth margin="normal">
            <Field
              label="Liga"
              as={TextField}
              select
              id="league"
              name="league"
              value={selectedLeague}
              onChange={(event) => handleLeagueChange(event, setFieldValue)}
              disabled={!selectedCountry}
            >
              <MenuItem value="">Selecciona una liga</MenuItem>
              {leaguesByCountry[selectedCountry]?.map((league) => (
                <MenuItem key={league.id} value={league.id}>
                  {league.name}
                </MenuItem>
              ))}
            </Field>
            {touched.league && errors.league && (
              <Typography variant="caption" color="error">
                {errors.league}
              </Typography>
            )}
          </FormControl>

          <FormControl fullWidth margin="normal">
            <Field
              as={TextField}
              label="Año"
              id="year"
              name="year"
              value={values.year}
              onChange={(event) => setFieldValue("year", event.target.value)}
            />
            {touched.year && errors.year && (
              <Typography variant="caption" color="error">
                {errors.year}
              </Typography>
            )}
          </FormControl>

          <FormControl fullWidth margin="normal">
            <Field
              as={TextField}
              label="Cantidad de Rondas"
              id="numberOfRounds"
              name="numberOfRounds"
              value={values.numberOfRounds}
              onChange={(event) =>
                setFieldValue("numberOfRounds", event.target.value)
              }
            />
            {touched.numberOfRounds && errors.numberOfRounds && (
              <Typography variant="caption" color="error">
                {errors.numberOfRounds}
              </Typography>
            )}
          </FormControl>

          <Button
            type="button"
            onClick={() => setOpenCreateDialog(true)}
            variant="contained"
            color="primary"
          >
            Crear Temporada
          </Button>
      
          <AlertDialogCopy
            open={openCreateDialog}
            onClose={() => setOpenCreateDialog(false)}
            onConfirm={async () => await handleSubmit(values)}
            handleSubmit
            formValues
            textDialog
            title="Confirmar creación"
            message={`¿Estás seguro  que deseas crear la temporada "${values.year}?"`}
            // contentText="La eliminación es irreversible y borra toda información relacionada a la liga como temporadas, partidos, resultados..."
            confirmText="Si, crear"
            cancelText="Cancelar"
          />

          {isAlertOpen && (
            <AlertMessageCopy
              isAlertOpen={isAlertOpen}
              severity={severity}
              textAlert={msgAlert}
              setIsAlertOpen={setIsAlertOpen}
            />
          )}
        </Form>
      )}
    </Formik>
  );
};

export default FormSeason;
