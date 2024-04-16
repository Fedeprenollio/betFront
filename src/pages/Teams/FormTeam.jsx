import { Formik, Form, Field, ErrorMessage } from "formik";
import { TextField, Button, MenuItem } from "@mui/material";
import * as Yup from "yup"; 
import useTeamStore from "../../stores/teamStore";

// Definimos las opciones para países y ligas
const countries = [
  {
    value: 'Argentina',
    label: 'Argentina',
  },
  {
    value: 'España',
    label: 'España',
  },
  {
    value: 'Inglaterra',
    label: 'Inglaterra',
  },
  {
    value: 'Italia',
    label: 'Italia',
  },
];

const leagues = {
  Argentina: [
    { value: 'Superliga', label: 'Superliga' },
    { value: 'Primera Nacional', label: 'Primera Nacional' },
    // Agrega más ligas según sea necesario para Argentina
  ],
  España: [
    { value: 'La Liga', label: 'La Liga' },
    // Agrega más ligas según sea necesario para España
  ],
  Inglaterra: [
    { value: 'Premier League', label: 'Premier League' },
    // Agrega más ligas según sea necesario para Inglaterra
  ],
  Italia: [
    { value: 'Serie A', label: 'Serie A' },
    // Agrega más ligas según sea necesario para Italia
  ],
};

const FormTeam = () => {
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Required"),
    city: Yup.string().required("Required"),
    country: Yup.string().required("Required"),
    league: Yup.string().required("Required"),
  });

  const { newTeam } = useTeamStore((state) => state);
  
  const handleSubmit = async (values) => {
   await newTeam({ values });
  };

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
            onChange={handleChange}
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
              leagues[values.country].map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
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
