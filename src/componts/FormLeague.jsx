import { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import { Button, MenuItem, TextField, Typography } from "@mui/material";

import { useBoundStore } from "../stores";
import AlertDialog from "./feedback/AlertDialog";
import AlertDialogCopy from "./feedback/AlertDialogCopy";
import { AlertMessageCopy } from "./feedback/AlertMessageCopy";

const validationSchema = yup.object({
  name: yup.string().required("El nombre es obligatorio"),
  country: yup.string().required("El país es obligatorio"),
});

const FormLeague = () => {
  const { teams, setTeams, createLeague, fetchLeagues } = useBoundStore(
    (state) => state
  );
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [severity, setSeverity] = useState("");
  const [msgAlert, setMsgAlert] = useState("");

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
    try {
      await validationSchema.validate(values, { abortEarly: false }); // Validar los valores con Yup

      const response = await createLeague(values);
      await fetchLeagues();
      setOpenCreateDialog(false);
      console.log("RESPONSE----", response);
         setSeverity("success");
        setMsgAlert("Liga creada exitosamente");
        setIsAlertOpen(true);
      // if (response?.status === 200) {
      //   setSeverity("success");
      //   setMsgAlert("Liga creada exitosamente");
      //   setIsAlertOpen(true);
      // } else {
      //   setSeverity("error");
      //   setMsgAlert("Error al crear la liga");
      //   setIsAlertOpen(true);
      // }
    } catch (error) {
      if (error.name === "ValidationError") {
        // Capturar errores de validación de Yup
        const errorMessage = error.errors.join(", ");
        console.log("Error de yup,", errorMessage)
        setSeverity("error");
        setMsgAlert(errorMessage);
        setIsAlertOpen(true);
      } else {
        console.error("Error al validar el formulario:", error);
        const errorMessage = error.join(", ");
        setSeverity("error");
        setMsgAlert(errorMessage);
        setIsAlertOpen(true);
      }
    }
    
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

          <Button
            type="button"
            onClick={() => setOpenCreateDialog(true)}
            variant="contained"
            color="primary"
          >
            Crear Liga
          </Button>
          {/* <AlertDialog
            textDialog={"¿Estás seguro en crear la liga?"}
            textButton={"Crear liga"}
            handleSubmit={handleSubmit}
            formValues={values}
            textSuccess={`Liga ${values.name} creada exitosamente`}
            textError={"Error al crear la liga"}
          ></AlertDialog> */}

          <AlertDialogCopy
            open={openCreateDialog}
            onClose={() => setOpenCreateDialog(false)}
            onConfirm={async () => await handleSubmit(values)}
            handleSubmit
            formValues
            textDialog
            title="Confirmar creación"
            message={`¿Estás seguro  que deseas crear la liga "${values.name}?"`}
            // contentText="La eliminación es irreversible y borra toda información relacionada a la liga como temporadas, partidos, resultados..."
            confirmText="Si, crear"
            cancelText="Cancelar"
          />

          {isAlertOpen && (
            <AlertMessageCopy
              isAlertOpen={isAlertOpen}
              severity={severity}
              textAlert={msgAlert}
              setIsAlertOpen={setIsAlertOpen}
            />
          )}
        </Form>
      )}
    </Formik>
  );
};

export default FormLeague;
