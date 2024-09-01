// /* eslint-disable react/prop-types */
// import React from "react";
// import { MenuItem, TextField } from "@mui/material";
// import { Field, ErrorMessage } from "formik";



// export const AddRefereeToMatch = ({ referees, handleChange, handleRefereeChange,refereeSelected }) => {
//   console.log("Arbitros,", referees)
//   return (
//     <>
//       <Field
//         as={TextField}
//         select
//         name="referee"
//         label="Árbitro"
//         variant="outlined"
//         fullWidth
//         value={refereeSelected}
//         margin="normal"
//         onChange={(event) => {
//           handleChange(event);
//           handleRefereeChange(event);
//         }}
//       >
//         <MenuItem value="">Seleccione un árbitro</MenuItem>
//         {referees.length > 0 ? (
//           referees?.map((referee) => (
//             <MenuItem key={referee._id} value={referee._id}>
//               {referee.name}
//             </MenuItem>
//           ))
//         ) : (
//           <MenuItem value="" disabled>
//             No hay árbitros disponibles
//           </MenuItem>
//         )}
//       </Field>
//       <ErrorMessage name="referee" component="div" />
//     </>
//   );
// };

import React from "react";
import { Autocomplete, TextField, MenuItem } from "@mui/material";
import { Field, ErrorMessage } from "formik";

export const AddRefereeToMatch = ({
  referees,
  handleChange,
  handleRefereeChange,
  refereeSelected,
}) => {
  // Agrupar y ordenar árbitros por nacionalidad
  const groupedReferees = referees.reduce((groups, referee) => {
    const country = referee.nationality || "Sin Nacionalidad";
    if (!groups[country]) {
      groups[country] = [];
    }
    groups[country].push(referee);
    return groups;
  }, {});

  // Ordenar los países alfabéticamente
  const sortedCountries = Object.keys(groupedReferees).sort((a, b) =>
    a.localeCompare(b)
  );

  // Generar opciones para Autocomplete
  const options = sortedCountries.flatMap((country) => [
    { label: country, group: true },
    ...groupedReferees[country],
  ]);

  return (
    <>
      <Field name="referee">
        {({ field }) => (
          <Autocomplete
            {...field}
            value={referees.find((ref) => ref._id === refereeSelected) || null}
            options={options}
            groupBy={(option) => (option.group ? option.label : null)}
            getOptionLabel={(option) =>
              option.group ? option.label : option.name
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label="Árbitro"
                variant="outlined"
                margin="normal"
                fullWidth
              />
            )}
            onChange={(event, newValue) => {
              handleChange({
                target: { name: "referee", value: newValue?._id || "" },
              });
              handleRefereeChange({
                target: { name: "referee", value: newValue?._id || "" },
              });
            }}
            renderOption={(props, option) =>
              option.group ? (
                <MenuItem {...props} disabled>
                  <strong>{option.label}</strong>
                </MenuItem>
              ) : (
                <MenuItem {...props} value={option._id}>
                  {option.name}
                </MenuItem>
              )
            }
            isOptionEqualToValue={(option, value) => option._id === value._id}
          />
        )}
      </Field>
      <ErrorMessage name="referee" component="div" />
    </>
  );
};








