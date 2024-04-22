/* eslint-disable react/prop-types */
import { Alert, Stack } from "@mui/material";

export const AlertMessage = ({ severity, textAlert, setIsAlertOpen }) => {

  const handleCloseAlert = () => {
    console.log("GOla");
    setIsAlertOpen(false);
  };
  return (
    <Stack sx={{ width: "100%" }} spacing={2} >
       
        <Alert  onClose={handleCloseAlert} severity={severity} elevation={1}>
          {textAlert}
        </Alert>
   
    </Stack>
  );
};
