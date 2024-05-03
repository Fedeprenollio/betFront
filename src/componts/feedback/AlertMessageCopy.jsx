/* eslint-disable react/prop-types */
import { Alert, Stack } from "@mui/material";
import { useEffect } from "react";

export const AlertMessageCopy = ({isAlertOpen, severity, textAlert, setIsAlertOpen }) => {
  const handleCloseAlert = () => {
    console.log("GOla");
    setIsAlertOpen(false);
  };

  useEffect(() => {
    if(isAlertOpen){
    const timer =   setTimeout(() => {
          setIsAlertOpen(false)
      }, 5000);
      return ()=> clearTimeout(timer)
    }    
  }, [isAlertOpen,setIsAlertOpen])
  return (
    <Stack sx={{ width: "100%" }} spacing={2}>
      <Alert onClose={handleCloseAlert} severity={severity} elevation={1}>
        {textAlert}
      </Alert>
    </Stack>
  );
};
