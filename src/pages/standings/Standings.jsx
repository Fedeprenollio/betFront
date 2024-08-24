import { useEffect, useState } from "react";
import { useBoundStore } from "../../stores";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
} from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { StyledTableRow } from "../Statistics/rangePercentageTable/RangePercentageTable";
import { FilterComponent } from "../../componts/tableFilters/FilterComponent";

export const Standings = () => {
  const { seasonId } = useParams();
  const { getTableSeason, tableSeason } = useBoundStore((state) => state);
  const [showHome, setShowHome] = useState(true);
  const [showVisitor, setShowVisitor] = useState(true);
  const [pathPage, setPathPage] = useState("");

  useEffect(() => {
    getTableSeason({ seasonId });
    const currentPath = location.pathname;
    if (currentPath.includes("league")) {
      setPathPage("league");
     
    }
  }, [seasonId, getTableSeason]);

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
    return (
      statsB.points - statsA.points ||
      statsB.goalDifference - statsA.goalDifference ||
      statsB.goalsFor - statsA.goalsFor
    );
  });
 

  return (
    <Box sx={{ padding: 2 }}>
        <FilterComponent
        filterName="local/visitor"
        homeOnly={showHome}
        awayOnly={showVisitor}
        handleHomeOnlyChange={handleShowHomeChange}
        handleAwayOnlyChange={handleShowVisitorChange}
        pathPage={pathPage}
        
      />
      {tableSeason?.zoneTables?.map((zone, zoneIndex) => (
        <Box
          key={zoneIndex}
          sx={{
            border: "1px solid #ddd",
            padding: 2,
            marginBottom: 2,
            borderRadius: 2,
            boxShadow: 1,
            backgroundColor: "#f9f9f9",
          }}
        >
          <Typography variant="h6">{zone.zoneName}</Typography>
          <TableContainer
            sx={{ maxHeight: 640, overflowX: "auto" }}
            component={Paper}
            // style={{ overflowX: "auto" }}
          >
            <Table size="small" stickyHeader>
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
                {zone.teams
                  ?.slice()
                  .sort((teamA, teamB) => {
                    const statsA = getFilteredStats(teamA);
                    const statsB = getFilteredStats(teamB);
                    return (
                      statsB.points - statsA.points ||
                      statsB.goalDifference - statsA.goalDifference ||
                      statsB.goalsFor - statsA.goalsFor
                    );
                  })
                  .map((t, index) => {
                    const stats = getFilteredStats(t);
                    return (
                      <StyledTableRow key={t.team._id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell
                          style={{
                            width: "100px",
                            position: "sticky",
                            top: 0,
                            left: 0,
                            backgroundColor: "#fff",
                            zIndex: 1,
                          }}
                        >
                          <Link
                            to={`/teams/${t.team._id}/statistics`}
                            style={{ textDecoration: "none", color: "inherit" }}
                          >
                            {t.team.name}
                          </Link>
                        </TableCell>
                        <TableCell>{stats.points}</TableCell>
                        <TableCell>{stats.matchesPlayed}</TableCell>
                        <TableCell>{stats.matchesWon}</TableCell>
                        <TableCell>{stats.matchesDrawn}</TableCell>
                        <TableCell>{stats.matchesLost}</TableCell>
                        <TableCell>{stats.goalsFor}</TableCell>
                        <TableCell>{stats.goalsAgainst}</TableCell>
                        <TableCell>{stats.goalDifference}</TableCell>
                      </StyledTableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      ))}

      <Box
        sx={{
          border: "1px solid #ddd",
          padding: 2,
          borderRadius: 2,
          boxShadow: 1,
          backgroundColor: "#f9f9f9",
        }}
      >
        <Typography variant="h6">Tabla General</Typography>
        <TableContainer
          sx={{ maxHeight: 640 }}
          md={{ maxHeight: 840 }}
          component={Paper}
          style={{ overflowX: "auto" }}
        >
          <Table size="small" stickyHeader>
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
                  <StyledTableRow key={t.team._id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell
                      style={{
                        width: "100px",
                        position: "sticky",
                        top: 0,
                        left: 0,
                        backgroundColor: "#fff",
                        zIndex: 1,
                      }}
                    >
                      <Link
                        to={`/teams/${t.team._id}/statistics`}
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        {t.team.name}
                      </Link>
                    </TableCell>
                    <TableCell>{stats.points}</TableCell>
                    <TableCell>{stats.matchesPlayed}</TableCell>
                    <TableCell>{stats.matchesWon}</TableCell>
                    <TableCell>{stats.matchesDrawn}</TableCell>
                    <TableCell>{stats.matchesLost}</TableCell>
                    <TableCell>{stats.goalsFor}</TableCell>
                    <TableCell>{stats.goalsAgainst}</TableCell>
                    <TableCell>{stats.goalDifference}</TableCell>
                  </StyledTableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};
