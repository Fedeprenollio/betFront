import React, { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL_BASE } from "../../stores/url_base";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Box,
  Typography,
  IconButton,
  Tooltip,
  OutlinedInput,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { COUNTRIES } from "../Teams/utils";
import DeleteMatchButton from "../../componts/buttons/DeleteMatchButton";
import FormMatch from "../FormMatch";
import dayjs from "dayjs";

export const MatchWithObservation = () => {
  const [matches, setMatches] = useState([]);
  const [statusFilter, setStatusFilter] = useState(["Pospuesto", "Suspendido"]);
  const [countryFilter, setCountryFilter] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [updatedMatch, setUpdatedMatch] = useState(null); // Initialize as null

  // Open edit modal
  const handleOpenEditModal = (match) => {
    setUpdatedMatch(match); // Set the match to be edited
    setIsEditModalOpen(true); // Open the modal
  };

  // Close edit modal
  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setUpdatedMatch(null); // Reset updatedMatch when closing the modal
  };

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const params = {};
        if (statusFilter.length > 0) {
          params.status = statusFilter.join(",");
        }
        if (countryFilter.length > 0) {
          params.country = countryFilter.join(",");
        }
        const response = await axios.get(`${BACKEND_URL_BASE}/match`, {
          params,
        });
        setMatches(response.data);
      } catch (error) {
        console.error("Error fetching matches:", error);
      }
    };

    fetchMatches();
  }, [statusFilter, countryFilter]);

  const handleDelete = async (matchId) => {
    try {
      await axios.delete(`${BACKEND_URL_BASE}/match/${matchId}`);
      setMatches(matches.filter((match) => match._id !== matchId));
      console.log(`Partido con id ${matchId} eliminado exitosamente.`);
    } catch (error) {
      console.error("Error al eliminar el partido:", error);
    }
  };
  // Manejar la actualización de un partido
  const handleUpdateMatch = (updatedMatchData) => {
    console.log("updatedMatchData",updatedMatchData)
    setMatches((prevMatches) =>
      prevMatches.map((match) =>
        match._id === updatedMatchData._id ? { ...match, ...updatedMatchData } : match
      )
    );
  };
  
  return (
    <>
      <Box>
        <Typography variant="h4" gutterBottom>
          Partidos con observaciones (Suspendidos o Pospuestos)
        </Typography>

        {/* Select para el estado (múltiple) */}
        <FormControl fullWidth style={{ marginBottom: "20px" }}>
          <InputLabel id="status-select-label">Estado</InputLabel>
          <Select
            labelId="status-select-label"
            id="status-select"
            multiple
            value={statusFilter}
            onChange={(e) => {
              const value = e.target.value;
              // Si no hay valores seleccionados, mantenemos el filtro original
              if (value.length === 0) {
                setStatusFilter(["Pospuesto"]); // O puedes cambiarlo por "Suspendido" como predeterminado
              } else {
                setStatusFilter(value);
              }
            }}
            input={<OutlinedInput label="Estado" />}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
          >
            <MenuItem value="Pospuesto">Pospuesto</MenuItem>
            <MenuItem value="Suspendido">Suspendido</MenuItem>
          </Select>
        </FormControl>

        {/* Select para el país (múltiple) */}
        <FormControl fullWidth style={{ marginBottom: "20px" }}>
          <InputLabel id="country-select-label">País</InputLabel>
          <Select
            labelId="country-select-label"
            id="country-select"
            multiple
            value={countryFilter}
            onChange={(e) => setCountryFilter(e.target.value)}
            input={<OutlinedInput label="País" />}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
          >
            {COUNTRIES.map((country) => (
              <MenuItem key={country.value} value={country.value}>
                {country.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Lista de partidos */}
        {matches.length === 0 ? (
          <Typography>No hay partidos con este estado.</Typography>
        ) : (
          <ul>
            {matches.map((match) => (
              <li key={match._id} style={{ marginBottom: "20px" }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                    padding: "10px",
                    backgroundColor: "#f9f9f9",
                  }}
                >
                  <Typography>
                    {match.homeTeam?.name} vs {match.awayTeam?.name} -{" "}
                    {match.status} ({match.country})
                  </Typography>
                  <Box>
                    {/* Botón para editar */}
                    <Grid item xs={2}>
                      <Tooltip title="Editar Partido">
                        <IconButton onClick={() => handleOpenEditModal(match)}>
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                    </Grid>

                    {/* Botón para eliminar */}
                    <Tooltip title="Eliminar">
                      <DeleteMatchButton
                        onClick={() => handleDelete(match._id)}
                      />
                    </Tooltip>
                  </Box>
                </Box>
              </li>
            ))}
          </ul>
        )}
      </Box>

      <Dialog
        open={isEditModalOpen}
        onClose={handleCloseEditModal}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Editar Partido</DialogTitle>
        <DialogContent>
          {/* Asegúrate de que updatedMatch tenga un valor antes de renderizar el formulario */}
          {updatedMatch && (
            <FormMatch
              initialValues={{
                homeTeam: updatedMatch.homeTeam || "",
                awayTeam: updatedMatch.awayTeam || "",
                date: dayjs(updatedMatch.date) || null, // Inicializar la fecha como null
                league: updatedMatch.league || "",
                country: updatedMatch.country || "",
                seasonYear: updatedMatch.seasonYear || "",
                round: updatedMatch.round || "",
                order: updatedMatch.order || "",
                referee: updatedMatch.referee || "",
                urlScrape: updatedMatch.urlScrape || "",
                status: updatedMatch.status || ""
              }}
              onClose={handleCloseEditModal}
              onUpdate={handleUpdateMatch} // Pasar la función para actualizar

              matchId={updatedMatch._id} // Mantén el _id para otras operaciones si es necesario
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};
