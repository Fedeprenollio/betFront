/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import createMatchesStore from "../stores/matchesStore";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import "../App.css";
import DeleteIcon from "@mui/icons-material/Delete";
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import { useBoundStore } from "../stores";


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));


const MatchList3 = ({ match }) => {
  console.log(match);
  const fecha = new Date(match.date);
  const hora = dayjs(fecha).format("HH:mm");



  return (
    <Grid  container spacing={2} alignItems="center">
      <Grid item  xs={10}>
        <Link
          to={`/stats/${match.homeTeam._id}/${match.awayTeam._id}/${match._id}`}
          className="link-no-underline"
        >
          <ListItemButton component="div">
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={4}>
                <ListItemText
                  align="end"
                  primary={
                    <>
                      <Typography
                        sx={{ display: "inline" }}
                        component="h6"
                        variant="h6"
                        color="grey"
                      >
                        {match.homeTeam.name}
                      </Typography>
                    </>
                  }
                  // secondary={
                  //   <>
                  //     <Typography
                  //       sx={{ display: "inline" }}
                  //       component="h6"
                  //       variant="body2"
                  //       color="black"
                  //     >
                  //       4to
                  //     </Typography>
                  //   </>
                  // }
                />
              </Grid>
              <Grid item xs={4}>
                <ListItemText
                  align="center"
                  primary={
                    <>
                      <Typography
                        sx={{ display: "inline" }}
                        component="h6"
                        variant="h5"
                        color="green"
                      >
                        { match.isFinished ? `${match.teamStatistics.local.goals} - ${match.teamStatistics.visitor.goals} `: hora}
                      </Typography>
                    </>
                  }
                /> 
              </Grid>
              <Grid item xs={4}>
                <ListItemText
                  align="start"
                  primary={
                    <>
                      <Typography
                        sx={{ display: "inline" }}
                        component="h6"
                        variant="h6"
                        color="grey"
                      >
                        {match.awayTeam.name}
                      </Typography>
                    </>
                  }
                />
              </Grid>
            </Grid>
          </ListItemButton>
        </Link>
      </Grid>
      <Grid item  xs={2}>
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="+ Estadística">
          <IconButton  component={Link} to={`/stats/form/${match._id}`}>
            <QueryStatsIcon />
          </IconButton>
        </Tooltip>
      </Grid>
    </Grid>
  );
};

export const MatchsStack = () => {
  // const { matches } = createMatchesStore((state) => state);
  const { matches} = useBoundStore(state=> state)

  const [myMatches, setMyMatches] = useState([]);

  useEffect(() => {
    setMyMatches(matches);
  }, [matches]);
  console.log("PROBANDO PARTIDOS", myMatches, matches);

  return (
    <Container sx={{ backgroundColor: "#84828244", height: "100vh" }}>
      {Object.entries(
        myMatches.reduce((acc, match) => {
          const leagueName = match?.league?.name;
          const leagueCountry = match?.league?.country;
          if (!acc[leagueName]) {
            acc[leagueName] = { country: leagueCountry, matches: [] };
          }
          acc[leagueName].matches.push(match);
          return acc;
        }, {})
      ).map(([leagueName, { country, matches }]) => (
        <Box key={leagueName} sx={{ width: "100%", backgroundColor: "white" }}>
          <Stack
            spacing={1}
            sx={{ margin: "2rem 0" }}
            divider={<Divider orientation="horizontal" />}
          >
            <Item
              elevation={3}
              sx={{
                margin: "1rem 0",
                padding: "10px0",
                backgroundColor: "#94BE1F",
              }}
            >
              <Typography variant="h5" color={"white"}>
                {leagueName}- {country}
              </Typography>
            </Item>
          </Stack>

          {matches.map((match) => (
            <MatchList3 key={match._id} match={match} />
            // <div key={match._id}>
            //   <h3>
            //     {match.homeTeam.name} - {match.awayTeam.name}
            //   </h3>
            // </div>
          ))}
        </Box>
      ))}
    </Container>
  );
};
