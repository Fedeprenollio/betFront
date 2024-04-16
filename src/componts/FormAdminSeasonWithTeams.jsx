import { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import * as yup from "yup";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import useLeagueStore from "../stores/leagueStore";
import useTeamStore from "../stores/teamStore";
import useSeasonStore from "../stores/seasonStore";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";

const validationSchema = yup.object({
  country: yup.string().required("El país es obligatorio"),
  league: yup.string().required("La liga es obligatoria"),
  season: yup.string().required("La temporada es obligatoria"),
  teams: yup.array().min(1, "Se deben seleccionar al menos un equipo"),
});

const FormAdminSeasonWithTeams = () => {
  const { leagues, fetchLeagues } = useLeagueStore();
  const { addTeamsToSeason } = useSeasonStore(
    (state) => state
  );
  const { teams: teamsStore } = useTeamStore((state) => state);
  const [countries, setCountries] = useState([]);
  const [leaguesByCountry, setLeaguesByCountry] = useState({});
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedLeague, setSelectedLeague] = useState("");
  const [selectedSeason, setSelectedSeason] = useState("");
  const [selectedTeams, setSelectedTeams] = useState([]); // Estado para equipos seleccionados

useEffect(() => {
  fetchLeagues()
}, [fetchLeagues])


  useEffect(() => {
    // Obtener países únicos de las ligas
    const uniqueCountries = Array.from(
      new Set(leagues.map((league) => league.country))
    );
    setCountries(uniqueCountries);

    // Obtener ligas por país
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
    setSelectedTeams([]); // Reiniciar equipos seleccionados
  };

  const handleLeagueChange = (event) => {
    const selectedLeague = event.target.value;
    setSelectedLeague(selectedLeague);
    setSelectedSeason("");
    setSelectedTeams([]); // Reiniciar equipos seleccionados
  };

  const handleSeasonChange = async (event) => {
    const selectedSeason = event.target.value;
    setSelectedSeason(selectedSeason);

    // await getSeasonById(selectedSeason);
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

    setSelectedTeams(selectedTeams); // Actualizar estado de equipos seleccionados
  };

  return (
    <Formik
      initialValues={{
        country: "",
        league: "",
        season: "",
        teams: [], //poner los equipos iniciales si ya los hubiera
      }}
      validationSchema={validationSchema}
      onSubmit={async () => {
        await addTeamsToSeason(selectedSeason, selectedTeams);
        await fetchLeagues(); //Vuelvo a refrescar las ligas
      }}
    >
      {({  errors, touched, setFieldValue }) => (
        <Form>
          <Typography variant="h6" gutterBottom>
            Agregar equipos a la temporada
          </Typography>
          <FormControl fullWidth sx={{ m: 1, minWidth: 120 }}>
            <InputLabel>País</InputLabel>
            <Select
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
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ m: 1, minWidth: 120 }}>
            <InputLabel>Liga</InputLabel>
            <Select
              value={selectedLeague}
              onChange={(event) => {
                handleLeagueChange(event);
                setFieldValue("league", event.target.value);
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
                console.log(event.target.value);
                handleTeamsChange(event);
                setFieldValue("teams", event.target.value);
              }}
              disabled={!selectedSeason}
              renderValue={(selected) =>
                selected
                  .map(
                    (teamId) =>
                      teamsStore.find((team) => team._id === teamId)?.name
                  )
                  .join(", ")
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

          <Button type="submit" variant="contained" color="primary">
            Crear Temporada con Equipos
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default FormAdminSeasonWithTeams;
