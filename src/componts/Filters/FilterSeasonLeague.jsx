// /* eslint-disable react/prop-types */
// import { Formik, Form, Field } from "formik";
// import {
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   Button,
// } from "@mui/material";
// import * as Yup from "yup";
// import { useEffect, useState } from "react";
// import { useBoundStore } from "../../stores";

// const validationSchema = Yup.object().shape({
//   season: Yup.string().required("Debes seleccionar una temporada"),
//   round: Yup.string().required("Debes seleccionar una jornada"),
// });

// export const FilterSeasonLeague = ({ seasons }) => {
//   const { setMatchesByRound } = useBoundStore((state) => state);
//   // const [roundSelected, setRoundSelected] = useState(1)
//   const [seasonSelected, setSeasonSelected] = useState("");
//   const [rounds, setRounds] = useState([]);

//   useEffect(() => {
//     const seasonDetail = seasons?.find(
//       (season) => season._id === seasonSelected
//     );
//     console.log(seasonDetail);
//     const rounds = Array.from(
//       new Set(seasonDetail?.matches.map((match) => match?.round))
//     );
//     const sortedRounds = rounds.sort((a, b) => a - b); // Ordenar de menor a mayor
//     setRounds(sortedRounds);
//   }, [seasonSelected, seasons]);

//   useEffect(() => {
//     return () => {
//       setMatchesByRound({ seasonId: null, round: null });
//     };
//   }, [setMatchesByRound]);

//   return (
//     <Formik
//       initialValues={{ season: "", round: "" }}
//       validationSchema={validationSchema}
//       onSubmit={(values) => {
//         setMatchesByRound({ seasonId: values.season, round: values.round });
//       }}

//     >
//       {({ handleSubmit, values, setFieldValue }) => (
//         <Form onSubmit={handleSubmit}>
//           <FormControl fullWidth>
//             <InputLabel id="season-select-label">Temporada</InputLabel>
//             <Field
//               as={Select}
//               labelId="season-select-label"
//               id="season-select"
//               name="season"
//               onChange={(e) => {
//                 setFieldValue("season", e.target.value);
//                 setSeasonSelected(e.target.value);
//               }}
//               value={values.season}
//             >
//               {seasons?.map((season) => (
//                 <MenuItem key={season._id} value={season._id}>
//                   {season.year}
//                 </MenuItem>
//               ))}
//             </Field>
//           </FormControl>
//           <FormControl fullWidth>
//             <InputLabel id="round-select-label">Jornada</InputLabel>
//             <Field
//               as={Select}
//               labelId="round-select-label"
//               id="round-select"
//               name="round"
//               onChange={(e) => {
//                 setFieldValue("round", e.target.value);

//               }}
//               value={values.round}
//             >
//               {rounds?.map((round) => (
//                 <MenuItem key={round} value={round}>
//                   {round}
//                 </MenuItem>
//               ))}
//             </Field>
//           </FormControl>
//           <Button type="submit" variant="contained" color="primary">
//             Filtrar
//           </Button>
//         </Form>
//       )}
//     </Formik>
//   );
// };

/* eslint-disable react/prop-types */
import { Formik, Form, Field } from "formik";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { useBoundStore } from "../../stores";

const validationSchema = Yup.object().shape({
  season: Yup.string().required("Debes seleccionar una temporada"),
  round: Yup.string().required("Debes seleccionar una jornada"),
});

export const FilterSeasonLeague = ({ seasons, setRounds, rounds }) => {
  const { setMatchesByRound } = useBoundStore((state) => state);
  const [seasonSelected, setSeasonSelected] = useState("");

  useEffect(() => {
    const seasonDetail = seasons?.find(
      (season) => season._id === seasonSelected
    );
    const rounds = Array.from(
      new Set(seasonDetail?.matches.map((match) => match?.round))
    );
    const sortedRounds = rounds.sort((a, b) => a - b); // Ordenar de menor a mayor
    setRounds(sortedRounds);
   
    if (seasonSelected === "") {
      const isCurrentSeason = seasons?.find(
        (season) => season?.isCurrentSeason
      );
      console.log(isCurrentSeason);
      setMatchesByRound({
        seasonId: isCurrentSeason?._id,
        round:9,
      });
    }

 
    
  }, [seasonSelected, seasons]);
  console.log("seasons", seasons);
  useEffect(() => {
    console.log("ULTIMA RONDA", rounds);
    setMatchesByRound({
      seasonId: seasonSelected,
      round: rounds[rounds.length - 1],
    });

    return () => {
      setMatchesByRound({ seasonId: null, round: null });
    };
  }, [setMatchesByRound, rounds, seasonSelected]);

  return (
    <Formik
      initialValues={{ season: "", round: "" }}
      validationSchema={validationSchema}
      onSubmit={() => {
        // No es necesario ya que se ejecutará automáticamente
      }}
    >
      {({ values, setFieldValue }) => (
        <Form>
          <FormControl fullWidth>
            <InputLabel id="season-select-label">Temporada</InputLabel>
            <Field
              as={Select}
              label="Temporada"
              labelId="season-select-label"
              id="season-select"
              name="season"
              onChange={(e) => {
                setFieldValue("season", e.target.value);
                setSeasonSelected(e.target.value);
                // Verificar si ambos campos están seleccionados
                if (e.target.value && values.round) {
                  setMatchesByRound({
                    seasonId: e.target.value,
                    round: values.round,
                  });
                }
              }}
              value={values.season}
            >
              <MenuItem value="">Selecciona una temporada</MenuItem>
              {seasons?.map((season) => (
                <MenuItem key={season._id} value={season._id}>
                  {season.year}
                </MenuItem>
              ))}
            </Field>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="round-select-label">Jornada</InputLabel>
            <Field
              as={Select}
              labelId="round-select-label"
              id="round-select"
              name="round"
              onChange={(e) => {
                setFieldValue("round", e.target.value);
                // Verificar si ambos campos están seleccionados
                if (e.target.value && values.season) {
                  setMatchesByRound({
                    seasonId: values.season,
                    round: e.target.value,
                  });
                }
              }}
              value={values.round}
            >
              <MenuItem value="">Selecciona una jornada</MenuItem>
              {rounds?.map((round) => (
                <MenuItem key={round} value={round}>
                  {round}
                </MenuItem>
              ))}
            </Field>
          </FormControl>
        </Form>
      )}
    </Formik>
  );
};
