/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Container, TextField, Button, Typography } from '@mui/material';
import { useFormik } from 'formik';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import * as Yup from 'yup';

const NumberOfMatchesInput = ({ onNumberOfMatchesChange }) => {
  const formik = useFormik({
    initialValues: {
      numberOfMatches: '',
    },
    validationSchema: Yup.object({
      numberOfMatches: Yup.number()
        .min(1, 'Debe ser al menos 1')
        .max(50, 'Debe ser 50 o menos')
        .required('Requerido'),
    }),
    onSubmit: (values) => {
      onNumberOfMatchesChange(values.numberOfMatches);
    },
  });

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography variant="h6" gutterBottom>
          Número de Partidos
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Container sx={{ textAlign: 'left', marginBottom: '10px' }}>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              id="numberOfMatches"
              name="numberOfMatches"
              label="Partidos"
              type="number"
              size="small"
              variant="outlined"
              value={formik.values.numberOfMatches}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.numberOfMatches && Boolean(formik.errors.numberOfMatches)}
              helperText={formik.touched.numberOfMatches && formik.errors.numberOfMatches}
              sx={{ marginRight: '10px', width: '100px' }}
            />
            <Button color="primary" variant="contained" type="submit" size="small">
              Aplicar
            </Button>
          </form>
        </Container>
      </AccordionDetails>
    </Accordion>
  );
};

export default NumberOfMatchesInput;
