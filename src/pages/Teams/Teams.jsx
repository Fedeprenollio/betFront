import React, { useEffect, useState } from "react";
import { useBoundStore } from "../../stores";
import { useNavigate } from "react-router-dom"; // Importa useNavigate
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TableSortLabel,
  Avatar,
} from "@mui/material";
import AlertDialogCopy from "../../componts/feedback/AlertDialogCopy";
import { AlertMessageCopy } from "../../componts/feedback/AlertMessageCopy";

export const Teams = () => {
  const { teams, setTeams, deleteTeam,isAuthenticated } = useBoundStore((state) => state);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [filteredTeams, setFilteredTeams] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedTeamId, setSelectedTeamId] = useState(null);
  const [selectedTeamName, setSelectedTeamName] = useState("");
  const [alertTeamId, setAlertTeamId] = useState(null);
  const [alertSeverity, setAlertSeverity] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const navigate = useNavigate(); // Inicializa useNavigate

  const [orderBy, setOrderBy] = useState("country");
  const [order, setOrder] = useState("asc");

  useEffect(() => {
    setTeams();
  }, [setTeams]);

  useEffect(() => {
    let filtered = teams;

    if (searchQuery) {
      filtered = filtered.filter((team) =>
        team.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCountry) {
      filtered = filtered.filter((team) => team.country === selectedCountry);
    }

    filtered = filtered.sort((a, b) => {
      if (orderBy === "country") {
        return (
          (a.country.localeCompare(b.country) || a.name.localeCompare(b.name)) *
          (order === "asc" ? 1 : -1)
        );
      } else {
        return (
          a[orderBy].localeCompare(b[orderBy]) * (order === "asc" ? 1 : -1)
        );
      }
    });

    setFilteredTeams(filtered);
  }, [teams, searchQuery, selectedCountry, orderBy, order]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  const uniqueCountries = [...new Set(teams?.map((team) => team.country))];

  const handleOpenDialog = (id, name) => {
    setSelectedTeamId(id);
    setSelectedTeamName(name);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedTeamId(null);
    setSelectedTeamName("");
  };

  const handleConfirmDelete = async () => {
    if (selectedTeamId) {
      try {
        await deleteTeam(selectedTeamId);
        setAlertSeverity("success");
        setAlertMessage("Equipo eliminado exitosamente.");
      } catch (error) {
        setAlertSeverity("error");
        setAlertMessage("Error al eliminar el equipo.");
      } finally {
        setAlertTeamId(selectedTeamId);
        setIsAlertOpen(true); // Abrir la alerta después de eliminar el equipo
        handleCloseDialog();
      }
    }
  };

  const handleCloseAlert = () => {
    setIsAlertOpen(false); // Cerrar la alerta
    setAlertTeamId(null);
  };

  const handleStatisticsClick = (teamId) => {
    navigate(`/teams/${teamId}/statistics`);
  };
  const handleStatisticsPercentageClick = (teamId) => {
    navigate(`/teams/${teamId}/stats`);
  };

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleEditClick = (teamId) => {
    console.log("EDITAR; ", teamId);
    navigate(`/teams/adm/${teamId}`); // Redirigir a la página de edición
  };
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Listar equipos con filtros
      </Typography>
      <TextField
        label="Buscar equipo"
        value={searchQuery}
        onChange={handleSearchChange}
        variant="outlined"
        margin="normal"
        fullWidth
      />
      <FormControl variant="outlined" margin="normal" fullWidth>
        <InputLabel>Filtrar por país</InputLabel>
        <Select
          value={selectedCountry}
          onChange={handleCountryChange}
          label="Filtrar por país"
        >
          <MenuItem value="">
            <em>Todos los países</em>
          </MenuItem>
          {uniqueCountries.map((country) => (
            <MenuItem key={country} value={country}>
              {country}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell sortDirection={orderBy === "name" ? order : false}>
                <TableSortLabel
                  active={orderBy === "name"}
                  direction={orderBy === "name" ? order : "asc"}
                  onClick={() => handleRequestSort("name")}
                >
                  Nombre del Equipo
                </TableSortLabel>
              </TableCell>

              <TableCell sortDirection={orderBy === "country" ? order : false}>
                <TableSortLabel
                  active={orderBy === "country"}
                  direction={orderBy === "country" ? order : "asc"}
                  onClick={() => handleRequestSort("country")}
                >
                  País
                </TableSortLabel>
              </TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTeams &&
              filteredTeams.map((team) => (
                <React.Fragment key={team._id}>
                  <TableRow>
                    <TableCell>
                      <Avatar
                        src={team.logo}
                        alt={team.name}
                        variant="square"
                        sx={{ width: 56, height: 56 }}
                      />
                    </TableCell>
                    <TableCell>{team.name}</TableCell>

                    <TableCell>{team.country}</TableCell>
                    <TableCell>
                      <Button onClick={() => handleStatisticsClick(team._id)}>
                        Estadística
                      </Button>
                    </TableCell>

                  {isAuthenticated && 
                  
                    <TableCell>
                      <Button onClick={() => handleEditClick(team._id)}>
                        Editar
                      </Button>

                    <TableCell>
                      <Button
                        onClick={() => handleOpenDialog(team._id, team.name)}
                      >
                        Eliminar
                      </Button>
                    </TableCell>
                    </TableCell>
                  }
                  </TableRow>
                </React.Fragment>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      {isAlertOpen && (
        <AlertMessageCopy
          isAlertOpen={isAlertOpen}
          severity={alertSeverity}
          textAlert={alertMessage}
          setIsAlertOpen={setIsAlertOpen}
        />
      )}
      <AlertDialogCopy
        open={openDialog}
        onClose={handleCloseDialog}
        onConfirm={handleConfirmDelete}
        message="Confirmar eliminación"
        contentText={`¿Estás seguro de que deseas eliminar el equipo ${selectedTeamName}? Esta acción no se puede deshacer.`}
      />
    </>
  );
};
