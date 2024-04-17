import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import { Button, MenuItem, TextField, Typography } from "@mui/material";
import crateLeagueStore from "../stores/leagueStore";
import createTeamStore from "../stores/teamStore";
import { useBoundStore } from "../stores";

const validationSchema = yup.object({
  name: yup.string().required("El nombre es obligatorio"),
  country: yup.string().required("El país es obligatorio"),
});

const FormLeague = () => {
  // const { createLeague } = crateLeagueStore();
  // const { teams, setTeams } = createTeamStore();
  const { teams,setTeams,createLeague } = useBoundStore(state=> state)

  const [countries, setCountries] = useState([]);

  useEffect(() => {
    setTeams();
  }, [setTeams]);

  useEffect(() => {
    // Obtener países únicos de los clubes
    const uniqueCountries = Array.from(new Set(teams.map((team) => team.country)));
    setCountries(uniqueCountries);
  }, [teams]);

  const handleSubmit = (values) => {
    console.log(values);
    createLeague(values);
  };

  return (
    <Formik
      initialValues={{
        name: "",
        country: "",
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, errors, touched }) => (
        <Form>
          <Typography variant="h6" gutterBottom>
            Crear liga
          </Typography>
          <Field
            as={TextField}
            fullWidth
            id="name"
            name="name"
            label="Nombre"
            value={values.name}
            error={touched.name && Boolean(errors.name)}
            helperText={touched.name && errors.name}
            variant="outlined"
            margin="dense"
          />

          <Field
            as={TextField}
            select
            fullWidth
            id="country"
            name="country"
            label="País"
            value={values.country}
            error={touched.country && Boolean(errors.country)}
            helperText={touched.country && errors.country}
            variant="outlined"
            margin="dense"
          >
            {countries.map((country) => (
              <MenuItem key={country} value={country}>
                {country}
              </MenuItem>
            ))}
          </Field>

          <Button type="submit" variant="contained" color="primary">
            Crear Liga
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default FormLeague;
