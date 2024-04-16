/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";
import { styled } from "@mui/material/styles";
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Avatar,
  Grid,
  IconButton,
  Collapse,
  CardActions,
} from "@mui/material";
import { red } from "@mui/material/colors";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { TeamStatistics } from "../pages/TeamStatistics";
import useMatchesStore from "../stores/matchesStore";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const MatchCard = ({ homeTeam, awayTeam, round,idMatch }) => {

  const { onDeleteMatch} = useMatchesStore(state=> state)

  const handleMenuOpen = (event) => {
    // Escribir la lógica para abrir el menú de opciones
  };

  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const handleDelete = (idMatch) => {
    // Ejecutar la función onDelete pasada como prop
    console.log("DELETE")
    onDeleteMatch(idMatch);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <div style={{ width: "800px", marginBottom: "16px" }}>
          {" "}
          {/* Contenedor div con ancho deseado */}
          <Card>
            <CardHeader
              title={`Fecha del partido: 7/7/24`}
              subheader={`Fecha ${round}`}
              // subheader="Estadio"
              avatar={<Avatar aria-label="match date">D</Avatar>}
              action={
                <>
                  <IconButton onClick={handleMenuOpen} aria-label="menu">
                    <MoreVertIcon />
                  </IconButton>
                  <IconButton onClick={()=>handleDelete(idMatch)} aria-label="delete">
                    <DeleteIcon />
                  </IconButton>
                </>
              }
            />
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Grid container alignItems="center" spacing={1}>
                    <Grid item>
                      <Avatar sx={{ bgcolor: red[500], marginRight: 1 }}>
                        {homeTeam?.name[0]}
                      </Avatar>
                    </Grid>
                    <Grid item>
                      <Typography variant="h6">{homeTeam.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {/* Información adicional sobre el equipo local, como posición, etc. */}
                        4to
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={6}>
                  <Grid container alignItems="center" spacing={1}>
                    <Grid item>
                      <Avatar sx={{ bgcolor: red[500], marginRight: 1 }}>
                        {awayTeam?.name[0]}
                      </Avatar>
                    </Grid>
                    <Grid item>
                      <Typography variant="h6">{awayTeam?.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {/* Información adicional sobre el equipo visitante, como posición, etc. */}
                        12vo
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
            <CardActions>
              <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit></Collapse>
          </Card>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <TeamStatistics
              idHomeTeam={homeTeam?._id}
              idAwayTeam={awayTeam?._id}
            />
          </Collapse>
        </div>
      </Grid>
    </Grid>
  );
};

export default MatchCard;
