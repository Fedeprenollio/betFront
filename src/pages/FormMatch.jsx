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
import { AddRefereeToMatch } from "./referee/AddRefereeToMatch";
import dayjs from "dayjs";
import { updateMach } from "./Match/matchApi";

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
        value={field?.value}
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
const FormMatch = ({ initialValues, onClose, matchId }) => {
  const {
    fetchLeagues,
    leagues,
    addMatchesToSeason,
    getSeasonById,
    seasonById,
    getReferees, // Nuevo hook para obtener árbitros
    referees, // Lista de árbitros
    setMatches
  } = useBoundStore((state) => state);

  const [countries, setCountries] = useState([]);
  const [leaguesByCountry, setLeaguesByCountry] = useState({});
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedLeague, setSelectedLeague] = useState("");
  const [selectedSeason, setSelectedSeason] = useState("");
  const [initialTeams, setInitialTeams] = useState({
    homeTeam:"",awayTeam:""
  })
  const [listMatchesCreated, setListMatchesCreated] = useState([]);
  // Estado para las alertas
  const [openAddTeamsDialog, setOpenAddTeamsDialog] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [severity, setSeverity] = useState("");
  const [msgAlert, setMsgAlert] = useState("");
  const [selectedTeams, setSelectedTeams] = useState([]); // Estado para equipos seleccionados
  const [refereeSelected, setRefereeSelected] = useState("");
  useEffect(() => {
    getReferees(); // Obtener la lista de árbitros
  }, [getReferees]);
  console.log("referees", referees);

  useEffect(() => {
    fetchLeagues();
  }, [fetchLeagues]);

  useEffect(() => {
    getSeasonById(selectedSeason);
  }, [getSeasonById, selectedSeason]);

  useEffect(() => {
    // Obtener países únicos de los equipos
    const uniqueCountries = Array.from(
      new Set(leagues?.map((league) => league.country))
    );
    setCountries(uniqueCountries);

    // Obtener ligas únicas por país
    const leaguesData = {};

    uniqueCountries?.forEach((  country) => {
      const uniqueLeagues = new Set(
        leagues?.filter((league) => league.country === country)
          ?.map((league) => {
            return { _id: league._id, name: league.name };
          })
      );
      leaguesData[country] = Array.from(uniqueLeagues)?.map(
        ({ name, _id }) => ({
          _id: _id,
          label: name,
        })
      );
    });




    setLeaguesByCountry(leaguesData);
  }, [leagues]);


  useEffect(() => {
    if(matchId){
      setSelectedLeague(initialValues.league._id)
      setSelectedCountry(initialValues.country)
      setSelectedSeason(initialValues.seasonYear._id)
      setInitialTeams({
        homeTeam: initialValues.homeTeam._id,
        awayTeam: initialValues.awayTeam._id
}      )
      setRefereeSelected(initialValues.referee._id)
    }
  }, [initialValues ,matchId ])
  
  
  const handleSubmit = async (values) => {
    try {
      let response;

      // Verificar si es un partido existente (actualizar) o nuevo (crear)
      if (matchId) {
        // Actualizar partido existente
        response = await updateMach({
          matchId: matchId,
          updatedData: values,
          token: JSON.parse(localStorage.getItem("loggedUser"))
        });
        // setMatches()
      } else {
        // Crear nuevo partido
        response = await addMatchesToSeason({
          seasonId: selectedSeason,
          matches: [values],
        });
      }

      if (!matchId) {
        // Solo añadir a la lista si es una creación, no en actualización
        setListMatchesCreated((prevState) => [
          response?.populatedMatches,
          ...prevState,
        ]);

        // Añadir equipos seleccionados solo si es creación
        setSelectedTeams((prev) => [...prev, values.homeTeam, values.awayTeam]);
      }

      if (response?.state === "ok") {
        setSeverity("success");
        setMsgAlert(matchId ? "Partido editado exitosamente":"Partido creado exitosamente");
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
    setSelectedCountry(event.target.value);
    setSelectedLeague("");
  };
  const handleRefereeChange = (e) => {
    console.log(e.target.value);
    setRefereeSelected(e.target.value);
  };
  const handleSeasonChange = (event) => {
    const selectedSeasonForm = event.target.value;
    setSelectedSeason(selectedSeasonForm);
  };

  const handleLeagueChange = (event) => {
    setSelectedLeague(event.target.value);
  };
  const handleTeamsChange = (event) => {
    const { name, value } = event.target;
    setInitialTeams(prevValue => ({
      ...prevValue,
      [name]: value
    }));
  };
  const availableTeams = !matchId ? seasonById?.season?.teams?.filter(
    (team) => !selectedTeams?.includes(team._id)
  ):  seasonById?.season?.teams
 


  return (
    <>
      <Formik
        initialValues={{
          homeTeam: initialValues?.homeTeam._id || "",
          awayTeam: initialValues?.awayTeam._id || "",
          date: dayjs(initialValues?.date) || null, // Inicializar la fecha como null
          league: initialValues?.league._id || "",
          country: initialValues?.country || "",
          seasonYear: initialValues?.seasonYear._id || "",
          round: initialValues?.round || "",
          order: initialValues?.order || "",
          referee: initialValues?.referee?._id || "",
        }}
       

        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {({ values, handleChange, setFieldValue }) => (
          
          <Form>
            {console.log("valuess", values)}
            <AutoFillOrder values={values} setFieldValue={setFieldValue} />
            <Field
              as={TextField}
              select
              name="country"
              label="País"
              variant="outlined"
              fullWidth
              // value={initialValues?.country || ""}
              margin="normal"
              onChange={(event) => {
                handleChange(event);
                handleCountryChange(event);
              }}
            >
              <MenuItem value="">Seleccione un país</MenuItem>
              {countries?.map((country) => (
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
                ?.season?.map((season) => (
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
              value={initialTeams?.homeTeam}
              onChange={(event) => {
                handleChange(event);
                handleTeamsChange(event);
              }}
            >
              {selectedLeague &&
                // seasonById?.season?.teams
                availableTeams
                  ?.slice()
                  ?.sort((a, b) => a?.name?.localeCompare(b?.name)) // Ordenar alfabéticamente
                  ?.map((team) => {
                    return (
                      <MenuItem key={team?._id} value={team?._id}>
                        {team?.name}
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
              value={initialTeams.awayTeam}
              onChange={(event) => {
                handleChange(event);
                handleTeamsChange(event);
              }}
            >
              {selectedLeague &&
                // seasonById?.season?.teams
                availableTeams
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
            <Grid item xs={12}>
              <AddRefereeToMatch
              refereeSelected={refereeSelected}
                referees={referees}
                handleChange={handleChange}
                handleRefereeChange={handleRefereeChange}
              />
            </Grid>
            <Button type="submit" variant="contained" color="primary">
             {matchId ? "Editar partido" :"Crear partido" } 
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
      {listMatchesCreated.length > 0 && !matchId && (
        <ListMatchesCreates
          listMatchesCreated={listMatchesCreated}
          setListMatchesCreated={setListMatchesCreated}
        />
      )}
    </>
  );
};

export default FormMatch;
