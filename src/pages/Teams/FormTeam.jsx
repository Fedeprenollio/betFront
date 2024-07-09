import { Formik, Form, Field, ErrorMessage } from "formik";
import { TextField, Button, MenuItem, Container, Typography, Box, IconButton } from "@mui/material";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { useBoundStore } from "../../stores";
import { useNavigate, useParams } from "react-router-dom";
import { COUNTRIES } from "./untils";
import { Image } from 'cloudinary-react';
import CloseIcon from '@mui/icons-material/Close';

const FormTeam = () => {
  const { idTeam } = useParams();
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Required"),
    logo: Yup.string(),
    country: Yup.string().required("Required"),
  });

  const { newTeam, leagues, fetchLeagues, updateTeam, getTeamDetails, teamDetails } = useBoundStore((state) => state);

  const [initialValues, setInitialValues] = useState({
    name: "",
    country: "",
    logo: "",
  });

  const [logoUrl, setLogoUrl] = useState("");
  const [uploadingLogoUrl, setUploadingLogoUrl] = useState("");
  const [errorLogo, setErrorLogo] = useState(null)
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
  }, [idTeam, teamDetails]);

  const handleSubmit = (values) => {
    if (idTeam) {
      updateTeam(idTeam, values);
    } else {
      newTeam(values);
    }
    navigate('/teams');
  };

  const handleCountryChange = (e) => {
    const countrySelect = e.target.value;
    const leaguesData = {};
    leaguesData[countrySelect] = leagues
      .filter((league) => league.country === countrySelect)
      .map((league) => ({ id: league._id, name: league.name }));
  };

  const handleFileChange = async (event, setFieldValue) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'Escudos'); 
    // formData.append('unique_filename', true);

    try {
      const response = await fetch('https://api.cloudinary.com/v1_1/dz3nlbqvo/image/upload', { // Reemplaza con tu cloud_name de Cloudinary
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        const data = await response.json();
        setUploadingLogoUrl(data.secure_url);
        setFieldValue('logo', data.secure_url);
      } else {
        const error = await response.json();
        
        setErrorLogo(error)
        throw new Error('Failed to upload image');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      // Manejar el error aquí
    }
  };
console.log("ERROR",errorLogo)
  const handleRemoveFile = () => {
    setLogoUrl(null); // Limpiar la URL del logo
  };

  return (
    <Container>
      <Typography variant="h6" gutterBottom>
        {idTeam ? 'Editar Equipo' : 'Crear Equipo'}
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

            <Box mt={2} mb={2}>
              {logoUrl && (
                <Box display="flex" alignItems="center" mb={2}>
                  <Typography variant="subtitle1" gutterBottom>
                    Logo Actual:
                  </Typography>
                  <Box width={100} height={100} bgcolor="#f0f0f0" marginRight={2} position="relative">
                    <Image cloudName="your_cloud_name" publicId={logoUrl} width="100" crop="scale" />
                    <IconButton
                      aria-label="Eliminar"
                      onClick={handleRemoveFile}
                      size="small"
                      style={{ position: 'absolute', top: 0, right: 0 }}
                    >
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>
              )}

              {uploadingLogoUrl && (
                <Box display="flex" alignItems="center">
                  <Typography variant="subtitle1" gutterBottom>
                    Subiendo Nuevo Logo:
                  </Typography>
                  <Box width={100} height={100} bgcolor="#f0f0f0" marginRight={2} position="relative">
                    <Image cloudName="your_cloud_name" publicId={uploadingLogoUrl} width="100" crop="scale" />
                  </Box>
                </Box>
              )}

              {!uploadingLogoUrl && (
                <input
                  type="file"
                  accept="image/*"
                  onChange={(event) => handleFileChange(event, setFieldValue)}
                />
              )}
            </Box>

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
