/* eslint-disable react/prop-types */
import {
  Divider,
  Grid,
  Paper,
  Typography,
  styled,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import dayjs from "dayjs";

export const TableMatches = ({ teamMatches, statistic, teamDetail }) => {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#52991b",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: "#ffffff",
  }));

  
  const getMatchResult = (homeGoals, awayGoals) => {
    if (homeGoals > awayGoals) return "G";
    if (homeGoals < awayGoals) return "P";
    return "E";
  };

  const formatDate = (dateString) => {
    const date = dayjs(dateString);
    const currentYear = dayjs().year();

    if (date.year() !== currentYear) {
      return date.format("DD/MM/YY");
    } else {
      return date.format("DD/MM");
    }
  };
  const getResultIcon = (team, match) => {
    const homeTeam = match?.homeTeam?._id === team?._id;
    const matchResult =
      homeTeam &&
      match.teamStatistics.local.goals > match.teamStatistics.visitor.goals
        ? "G"
        : !homeTeam &&
          match.teamStatistics.visitor.goals > match.teamStatistics.local.goals
        ? "G"
        : getMatchResult(
            match.teamStatistics.local.goals,
            match.teamStatistics.visitor.goals
          );

    switch (matchResult) {
      case "G":
        return <CheckCircleIcon style={{ color: "green" }} />;
      case "E":
        return <RemoveCircleIcon style={{ color: "grey" }} />;
      case "P":
        return <HighlightOffIcon style={{ color: "red" }} />;
      default:
        return null;
    }
  };

  const getNameOfCategoryStatist =(statistic)=>{
    console.log(statistic)
    switch (statistic) {
      case "goals":
        return "Goles"
      case "corners":
        return "Corners";
      case "yellowCards":
        return "Tarjetas amarillas"
        
      
      default:
        return "Sin nombre"        
    }

  }

  return (
    <Grid item xs={12}>
      <Item  style={{ marginBottom: "0.5rem" }}>
        <Typography variant="h6" style={{ fontWeight: "bold" }}>
        {getNameOfCategoryStatist(statistic)} de {teamDetail?.name}
        </Typography>
      </Item>
      {teamMatches?.map((match) => {
        const homeGoals = match.teamStatistics.local[statistic];
        const awayGoals = match.teamStatistics.visitor[statistic];
        const homeTeamWins = homeGoals > awayGoals;
        const awayTeamWins = awayGoals > homeGoals;

        return (
          <Grid
            key={match._id}
            container
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Grid item xs={2}>
              <Typography style={{ marginRight: "auto" }}>
                {formatDate(match.date)}
              </Typography>{" "}
            </Grid>

            <Grid
              item
              xs={8}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Grid container>
                <Grid item xs={5}>
                  <Typography
                    textAlign={"right"}
                    style={{ fontWeight: homeTeamWins ? "bold" : "normal" }}
                  >
                    {match.homeTeam.name}
                  </Typography>
                </Grid>

                <Grid item xs={2}>
                  <Typography
                    textAlign={"center"}
                    style={{ fontWeight: "bold" }}
                  >{`${homeGoals} - ${awayGoals}`}</Typography>
                </Grid>
                <Grid item xs={5}>
                  <Typography
                    style={{ fontWeight: awayTeamWins ? "bold" : "normal" }}
                  >
                    {match.awayTeam.name}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={2}>
              {getResultIcon(teamDetail, match)}
            </Grid>
            <Grid item xs={12}>
              {/* Aplicar estilos directamente al Divider */}
              <Divider variant="middle" sx={{ width: "100%" , marginY:"0.5rem"}} />
            </Grid>
          </Grid>
        );
      })}
    </Grid>
  );
};
