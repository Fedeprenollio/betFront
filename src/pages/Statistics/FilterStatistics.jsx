/* eslint-disable react/prop-types */
import  { useEffect } from "react";
import { RadioButtonStatsLessThan } from "../../componts/RadioButtonStatsLessThan";
import { RadioButtonHomeAway } from "../../componts/RadioButtonHomeAway";
import { Container } from "@mui/material";
import { useState } from "react";
import { useBoundStore } from "../../stores";
import NumberOfMatchesInput from "../../componts/Filters/NumberOfMatchesInput ";

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
  const [numberOfMatches, setNumberOfMatches] = useState(10); // default value

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
        numberOfMatches
      });
    }, [
      idHomeTeam,
      statsLessThan,
      visitingmathgesLocalTeam,
      homeMatchesLocalTeam,
      setHomeStatOffsides,numberOfMatches
    ]);
  
    useEffect(() => {
      setAwayStatOffsides({
        idAwayTeam,
        statsLessThan,
        homeMateshAwayTeam,
        visitingMatchesAwayTeam,numberOfMatches
      });
    }, [
      idAwayTeam,
      statsLessThan,
      homeMateshAwayTeam,
      visitingMatchesAwayTeam,
      setAwayStatOffsides,numberOfMatches
    ]);
  
  //TIROS AL ARCO:
  useEffect(() => {
    setHomeStatShotsOnTarget({
      idHomeTeam,
      statsLessThan,
      visitingmathgesLocalTeam,
      homeMatchesLocalTeam,numberOfMatches
    });
  }, [
    idHomeTeam,
    statsLessThan,
    visitingmathgesLocalTeam,
    homeMatchesLocalTeam,
    setHomeStatShotsOnTarget,numberOfMatches
  ]);

  useEffect(() => {
    setAwayStatShotsOnTarget({
      idAwayTeam,
      statsLessThan,
      homeMateshAwayTeam,
      visitingMatchesAwayTeam,numberOfMatches
    });
  }, [
    idAwayTeam,
    statsLessThan,
    homeMateshAwayTeam,
    visitingMatchesAwayTeam,
    setAwayStatShotsOnTarget,numberOfMatches
  ]);

    //POSESION:
    useEffect(() => {
      setHomeStatPossession({
        idHomeTeam,
        statsLessThan,
        visitingmathgesLocalTeam,
        homeMatchesLocalTeam,numberOfMatches
      });
    }, [
      idHomeTeam,
      statsLessThan,
      visitingmathgesLocalTeam,
      homeMatchesLocalTeam,
      setHomeStatPossession,numberOfMatches
    ]);
  
    useEffect(() => {
      setAwayStatPossession({
        idAwayTeam,
        statsLessThan,
        homeMateshAwayTeam,
        visitingMatchesAwayTeam,numberOfMatches
      });
    }, [
      idAwayTeam,
      statsLessThan,
      homeMateshAwayTeam,
      visitingMatchesAwayTeam,
      setAwayStatPossession,numberOfMatches
    ]);
    
    //FALTAS:
    useEffect(() => {
      setHomeStatFouls({
        idHomeTeam,
        statsLessThan,
        visitingmathgesLocalTeam,
        homeMatchesLocalTeam,numberOfMatches
      });
    }, [
      idHomeTeam,
      statsLessThan,
      visitingmathgesLocalTeam,
      homeMatchesLocalTeam,
      setHomeStatFouls,numberOfMatches
    ]);
  
    useEffect(() => {
      setAwayStatFouls({
        idAwayTeam,
        statsLessThan,
        homeMateshAwayTeam,
        visitingMatchesAwayTeam,numberOfMatches
      });
    }, [
      idAwayTeam,
      statsLessThan,
      homeMateshAwayTeam,
      visitingMatchesAwayTeam,
      setAwayStatFouls,numberOfMatches
    ]);
  
  



  useEffect(() => {
    setHomeStatYellowCard({
      idHomeTeam,
      statsLessThan,
      visitingmathgesLocalTeam,
      homeMatchesLocalTeam,numberOfMatches
    });
  }, [
    idHomeTeam,
    statsLessThan,
    visitingmathgesLocalTeam,
    homeMatchesLocalTeam,
    setHomeStatYellowCard,numberOfMatches
  ]);

  useEffect(() => {
    setAwayStatYellowCard({
      idAwayTeam,
      statsLessThan,
      homeMateshAwayTeam,
      visitingMatchesAwayTeam,numberOfMatches
    });
  }, [
    idAwayTeam,
    statsLessThan,
    homeMateshAwayTeam,
    visitingMatchesAwayTeam,
    setAwayStatYellowCard,numberOfMatches
  ]);

  //CORNERS:
  useEffect(() => {
    setHomeStatCorners({
      idHomeTeam,
      statsLessThan,
      visitingmathgesLocalTeam,
      homeMatchesLocalTeam,numberOfMatches
    });
  }, [
    idHomeTeam,
    statsLessThan,
    visitingmathgesLocalTeam,
    homeMatchesLocalTeam,
    setHomeStatCorners,numberOfMatches
  ]);

  useEffect(() => {
    setAwayStatCorners({
      idAwayTeam,
      statsLessThan,
      homeMateshAwayTeam,
      visitingMatchesAwayTeam,numberOfMatches
    });
  }, [
    idAwayTeam,
    statsLessThan,
    homeMateshAwayTeam,
    visitingMatchesAwayTeam,
    setAwayStatCorners,numberOfMatches
  ]);

  //GOLES:
  useEffect(() => {
    setHomeStatGoals({
      idHomeTeam,
      statsLessThan,
      visitingmathgesLocalTeam,
      homeMatchesLocalTeam,numberOfMatches
    });
  }, [
    idHomeTeam,
    statsLessThan,
    visitingmathgesLocalTeam,
    homeMatchesLocalTeam,
    setHomeStatGoals,numberOfMatches
  ]);

  useEffect(() => {
    setAwayStatGoals({
      idAwayTeam,
      statsLessThan,
      homeMateshAwayTeam,
      visitingMatchesAwayTeam,numberOfMatches
    });
  }, [
    idAwayTeam,
    statsLessThan,
    homeMateshAwayTeam,
    visitingMatchesAwayTeam,
    setAwayStatGoals,numberOfMatches
  ]);

    //TIROS:
    useEffect(() => {
      setHomeStatShots({
        idHomeTeam,
        statsLessThan,
        visitingmathgesLocalTeam,
        homeMatchesLocalTeam,numberOfMatches
      });
    }, [
      idHomeTeam,
      statsLessThan,
      visitingmathgesLocalTeam,
      homeMatchesLocalTeam,
      setHomeStatShots,numberOfMatches
    ]);
  
    useEffect(() => {
      setAwayStatShots({
        idAwayTeam,
        statsLessThan,
        homeMateshAwayTeam,
        visitingMatchesAwayTeam,numberOfMatches
      });
    }, [
      idAwayTeam,
      statsLessThan,
      homeMateshAwayTeam,
      visitingMatchesAwayTeam,
      setAwayStatShots,numberOfMatches
    ]);
  

  return (
    <Container>
      <RadioButtonStatsLessThan
        handleChangeRadioButton={handleChangeRadioButton}
        statsLessThan={statsLessThan}
      />
      <NumberOfMatchesInput  onNumberOfMatchesChange={setNumberOfMatches}/>
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
