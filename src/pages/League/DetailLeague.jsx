import {
  Container,
  Divider,
  Paper,
  Stack,
  Typography,
  styled,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useBoundStore } from "../../stores";
import { useEffect, useState } from "react";
import { FilterSeasonLeague } from "../../componts/Filters/FilterSeasonLeague";
import { MatchList3 } from "../../componts/MatchsStack";

export const DetailLeague = () => {
  const { idLeague } = useParams();
  const { getLeagueDetail, leagueDetail, matchesByRound } = useBoundStore(
    (state) => state
  );
  const [rounds, setRounds] = useState([]);

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  console.log("PARTIDOS POR RONDA", leagueDetail);
  useEffect(() => {
    getLeagueDetail({ idLeague });
    return () => {
      getLeagueDetail({ idLeague: null });
    };
  }, [idLeague, getLeagueDetail]);

  return (
    <Container>
      <FilterSeasonLeague seasons={leagueDetail?.season} lastRound={leagueDetail} setRounds={setRounds} rounds={rounds} />
      <Typography>{`Temporada: ${
        matchesByRound?.season?.year
          ?`${ matchesByRound?.season?.year } - Ronda: ${rounds}`
          : "Seleccione una temporada y jornada"
      }`}</Typography>
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
          <Typography variant="h5" color="white">
            {leagueDetail.name} - {leagueDetail.country}
          </Typography>
        </Item>
      </Stack>

      {matchesByRound?.matches?.map((match) => {
        return <MatchList3 key={match._id} match={match} />;
      })}
    </Container>
  );
};
