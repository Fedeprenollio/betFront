import { useState } from "react";

export const useFilters = () => {
  const [homeOnly, setHomeOnly] = useState(true);
  const [awayOnly, setAwayOnly] = useState(true);
  const [homeOnlySecondTeamComparative, setHomeOnlySecondTeamComparative] =
    useState(true);
  const [awayOnlySecondTeamComparative, setAwayOnlySecondTeamComparative] =
    useState(true);
  const [
    matchesCountSecondTeamComparative,
    setMatchesCountSecondTeamComparative,
  ] = useState(0);
  const [matchesCount, setMatchesCount] = useState(0);

  return {
    homeOnly,
    setHomeOnly,
    awayOnly,
    setAwayOnly,
    homeOnlySecondTeamComparative,
    setHomeOnlySecondTeamComparative,
    awayOnlySecondTeamComparative,
    setAwayOnlySecondTeamComparative,
    matchesCountSecondTeamComparative,
    setMatchesCountSecondTeamComparative,
    matchesCount, setMatchesCount
  };
};
