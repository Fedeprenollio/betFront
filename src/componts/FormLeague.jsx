import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import { Button, MenuItem, TextField, Typography } from "@mui/material";

import { useBoundStore } from "../stores";
import AlertDialog from "./feedback/AlertDialog";

const validationSchema = yup.object({
  name: yup.string().required("El nombre es obligatorio"),
  country: yup.string().required("El país es obligatorio"),
});

const FormLeague = () => {
  const { teams, setTeams, createLeague,fetchLeagues } = useBoundStore((state) => state);

  const [countries, setCountries] = useState([]);

  useEffect(() => {
    setTeams();
  }, [setTeams]);

  useEffect(() => {
    // Obtener países únicos de los clubes
    const uniqueCountries = Array.from(
      new Set(teams.map((team) => team.country))
    );
    setCountries(uniqueCountries);
  }, [teams]);

  const handleSubmit = async (values) => {
    const res = await createLeague(values);
    await fetchLeagues()
    return res;
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

          {/* <Button type="submit" variant="contained" color="primary">
            Crear Liga
          </Button> */}
          <AlertDialog
            textDialog={"¿Estás seguro en crear la liga?"}
            textButton={"Crear liga"}
            handleSubmit={handleSubmit}
            formValues={values}
            textSuccess={`Liga ${values.name} creada exitosamente`}
            textError={"Error al crear la liga"}
          ></AlertDialog>
        </Form>
      )}
    </Formik>
  );
};

export default FormLeague;
