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
];

// const leagues = {
//   Argentina: [
//     { value: 'Superliga', label: 'Superliga' },
//     { value: 'Primera Nacional', label: 'Primera Nacional' },
//     // Agrega más ligas según sea necesario para Argentina
//   ],
//   España: [
//     { value: 'La Liga', label: 'La Liga' },
//     // Agrega más ligas según sea necesario para España
//   ],
//   Inglaterra: [
//     { value: 'Premier League', label: 'Premier League' },
//     // Agrega más ligas según sea necesario para Inglaterra
//   ],
//   Italia: [
//     { value: 'Serie A', label: 'Serie A' },
//     // Agrega más ligas según sea necesario para Italia
//   ],
// };

const FormTeam = () => {
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Required"),
    city: Yup.string().required("Required"),
    country: Yup.string().required("Required"),
    league: Yup.string().required("Required"),
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
  console.log(countries);
  console.log("ligas", leagues);

  console.log(leaguesByCountry);

  const handleSubmit = async (values) => {
    await newTeam({ values });
  };

const handleCountryChange=(e)=>{
 const countrySelect = e.target.value
  console.log(e.target.value)
  const leaguesData = {};

    leaguesData[countrySelect] = leagues
      .filter((league) => league.country === countrySelect)
      .map((league) => ({ id: league._id, name: league.name }));
 
  console.log("SOY LEAGUEDATA", leaguesData)
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

          <Field
            as={TextField}
            name="city"
            label="Ciudad"
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <ErrorMessage name="city" component="div" />

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

          <Field
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
          </Field>

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
