/* eslint-disable react/prop-types */
import { Snackbar, Alert } from '@mui/material';
import { useState } from 'react';

export const Notification = ({ open, onClose, message, severity }) => {
  return (
    <div className="alert-message-container" style={{marginTop:"100px", width:"200px"}}>

    <Snackbar open={open} autoHideDuration={6000} onClose={onClose}  sx={{ width: '100%' }}>
      <Alert onClose={onClose} severity={severity}>
        {message}
      </Alert>
    </Snackbar>
    </div>
  );
};

