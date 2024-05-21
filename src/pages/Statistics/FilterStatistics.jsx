/* eslint-disable react/prop-types */
import  { useEffect } from "react";
import { RadioButtonStatsLessThan } from "../../componts/RadioButtonStatsLessThan";
import { RadioButtonHomeAway } from "../../componts/RadioButtonHomeAway";
import { Container } from "@mui/material";
import { useState } from "react";
import { useBoundStore } from "../../stores";

export const FilterStatistics = ({
  idMatch,
  idHomeTeam,
  idAwayTeam,
  // setMatch,
  setStatsLessThan,
  statsLessThan,
  singleTeam
 
}) => {
  const { getMatchDetail } = useBoundStore((state) => state);

  useEffect(() => {
    getMatchDetail({ idMatch });
  }, [getMatchDetail, idMatch]);

  // useEffect(() => {
  //   setMatch(matchDetail);
  // }, [matchDetail]);

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
    const { name } = event.target;
    if (name === "teamHome-home") {
      setHomeMatchesLocalTeam(!homeMatchesLocalTeam);
    } else if (name === "teamHome-visitor") {
      setVisitingmathgesLocalTeam(!visitingmathgesLocalTeam);
    } else if (name === "teamVisitor-home") {
      setHomeMathesAwayTeam(!homeMateshAwayTeam);
    } else if (name === "teamVisitor-visitor") {
      setVisitingMatchesAwayTeam(!visitingMatchesAwayTeam);
    }
  };

  const {
    setHomeStatYellowCard,
    setHomeStatGoals,
    setHomeStatCorners,
    setHomeStatShots,
    setHomeStatShotsOnTarget,
    setHomeStatPossession,
    setHomeStatFouls,
    setHomeStatOffsides,
    



    setAwayStatYellowCard,
    setAwayStatCorners,
    setAwayStatGoals,
    setAwayStatShots,
    setAwayStatShotsOnTarget,
    setAwayStatPossession,
    setAwayStatFouls,
    setAwayStatOffsides
    
  } = useBoundStore((state) => state);

  
    //OFFSIDE:
    useEffect(() => {
      setHomeStatOffsides({
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
      setHomeStatOffsides,
    ]);
  
    useEffect(() => {
      setAwayStatOffsides({
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
      setAwayStatOffsides,
    ]);
  
  //TIROS AL ARCO:
  useEffect(() => {
    setHomeStatShotsOnTarget({
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
    setHomeStatShotsOnTarget,
  ]);

  useEffect(() => {
    setAwayStatShotsOnTarget({
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
    setAwayStatShotsOnTarget,
  ]);

    //POSESION:
    useEffect(() => {
      setHomeStatPossession({
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
      setHomeStatPossession,
    ]);
  
    useEffect(() => {
      setAwayStatPossession({
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
      setAwayStatPossession,
    ]);
    
    //FALTAS:
    useEffect(() => {
      setHomeStatFouls({
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
      setHomeStatFouls,
    ]);
  
    useEffect(() => {
      setAwayStatFouls({
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
      setAwayStatFouls,
    ]);
  
  



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

    //TIROS:
    useEffect(() => {
      setHomeStatShots({
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
      setHomeStatShots,
    ]);
  
    useEffect(() => {
      setAwayStatShots({
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
      setAwayStatShots,
    ]);
  

  return (
    <Container>
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
        singleTeam={singleTeam}
      />
    </Container>
  );
};
