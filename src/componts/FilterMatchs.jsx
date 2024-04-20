// export default FilterMatchs;
import { useEffect, useState } from "react";
import {
  MenuItem,
  Checkbox,
  FormControlLabel,
  Button,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useBoundStore } from "../stores";

const FilterMatchs = () => {
  const { fetchLeagues, leagues} = useBoundStore(state=> state)


  // const [selectedLeagues, setSelectedLeagues] = useState([]);
  // const [selectedCountries, setSelectedCountries] = useState([]);
  // const [selectedSeasons, setSelectedSeasons] = useState([]);

  const [selectedRounds, setSelectedRounds] = useState([]);
  const [isFinished, setIsFinished] = useState(false);
  const [isNotFinished, setIsNotFinished] = useState(false);
  const [countries, setCountries] = useState([]);
  const [leaguesByCountry, setLeaguesByCountry] = useState({});
  const [selectedLeague, setSelectedLeague] = useState("");
  const [selectedSeason, setSelectedSeason] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");

  useEffect(() => {
    // Fetch leagues data
    fetchLeagues();
  }, [fetchLeagues]);

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

  const handleCountryChange = (event) => {
    const selectedCountry = event.target.value;
    setSelectedCountry(selectedCountry);
    setSelectedLeague("");
    setSelectedSeason("");
  };

  const handleLeagueChange = (event) => {
    const selectedLeague = event.target.value;
    setSelectedLeague(selectedLeague);
    setSelectedSeason("");
  };

  const handleSeasonChange = (event) => {
    const selectedSeason = event.target.value;
    setSelectedSeason(selectedSeason);
  };

  const handleSubmit = (values) => {
    console.log("Selected values:", {
      country: selectedCountry,
      league: selectedLeague,
      season: selectedSeason,
      rounds: selectedRounds,
      isFinished: isFinished,
      isNotFinished: isNotFinished,
    });
    // Aquí puedes enviar los valores seleccionados para filtrar los partidos
  };

  return (
    <Formik
      initialValues={{
        country: "",
        league: "",
        season: "",
        round: "",
        isFinished: false,
        isNotFinished: false,
      }}
      onSubmit={handleSubmit}
    >
      {({  handleChange }) => (
        <Form>
          {/* Países */}
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel>País</InputLabel>
            <Select
              value={selectedCountry}
              onChange={(e) => {
                handleCountryChange(e);
                handleChange(e);
              }}
            >
              {countries.map((country) => (
                <MenuItem key={country} value={country}>
                  {country}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Ligas */}
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel>Liga</InputLabel>
            <Select value={selectedLeague} onChange={handleLeagueChange}>
              {leaguesByCountry[selectedCountry]?.map((league) => (
                <MenuItem key={league._id} value={league._id}>
                  {league.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Temporadas */}
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel>Temporada</InputLabel>
            <Select value={selectedSeason} onChange={handleSeasonChange}>
              {/* Mostrar las temporadas disponibles para la liga seleccionada */}
              {leagues
                .find((league) => league._id === selectedLeague)
                ?.season.map((season) => (
                  <MenuItem key={season._id} value={season._id}>
                    {season.year}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>

          {/* Rondas */}
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel>Ronda</InputLabel>
            <Select
              multiple
              value={selectedRounds}
              onChange={(e) => setSelectedRounds(e.target.value)}
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((round) => {
                return (
                  <MenuItem key={round} value={round}>
                    {round}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>

          {/* Checkbox de finalizado */}
          <FormControlLabel
            control={
              <Checkbox
                checked={isFinished}
                onChange={(e) => setIsFinished(e.target.checked)}
              />
            }
            label="Finalizado"
          />

          {/* Checkbox de no finalizado */}
          <FormControlLabel
            control={
              <Checkbox
                checked={isNotFinished}
                onChange={(e) => setIsNotFinished(e.target.checked)}
              />
            }
            label="No finalizado"
          />

          {/* Botón de enviar */}
          <Button type="submit" variant="contained" color="primary">
            Filtrar
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default FilterMatchs;
