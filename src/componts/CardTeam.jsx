/* eslint-disable react/prop-types */
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import createTeamStore from '../stores/teamStore';

export default function CardTeam({ team, onStatisticsClick, onEditClick }) {
const {deleteTeam} = createTeamStore(state=> state)

  const handleStatisticsClick = () => {
    if (onStatisticsClick) {
      onStatisticsClick(team.id);
    }
  };

  const handleEditClick = () => {
    if (onEditClick) {
      onEditClick(team.id);
    }
  };

  const handleDeleteClick = () => {
    deleteTeam(team._id)
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="https://logodownload.org/wp-content/uploads/2016/10/Boca-Juniors-logo-escudo.png"
          alt="Team Logo"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {team.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" onClick={handleStatisticsClick}>
          Estadísticas
        </Button>
        <Button size="small" color="primary" onClick={handleEditClick}>
          Editar
        </Button>
        <Button size="small" color="primary" onClick={handleDeleteClick}>
          Eliminar
        </Button>
      </CardActions>
    </Card>
  );
}
