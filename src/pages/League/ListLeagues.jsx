/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useBoundStore } from "../../stores";
import {
  Collapse,
  Container,
  Grid,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { FilterLeague } from "../../componts/Filters/FilterLeague";
import ConfirmationDialog from "../../componts/feedback/ConfirmationDialog ";
import AlertDialogCopy from "../../componts/feedback/AlertDialogCopy";
import { AlertMessageCopy } from "../../componts/feedback/AlertMessageCopy";
import { Link } from "react-router-dom";
import InfoIcon from "@mui/icons-material/Info";
import PlusOneIcon from "@mui/icons-material/PlusOne";
import { SelectedCurrentSeason } from "./SelectedCurrentSeason";
import axios from "axios";
import { BACKEND_URL_BASE } from "../../stores/url_base";

export const ListLeagues = () => {
  const { fetchLeagues, leagues, deleteLeague } = useBoundStore(
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
  const [currentSeasonId, setCurrentSeasonId] = useState('');
  const URL_API = `${BACKEND_URL_BASE}/season/league`;

  useEffect(() => {
    fetchLeagues();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${URL_API}/${idLeague}`);
        setCurrentSeasonId(response.data.currentSeason._id);
      } catch (error) {
        console.error('Error al obtener las temporadas:', error);
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

  const handleEdit = (leagueId) => {
    // Lógica para editar la liga
  };

  return (
    <Container>
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

      <List>
        {filteredLeagues.map((league, index) => (
          <Container key={league._id}>
            <Grid container alignItems="center" justifyContent="space-between">
              <Grid item xs={11}>
                <ListItemButton onClick={() => handleClick(index, league._id)}>
                  <ListItemText
                    primary={`${league.country} - ${league.name}`}
                  />
                  {openCollapseIndex === index ? (
                    <ExpandLess />
                  ) : (
                    <ExpandMore />
                  )}
                </ListItemButton>
              </Grid>

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
                  <Tooltip title="Ver detalle de la liga">
                    <IconButton>
                      <Link to={`/league/detail/${league._id}`}>
                        <InfoIcon />
                      </Link>
                    </IconButton>
                  </Tooltip>
                </ListItemIcon>
              </Grid>
            </Grid>

            <Collapse
              in={openCollapseIndex === index}
              timeout="auto"
              unmountOnExit
            >
              <List component="div" disablePadding>
                {league.season.map((season) => (
                  <Grid key={season._id} container>
                    <Grid item xs={11}>
                      <ListItemButton sx={{ pl: 4 }}>
                        <SelectedCurrentSeason
                          leagueId={league._id}
                          seasonId={season._id}
                          isCurrent={season._id === currentSeasonId}
                          setCurrentSeasonId={setCurrentSeasonId}
                        />
                        <Link
                          className="link-no-underline"
                          to={`/stats/teams/tableSeason/${season._id}`}
                        >
                          <ListItemText primary={season.year} />
                        </Link>
                      </ListItemButton>
                    </Grid>
                    <Grid item xs={1}>
                      <ListItemIcon>
                        <Link to={`/match/results/${season._id}`}>
                          <Tooltip title="Agregar resultados a la temporada">
                            <PlusOneIcon />
                          </Tooltip>
                        </Link>
                      </ListItemIcon>
                    </Grid>
                  </Grid>
                ))}
              </List>
            </Collapse>
          </Container>
        ))}
      </List>
    </Container>
  );
};
