import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { TextField, Button, MenuItem, Grid } from "@mui/material";
import * as Yup from "yup";
import { useBoundStore } from "../../stores";
import axios from "axios";
import { BACKEND_URL_BASE } from "../../stores/url_base";

const validationSchema = Yup.object().shape({
  country: Yup.string().required("Required"),
  league: Yup.string().required("Required"),
  seasonYear: Yup.string().required("Required"),
  round: Yup.string().required("Required"),
  order: Yup.number().required("Required"),
  totalRounds: Yup.number().required("Required"),
  urlScrapeAllMatches: Yup.string().url("Debe ser una URL válida"),
  div: Yup.string().required("Required"),
});

const CreateMatchScraping = () => {
  const { fetchLeagues, leagues } = useBoundStore((state) => state);
  const [countries, setCountries] = useState([]);
  const [leaguesByCountry, setLeaguesByCountry] = useState({});
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedLeague, setSelectedLeague] = useState("");
  const [selectedSeason, setSelectedSeason] = useState("");

  useEffect(() => {
    fetchLeagues(); // Obtener la lista de ligas
  }, [fetchLeagues]);

  useEffect(() => {
    const uniqueCountries = Array.from(
      new Set(leagues?.map((league) => league.country))
    );
    setCountries(uniqueCountries);

    const leaguesData = {};
    uniqueCountries?.forEach((country) => {
      const uniqueLeagues = leagues
        ?.filter((league) => league.country === country)
        ?.map((league) => ({ _id: league._id, name: league.name }));
      leaguesData[country] = uniqueLeagues;
    });
    setLeaguesByCountry(leaguesData);
  }, [leagues]);

  const handleSeasonChange = (event) => {
    const selectedSeasonForm = event.target.value;
    setSelectedSeason(selectedSeasonForm);
  };
  const handleSubmit = async (values) => {
    const token = JSON.parse(window.localStorage.getItem("loggedUser")).token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    console.log("Values scrape", values);
    try {
      const response = await axios.post(
        `${BACKEND_URL_BASE}/season/${selectedSeason}/matches/scrape`,
        values,
        config
      );
      const data = response.data;
      console.log("DATA SCRAP", data);
      //   if (response.ok) {
      //     console.log("Match created successfully!");
      //   } else {
      //     console.log("Failed to create match.");
      //   }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Formik
      initialValues={{
        country: "",
        league: "",
        seasonYear: "",
        round: "",
        order: "",
        totalRounds: "",
        urlScrapeAllMatches: "",
        div: "",
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ handleChange, values }) => (
        <Form>
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
              setSelectedCountry(event.target.value);
              setSelectedLeague("");
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
            disabled={!selectedCountry}
            onChange={(event) => {
              handleChange(event);
              setSelectedLeague(event.target.value);
            }}
          >
            <MenuItem value="">Seleccione una liga</MenuItem>
            {leaguesByCountry[selectedCountry]?.map((league) => (
              <MenuItem key={league._id} value={league._id}>
                {league.name}
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
                type="number"
                variant="outlined"
                fullWidth
                margin="normal"
              />
              <ErrorMessage name="order" component="div" />
            </Grid>
          </Grid>

          <Field
            as={TextField}
            name="totalRounds"
            label="Jornadas Totales"
            type="number"
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <ErrorMessage name="totalRounds" component="div" />

          <Field
            as={TextField}
            name="urlScrapeAllMatches"
            label="URL para scraping"
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <ErrorMessage name="urlScrapeAllMatches" component="div" />
          <Field
            as={TextField}
            name="div"
            label="Div"
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <ErrorMessage name="div" component="div" />
          <Button type="submit" variant="contained" color="primary">
            Crear Partido
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default CreateMatchScraping;
