/* eslint-disable react/prop-types */
import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

const LoadingErrorWrapper = ({ loading, error, children }) => {
  if (loading) {
    return (
      <Stack alignItems="center" sx={{ mt: 5 }}>
        <CircularProgress />
      </Stack>
    );
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return <>{children}</>; // Renderiza el contenido si no hay loading ni error
};

export default LoadingErrorWrapper;
