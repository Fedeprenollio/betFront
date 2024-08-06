import { useEffect, useState } from "react";
import { useBoundStore } from "../stores";

export const useCurrentSeasonTeam = (idTeam) => {
  const [completeListCurrentSeason, setCompleteListCurrentSeason] = useState([]);
  const [currentSeasonTeam, setcurrentSeasonTeam] = useState([])
  const { getAllCurrentSeasons, allCurrentSeasons, error,seasons,fetchSeasons } = useBoundStore(
    (state) => state
  );

  useEffect(() => {
    getAllCurrentSeasons();
    fetchSeasons()
  }, [getAllCurrentSeasons,fetchSeasons]);
console.log("filteredCurrentSeasonTeam", "ENTRA?")
  useEffect(() => {
    if(!idTeam){
      setCompleteListCurrentSeason([])
      return
    }
    const filteredCurrentSeasonTeam = seasons.filter(season => 
      season.teams.some(team => team === idTeam)
    );
    setcurrentSeasonTeam(filteredCurrentSeasonTeam)
    const list = filteredCurrentSeasonTeam.map((season) => season._id);
    console.log("filteredCurrentSeasonTeam",filteredCurrentSeasonTeam)
    setCompleteListCurrentSeason(list.toString().split(","));
  }, [allCurrentSeasons, idTeam]);

  return {
    completeListCurrentSeason,
    setCompleteListCurrentSeason,
    currentSeasonTeam,
    error,
  };
};
