/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import StatisticsTablecopy from "../componts/StatisticsTablecopy";
import { RadioButtonStatsLessThan } from "../componts/RadioButtonStatsLessThan";
import { RadioButtonHomeAway } from "../componts/RadioButtonHomeAway";
import useTeamStatsStore from "../stores/statsStore";
import { useParams } from "react-router-dom";
import useMatchesStore from "../stores/matchesStore";

export const TeamStatistics = () => {
  const { idHomeTeam, idAwayTeam, idMatch } = useParams();
  const [statsLessThan, setStatsLessThan] = useState(false);
  const { getMatchDetail, matchDetail } = useMatchesStore((state) => state);
  const [match, setMatch] = useState({});

  useEffect(() => {
    getMatchDetail({ idMatch });
  }, [getMatchDetail, idMatch]);

  useEffect(() => {
    setMatch(matchDetail);
  }, [matchDetail]);
  console.warn("el partido", match);

  const handleChangeRadioButton = () => {
    setStatsLessThan(!statsLessThan);
  };

  //Seleccionar partidos local/visitante para cada equipo
  //Equipo visitante, estadisticas de local y/o visitante:
  const [homeMateshAwayTeam, setHomeMathesAwayTeam] = useState(true);
  const [visitingMatchesAwayTeam, setVisitingMatchesAwayTeam] = useState(true);
  //Equipo local, estadisticas de local y/o visitante:
  const [visitingmathgesLocalTeam, setVisitingmathgesLocalTeam] =
    useState(true);
  const [homeMatchesLocalTeam, setHomeMatchesLocalTeam] = useState(true);

  const handleChangeCheckbox = (event) => {
    const { name, checked } = event.target;
    if (name === "teamHome-home") {
      setHomeMatchesLocalTeam(!homeMatchesLocalTeam);
    } else if (name === "teamHome-visitor") {
      setVisitingmathgesLocalTeam(!visitingmathgesLocalTeam);
    } else if (name === "teamVisitor-home") {
      setHomeMathesAwayTeam(!homeMateshAwayTeam);
    } else if (name === "teamVisitor-visitor") {
      setVisitingMatchesAwayTeam(!visitingMatchesAwayTeam);
    }
    console.log(checked);
  };
  const {
    setHomeStatYellowCard,
    setAwayStatYellowCard,
    setHomeStatGoals,
    setHomeStatCorners,
    setAwayStatCorners,
    setAwayStatGoals,
  } = useTeamStatsStore((state) => state);

  useEffect(() => {
    setHomeStatYellowCard({
      idHomeTeam,
      statsLessThan,
      visitingmathgesLocalTeam,
      homeMatchesLocalTeam,
    });
  }, [
    idHomeTeam,
    statsLessThan,
    visitingmathgesLocalTeam,
    homeMatchesLocalTeam,
    setHomeStatYellowCard,
  ]);

  useEffect(() => {
    setAwayStatYellowCard({
      idAwayTeam,
      statsLessThan,
      homeMateshAwayTeam,
      visitingMatchesAwayTeam,
    });
  }, [
    idAwayTeam,
    statsLessThan,
    homeMateshAwayTeam,
    visitingMatchesAwayTeam,
    setAwayStatYellowCard,
  ]);

  //CORNERS:
  useEffect(() => {
    setHomeStatCorners({
      idHomeTeam,
      statsLessThan,
      visitingmathgesLocalTeam,
      homeMatchesLocalTeam,
    });
  }, [
    idHomeTeam,
    statsLessThan,
    visitingmathgesLocalTeam,
    homeMatchesLocalTeam,
    setHomeStatCorners,
  ]);

  useEffect(() => {
    setAwayStatCorners({
      idAwayTeam,
      statsLessThan,
      homeMateshAwayTeam,
      visitingMatchesAwayTeam,
    });
  }, [
    idAwayTeam,
    statsLessThan,
    homeMateshAwayTeam,
    visitingMatchesAwayTeam,
    setAwayStatCorners,
  ]);

  //GOLES:
  useEffect(() => {
    setHomeStatGoals({
      idHomeTeam,
      statsLessThan,
      visitingmathgesLocalTeam,
      homeMatchesLocalTeam,
    });
  }, [
    idHomeTeam,
    statsLessThan,
    visitingmathgesLocalTeam,
    homeMatchesLocalTeam,
    setHomeStatGoals,
  ]);

  useEffect(() => {
    setAwayStatGoals({
      idAwayTeam,
      statsLessThan,
      homeMateshAwayTeam,
      visitingMatchesAwayTeam,
    });
  }, [
    idAwayTeam,
    statsLessThan,
    homeMateshAwayTeam,
    visitingMatchesAwayTeam,
    setAwayStatGoals,
  ]);

  return (
    <>
      <div>Ultimos 10 partidos</div>
      {/* Filters: */}
      <RadioButtonStatsLessThan
        handleChangeRadioButton={handleChangeRadioButton}
        statsLessThan={statsLessThan}
      />
      <RadioButtonHomeAway
        handleChangeCheckbox={handleChangeCheckbox}
        homeMateshAwayTeam={homeMateshAwayTeam}
        visitingMatchesAwayTeam={visitingMatchesAwayTeam}
        visitingmathgesLocalTeam={visitingmathgesLocalTeam}
        homeMatchesLocalTeam={homeMatchesLocalTeam}
      />
      <StatisticsTablecopy
        match={match}
        statsLessThan={statsLessThan}
        idHomeTeam={idHomeTeam}
        idAwayTeam={idAwayTeam}
      ></StatisticsTablecopy>
    </>
  );
};
