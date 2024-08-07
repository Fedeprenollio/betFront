import { useEffect, useState } from "react";
import { useBoundStore } from "../stores";

export const useCurrentSeasonTeam = (idTeam) => {
  const [completeListCurrentSeason, setCompleteListCurrentSeason] = useState(
    []
  );
  const [currentSeasonTeam, setcurrentSeasonTeam] = useState([]);
  const {
    getAllCurrentSeasons,
    allCurrentSeasons,
    error,
    seasons,
    fetchSeasons,
  } = useBoundStore((state) => state);

  useEffect(() => {
    getAllCurrentSeasons();
    fetchSeasons();
  }, [getAllCurrentSeasons, fetchSeasons]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchSeasons();
      const filteredCurrentSeasonTeam = data.filter((season) =>
        season.teams.some((team) => team === idTeam)
      );
    console.log("dataaa", filteredCurrentSeasonTeam)
      setcurrentSeasonTeam(filteredCurrentSeasonTeam);
      const list = filteredCurrentSeasonTeam.map((season) => season._id);
      setCompleteListCurrentSeason(list.toString().split(","));
    };

    if (!idTeam) {
      setCompleteListCurrentSeason([]);
      return;
    }
    fetchData();
  }, [allCurrentSeasons, idTeam]);

  return {
    completeListCurrentSeason,
    setCompleteListCurrentSeason,
    currentSeasonTeam,
    error,
  };
};
