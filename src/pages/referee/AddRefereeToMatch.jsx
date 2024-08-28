/* eslint-disable react/prop-types */
import React from "react";
import { MenuItem, TextField } from "@mui/material";
import { Field, ErrorMessage } from "formik";



export const AddRefereeToMatch = ({ referees, handleChange, handleRefereeChange }) => {
  return (
    <>
      <Field
        as={TextField}
        select
        name="referee"
        label="Árbitro"
        variant="outlined"
        fullWidth
        margin="normal"
        onChange={(event) => {
          handleChange(event);
          handleRefereeChange(event);
        }}
      >
        <MenuItem value="">Seleccione un árbitro</MenuItem>
        {referees.length > 0 ? (
          referees?.map((referee) => (
            <MenuItem key={referee._id} value={referee._id}>
              {referee.name}
            </MenuItem>
          ))
        ) : (
          <MenuItem value="" disabled>
            No hay árbitros disponibles
          </MenuItem>
        )}
      </Field>
      <ErrorMessage name="referee" component="div" />
    </>
  );
};
