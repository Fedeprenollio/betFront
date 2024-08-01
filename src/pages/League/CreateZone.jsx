import React, { useState, useEffect } from "react";
import { Formik, Form, Field, FieldArray } from "formik";
import * as yup from "yup";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
import axios from "axios";
import AlertDialogCopy from "../../componts/feedback/AlertDialogCopy";
import { AlertMessageCopy } from "../../componts/feedback/AlertMessageCopy";
import { useBoundStore } from "../../stores";
import { BACKEND_URL_BASE } from "../../stores/url_base";
import { ZonaList } from "./ZonaList";

const validationSchema = yup.object({
  country: yup.string().required("El país es obligatorio"),
  league: yup.string().required("La liga es obligatoria"),
  season: yup.string().required("La temporada es obligatoria"),
  zones: yup.array().of(
    yup.object().shape({
      name: yup.string().required("El nombre de la zona es obligatorio"),
      teams: yup
        .array()
        .min(1, "Se debe seleccionar al menos un equipo para la zona"),
    })
  ),
});

const CreateZone = () => {
  const [countries, setCountries] = useState([]);
  const [leaguesByCountry, setLeaguesByCountry] = useState({});
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedLeague, setSelectedLeague] = useState("");
  const [selectedSeason, setSelectedSeason] = useState("");
  const [openAddTeamsDialog, setOpenAddTeamsDialog] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [severity, setSeverity] = useState("");
  const [msgAlert, setMsgAlert] = useState("");
  const {
    leagues,
    fetchLeagues,
    teams: teamsStore,
  } = useBoundStore((state) => state);
  const [zones, setZones] = useState([]);
  const [selectedTeamsToAdd, setSelectedTeamsToAdd] = useState({});

  useEffect(() => {
    fetchLeagues();
  }, [fetchLeagues]);

  useEffect(() => {
    const uniqueCountries = Array.from(
      new Set(leagues.map((league) => league.country))
    );
    setCountries(uniqueCountries);

    const leaguesData = {};
    uniqueCountries.forEach((country) => {
      leaguesData[country] = leagues
        .filter((league) => league.country === country)
        .map((league) => ({ name: league.name, _id: league._id }));
    });
    setLeaguesByCountry(leaguesData);
  }, [leagues]);

  const fetchZonesAndTeams = async (seasonId) => {
    try {
      const response = await axios.get(
        `${BACKEND_URL_BASE}/season/${seasonId}/zones`
      );
      console.log("response.data", response.data)
      return response.data;
    } catch (error) {
      console.error("Error fetching zones and teams:", error);
      return [];
    }
  };

  useEffect(() => {
    if (selectedSeason) {
      fetchZonesAndTeams(selectedSeason)
        .then((data) => {
          console.log("SOY LA DATA", data);
          setZones(data);
        })
        .catch((error) => {
          console.error("Error fetching zones and teams:", error);
        });
    }
  }, [selectedSeason]);
console.log("openAddTeamsDialog",openAddTeamsDialog)
  const handleAddTeam = (zoneId, teamId) => {
    setSelectedTeamsToAdd((prev) => ({
      ...prev,
      [zoneId]: [...(prev[zoneId] || []), teamId],
    }));
  };

  const handleRemoveTeam = async (zoneId, teamId) => {
    try {
      await axios.delete(
        `${BACKEND_URL_BASE}/season/zone/${zoneId}/team/${teamId}`
      );
      const updatedZones = await fetchZonesAndTeams(selectedSeason);
      setZones(updatedZones);
    } catch (error) {
      setSeverity("error");
      setMsgAlert("Error al eliminar el equipo de la zona.");
      setIsAlertOpen(true);
    }
  };

  const handleConfirmAddTeams = async (zoneId) => {
    console.log("ZONE ID", zoneId);
    try {
      const teamsToAdd = selectedTeamsToAdd[zoneId] || [];
      await axios.post(`${BACKEND_URL_BASE}/season/zone/${zoneId}/addTeams`, {
        teamIds: teamsToAdd,
      });
      const updatedZones = await fetchZonesAndTeams(selectedSeason);
      setZones(updatedZones);
      setSelectedTeamsToAdd((prev) => ({ ...prev, [zoneId]: [] }));
      setSeverity("success");
      setMsgAlert("Equipos agregados correctamente a la zona.");
      setIsAlertOpen(true);
    } catch (error) {
      setSeverity("error");
      setMsgAlert("Error al agregar equipos a la zona.");
      setIsAlertOpen(true);
    }
  };

  const handleSubmit = async (values) => {
    console.log("VALUES ZONE", values);
    setOpenAddTeamsDialog(false);
    try {
      await axios.post(`${BACKEND_URL_BASE}/season/add-teams`, values);
      const updatedZones = await fetchZonesAndTeams(values.season);
      setZones(updatedZones);
      setSeverity("success");
      setMsgAlert("Zonas agregadas correctamente.");
      setIsAlertOpen(true);
    } catch (error) {
      setSeverity("error");
      setMsgAlert("Error al agregar zonas.");
      setIsAlertOpen(true);
    }
  };

  const handleRemoveZone = (zoneId) => {
    setZones((prevZones) => prevZones.filter((zone) => zone._id !== zoneId));
  };


  return (
    <>
      <Formik
        initialValues={{
          country: "",
          league: "",
          season: "",
          zones: [],
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => setOpenAddTeamsDialog(true)}
      >
        {({ values, errors, touched, setFieldValue }) => (
          <Form>
            <Typography variant="h6" gutterBottom>
              Agregar zonas a la temporada
            </Typography>

            <FormControl fullWidth sx={{ m: 1, minWidth: 120 }}>
              <InputLabel>País</InputLabel>
              <Select
                value={selectedCountry || ""}
                onChange={(event) => {
                  const selectedCountry = event.target.value;
                  setSelectedCountry(selectedCountry);
                  setSelectedLeague("");
                  setSelectedSeason("");
                  setFieldValue("country", selectedCountry);
                  setFieldValue("league", "");
                  setFieldValue("season", "");
                }}
              >
                <MenuItem value="">Selecciona un país</MenuItem>
                {countries.map((country) => (
                  <MenuItem key={country} value={country}>
                    {country}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth sx={{ m: 1, minWidth: 120 }}>
              <InputLabel>Liga</InputLabel>
              <Select
                value={selectedLeague || ""}
                onChange={(event) => {
                  const selectedLeague = event.target.value;
                  setSelectedLeague(selectedLeague);
                  setSelectedSeason("");
                  setFieldValue("league", selectedLeague);
                  setFieldValue("season", "");
                }}
                disabled={!selectedCountry}
              >
                <MenuItem value="">Selecciona una liga</MenuItem>
                {leaguesByCountry[selectedCountry]?.map((league) => (
                  <MenuItem key={league._id} value={league._id}>
                    {league.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth sx={{ m: 1, minWidth: 120 }}>
              <InputLabel>Temporada</InputLabel>
              <Select
                value={selectedSeason || ""}
                onChange={(event) => {
                  const selectedSeason = event.target.value;
                  setSelectedSeason(selectedSeason);
                  setFieldValue("season", selectedSeason);
                }}
                disabled={!selectedLeague}
              >
                <MenuItem value="">Selecciona una temporada</MenuItem>
                {leagues
                  .find((league) => league._id === selectedLeague)
                  ?.season.map((season) => (
                    <MenuItem key={season._id} value={season._id}>
                      {season.year}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>

            <FieldArray name="zones">
              {({ push, remove }) => (
                <div>
                  {values.zones.map((zone, index) => (
                    <div key={index}>
                      <Field
                        name={`zones.${index}.name`}
                        as={TextField}
                        label={`Nombre de la Zona ${index + 1}`}
                        fullWidth
                        sx={{ m: 1, minWidth: 120 }}
                      />

                      <FormControl fullWidth sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel>Equipos</InputLabel>
                        <Select
                          multiple
                          value={values.zones[index].teams}
                          onChange={(event) => {
                            const selectedTeams = event.target.value;
                            setFieldValue(
                              `zones.${index}.teams`,
                              selectedTeams
                            );
                          }}
                          renderValue={(selected) =>
                            selected
                              .map(
                                (teamId) =>
                                  teamsStore.find((team) => team._id === teamId)
                                    ?.name
                              )
                              .join(", ")
                          }
                        >
                          {teamsStore
                            ?.filter((team) => team.country === selectedCountry)
                            .map((team) => (
                              <MenuItem key={team._id} value={team._id}>
                                <Checkbox
                                  checked={values.zones[index].teams.includes(
                                    team._id
                                  )}
                                />
                                <ListItemText primary={team.name} />
                              </MenuItem>
                            ))}
                        </Select>
                      </FormControl>

                      <Button onClick={() => remove(index)}>Eliminar</Button>
                    </div>
                  ))}

                  <Button onClick={() => push({ name: "", teams: [] })}>
                    + Agregar Zona
                  </Button>
                </div>
              )}
            </FieldArray>

            <Button type="submit" variant="contained" color="primary">
              Confirmar las zonas creadas
            </Button>

            <AlertDialogCopy
              open={openAddTeamsDialog}
              onClose={() => setOpenAddTeamsDialog(false)}
              onConfirm={() => handleSubmit(values)}
              textDialog={"¿Estás seguro de agregar las zonas?"}
              title="Agregar Zonas"
              confirmText="Agregar"
              cancelText="Cancelar"
            />

            {isAlertOpen && (
              <AlertMessageCopy
                isAlertOpen={isAlertOpen}
                severity={severity}
                textAlert={msgAlert}
                setIsAlertOpen={setIsAlertOpen}
              />
            )}
          </Form>
        )}
      </Formik>
      {zones.map((zone, index) => (
        <ZonaList
        zone={zone}
          key={index}
          handleRemoveTeam={handleRemoveTeam}
          selectedTeamsToAdd={selectedTeamsToAdd}
          setSelectedTeamsToAdd={setSelectedTeamsToAdd}
          teamsStore={teamsStore}
          selectedCountry={selectedCountry}
          handleConfirmAddTeams={handleConfirmAddTeams}
          handleRemoveZone={handleRemoveZone}
        />
        // <div key={index}>
        //   <Typography variant="h6">
        //     Zona: {zone.zoneName} - {zone._id}
        //   </Typography>
        //   <ul>
        //     {zone.teams.map((team, teamIndex) => (
        //       <li key={teamIndex}>
        //         {team.name}
        //         <Button
        //           onClick={() => handleRemoveTeam(zone._id, team._id)}
        //           variant="outlined"
        //           color="secondary"
        //         >
        //           Eliminar
        //         </Button>
        //       </li>
        //     ))}
        //   </ul>
        //   <FormControl fullWidth sx={{ m: 1, minWidth: 120 }}>
        //     <InputLabel>Agregar equipo</InputLabel>
        //     <Select
        //       value={selectedTeamsToAdd[zone._id] || []}
        //       multiple
        //       onChange={(event) => {
        //         const selectedTeams = event.target.value;
        //         setSelectedTeamsToAdd((prev) => ({
        //           ...prev,
        //           [zone._id]: selectedTeams,
        //         }));
        //       }}
        //       displayEmpty
        //       renderValue={(selected) =>
        //         selected
        //           .map(
        //             (teamId) =>
        //               teamsStore.find((team) => team._id === teamId)?.name
        //           )
        //           .join(", ")
        //       }
        //     >
        //       <MenuItem value="" disabled>
        //         Selecciona un equipo
        //       </MenuItem>
        //       {teamsStore
        //         ?.filter(
        //           (team) =>
        //             team.country === selectedCountry &&
        //             !zone.teams.some((zTeam) => zTeam._id === team._id)
        //         )
        //         .map((team) => (
        //           <MenuItem key={team._id} value={team._id}>
        //             <Checkbox
        //               checked={
        //                 selectedTeamsToAdd[zone._id]?.includes(team._id) ||
        //                 false
        //               }
        //             />
        //             <ListItemText primary={team.name} />
        //           </MenuItem>
        //         ))}
        //     </Select>
        //   </FormControl>
        //   <Button
        //     onClick={() => handleConfirmAddTeams(zone._id)}
        //     variant="contained"
        //     color="primary"
        //     sx={{ m: 1 }}
        //   >
        //     Aceptar
        //   </Button>
        // </div>
      ))}
    </>
  );
};

export default CreateZone;
