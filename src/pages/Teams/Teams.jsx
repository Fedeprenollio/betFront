import { useEffect } from "react";
import useTeamStore from "../../stores/teamStore";
import CardTeam from "../../componts/CardTeam";
import { Grid } from "@mui/material";

export const Teams = () => {
  const { teams, setTeams } = useTeamStore((state) => state);
  console.log(teams);
  useEffect(() => {
    setTeams();
  }, [setTeams]);

  return (
    <>
      <div>Listar equipos con filtros</div>
      <Grid container spacing={2} >
        {teams && teams.map((team) => {
          return (
            <Grid item key={team._id} xs={12} md={4}>
              <CardTeam team={team} />
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};
