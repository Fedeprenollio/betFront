/* eslint-disable react/prop-types */
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
import { useBoundStore } from "../../stores";

const validationSchema = yup.object({
  country: yup.string().required("El país es obligatorio"),
  league: yup.string().required("La liga es obligatoria"),
  season: yup.string().required("La temporada es obligatoria"),
});

export const FilterLeague = ({ setLeagueSelected, setFilteredLeagues }) => {
  const { fetchLeagues, leagues } = useBoundStore((state) => state);
  const [countries, setCountries] = useState([]);
  const [leaguesByCountry, setLeaguesByCountry] = useState({});
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedLeague, setSelectedLeague] = useState("");
  const [selectedSeason, setSelectedSeason] = useState("");

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

  const handleCountryChange = (event, setFieldValue) => {
    const selectedCountry = event.target.value;
    setSelectedCountry(selectedCountry);
    setSelectedLeague("");
    setSelectedSeason("");
    setFilteredLeagues(
      leagues.filter((league) => league.country === selectedCountry)
    );
    setFieldValue("country", selectedCountry);
  };

  const handleLeagueChange = (event, setFieldValue) => {
    const selectedLeague = event.target.value;
    setSelectedLeague(selectedLeague);
    setSelectedSeason("");
    setLeagueSelected(selectedLeague); // Filtrar las ligas por la liga seleccionada
    setFieldValue("league", selectedLeague);
  };

  const handleSubmit = (values) => {
    console.log(values);
    // Aquí puedes realizar la acción que necesites con los valores seleccionados
  };

  return (
    <Formik
      initialValues={{
        country: "",
        league: "",
        // season: "",
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, errors, touched, setFieldValue }) => (
        <Form>
          <Typography variant="h6" gutterBottom>
            Filtrar Ligas
          </Typography>
          <FormControl fullWidth sx={{ m: 1, minWidth: 120 }}>
            {/* <InputLabel>País</InputLabel> */}
            <Field
              as={TextField}
              select
              label="País"
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
          </FormControl>

          <FormControl fullWidth sx={{ m: 1, minWidth: 120 }}>
            <Field
               as={TextField}
               select
               label="Liga"
              name="league"
              value={selectedLeague}
              onChange={(event) => handleLeagueChange(event, setFieldValue)}
              disabled={!selectedCountry}
            >
              <MenuItem value="">Selecciona una liga</MenuItem>
              {leaguesByCountry[selectedCountry]?.map((league) => (
                <MenuItem key={league._id} value={league._id}>
                  {league.name}
                </MenuItem>
              ))}
            </Field>
          </FormControl>

          {/* <FormControl fullWidth sx={{ m: 1, minWidth: 120 }}>
            <InputLabel>Temporada</InputLabel>
            <Select
              value={selectedSeason}
              onChange={(event) => {
                setSelectedSeason(event.target.value);
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
          </FormControl> */}

          {/* <Button type="submit" variant="contained" color="primary">
            Filtrar
          </Button> */}
        </Form>
      )}
    </Formik>
  );
};
