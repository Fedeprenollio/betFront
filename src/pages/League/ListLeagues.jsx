/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useBoundStore } from "../../stores";
import {
  Button,
  Collapse,
  Container,
  Grid,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Avatar,
  Typography,
} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import PlusOneIcon from "@mui/icons-material/PlusOne";
import { FilterLeague } from "../../componts/Filters/FilterLeague";
import AlertDialogCopy from "../../componts/feedback/AlertDialogCopy";
import { AlertMessageCopy } from "../../componts/feedback/AlertMessageCopy";
import { Link } from "react-router-dom";
import { SelectedCurrentSeason } from "./SelectedCurrentSeason";
import axios from "axios";
import { BACKEND_URL_BASE } from "../../stores/url_base";
import FormLeague from "../../componts/FormLeague";

export const ListLeagues = () => {
  const { fetchLeagues, leagues, deleteLeague, isAuthenticated } = useBoundStore(
    (state) => state
  );
  const [idLeague, setIdLeague] = useState("");
  const [nameLeague, setNameLeague] = useState("second");
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openCollapseIndex, setOpenCollapseIndex] = useState(-1);
  const [filteredLeagues, setFilteredLeagues] = useState([]);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [severity, setSeverity] = useState("");
  const [msgAlert, setMsgAlert] = useState("");
  const [currentSeasonId, setCurrentSeasonId] = useState("");
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editLeagueData, setEditLeagueData] = useState({ name: "", country: "" });

  const [openDeleteSeasonDialog, setOpenDeleteSeasonDialog] = useState(false);
  const [seasonToDelete, setSeasonToDelete] = useState(null);
  const [seasonNameToConfirm, setSeasonNameToConfirm] = useState("");
  const URL_API = `${BACKEND_URL_BASE}/season/league`;

  useEffect(() => {
    fetchLeagues();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${URL_API}/${idLeague}`);
        if (response.data.currentSeason) {

          setCurrentSeasonId(response.data.currentSeason?._id);
        }
      } catch (error) {
        console.error("Error al obtener las temporadas:", error);
      }
    };

    fetchData();
  }, [idLeague]);

  useEffect(() => {
    const sortedLeagues = getSortedLeagues({ leagues });
    setFilteredLeagues(sortedLeagues);
  }, [leagues]);

  const handleClick = (index, leagueId) => {
    setOpenCollapseIndex(openCollapseIndex === index ? -1 : index);
    setIdLeague(leagueId);
  };

  const getSortedLeagues = ({ leagues }) => {
    const sortedLeagues = [...leagues].sort((a, b) => {
      if (a.country < b.country) return -1;
      if (a.country > b.country) return 1;
      return 0;
    });
    return sortedLeagues;
  };

  const handleDelete = async (leagueId) => {
    const response = await deleteLeague(leagueId);
    if (response) {
      setSeverity("success");
      setMsgAlert("Liga eliminada exitosamente");
      setIsAlertOpen(true);
    } else {
      setSeverity("error");
      setMsgAlert("Error al eliminar la liga");
      setIsAlertOpen(true);
    }

    setOpenDeleteDialog(false);
  };

  const handleDeleteClick = (league) => {
    setIdLeague(league._id);
    setNameLeague(league.name);
    setOpenDeleteDialog(true);
  };

  const handleEdit = (league) => {
    setIdLeague(league)
    setEditLeagueData({ name: league.name, country: league.country });
    setOpenEditDialog(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditLeagueData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleEditSubmit = () => {
    // Lógica para actualizar la liga en el backend
    setOpenEditDialog(false);
  };

  const handleDeleteSeasonClick = (season) => {
    setSeasonToDelete(season);
    setOpenDeleteSeasonDialog(true);
  };

  const handleConfirmDeleteSeason = async () => {
    console.log("seasonToDelete",seasonToDelete)
    console.log("seasonNameToConfirm",seasonNameToConfirm)
    if (seasonToDelete.year === seasonNameToConfirm) {
      try {
      const res =   await axios.delete(`${BACKEND_URL_BASE}/season/${seasonToDelete._id}/full`);
      const data = res.data
      console.log(data)
        setSeverity("success");
        setMsgAlert("Temporada eliminada exitosamente");
        setIsAlertOpen(true);
        fetchLeagues(); // Refrescar la lista de ligas
      } catch (error) {
        console.error("Error al eliminar la temporada:", error);
        setSeverity("error");
        setMsgAlert("Error al eliminar la temporada");
        setIsAlertOpen(true);
      }
    } else {
      setSeverity("error");
      setMsgAlert("El nombre de la temporada no coincide");
      setIsAlertOpen(true);
    }
    setOpenDeleteSeasonDialog(false);
    setSeasonNameToConfirm("");
  };

  return (
    <>
      <FilterLeague
        setFilteredLeagues={setFilteredLeagues}
        getSortedLeagues={getSortedLeagues}
      />

      <AlertDialogCopy
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        onConfirm={() => handleDelete(idLeague)}
        handleSubmit
        formValues
        textDialog
        title="Confirmar eliminación"
        message={`¿Estás seguro de que deseas eliminar la liga "${nameLeague}?"`}
        contentText="La eliminación es irreversible y borra toda información relacionada a la liga como temporadas, partidos, resultados..."
        confirmText="Eliminar"
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

      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
        <DialogTitle>Editar Liga</DialogTitle>
        <DialogContent>
          {console.log("ID DE LA LIGA EN PADRE", idLeague)}
          <FormLeague idLeague={idLeague} />
         
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)} color="primary">
            Cerrar
          </Button>

        </DialogActions>
      </Dialog>

      <Dialog open={openDeleteSeasonDialog} onClose={() => setOpenDeleteSeasonDialog(false)}>
        <DialogTitle>Confirmar eliminación de temporada</DialogTitle>
        <DialogContent>
          <Typography>
           {` Para confirmar la eliminación de la temporada "${seasonToDelete?.year}", por favor escribe el nombre de la temporada a continuación:`}
          </Typography>
          <TextField
            autoFocus
            margin="dense"
            label="Nombre de la temporada"
            fullWidth
            value={seasonNameToConfirm}
            onChange={(e) => setSeasonNameToConfirm(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteSeasonDialog(false)} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleConfirmDeleteSeason} color="secondary">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>


      <List>
        {filteredLeagues.map((league, index) => (
          <Container key={league._id} style={{ padding: 0 }}>
            <Grid container alignItems="center" justifyContent="space-between">
              <Grid item xs={11}>
              <ListItemButton onClick={() => handleClick(index, league._id)}>
                  <Grid container alignItems="center" spacing={2}>
                    <Grid item>
                      <Avatar
                        alt={league.name}
                        src={league.logo}
                        sx={{ width: 36, height: 36 }}
                      />
                    </Grid>
                    <Grid item>
                      <Typography variant="subtitle1" fontWeight="bold">
                        {league.country} - {league.name}
                      </Typography>
                    </Grid>
                  </Grid>
                  {openCollapseIndex === index ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
              </Grid>

              { isAuthenticated &&
               <Grid item xs={1}>
                <ListItemIcon>
                  <Tooltip title="Eliminar liga">
                    <IconButton onClick={() => handleDeleteClick(league)}>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Editar liga">
                    <IconButton onClick={() => handleEdit(league._id)}>
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  
                </ListItemIcon>
              </Grid>}
            </Grid>

            <Collapse
              in={openCollapseIndex === index}
              timeout="auto"
              unmountOnExit
            >
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Temp actual</TableCell>
                      <TableCell>Año de temporada</TableCell>
                      <TableCell>Acciones</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {league.season.map((season) => (
                      <TableRow key={season._id}>
                        <TableCell>
                          <SelectedCurrentSeason
                            leagueId={league._id}
                            seasonId={season._id}
                            isCurrent={season._id === currentSeasonId}
                            setCurrentSeasonId={setCurrentSeasonId}
                          />
                        </TableCell>
                        <TableCell>{season.year}</TableCell>
                        <TableCell style={{ padding: "0" }}>
                          <Grid container >
                            <Grid item>
                              <Link
                                className="link-no-underline"
                                to={`/league/${season._id}/positions`}
                              >
                                <Button>Detalle</Button>
                              </Link>
                            </Grid>
                           
                            {isAuthenticated &&
                              <>
                              <Grid item>
                                <Tooltip title="Agregar resultados a la temporada">
                                  <Link to={`/match/results/${season._id}`}>
                                    <Button>+ resultados</Button>
                                  </Link>
                                </Tooltip>
                              </Grid>
                              <Grid item>
                              <Tooltip title="Eliminar Temporada">
                                <IconButton
                                  onClick={() => handleDeleteSeasonClick(season)}
                                >
                                  <DeleteIcon color="secondary" />
                                </IconButton>
                              </Tooltip>
                              </Grid>
                              </>
                            }

                          </Grid>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Collapse>
          </Container>
        ))}
      </List>
    </>
  );
};
