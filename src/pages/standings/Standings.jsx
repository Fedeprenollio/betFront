import React, { useEffect, useState } from "react";
import { useBoundStore } from "../../stores";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { Link, useParams } from "react-router-dom";

export const Standings = () => {
  const { seasonId } = useParams()
  const { getTableSeason, tableSeason } = useBoundStore((state) => state);
  const [showHome, setShowHome] = useState(true);
  const [showVisitor, setShowVisitor] = useState(true);
console.log("tableSeason",tableSeason)
  useEffect(() => {
    getTableSeason({ seasonId });
  }, [seasonId]);

  const handleShowHomeChange = (event) => {
    setShowHome(event.target.checked);
  };

  const handleShowVisitorChange = (event) => {
    setShowVisitor(event.target.checked);
  };

  const getFilteredStats = (team) => {
    if (showHome && showVisitor) {
      return team.allStats;
    } else if (showHome) {
      return team.statsHome;
    } else if (showVisitor) {
      return team.statsVisitor;
    }
    return {};
  };

  const sortedTable = tableSeason?.table?.slice().sort((teamA, teamB) => {
    const statsA = getFilteredStats(teamA);
    const statsB = getFilteredStats(teamB);
    return statsB.points - statsA.points || statsB.goalDifference - statsA.goalDifference || statsB.goalsFor - statsA.goalsFor;
  });

  return (
    <>
      <h2>Tabla de posiciones</h2>
      <FormGroup row>
        <FormControlLabel
          control={<Checkbox checked={showHome} onChange={handleShowHomeChange} />}
          label="Local"
        />
        <FormControlLabel
          control={<Checkbox checked={showVisitor} onChange={handleShowVisitorChange} />}
          label="Visitante"
        />
      </FormGroup>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Equipo</TableCell>
              <TableCell>Pts</TableCell>
              <TableCell>PJ</TableCell>
              <TableCell>PG</TableCell>
              <TableCell>PE</TableCell>
              <TableCell>PP</TableCell>
              <TableCell>GF</TableCell>
              <TableCell>GC</TableCell>
              <TableCell>DIF</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedTable?.map((t, index) => {
              const stats = getFilteredStats(t);
              return (
                <TableRow key={t.team._id}>
                  <TableCell>{index + 1}</TableCell>
                  <Link to={`/teams/${t.team._id}/statistics`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    {t.team.name}
                  </Link>
                  <TableCell>{stats.points}</TableCell>
                  <TableCell>{stats.matchesPlayed}</TableCell>
                  <TableCell>{stats.matchesWon}</TableCell>
                  <TableCell>{stats.matchesDrawn}</TableCell>
                  <TableCell>{stats.matchesLost}</TableCell>
                  <TableCell>{stats.goalsFor}</TableCell>
                  <TableCell>{stats.goalsAgainst}</TableCell>
                  <TableCell>{stats.goalDifference}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
