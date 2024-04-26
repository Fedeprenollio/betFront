/* eslint-disable react/prop-types */
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function AlertDialogCopy({ open, onClose, onConfirm, message, contentText }) {

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
      {message}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
         {contentText}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={onClose}>Cancelar</Button>
        <Button onClick={onConfirm} >
          Si, estoy seguro
        </Button>
      </DialogActions>
    </Dialog>
  );
}
