/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import { Button, MenuItem, TextField, Typography } from "@mui/material";

import { useBoundStore } from "../stores";
import AlertDialogCopy from "./feedback/AlertDialogCopy";
import { AlertMessageCopy } from "./feedback/AlertMessageCopy";
import InputFileUpload from "../pages/Teams/InputFileUpload";
import LogoUploader from "./uploaderImage/LogoUploader";
import useLogoUpload from "../customHooks/useLogoUpload ";

const validationSchema = yup.object({
  name: yup.string().required("El nombre es obligatorio"),
  country: yup.string().required("El país es obligatorio"),
});

const FormLeague = ({ idLeague }) => {
  const {
    logoUrl,
    setLogoUrl,
    uploadingLogoUrl,
    isUploading,
    handleFileChange,
    handleRemoveFile,
  } = useLogoUpload("dz3nlbqvo");
  const { teams, setTeams, createLeague, fetchLeagues, updateLeague, getLeagueDetail, token, leagueDetail } = useBoundStore(
    (state) => state
  );
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [severity, setSeverity] = useState("");
  const [msgAlert, setMsgAlert] = useState("");
  const [initialValues, setInitialValues] = useState({
    name: "",
    country: "",
  });
  const [countries, setCountries] = useState([]);
  console.log("TOKEN", token);

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

  useEffect(() => {
    const loadLeagueData = async () => {
      if (idLeague) {
        await getLeagueDetail({ idLeague: idLeague });
      }
    };

    loadLeagueData();
  }, [idLeague, getLeagueDetail, setLogoUrl]);

  useEffect(() => {
    if (leagueDetail) {
      setInitialValues({
        name: leagueDetail.name || "",
        country: leagueDetail.country || "",
      });
      setLogoUrl(leagueDetail.logo || "");
    }
  }, [leagueDetail, setLogoUrl])

  const handleSubmit = async (values) => {
    try {
      await validationSchema.validate(values, { abortEarly: false }); // Validar los valores con Yup
      let response;
      if (idLeague) {
        response = await updateLeague({ idLeague, newValues: values });
      } else {
        response = await createLeague(values);
      }
      await fetchLeagues();
      setOpenCreateDialog(false);
      setSeverity("success");
      setMsgAlert(idLeague ? "Liga actualizada exitosamente" : "Liga creada exitosamente");
      setIsAlertOpen(true);
    } catch (error) {
      if (error.name === "ValidationError") {
        // Capturar errores de validación de Yup
        const errorMessage = error.errors.join(", ");
        console.log("Error de yup,", errorMessage);
        setSeverity("error");
        setMsgAlert(errorMessage);
        setIsAlertOpen(true);
      } else {
        console.log("Error al validar el formulario:", error);
        setSeverity("error");
        setMsgAlert("Error al enviar el formulario");
        setIsAlertOpen(true);
      }
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({ values, errors, touched, setFieldValue }) => (
        <Form>
          <Typography variant="h6" gutterBottom>
            {idLeague ? "Editar liga" : "Crear liga"}
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
          <LogoUploader
            logoUrl={logoUrl}
            uploadingLogoUrl={uploadingLogoUrl}
            handleFileChange={handleFileChange}
            handleRemoveFile={handleRemoveFile}
            setFieldValue={setFieldValue} // Pasa el setFieldValue si es necesario
            cloudName="your_cloud_name" // Tu nombre de Cloudinary
            isUploading={isUploading}
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
            {idLeague ? "Guardar cambios" : "Crear Liga"}
          </Button>

          <AlertDialogCopy
            open={openCreateDialog}
            onClose={() => setOpenCreateDialog(false)}
            onConfirm={async () => await handleSubmit(values)}
            handleSubmit
            formValues
            textDialog
            title={idLeague ? "Confirmar edición" : "Confirmar creación"}
            message={`¿Estás seguro que deseas ${idLeague ? "guardar los cambios en" : "crear"} la liga "${values.name}"?`}
            confirmText={idLeague ? "Guardar cambios" : "Crear"}
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
