/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Box, Container, Typography } from "@mui/material";
import { useBoundStore } from "../../stores";
import { RadioButtonStatsLessThan } from "../../componts/RadioButtonStatsLessThan";
import { RadioButtonHomeAway } from "../../componts/RadioButtonHomeAway";
import { FilterStatsSeasonAndPosition } from "../../componts/FilterStatsSeasonAndPosition";
import NumberOfMatchesInput from "../../componts/Filters/NumberOfMatchesInput ";

export const FilterStatistics = ({
  idMatch,
  idHomeTeam,
  idAwayTeam,
  setStatsLessThan,
  statsLessThan,
  singleTeam,
}) => {
  const { getMatchDetail } = useBoundStore((state) => state);
  const [currentSeason, setCurrentSeason] = useState("");
  const [position, setPosition] = useState(false);
  const [homeMateshAwayTeam, setHomeMathesAwayTeam] = useState(true);
  const [visitingMatchesAwayTeam, setVisitingMatchesAwayTeam] = useState(true);
  const [visitingmathgesLocalTeam, setVisitingmathgesLocalTeam] =
    useState(true);
  const [homeMatchesLocalTeam, setHomeMatchesLocalTeam] = useState(true);
  const [numberOfMatches, setNumberOfMatches] = useState(10); // default value

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
    setAwayStatOffsides,
  } = useBoundStore((state) => state);

  useEffect(() => {
    if (idMatch) {
      getMatchDetail({ idMatch });
    }
  }, [getMatchDetail, idMatch]);

  const handleChangeRadioButton = () => {
    setStatsLessThan(!statsLessThan);
  };

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

  useEffect(() => {
    if (idHomeTeam) {
      setHomeStatOffsides({
        idHomeTeam,
        statsLessThan,
        visitingmathgesLocalTeam,
        homeMatchesLocalTeam,
        numberOfMatches,
        currentSeason,
        position,
      });
    }
  }, [
    idHomeTeam,
    statsLessThan,
    visitingmathgesLocalTeam,
    homeMatchesLocalTeam,
    setHomeStatOffsides,
    numberOfMatches,
    currentSeason,
    position,
  ]);

  useEffect(() => {
    if (idAwayTeam) {
      setAwayStatOffsides({
        idAwayTeam,
        statsLessThan,
        homeMateshAwayTeam,
        visitingMatchesAwayTeam,
        numberOfMatches,
        currentSeason,
        position,
      });
    }
  }, [
    idAwayTeam,
    statsLessThan,
    homeMateshAwayTeam,
    visitingMatchesAwayTeam,
    setAwayStatOffsides,
    numberOfMatches,
    currentSeason,
    position,
  ]);

  useEffect(() => {
    if (idHomeTeam) {
      setHomeStatShotsOnTarget({
        idHomeTeam,
        statsLessThan,
        visitingmathgesLocalTeam,
        homeMatchesLocalTeam,
        numberOfMatches,
        currentSeason,
        position,
      });
    }
  }, [
    idHomeTeam,
    statsLessThan,
    visitingmathgesLocalTeam,
    homeMatchesLocalTeam,
    setHomeStatShotsOnTarget,
    numberOfMatches,
    currentSeason,
    position,
  ]);

  useEffect(() => {
    if (idAwayTeam) {
      setAwayStatShotsOnTarget({
        idAwayTeam,
        statsLessThan,
        homeMateshAwayTeam,
        visitingMatchesAwayTeam,
        numberOfMatches,
        currentSeason,
        position,
      });
    }
  }, [
    idAwayTeam,
    statsLessThan,
    homeMateshAwayTeam,
    visitingMatchesAwayTeam,
    setAwayStatShotsOnTarget,
    numberOfMatches,
    currentSeason,
    position,
  ]);

  useEffect(() => {
    if (idHomeTeam) {
      setHomeStatPossession({
        idHomeTeam,
        statsLessThan,
        visitingmathgesLocalTeam,
        homeMatchesLocalTeam,
        numberOfMatches,
        currentSeason,
        position,
      });
    }
  }, [
    idHomeTeam,
    statsLessThan,
    visitingmathgesLocalTeam,
    homeMatchesLocalTeam,
    setHomeStatPossession,
    numberOfMatches,
    currentSeason,
    position,
  ]);

  useEffect(() => {
    if (idAwayTeam) {
      setAwayStatPossession({
        idAwayTeam,
        statsLessThan,
        homeMateshAwayTeam,
        visitingMatchesAwayTeam,
        numberOfMatches,
        currentSeason,
        position,
      });
    }
  }, [
    idAwayTeam,
    statsLessThan,
    homeMateshAwayTeam,
    visitingMatchesAwayTeam,
    setAwayStatPossession,
    numberOfMatches,
    currentSeason,
    position,
  ]);

  useEffect(() => {
    if (idHomeTeam) {
      setHomeStatFouls({
        idHomeTeam,
        statsLessThan,
        visitingmathgesLocalTeam,
        homeMatchesLocalTeam,
        numberOfMatches,
        currentSeason,
        position,
      });
    }
  }, [
    idHomeTeam,
    statsLessThan,
    visitingmathgesLocalTeam,
    homeMatchesLocalTeam,
    setHomeStatFouls,
    numberOfMatches,
    currentSeason,
    position,
  ]);

  useEffect(() => {
    if (idAwayTeam) {
      setAwayStatFouls({
        idAwayTeam,
        statsLessThan,
        homeMateshAwayTeam,
        visitingMatchesAwayTeam,
        numberOfMatches,
        currentSeason,
        position,
      });
    }
  }, [
    idAwayTeam,
    statsLessThan,
    homeMateshAwayTeam,
    visitingMatchesAwayTeam,
    setAwayStatFouls,
    numberOfMatches,
    currentSeason,
    position,
  ]);

  useEffect(() => {
    if (idHomeTeam) {
      setHomeStatYellowCard({
        idHomeTeam,
        statsLessThan,
        visitingmathgesLocalTeam,
        homeMatchesLocalTeam,
        numberOfMatches,
        currentSeason,
        position,
      });
    }
  }, [
    idHomeTeam,
    statsLessThan,
    visitingmathgesLocalTeam,
    homeMatchesLocalTeam,
    setHomeStatYellowCard,
    numberOfMatches,
    currentSeason,
    position,
  ]);

  useEffect(() => {
    if (idAwayTeam) {
      setAwayStatYellowCard({
        idAwayTeam,
        statsLessThan,
        homeMateshAwayTeam,
        visitingMatchesAwayTeam,
        numberOfMatches,
        currentSeason,
        position,
      });
    }
  }, [
    idAwayTeam,
    statsLessThan,
    homeMateshAwayTeam,
    visitingMatchesAwayTeam,
    setAwayStatYellowCard,
    numberOfMatches,
    currentSeason,
    position,
  ]);

  useEffect(() => {
    if (idHomeTeam) {
      setHomeStatCorners({
        idHomeTeam,
        statsLessThan,
        visitingmathgesLocalTeam,
        homeMatchesLocalTeam,
        numberOfMatches,
        currentSeason,
        position,
      });
    }
  }, [
    idHomeTeam,
    statsLessThan,
    visitingmathgesLocalTeam,
    homeMatchesLocalTeam,
    setHomeStatCorners,
    numberOfMatches,
    currentSeason,
    position,
  ]);

  useEffect(() => {
    if (idAwayTeam) {
      setAwayStatCorners({
        idAwayTeam,
        statsLessThan,
        homeMateshAwayTeam,
        visitingMatchesAwayTeam,
        numberOfMatches,
        currentSeason,
        position,
      });
    }
  }, [
    idAwayTeam,
    statsLessThan,
    homeMateshAwayTeam,
    visitingMatchesAwayTeam,
    setAwayStatCorners,
    numberOfMatches,
    currentSeason,
    position,
  ]);

  useEffect(() => {
    if (idHomeTeam) {
      setHomeStatGoals({
        idHomeTeam,
        statsLessThan,
        visitingmathgesLocalTeam,
        homeMatchesLocalTeam,
        numberOfMatches,
        currentSeason,
        position,
      });
    }
  }, [
    idHomeTeam,
    statsLessThan,
    visitingmathgesLocalTeam,
    homeMatchesLocalTeam,
    setHomeStatGoals,
    numberOfMatches,
    currentSeason,
    position,
  ]);

  useEffect(() => {
    if (idAwayTeam) {
      setAwayStatGoals({
        idAwayTeam,
        statsLessThan,
        homeMateshAwayTeam,
        visitingMatchesAwayTeam,
        numberOfMatches,
        currentSeason,
        position,
      });
    }
  }, [
    idAwayTeam,
    statsLessThan,
    homeMateshAwayTeam,
    visitingMatchesAwayTeam,
    setAwayStatGoals,
    numberOfMatches,
    currentSeason,
    position,
  ]);

  useEffect(() => {
    if (idHomeTeam) {
      setHomeStatShots({
        idHomeTeam,
        statsLessThan,
        visitingmathgesLocalTeam,
        homeMatchesLocalTeam,
        numberOfMatches,
        currentSeason,
        position,
      });
    }
  }, [
    idHomeTeam,
    statsLessThan,
    visitingmathgesLocalTeam,
    homeMatchesLocalTeam,
    setHomeStatShots,
    numberOfMatches,
    currentSeason,
    position,
  ]);

  useEffect(() => {
    if (idAwayTeam) {
      setAwayStatShots({
        idAwayTeam,
        statsLessThan,
        homeMateshAwayTeam,
        visitingMatchesAwayTeam,
        numberOfMatches,
        currentSeason,
        position,
      });
    }
  }, [
    idAwayTeam,
    statsLessThan,
    homeMateshAwayTeam,
    visitingMatchesAwayTeam,
    setAwayStatShots,
    numberOfMatches,
    currentSeason,
    position,
  ]);

  return (
    <Container>
      <Box
        sx={{
          border: "1px solid #ddd",
          padding: 2,
          marginBottom: 2,
          borderRadius: 2,
          boxShadow: 1,
          backgroundColor: "#f9f9f9",
        }}
      >
          <RadioButtonStatsLessThan
          handleChangeRadioButton={handleChangeRadioButton}
          statsLessThan={statsLessThan}
        />
      </Box>
      <Box
        sx={{
          border: "1px solid #ddd",
          padding: 2,
          marginBottom: 2,
          borderRadius: 2,
          boxShadow: 1,
          backgroundColor: "#f9f9f9",
        }}
      >
        <FilterStatsSeasonAndPosition
          setPosition={setPosition}
          position={position}
          setCurrentSeason={setCurrentSeason}
          idHomeTeam={idHomeTeam}
        />
      </Box>
      <Box
        sx={{
          border: "1px solid #ddd",
          padding: 2,
          marginBottom: 2,
          borderRadius: 2,
          boxShadow: 1,
          backgroundColor: "#f9f9f9",
        }}
      >
      <NumberOfMatchesInput onNumberOfMatchesChange={setNumberOfMatches} />
      </Box>
      <Box
        sx={{
          border: "1px solid #ddd",
          padding: 2,
          marginBottom: 2,
          borderRadius: 2,
          boxShadow: 1,
          backgroundColor: "#f9f9f9",
        }}
      >
         <RadioButtonHomeAway
          handleChangeCheckbox={handleChangeCheckbox}
          homeMateshAwayTeam={homeMateshAwayTeam}
          visitingMatchesAwayTeam={visitingMatchesAwayTeam}
          visitingmathgesLocalTeam={visitingmathgesLocalTeam}
          homeMatchesLocalTeam={homeMatchesLocalTeam}
          singleTeam={singleTeam}
        />
      </Box>
    </Container>
  );
};
