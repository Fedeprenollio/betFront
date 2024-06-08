import { Formik, Form, Field, ErrorMessage } from "formik";
import { TextField, Button, MenuItem } from "@mui/material";
import * as Yup from "yup";
import createTeamStore from "../../stores/teamStore";
import { useEffect, useState } from "react";
import { useBoundStore } from "../../stores";

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
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Required"),
    // city: Yup.string().required("Required"),
    country: Yup.string().required("Required"),
    // league: Yup.string().required("Required"),
  });
  const [selectedLeague, setSelectedLeague] = useState("");
  const [leaguesByCountry, setLeaguesByCountry] = useState({});

  const { newTeam, leagues, fetchLeagues } = useBoundStore((state) => state);

  useEffect(() => {
    fetchLeagues();
  }, [fetchLeagues]);

  // useEffect(() => {
  //   const leaguesData = {};
  //   countries.forEach((country) => {
  //     leaguesData[country] = leagues
  //       .filter((league) => league.country === country)
  //       .map((league) => ({ id: league._id, name: league.name }));
  //   });
  //   console.log("SOY LEAGUEDATA", leaguesData)
  //   setLeaguesByCountry(leaguesData);
  // }, [leagues]);
 

  const handleSubmit =  (values) => {
     newTeam({ values });
  };

const handleCountryChange=(e)=>{
 const countrySelect = e.target.value
  console.log(e.target.value)
  const leaguesData = {};

    leaguesData[countrySelect] = leagues
      .filter((league) => league.country === countrySelect)
      .map((league) => ({ id: league._id, name: league.name }));
 
  setLeaguesByCountry(leaguesData);
}

  return (
    <Formik
      initialValues={{ name: "", city: "", country: "", league: "" }}
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

          {/* <Field
            as={TextField}
            name="city"
            label="Ciudad"
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <ErrorMessage name="city" component="div" /> */}

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

          {/* <Field
            as={TextField}
            select
            name="league"
            label="Liga"
            variant="outlined"
            fullWidth
            margin="normal"
            disabled={values.country === ""}
          >
            {values.country === "" ? (
              <MenuItem value="">Seleccione un país primero</MenuItem>
            ) : (
              leaguesByCountry[values.country]?.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.name}
                </MenuItem>
              ))
            )}
          </Field> */}

          <ErrorMessage name="league" component="div" />

          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default FormTeam;
