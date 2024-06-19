/* eslint-disable react/prop-types */
import { Checkbox, FormControlLabel, FormGroup } from '@mui/material'
import React from 'react'

export const CheckboxLocalVisitor = ({homeOnly,awayOnly,handleHomeOnlyChange, handleAwayOnlyChange }) => {
  return (
    <FormGroup row>
        <FormControlLabel
          control={
            <Checkbox
              checked={homeOnly}
              onChange={handleHomeOnlyChange}
              name="homeOnly"
              color="primary"
            />
          }
          label="Home Only"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={awayOnly}
              onChange={handleAwayOnlyChange}
              name="awayOnly"
              color="primary"
            />
          }
          label="Away Only"
        />
      </FormGroup>
  )
}
