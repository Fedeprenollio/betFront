// /* eslint-disable react/prop-types */
// import { useEffect } from "react";
// import { useBoundStore } from "../../../stores";
// import {
//   FormControl,
//   FormGroup,
//   FormControlLabel,
//   Checkbox,
//   Typography,
//   TextField,
// } from "@mui/material";
// import { useCurrentSeasonTeam } from "../../../customHooks/useCurrentSeasonTeam";

// export const SelectListCurrentSeasons = ({
//   selectedSeasons,
//   onSeasonChange,
//   idTeam,

//   handlePositionFilterChange,
//   positionFilter,
// }) => {
//   const {
//     getAllCurrentSeasons,
//     allCurrentSeasons,
//     error,
//     seasons,
//     fetchSeasons,
//   } = useBoundStore((state) => state);
//   const { completeListCurrentSeason } = useCurrentSeasonTeam(idTeam);

//   useEffect(() => {
//     getAllCurrentSeasons();
//     fetchSeasons();
//   }, [getAllCurrentSeasons, fetchSeasons]);

//   const handleChange = (event) => {
//     const { name, checked } = event.target;
//     onSeasonChange(name, checked);
//   };

//   if (error) {
//     return <Typography>Error: {error.message}</Typography>;
//   }
//   console.log("completeListCurrentSeason", completeListCurrentSeason);
//   return (
//     <FormControl component="fieldset">
//       <FormGroup>
//         {completeListCurrentSeason.length === 0
//           ? allCurrentSeasons.map((season) => (
//               <FormControlLabel
//                 control={
//                   <Checkbox
//                     checked={selectedSeasons.includes(season._id)}
//                     onChange={handleChange}
//                     name={season._id}
//                   />
//                 }
//                 label={`${season.league.name} - ${season.year}`}
//                 key={season._id}
//               />
//             ))
//           : seasons.map((season) => (
//               <FormControlLabel
//                 control={
//                   <Checkbox
//                     checked={selectedSeasons.includes(season._id)}
//                     onChange={handleChange}
//                     name={season._id}
//                   />
//                 }
//                 label={`${season?.league?.name} - ${season.year}`}
//                 key={season._id}
//               />
//             ))}
//       </FormGroup>

//       {selectedSeasons.length === 1 &&
//         completeListCurrentSeason.length !== 0 && (
//           <TextField
//             label="Filtrar por puesto (e.g., 1-3)"
//             value={positionFilter}
//             onChange={handlePositionFilterChange}
//             variant="outlined"
//             fullWidth
//           />
//         )}
//     </FormControl>
//   );
// };

/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useBoundStore } from "../../../stores";
import {
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Typography,
  TextField,
  Box,
  Button,
} from "@mui/material";
import { useCurrentSeasonTeam } from "../../../customHooks/useCurrentSeasonTeam";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";

const validationSchema = yup.object().shape({
  startPosition: yup
    .number()
    .typeError("Debe ser un número")
    .required("Campo requerido"),
  endPosition: yup
    .number()
    .typeError("Debe ser un número")
    .required("Campo requerido"),
});

export const SelectListCurrentSeasons = ({
  selectedSeasons,
  onSeasonChange,
  idTeam,
  handlePositionFilterChange,
  positionFilter,
  handleMatchesLimitChange,
  matchesLimit,
}) => {
  const {
    getAllCurrentSeasons,
    allCurrentSeasons,
    error,
    seasons,
    fetchSeasons,
  } = useBoundStore((state) => state);
  const { completeListCurrentSeason ,currentSeasonTeam} = useCurrentSeasonTeam(idTeam);

  useEffect(() => {
    getAllCurrentSeasons();
    fetchSeasons();
  }, [getAllCurrentSeasons, fetchSeasons]);

  const handleChange = (event) => {
    const { name, checked } = event.target;
    onSeasonChange(name, checked);
  };

  if (error) {
    return <Typography>Error: {error.message}</Typography>;
  }

  console.log("completeListCurrentSeason",completeListCurrentSeason)
  const handleFormSubmit = (values) => {
    const positionRange = `${values.startPosition}-${values.endPosition}`;
    handlePositionFilterChange(positionRange);
  };


const ListSeasonTeamRender =()=>{
  if(    currentSeasonTeam.length === 0  ) {
    return (
      <div>
        Loading....
      </div>
    )
  }else{
    return (
      currentSeasonTeam.map((season) => (
        <FormControlLabel
          control={
            <Checkbox
              checked={selectedSeasons.includes(season._id)}
              onChange={handleChange}
              name={season._id}
            />
          }
          label={`${season?.league?.name} - ${season.year}`}
          key={season._id}
        />
      )
    ))
  }
  
  }

  return (
    <FormControl component="fieldset">
      <FormGroup>
        {!idTeam
          ? allCurrentSeasons.map((season) => (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedSeasons?.includes(season._id)}
                    onChange={handleChange}
                    name={season._id}
                  />
                }
                label={`${season.league.name} - ${season.year}`}
                key={season._id}
              />
            ))
          : <ListSeasonTeamRender/> }
      </FormGroup>

      {selectedSeasons.length === 1 && completeListCurrentSeason.length !== 0 && (
        <Formik
          initialValues={{ startPosition: "", endPosition: "" }}
          validationSchema={validationSchema}
          onSubmit={handleFormSubmit}
        >
          {({ errors, touched }) => (
            <Form>
              <Box display="flex" gap={2} mb={2}>
                <Field
                  as={TextField}
                  label="Puesto inicial"
                  name="startPosition"
                  variant="outlined"
                  fullWidth
                  error={touched.startPosition && Boolean(errors.startPosition)}
                  helperText={touched.startPosition && errors.startPosition}
                />
                <Field
                  as={TextField}
                  label="Puesto final"
                  name="endPosition"
                  variant="outlined"
                  fullWidth
                  error={touched.endPosition && Boolean(errors.endPosition)}
                  helperText={touched.endPosition && errors.endPosition}
                />
              </Box>
              <Button type="submit" variant="contained" color="primary">
                Filtrar por rango
              </Button>
            </Form>
          )}
        </Formik>
      )}
       {/* Input para la cantidad de partidos */}
       {/* <Box mt={2}>
        <TextField
          label="Cantidad de partidos"
          value={matchesLimit}
          onChange={handleMatchesLimitChange}
          variant="outlined"
          fullWidth
        />
      </Box> */}
    </FormControl>
  );
};