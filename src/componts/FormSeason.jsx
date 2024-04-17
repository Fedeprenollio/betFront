import  { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import { TextField } from "@mui/material";

import * as yup from "yup";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { useBoundStore } from "../stores";

const validationSchema = yup.object({
  country: yup.string().required("El país es obligatorio"),
  league: yup.string().required("La liga es obligatoria"),
  year: yup.string().required("El año es obligatorio"),
});

const FormSeason = () => {
  // const { leagues, fetchLeagues } = crateLeagueStore();
  const { leagues, fetchLeagues, createSeason } = useBoundStore ( state=> state)

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

  return (
    <Formik
      initialValues={{
        country: "",
        league: "",
        year: "",
      }}
      validationSchema={validationSchema}
      onSubmit={ async(values) => {
        createSeason(values);
      await  fetchLeagues()
      }}
    >
      {({ values, errors, touched, setFieldValue }) => (
        <Form>
          <Typography variant="h6" gutterBottom>
            Crear Temporada
          </Typography>

          <FormControl fullWidth margin="normal">
            <InputLabel htmlFor="country">País</InputLabel>
            <Select
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
            </Select>
            {touched.country && errors.country && (
              <Typography variant="caption" color="error">
                {errors.country}
              </Typography>
            )}
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel htmlFor="league">Liga</InputLabel>
            <Select
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
            </Select>
            {touched.league && errors.league && (
              <Typography variant="caption" color="error">
                {errors.league}
              </Typography>
            )}
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel htmlFor="year">Año</InputLabel>
            <TextField
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

          <Button type="submit" variant="contained" color="primary">
            Crear Temporada
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default FormSeason;
