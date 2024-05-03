import { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
import { useBoundStore } from "../stores";
import AlertDialogCopy from "./feedback/AlertDialogCopy";
import { AlertMessageCopy } from "./feedback/AlertMessageCopy";

const validationSchema = yup.object({
  country: yup.string().required("El país es obligatorio"),
  league: yup.string().required("La liga es obligatoria"),
  season: yup.string().required("La temporada es obligatoria"),
  teams: yup.array().min(1, "Se deben seleccionar al menos un equipo"),
});

const FormAdminSeasonWithTeams = () => {
  const {
    leagues,
    fetchLeagues,
    addTeamsToSeason,
    teams: teamsStore,
  } = useBoundStore((state) => state);

  const [countries, setCountries] = useState([]);
  const [leaguesByCountry, setLeaguesByCountry] = useState({});
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedLeague, setSelectedLeague] = useState("");
  const [selectedSeason, setSelectedSeason] = useState("");
  const [selectedTeams, setSelectedTeams] = useState([]);
  const [showTeamsValue, setShowTeamsValue] = useState(true);
  const [openAddTeamsDialog, setOpenAddTeamsDialog] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [severity, setSeverity] = useState("");
  const [msgAlert, setMsgAlert] = useState("");

  useEffect(() => {
    fetchLeagues();
  }, [fetchLeagues]);

  useEffect(() => {
    const uniqueCountries = Array.from(
      new Set(leagues.map((league) => league.country))
    );
    setCountries(uniqueCountries);

    const leaguesData = {};
    uniqueCountries.forEach((country) => {
      leaguesData[country] = leagues
        .filter((league) => league.country === country)
        .map((league) => ({ name: league.name, _id: league._id }));
    });
    setLeaguesByCountry(leaguesData);
  }, [leagues]);

  const handleCountryChange = (event) => {
    const selectedCountry = event.target.value;
    setSelectedCountry(selectedCountry);
    setSelectedLeague("");
    setSelectedSeason("");
    setSelectedTeams([]);
  };

  const handleLeagueChange = (event) => {
    const selectedLeague = event.target.value;
    setSelectedLeague(selectedLeague);
    setSelectedSeason("");
    setSelectedTeams([]);
  };

  const handleSeasonChange = async (event) => {
    const selectedSeason = event.target.value;
    setSelectedSeason(selectedSeason);

    const selectLeague = leagues.find(
      (league) => league._id === selectedLeague
    );
    const selectSeasonFull = selectLeague.season.find(
      (season) => season._id === selectedSeason
    );
    setSelectedTeams(selectSeasonFull?.teams.map((t) => t._id));
  };

  const handleTeamsChange = (event) => {
    const selectedTeams = event.target.value;
    setSelectedTeams(selectedTeams);
  };

  const handleSubmit = async (values) => {
    console.log("VALUES", values)
    try {
      await validationSchema.validate(values, { abortEarly: false });

      const response = await addTeamsToSeason(values.season, values.teams);
      await fetchLeagues();

      setOpenAddTeamsDialog(false);
      setIsAlertOpen(true);

      if (response?.state === "ok") {
        setSeverity("success");
        setMsgAlert("Equipos agregados exitosamente");
        setIsAlertOpen(true);
      } else {
        setSeverity("error");
        setMsgAlert("Error al cargar equipos");
        setIsAlertOpen(true);
      }
    } catch (error) {
      if (error.name === "ValidationError") {
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
        season: "",
        teams: [],
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, errors, touched, setFieldValue }) => (
        <Form>
          <Typography variant="h6" gutterBottom>
            Agregar equipos a la temporada
          </Typography>

          <FormControl fullWidth sx={{ m: 1, minWidth: 120 }}>
            <Field
              label="País"
              as={TextField}
              select
              value={selectedCountry}
              onChange={(event) => {
                handleCountryChange(event);
                setFieldValue("country", event.target.value);
              }}
            >
              <MenuItem value="">Selecciona un país</MenuItem>
              {countries.map((country) => (
                <MenuItem key={country} value={country}>
                  {country}
                </MenuItem>
              ))}
            </Field>
          </FormControl>

          <FormControl fullWidth sx={{ m: 1, minWidth: 120 }}>
            <InputLabel>Liga</InputLabel>
            <Select
              value={selectedLeague}
              onChange={(event) => {
                handleLeagueChange(event);
                setFieldValue("league", event.target.value);
                // Restablecer valores de temporada y equipos al cambiar la liga
                setFieldValue("season", "");
                setSelectedSeason("");
                setSelectedTeams([]);
              }}
              disabled={!selectedCountry}
            >
              <MenuItem value="">Selecciona una liga</MenuItem>
              {leaguesByCountry[selectedCountry]?.map((league) => (
                <MenuItem key={league._id} value={league._id}>
                  {league.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ m: 1, minWidth: 120 }}>
            <InputLabel>Temporada</InputLabel>
            <Select
              value={selectedSeason}
              onChange={(event) => {
                handleSeasonChange(event);
                setFieldValue("season", event.target.value);
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
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ m: 1, minWidth: 120 }}>
            <InputLabel>Equipos</InputLabel>
            <Select
              multiple
              value={selectedTeams}
              onChange={(event) => {
                handleTeamsChange(event);
                setFieldValue("teams", event.target.value);
              }}
              disabled={!selectedSeason}
              renderValue={(selected) =>
                showTeamsValue
                  ? selected
                      .map(
                        (teamId) =>
                          teamsStore.find((team) => team._id === teamId)?.name
                      )
                      .join(", ")
                  : ""
              }
            >
              {teamsStore
                ?.filter((team) => team.country === selectedCountry)
                .map((team) => (
                  <MenuItem key={team._id} value={team._id}>
                    <Checkbox checked={selectedTeams?.indexOf(team._id) > -1} />
                    <ListItemText primary={team.name} />
                  </MenuItem>
                ))}
            </Select>

            {touched.teams && errors.teams && (
              <Typography variant="caption" color="error">
                {errors.teams}
              </Typography>
            )}
          </FormControl>
          <Button type="button" onClick={()=>setOpenAddTeamsDialog(true)} variant="contained" color="primary">
            Agregar equipos
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
  );
};

export default FormAdminSeasonWithTeams;
