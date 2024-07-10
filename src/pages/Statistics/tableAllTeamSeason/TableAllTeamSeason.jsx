import React, { useEffect, useState } from "react";
import { useBoundStore } from "../../../stores";
import { useParams } from "react-router-dom";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableSortLabel,
  Paper,
  Box,
  Divider,
} from "@mui/material";
import { GroupByName } from "../rangePercentageTable/GroupByName";
import { AdvancedOptions } from "./AdvancedOptions";
import { SelectStatistics } from "./SelectStatistics";
import * as XLSX from "xlsx"; // Importa xlsx
import ExportExcelButton from "../../../componts/exportToExcel/ExportExcelButton";

export const TableAllTeamSeason = () => {
  const { seasonId } = useParams();
  const { getTeamStatsForSeason, teamStatsForSeason } = useBoundStore(
    (state) => state
  );
  const [listTeams, setListTeams] = useState([]);
  const [selectedTeams, setSelectedTeams] = useState([]); // Estado para los equipos seleccionados

  useEffect(() => {
    getTeamStatsForSeason({ seasonId });
  }, [seasonId, getTeamStatsForSeason]);

  useEffect(() => {
    setListTeams(teamStatsForSeason);
  }, [teamStatsForSeason]);

  const [orderBy, setOrderBy] = useState("teamName");
  const [order, setOrder] = useState("asc");
  const [showAdvancedStats, setShowAdvancedStats] = useState({
    promedio: true,
    mediana: true,
    desviacion: true,
  });

  const [visibleStats, setVisibleStats] = useState({
    goals: true,
    offsides: true,
    yellowCards: true,
    corners: true,
    shots: true,
    shotsOnTarget: true,
    possession: true,
    fouls: true,
  });

  const handleSortRequest = (property) => {
    const isAscending = orderBy === property && order === "asc";
    const sortedTeams = [...listTeams].sort((a, b) => {
      let aValue, bValue;

      if (property.includes("received.")) {
        const statKey = property.split(".")[1];
        const type = property.split(".")[2];
        aValue = parseFloat(a.received[statKey]?.[type] || 0);
        bValue = parseFloat(b.received[statKey]?.[type] || 0);
      } else if (property.includes("statistics.")) {
        const statKey = property.split(".")[1];
        const type = property.split(".")[2];
        aValue = parseFloat(a.statistics[statKey]?.[type] || 0);
        bValue = parseFloat(b.statistics[statKey]?.[type] || 0);
      } else {
        aValue = a.teamName;
        bValue = b.teamName;
      }

      if (aValue < bValue) return isAscending ? -1 : 1;
      if (aValue > bValue) return isAscending ? 1 : -1;
      return 0;
    });

    setOrder(isAscending ? "desc" : "asc");
    setOrderBy(property);
    setListTeams(sortedTeams);
  };

  const stats = [
    { key: "goals", label: "Goles" },
    { key: "offsides", label: "Offsides" },
    { key: "yellowCards", label: "Tarjetas Amarillas" },
    { key: "corners", label: "Corners" },
    { key: "shots", label: "Tiros" },
    { key: "shotsOnTarget", label: "Tiros al Arco" },
    { key: "possession", label: "Posesión" },
    { key: "fouls", label: "Faltas" },
  ];

  const handleCheckboxChange = (key) => {
    setShowAdvancedStats((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };

  const handleStatCheckboxChange = (key) => {
    setVisibleStats((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };
  const handleNamesChange = (names) => {
    setSelectedTeams(names.flat()); // Actualiza los equipos seleccionados
  };
  const filteredTeams = selectedTeams.length > 0
  ? listTeams.filter(team => selectedTeams.includes(team.teamName))
  : listTeams;

  const exportToExcel = () => {
    // Preparar datos para exportar
    const dataToExport = filteredTeams.map(team => ({
      teamId: team.teamId,
      teamName: team.teamName,
      goals_total: team.statistics.goals.total,
      goals_promedio: team.statistics.goals.promedio,
      goals_mediana: team.statistics.goals.mediana,
      goals_desviacion: team.statistics.goals.desviacion,
      offsides_total: team.statistics.offsides.total,
      offsides_promedio: team.statistics.offsides.promedio,
      offsides_mediana: team.statistics.offsides.mediana,
      offsides_desviacion: team.statistics.offsides.desviacion,
      yellowCards_total: team.statistics.yellowCards.total,
      yellowCards_promedio: team.statistics.yellowCards.promedio,
      yellowCards_mediana: team.statistics.yellowCards.mediana,
      yellowCards_desviacion: team.statistics.yellowCards.desviacion,
      
      corners_total: team.statistics.corners.total,
      corners_promedio: team.statistics.corners.promedio,
      corners_mediana: team.statistics.corners.mediana,
      corners_desviacion: team.statistics.corners.desviacion,
      shots_total: team.statistics.shots.total,
      shots_promedio: team.statistics.shots.promedio,
      shots_mediana: team.statistics.shots.mediana,
      shots_desviacion: team.statistics.shots.desviacion,
      shotsOnTarget_total: team.statistics.shotsOnTarget.total,
      shotsOnTarget_promedio: team.statistics.shotsOnTarget.promedio,
      shotsOnTarget_mediana: team.statistics.shotsOnTarget.mediana,
      shotsOnTarget_desviacion: team.statistics.shotsOnTarget.desviacion,
      possession_total: team.statistics.possession.total,
      possession_promedio: team.statistics.possession.promedio,
      possession_mediana: team.statistics.possession.mediana,
      possession_desviacion: team.statistics.possession.desviacion,
      fouls_total: team.statistics.fouls.total,
      fouls_promedio: team.statistics.fouls.promedio,
      fouls_mediana: team.statistics.fouls.mediana,
      fouls_desviacion: team.statistics.fouls.desviacion,
      received_goals_total: team.received.goals.total,
      received_goals_promedio: team.received.goals.promedio,
      received_goals_mediana: team.received.goals.mediana,
      received_goals_desviacion: team.received.goals.desviacion,
      received_offsides_total: team.received.offsides.total,
      received_offsides_promedio: team.received.offsides.promedio,
      received_offsides_mediana: team.received.offsides.mediana,
      received_offsides_desviacion: team.received.offsides.desviacion,
      received_yellowCards_total: team.received.yellowCards.total,
      received_yellowCards_promedio: team.received.yellowCards.promedio,
      received_yellowCards_mediana: team.received.yellowCards.mediana,
      received_yellowCards_desviacion: team.received.yellowCards.desviacion,
   
      received_corners_total: team.received.corners.total,
      received_corners_promedio: team.received.corners.promedio,
      received_corners_mediana: team.received.corners.mediana,
      received_corners_desviacion: team.received.corners.desviacion,
      received_shots_total: team.received.shots.total,
      received_shots_promedio: team.received.shots.promedio,
      received_shots_mediana: team.received.shots.mediana,
      received_shots_desviacion: team.received.shots.desviacion,
      received_shotsOnTarget_total: team.received.shotsOnTarget.total,
      received_shotsOnTarget_promedio: team.received.shotsOnTarget.promedio,
      received_shotsOnTarget_mediana: team.received.shotsOnTarget.mediana,
      received_shotsOnTarget_desviacion: team.received.shotsOnTarget.desviacion,
      received_possession_total: team.received.possession.total,
      received_possession_promedio: team.received.possession.promedio,
      received_possession_mediana: team.received.possession.mediana,
      received_possession_desviacion: team.received.possession.desviacion,
      received_fouls_total: team.received.fouls.total,
      received_fouls_promedio: team.received.fouls.promedio,
      received_fouls_mediana: team.received.fouls.mediana,
      received_fouls_desviacion: team.received.fouls.desviacion,
    }));
  
    // Crear libro de trabajo y hoja de cálculo
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
  
    // Agregar hoja de cálculo al libro de trabajo
    XLSX.utils.book_append_sheet(workbook, worksheet, "Equipos");
  
    // Descargar archivo Excel
    XLSX.writeFile(workbook, "equipos.xlsx");
  };
  
  return (
    <Box>
       <Divider style={{ marginTop: "10px" }} />
      <SelectStatistics stats={stats} visibleStats={visibleStats} handleStatCheckboxChange={handleStatCheckboxChange}/>
      <Divider />
     <AdvancedOptions showAdvancedStats={showAdvancedStats} handleCheckboxChange={handleCheckboxChange}/>
      <Divider style={{ marginBottom: "5px" }} />
      <GroupByName onNamesChange={handleNamesChange} /> {/* Componente GroupByName */}

      <Paper>
        <TableContainer
          sx={{ maxHeight: 640 }}
          component={Paper}
          style={{ overflowX: "auto" }}
        >
          <Table stickyHeader size="small">
            <TableHead>
              <TableRow>
                <TableCell
                  style={{
                    width: "100px",
                    position: "sticky",
                    top: 0,
                    left: 0,
                    backgroundColor: "#fff",
                    zIndex: 2,
                  }}
                >
                  <TableSortLabel
                    active={orderBy === "teamName"}
                    direction={orderBy === "teamName" ? order : "asc"}
                    onClick={() => handleSortRequest("teamName")}
                  >
                    Equipo
                  </TableSortLabel>
                </TableCell>
                {stats.map(
                  (stat) =>
                    visibleStats[stat.key] && (
                      <TableCell
                        key={stat.key}
                        colSpan={
                          2 +
                          (showAdvancedStats.promedio ? 2 : 0) +
                          (showAdvancedStats.mediana ? 2 : 0) +
                          (showAdvancedStats.desviacion ? 2 : 0)
                        }
                        style={{
                          backgroundColor: "#f0f0f0",
                          textAlign: "center",
                          borderRight: "1px solid grey",
                          position: "sticky",
                          top: 0,
                          zIndex: 1,
                        }}
                      >
                        {stat.label}
                      </TableCell>
                    )
                )}
              </TableRow>
              <TableRow>
                <TableCell
                  style={{
                    position: "sticky",
                    top: 40,
                    left: 0,
                    backgroundColor: "#fff",
                    zIndex: 2,
                  }}
                ></TableCell>
                {stats.map(
                  (stat) =>
                    visibleStats[stat.key] && (
                      <React.Fragment key={stat.key}>
                        <TableCell
                          style={{
                            width: "50px",
                            backgroundColor: "#e6f7e6",
                            borderRight: "1px solid grey",
                            position: "sticky",
                            top: 40,
                            zIndex: 1,
                          }}
                        >
                          <TableSortLabel
                            active={orderBy === `statistics.${stat.key}.total`}
                            direction={
                              orderBy === `statistics.${stat.key}.total`
                                ? order
                                : "asc"
                            }
                            onClick={() =>
                              handleSortRequest(`statistics.${stat.key}.total`)
                            }
                          >
                            Propios
                          </TableSortLabel>
                        </TableCell>
                        {showAdvancedStats.promedio && (
                          <TableCell
                            style={{
                              width: "50px",
                              backgroundColor: "#e6f7e6",
                              borderRight: "1px solid grey",
                              position: "sticky",
                              top: 40,
                              zIndex: 1,
                            }}
                          >
                            <TableSortLabel
                              active={
                                orderBy === `statistics.${stat.key}.promedio`
                              }
                              direction={
                                orderBy === `statistics.${stat.key}.promedio`
                                  ? order
                                  : "asc"
                              }
                              onClick={() =>
                                handleSortRequest(
                                  `statistics.${stat.key}.promedio`
                                )
                              }
                            >
                              Promedio
                            </TableSortLabel>
                          </TableCell>
                        )}
                        {showAdvancedStats.mediana && (
                          <TableCell
                            style={{
                              width: "50px",
                              backgroundColor: "#e6f7e6",
                              borderRight: "1px solid grey",
                              position: "sticky",
                              top: 40,
                              zIndex: 1,
                            }}
                          >
                            <TableSortLabel
                              active={
                                orderBy === `statistics.${stat.key}.mediana`
                              }
                              direction={
                                orderBy === `statistics.${stat.key}.mediana`
                                  ? order
                                  : "asc"
                              }
                              onClick={() =>
                                handleSortRequest(
                                  `statistics.${stat.key}.mediana`
                                )
                              }
                            >
                              Mediana
                            </TableSortLabel>
                          </TableCell>
                        )}
                        {showAdvancedStats.desviacion && (
                          <TableCell
                            style={{
                              width: "50px",
                              backgroundColor: "#e6f7e6",
                              borderRight: "1px solid grey",
                              position: "sticky",
                              top: 40,
                              zIndex: 1,
                            }}
                          >
                            <TableSortLabel
                              active={
                                orderBy === `statistics.${stat.key}.desviacion`
                              }
                              direction={
                                orderBy === `statistics.${stat.key}.desviacion`
                                  ? order
                                  : "asc"
                              }
                              onClick={() =>
                                handleSortRequest(
                                  `statistics.${stat.key}.desviacion`
                                )
                              }
                            >
                              Desviación
                            </TableSortLabel>
                          </TableCell>
                        )}
                        <TableCell
                          style={{
                            width: "50px",
                            backgroundColor: "#f7e6e6",
                            borderRight: "1px solid grey",
                            position: "sticky",
                            top: 40,
                            zIndex: 1,
                          }}
                        >
                          <TableSortLabel
                            active={orderBy === `received.${stat.key}.total`}
                            direction={
                              orderBy === `received.${stat.key}.total`
                                ? order
                                : "asc"
                            }
                            onClick={() =>
                              handleSortRequest(`received.${stat.key}.total`)
                            }
                          >
                            Recibidos
                          </TableSortLabel>
                        </TableCell>
                        {showAdvancedStats.promedio && (
                          <TableCell
                            style={{
                              width: "50px",
                              backgroundColor: "#f7e6e6",
                              borderRight: "1px solid grey",
                              position: "sticky",
                              top: 40,
                              zIndex: 1,
                            }}
                          >
                            <TableSortLabel
                              active={
                                orderBy === `received.${stat.key}.promedio`
                              }
                              direction={
                                orderBy === `received.${stat.key}.promedio`
                                  ? order
                                  : "asc"
                              }
                              onClick={() =>
                                handleSortRequest(
                                  `received.${stat.key}.promedio`
                                )
                              }
                            >
                              Promedio
                            </TableSortLabel>
                          </TableCell>
                        )}
                        {showAdvancedStats.mediana && (
                          <TableCell
                            style={{
                              width: "50px",
                              backgroundColor: "#f7e6e6",
                              borderRight: "1px solid grey",
                              position: "sticky",
                              top: 40,
                              zIndex: 1,
                            }}
                          >
                            <TableSortLabel
                              active={
                                orderBy === `received.${stat.key}.mediana`
                              }
                              direction={
                                orderBy === `received.${stat.key}.mediana`
                                  ? order
                                  : "asc"
                              }
                              onClick={() =>
                                handleSortRequest(
                                  `received.${stat.key}.mediana`
                                )
                              }
                            >
                              Mediana
                            </TableSortLabel>
                          </TableCell>
                        )}
                        {showAdvancedStats.desviacion && (
                          <TableCell
                            style={{
                              width: "50px",
                              backgroundColor: "#f7e6e6",
                              borderRight: "1px solid grey",
                              position: "sticky",
                              top: 40,
                              zIndex: 1,
                            }}
                          >
                            <TableSortLabel
                              active={
                                orderBy === `received.${stat.key}.desviacion`
                              }
                              direction={
                                orderBy === `received.${stat.key}.desviacion`
                                  ? order
                                  : "asc"
                              }
                              onClick={() =>
                                handleSortRequest(
                                  `received.${stat.key}.desviacion`
                                )
                              }
                            >
                              Desviación
                            </TableSortLabel>
                          </TableCell>
                        )}
                      </React.Fragment>
                    )
                )}
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredTeams.map((team, rowIndex) => (
                <TableRow key={team.teamId}>
                  <TableCell
                    style={{
                      backgroundColor:
                        rowIndex % 2 === 0 ? "#f0f0f0" : "#ffffff",
                      position: "sticky",
                      left: 0,
                      zIndex: 1,
                    }}
                  >
                    {team.teamName}
                  </TableCell>
                  {stats.map(
                    (stat, index) =>
                      visibleStats[stat.key] && (
                        <React.Fragment key={stat.key}>
                          <TableCell
                            style={{
                              backgroundColor:
                                rowIndex % 2 === 0 ? "#e6f7e6" : "#d0f0d0",
                              borderRight: "1px solid grey",
                            }}
                          >
                            {team.statistics[stat.key]?.total}
                          </TableCell>
                          {showAdvancedStats.promedio && (
                            <TableCell
                              style={{
                                backgroundColor:
                                  rowIndex % 2 === 0 ? "#e6f7e6" : "#d0f0d0",
                                borderRight: "1px solid grey",
                              }}
                            >
                              {team.statistics[stat.key]?.promedio}
                            </TableCell>
                          )}
                          {showAdvancedStats.mediana && (
                            <TableCell
                              style={{
                                backgroundColor:
                                  rowIndex % 2 === 0 ? "#e6f7e6" : "#d0f0d0",
                                borderRight: "1px solid grey",
                              }}
                            >
                              {team.statistics[stat.key]?.mediana}
                            </TableCell>
                          )}
                          {showAdvancedStats.desviacion && (
                            <TableCell
                              style={{
                                backgroundColor:
                                  rowIndex % 2 === 0 ? "#e6f7e6" : "#d0f0d0",
                                borderRight: "1px solid grey",
                              }}
                            >
                              {team.statistics[stat.key]?.desviacion}
                            </TableCell>
                          )}
                          <TableCell
                            style={{
                              backgroundColor:
                                rowIndex % 2 === 0 ? "#f7e6e6" : "#f0d0d0",
                              borderRight: "1px solid grey",
                            }}
                          >
                            {team.received[stat.key]?.total}
                          </TableCell>
                          {showAdvancedStats.promedio && (
                            <TableCell
                              style={{
                                backgroundColor:
                                  rowIndex % 2 === 0 ? "#f7e6e6" : "#f0d0d0",
                                borderRight: "1px solid grey",
                              }}
                            >
                              {team.received[stat.key]?.promedio}
                            </TableCell>
                          )}
                          {showAdvancedStats.mediana && (
                            <TableCell
                              style={{
                                backgroundColor:
                                  rowIndex % 2 === 0 ? "#f7e6e6" : "#f0d0d0",
                                borderRight: "1px solid grey",
                              }}
                            >
                              {team.received[stat.key]?.mediana}
                            </TableCell>
                          )}
                          {showAdvancedStats.desviacion && (
                            <TableCell
                              style={{
                                backgroundColor:
                                  rowIndex % 2 === 0 ? "#f7e6e6" : "#f0d0d0",
                                borderRight: "1px solid grey",
                              }}
                            >
                              {team.received[stat.key]?.desviacion}
                            </TableCell>
                          )}
                        </React.Fragment>
                      )
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <ExportExcelButton onClick={exportToExcel} />
        </Paper>
    </Box>
  );
};
