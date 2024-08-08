// export default FormTeam;
import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  TextField,
  Button,
  MenuItem,
  Container,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { useBoundStore } from "../../stores";
import { useNavigate, useParams } from "react-router-dom";
import { COUNTRIES } from "./utils";
import { Image } from "cloudinary-react";
import CloseIcon from "@mui/icons-material/Close";
import InputFileUpload from "./InputFileUpload";
import LogoUploader from "../../componts/uploaderImage/LogoUploader";
import useLogoUpload from "../../customHooks/useLogoUpload ";
import { ConfirmDialog } from "./ConfirmDialog ";
import { Notification } from "./Notification";

const FormTeam = () => {
  const { idTeam } = useParams();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [formValues, setFormValues] = useState(null);
  const [createdTeams, setCreatedTeams] = useState([]);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Required"),
    logo: Yup.string(),
    country: Yup.string().required("Required"),
  });

  const {
    newTeam,
    leagues,
    fetchLeagues,
    updateTeam,
    getTeamDetails,
    teamDetails,
  } = useBoundStore((state) => state);

  const [initialValues, setInitialValues] = useState({
    name: "",
    country: "",
    logo: "",
  });

  // const [logoUrl, setLogoUrl] = useState("");
  // const [uploadingLogoUrl, setUploadingLogoUrl] = useState("");
  // const [errorLogo, setErrorLogo] = useState(null);
  const {
    logoUrl,
    setLogoUrl,
    uploadingLogoUrl,
    isUploading,
    handleFileChange,
    handleRemoveFile,
  } = useLogoUpload("dz3nlbqvo");

  useEffect(() => {
    fetchLeagues();
  }, [fetchLeagues]);

  useEffect(() => {
    if (idTeam) {
      getTeamDetails(idTeam);
    }
    fetchLeagues();
  }, [idTeam, getTeamDetails, fetchLeagues]);

  useEffect(() => {
    if (idTeam && teamDetails[idTeam]) {
      setInitialValues(teamDetails[idTeam]);
      setLogoUrl(teamDetails[idTeam].logo || "");
    }
  }, [idTeam, teamDetails, setLogoUrl]);

  const handleSubmit = (values) => {
    console.log("value form", values);
    // if (idTeam) {
    //   updateTeam(idTeam, values);
    // } else {
    //   newTeam({values});
    // }
    setFormValues(values); // Guardar los valores del formulario
    setDialogOpen(true); // Mostrar el diálogo de confirmación
  };

  const handleConfirm = () => {
    setDialogOpen(false);
    if (idTeam) {
      updateTeam(idTeam, formValues)
        .then(() => {
          setNotification({
            open: true,
            message: "Equipo actualizado con éxito",
            severity: "success",
          });
        })
        .catch(() => {
          setNotification({
            open: true,
            message: "Error al actualizar el equipo",
            severity: "error",
          });
        });
    } else {
      newTeam({ values: formValues })
        .then(() => {
          setNotification({
            open: true,
            message: "Equipo creado con éxito",
            severity: "success",
          });
          setCreatedTeams([...createdTeams, formValues]); // Actualizar la lista local
        })
        .catch(() => {
          setNotification({
            open: true,
            message: "Error al crear el equipo",
            severity: "error",
          });
        });
    }
  };

  const handleCountryChange = (e) => {
    const countrySelect = e.target.value;
    const leaguesData = {};
    leaguesData[countrySelect] = leagues
      .filter((league) => league.country === countrySelect)
      .map((league) => ({ id: league._id, name: league.name }));
  };

  return (
    <Container>
      <Typography variant="h6" gutterBottom>
        {idTeam ? "Editar Equipo" : "Crear Equipo"}
      </Typography>

      <Formik
        initialValues={initialValues}
        enableReinitialize
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {({ handleChange, setFieldValue }) => (
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
              {COUNTRIES.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Field>
            <ErrorMessage name="country" component="div" />

            <Button type="submit" variant="contained" color="primary">
              {idTeam ? "Actualizar" : "Crear"}
            </Button>
          </Form>
        )}
      </Formik>
      <ConfirmDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onConfirm={handleConfirm}
      />
      <Notification
        open={notification.open}
        onClose={() => setNotification({ ...notification, open: false })}
        message={notification.message}
        severity={notification.severity}
      />
      <Box mt={4}>
        <Typography variant="h6" gutterBottom>
          Equipos Creados
        </Typography>
        {createdTeams.length === 0 ? (
          <Typography variant="body1">No se han creado equipos aún.</Typography>
        ) : (
          createdTeams.map((team) => (
            <Box
              key={team.id}
              sx={{
                mb: 2,
                p: 2,
                border: "1px solid #ccc",
                borderRadius: "8px",
              }}
            >
              <Typography variant="body1">
                <strong>Nombre:</strong> {team.name}
              </Typography>
              <Typography variant="body2">
                <strong>País:</strong> {team.country}
              </Typography>
              {team.logo && (
                <img
                  src={team.logo}
                  alt={`${team.name} logo`}
                  style={{ width: "50px", height: "50px", borderRadius: "50%" }}
                />
              )}
            </Box>
          ))
        )}
      </Box>
    </Container>
  );
};

export default FormTeam;
