import { Formik, Form, Field, ErrorMessage } from "formik";
import { TextField, Button, MenuItem, Container, Typography } from "@mui/material";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { useBoundStore } from "../../stores";
import {  useNavigate, useParams } from "react-router-dom";

// Definimos las opciones para países y ligas
const countries = [
  {
    value: "Argentina",
    label: "Argentina",
  },
  {
    value: "España",
    label: "España",
  },
  {
    value: "Inglaterra",
    label: "Inglaterra",
  },
  {
    value: "Italia",
    label: "Italia",
  },
  {
    value: "EstadosUnidos",
    label: "Estados Unidos",
  },
  {
    value: "Alemania",
    label: "Alemania",
  },
  {
    value: "Francia",
    label: "Francia",
  },
  {
    value: "Portugal",
    label: "Portugal",
  },
  {
    value: "Paises Bajos",
    label: "Países Bajos",
  },
  {
    value: "Brasil",
    label: "Brasil",
  },
  {
    value: "Japon",
    label: "Japón",
  },
  {
    value: "China",
    label: "China",
  },
  {
    value: "Rusia",
    label: "Rusia",
  },
  {
    value: "Turquia",
    label: "Turquía",
  },
  {
    value: "Escocia",
    label: "Escocia",
  },
  {
    value: "Belgica",
    label: "Bélgica",
  },
  {
    value: "Australia",
    label: "Australia",
  },
  {
    value: "Arabia Saudita",
    label: "Arabia Saudita",
  },
  {
    value: "Suiza",
    label: "Suiza",
  },
  {
    value: "Ucrania",
    label: "Ucrania",
  },
  {
    value: "Chile",
    label: "Chile",
  },
  {
    value: "Ecuador",
    label: "Ecuador",
  },
  {
    value: "Perú",
    label: "Perú",
  },
  {
    value: "Colombia",
    label: "Colombia",
  },
];

const FormTeam = () => {
  const { idTeam } = useParams();
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Required"),
    logo: Yup.string(),
    country: Yup.string().required("Required"),
    // league: Yup.string().required("Required"),
  });
  const [leaguesByCountry, setLeaguesByCountry] = useState({});

  const { newTeam, leagues, fetchLeagues,updateTeam,getTeamDetails,teamDetails } = useBoundStore((state) => state);
  const [initialValues, setInitialValues] = useState({
    name: "",
    country: "",
    logo: "",
  });

  console.log("teamDetails",teamDetails)
  console.log("teamDetails 2",teamDetails[idTeam]?.name)
  useEffect(() => {
    fetchLeagues();
  }, [fetchLeagues]);

  useEffect(() => {
    if (idTeam) {
       getTeamDetails(idTeam);
      
        setInitialValues(teamDetails[idTeam]);
      
    }
    fetchLeagues();
  }, [idTeam, getTeamDetails, fetchLeagues]);

  const handleSubmit = (values) => {
    if (idTeam) {
      updateTeam(idTeam, values);
    } else {
      newTeam(values);
    }
    navigate('/teams');
  };


  const handleCountryChange = (e) => {
    const countrySelect = e.target.value
    console.log(e.target.value)
    const leaguesData = {};

    leaguesData[countrySelect] = leagues
      .filter((league) => league.country === countrySelect)
      .map((league) => ({ id: league._id, name: league.name }));

    setLeaguesByCountry(leaguesData);
  }

  return (
    <Container >
        <Typography variant="h6" gutterBottom>
        {idTeam ? 'Editar Equipo' : 'Crear Equipo'}
      </Typography>

    <Formik
        initialValues={initialValues}
        enableReinitialize 
        onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {({ values, handleChange }) => (
        <Form>
          <Field
            as={TextField}
            name="name"
            label="Nombre"
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <ErrorMessage name="name" component="div" />

          <Field
              as={TextField}
              name="logo"
              label="URL del Escudo"
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <ErrorMessage name="logo" component="div" />

          <Field
            as={TextField}
            select
            name="country"
            label="País"
            variant="outlined"
            fullWidth
            margin="normal"
            onChange={(event) => {
              handleChange(event); // Maneja el cambio en el campo del formulario
              handleCountryChange(event); // Llama a tu función personalizada de manejo de cambios para el país
            }}
          >
            <MenuItem value="">Seleccione un país</MenuItem>
            {countries.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Field>
          <ErrorMessage name="country" component="div" />



          <ErrorMessage name="league" component="div" />

          <Button type="submit" variant="contained" color="primary">
          {idTeam ? 'Actualizar' : 'Crear'}
          </Button>
        </Form>
      )}
    </Formik>

    </Container>
  );
};

export default FormTeam;
