/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { TextField, Button, MenuItem, Grid } from "@mui/material";
import * as Yup from "yup";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { useBoundStore } from "../stores";
import { AutoFillOrder } from "./AutoFillOrder";
import { AlertMessageCopy } from "../componts/feedback/AlertMessageCopy";
import AlertDialogCopy from "../componts/feedback/AlertDialogCopy";
import { ListMatchesCreates } from "./Match/ListMatchesCreates";

const validationSchema = Yup.object().shape({
  homeTeam: Yup.string().required("Required"),
  awayTeam: Yup.string().required("Required"),
  date: Yup.date().optional().nullable(),
  league: Yup.string().required("Required"),
  country: Yup.string().required("Required"),
  seasonYear: Yup.string().required("Required"),
  round: Yup.string().required("Required"),
  order: Yup.number().required("Required"),
});

const MyDateTimePicker = ({ field, form }) => {
  const handleDateTimeChange = (newValue) => {
    form.setFieldValue(field.name, newValue);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateTimePicker
        value={field.value}
        onChange={handleDateTimeChange}
        textField={(props) => (
          <TextField
            {...props}
            label="Fecha y hora"
            variant="outlined"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
        )}
      />
    </LocalizationProvider>
  );
};

// PARA LUEGO EDITAR PARTIDOS voy a usar luego los matchId
const FormMatch = ({ matchId }) => {
  const {
    fetchLeagues,
    leagues,
    addMatchesToSeason,
    getSeasonById,
    seasonById,
  } = useBoundStore((state) => state);

  const [countries, setCountries] = useState([]);
  const [leaguesByCountry, setLeaguesByCountry] = useState({});
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedLeague, setSelectedLeague] = useState("");
  const [selectedSeason, setSelectedSeason] = useState("");
  const [listMatchesCreated, setListMatchesCreated] = useState([]);
  // Estado para las alertas
  const [openAddTeamsDialog, setOpenAddTeamsDialog] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [severity, setSeverity] = useState("");
  const [msgAlert, setMsgAlert] = useState("");

  useEffect(() => {
    fetchLeagues();
  }, [fetchLeagues]);

  useEffect(() => {
    getSeasonById(selectedSeason);
  }, [getSeasonById, selectedSeason]);

  useEffect(() => {
    // Obtener países únicos de los equipos
    const uniqueCountries = Array.from(
      new Set(leagues.map((league) => league.country))
    );
    setCountries(uniqueCountries);

    // Obtener ligas únicas por país
    const leaguesData = {};
    uniqueCountries.forEach((country) => {
      const uniqueLeagues = new Set(
        leagues
          .filter((league) => league.country === country)
          .map((league) => {
            return { _id: league._id, name: league.name };
          })
      );
      leaguesData[country] = Array.from(uniqueLeagues).map(({ name, _id }) => ({
        _id: _id,
        label: name,
      }));
    });
    setLeaguesByCountry(leaguesData);
  }, [leagues]);

  const handleSubmit = async (values) => {
    try {
      const response = await addMatchesToSeason({
        seasonId: selectedSeason,
        matches: [values],
      });
      console.log(response); // handle response from adding matches
      setListMatchesCreated((presState) => [
        ...presState,
        response.populatedMatches,
      ]);
      if (response?.state === "ok") {
        setSeverity("success");
        setMsgAlert("Partido creado exitosamente");
        setIsAlertOpen(true);
      } else {
        setSeverity("error");
        setMsgAlert("Error al crear partido");
        setIsAlertOpen(true);
      }
    } catch (error) {
      // if (error.name === "ValidationError") {
      //   const errorMessage = error.errors.join(", ");
      //   setSeverity("error");
      //   setMsgAlert(errorMessage);
      //   setIsAlertOpen(true);
      // } else {
      //   console.error("Error al validar el formulario:", error);
      // }
      console.error(error); // handle error
    }
  };
  const handleCountryChange = (event) => {
    console.log(event.target.value);
    setSelectedCountry(event.target.value);
    setSelectedLeague("");
  };

  const handleSeasonChange = (event) => {
    const selectedSeasonForm = event.target.value;
    setSelectedSeason(selectedSeasonForm);
  };

  const handleLeagueChange = (event) => {
    setSelectedLeague(event.target.value);
  };

  return (
    <>
      <Formik
        initialValues={{
          homeTeam: "",
          awayTeam: "",
          date: null, // Inicializar la fecha como null
          league: "",
          country: "",
          seasonYear: "",
          round: "",
          order: "",
        }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {({ values, handleChange, setFieldValue }) => (
          <Form>
            <AutoFillOrder values={values} setFieldValue={setFieldValue} />
            <Field
              as={TextField}
              select
              name="country"
              label="País"
              variant="outlined"
              fullWidth
              margin="normal"
              onChange={(event) => {
                handleChange(event);
                handleCountryChange(event);
              }}
            >
              <MenuItem value="">Seleccione un país</MenuItem>
              {countries.map((country) => (
                <MenuItem key={country} value={country}>
                  {country}
                </MenuItem>
              ))}
            </Field>
            <ErrorMessage name="country" component="div" />

            <Field
              as={TextField}
              select
              name="league"
              label="Liga"
              variant="outlined"
              fullWidth
              margin="normal"
              disabled={values.country === ""}
              value={selectedLeague}
              onChange={(event) => {
                handleChange(event);
                handleLeagueChange(event);
              }}
            >
              <MenuItem value="">Seleccione una liga</MenuItem>
              {selectedCountry &&
                leaguesByCountry[selectedCountry]?.map((league) => (
                  <MenuItem key={league._id} value={league._id}>
                    {league.label}
                  </MenuItem>
                ))}
            </Field>
            <ErrorMessage name="league" component="div" />

            <Field
              sx={{ width: "150px" }}
              as={TextField}
              label="Temporada"
              select
              labelId="season-select-label"
              id="seasonYear"
              name="seasonYear"
              value={selectedSeason}
              onChange={(event) => {
                handleChange(event);
                handleSeasonChange(event);
              }}
              disabled={!selectedLeague}
            >
              <MenuItem value="">Selecciona una temporada</MenuItem>
              {leagues
                .find((league) => league._id === selectedLeague)
                ?.season.map((season) => (
                  <MenuItem key={season._id} value={season._id}>
                    {season.year}
                  </MenuItem>
                ))}
            </Field>
            <ErrorMessage name="seasonYear" component="div" />

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Field
                  as={TextField}
                  name="round"
                  label="Ronda"
                  placeholder="por ej 1 o cuarto de final"
                  type="text"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                />
                <ErrorMessage name="round" component="div" />
              </Grid>
              <Grid item xs={6}>
                <Field
                  as={TextField}
                  name="order"
                  label="Orden"
                  type="text"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                />
                <ErrorMessage name="order" component="div" />
              </Grid>
            </Grid>

            <Field
              as={TextField}
              select
              name="homeTeam"
              label="Equipo Local"
              variant="outlined"
              fullWidth
              margin="normal"
            >
              {selectedLeague &&
                seasonById?.season?.teams
                  ?.slice()
                  ?.sort((a, b) => a.name.localeCompare(b.name)) // Ordenar alfabéticamente
                  ?.map((team) => {
                    return (
                      <MenuItem key={team._id} value={team._id}>
                        {team.name}
                      </MenuItem>
                    );
                  })}
            </Field>
            <ErrorMessage name="homeTeam" component="div" />

            <Field
              as={TextField}
              select
              name="awayTeam"
              label="Equipo Visitante"
              variant="outlined"
              fullWidth
              margin="normal"
            >
              {selectedLeague &&
                seasonById?.season?.teams
                  ?.slice()
                  ?.sort((a, b) => a.name.localeCompare(b.name)) // Ordenar alfabéticamente
                  ?.map((team) => {
                    return (
                      <MenuItem key={team._id} value={team._id}>
                        {team.name}
                      </MenuItem>
                    );
                  })}
            </Field>
            <ErrorMessage name="awayTeam" component="div" />

            <Field name="date">
              {({ field }) => (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <MyDateTimePicker field={field} form={{ setFieldValue }} />
                </LocalizationProvider>
              )}
            </Field>
            <ErrorMessage name="date" component="div" />

            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
            <AlertDialogCopy
              open={openAddTeamsDialog}
              onClose={() => setOpenAddTeamsDialog(false)}
              onConfirm={async () => await handleSubmit(values)}
              handleSubmit
              formValues
              textDialog={"¿Estás seguro en agregar los equipos?"}
              title="Agregar Equipos"
              message="Confirmar la acción"
              confirmText="Agregar"
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
      {listMatchesCreated.length > 0 && 
        <ListMatchesCreates listMatchesCreated={listMatchesCreated} setListMatchesCreated={setListMatchesCreated}/>
      }
    </>
  );
};

export default FormMatch;
