/* eslint-disable react/prop-types */
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";

import DialogTitle from "@mui/material/DialogTitle";
import { AlertMessage } from "./AlertMessage";
import { useState } from "react";

export default function AlertDialog({
  textButton,
  handleSubmit,
  formValues,
  textDialog,
  textSuccess,
  textError
}) {
  const [open, setOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [severity, setSeverity] = useState("");
  const [msgAlert, setMsgAlert] = useState("");
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleAccept = async () => {
    console.log("VALUE", formValues)
    const res = await handleSubmit(formValues);
    setOpen(false);
    
    if (res?.state === "ok") {
      console.log("QUE HAY EN LA ACTION?", res?.state === "ok")
      setSeverity("success");
      setMsgAlert(textSuccess);
      setIsAlertOpen(true);
    } else {
      setSeverity("error");
      console.log("ACA TMB ENTRA?")
      setMsgAlert(textError);
      setIsAlertOpen(true);
    }
  };
console.log("isAlertOpen ", isAlertOpen )
  return (
    <>
      {" "}
      {isAlertOpen && (
        <AlertMessage
          setIsAlertOpen={setIsAlertOpen}
          severity={severity}
          textAlert={msgAlert}
        />
      )}
      <Button variant="outlined" onClick={handleClickOpen}>
        {textButton}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{textDialog}</DialogTitle>
        {/* <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending
            anonymous location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent> */}
        <DialogActions>
          <Button onClick={handleClose}>No, gracias.</Button>
          <Button type="submit" onClick={handleAccept} autoFocus>
            Acepto
          </Button>
        </DialogActions>
      </Dialog>
      {/* { isAlert && showAlert()} */}
    </>
  );
}
