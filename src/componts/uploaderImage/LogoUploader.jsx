/* eslint-disable react/prop-types */
import React from "react";
import {
  Box,
  Typography,
  IconButton,
  CircularProgress
} from "@mui/material";
import { Image } from "cloudinary-react";
import CloseIcon from "@mui/icons-material/Close";
import InputFileUpload from "../../pages/Teams/InputFileUpload";

const LogoUploader = ({
  logoUrl,
  uploadingLogoUrl,
  handleFileChange,
  handleRemoveFile,
  setFieldValue,
  cloudName,
  isUploading
}) => {
  return (
    <Box mt={2} mb={2}>
      {logoUrl && (
        <Box display="flex" alignItems="center" mb={2}>
          <Typography variant="subtitle1" gutterBottom>
            Logo Actual:
          </Typography>
          <Box
            width={100}
            height={100}
            bgcolor="#f0f0f0"
            marginRight={2}
            position="relative"
            display="flex"
            justifyContent="center"
            alignItems="center"
            border="1px solid #ccc"
            borderRadius="8px"
            overflow="hidden"
          >
            <Image cloudName={cloudName} publicId={logoUrl} width="100" height="100" crop="scale" />
          </Box>
        </Box>
      )}
     
      {uploadingLogoUrl && (
        <Box display="flex" alignItems="center" mb={2}>
          <Typography variant="subtitle1" gutterBottom>
            El Nuevo Logo será:
          </Typography>
          <Box
            width={100}
            height={100}
            bgcolor="#f0f0f0"
            marginRight={2}
            position="relative"
            display="flex"
            justifyContent="center"
            alignItems="center"
            border="1px solid #ccc"
            borderRadius="8px"
            overflow="hidden"
          >
            <Image cloudName={cloudName} publicId={uploadingLogoUrl} width="100" height="100" crop="scale" />
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
   {isUploading && <spa>Cargando imagen...</spa>}
      {!uploadingLogoUrl && (
        <InputFileUpload onChange={(event) => handleFileChange(event, setFieldValue)} />
      )}
    </Box>
  );
};

export default LogoUploader;
