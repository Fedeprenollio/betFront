import { useEffect, useState } from "react";
import { useBoundStore } from "../stores";

export const useCurrentSeasonTeam = (idTeam) => {
  const [completeListCurrentSeason, setCompleteListCurrentSeason] = useState([]);
  const [currentSeasonTeam, setcurrentSeasonTeam] = useState([])
  const { getAllCurrentSeasons, allCurrentSeasons, error } = useBoundStore(
    (state) => state
  );

  useEffect(() => {
    getAllCurrentSeasons();
  }, [getAllCurrentSeasons]);

  useEffect(() => {
    if(!idTeam){
      setCompleteListCurrentSeason([])
      return
    }
    const currentSeasonTeam = allCurrentSeasons.filter(season => 
      season.teams.some(team => team === idTeam)
    );
    setcurrentSeasonTeam(currentSeasonTeam)
    const list = currentSeasonTeam.map((season) => season._id);
    console.log("currentSeasonTeam",list)
    setCompleteListCurrentSeason(list.toString().split(","));
  }, [allCurrentSeasons, idTeam]);

  return {
    completeListCurrentSeason,
    setCompleteListCurrentSeason,
    currentSeasonTeam,
    error,
  };
};
