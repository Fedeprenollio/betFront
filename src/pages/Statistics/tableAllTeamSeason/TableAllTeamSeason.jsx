/* eslint-disable react/prop-types */
import React, { useState } from "react";

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
} from "@mui/material";
import { GroupByName } from "../rangePercentageTable/GroupByName";
import ExportExcelButton from "../../../componts/exportToExcel/ExportExcelButton";
import { FilterComponentModal } from "./FilterComponentModal";
import HelpIconWithModal from "../../../componts/helpIconWithModal/HelpIconWithModal";
import { exportToExcel } from "./exportToExcel";
import { tableHelpContent } from "./TableHelpContent";
import LoadingSpinner from "../../../componts/loading/LoadingSpinner";

export const TableAllTeamSeason = ({
  homeOnly,
  awayOnly,
  setAwayOnlySecondTeamComparative,
  setHomeOnlySecondTeamComparative,
  setSelectedTeams,
  selectedTeams,
  listTeams,
  setListTeams,
  loadingStats
}) => {
  const [orderBy, setOrderBy] = useState("teamName");
  const [order, setOrder] = useState("asc");
  const [showAdvancedStats, setShowAdvancedStats] = useState({
    promedio: false,
    mediana: true,
    desviacion: false,
  });

  const [visibleStats, setVisibleStats] = useState({
    goals: true,
    offsides: false,
    yellowCards: false,
    corners: false,
    shots: true,
    shotsOnTarget: true,
    possession: false,
    foults: false,
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
    { key: "foults", label: "Faltas" },
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
  const filteredTeams =
    selectedTeams?.length > 0
      ? listTeams.filter((team) => selectedTeams.includes(team.teamName))
      : listTeams;

  console.log("filteredTeams", selectedTeams, filteredTeams);
  // const handleHomeOnlyChange = (event) => {
  //   setHomeOnly(event.target.checked);
  // };

  // const handleAwayOnlyChange = (event) => {
  //   setAwayOnly(event.target.checked);
  // };

  const handleHomeOnlyChangeSecondTeam = (event) => {
    setHomeOnlySecondTeamComparative(event.target.checked);
  };

  const handleAwayOnlyChangeSecondTeam = (event) => {
    setAwayOnlySecondTeamComparative(event.target.checked);
  };
console.log("loadingStats",loadingStats)
  return (
    <Box>
      {/* <Divider style={{ marginTop: "10px" }} />
      <SelectStatistics stats={stats} visibleStats={visibleStats} handleStatCheckboxChange={handleStatCheckboxChange}/>
      <Divider />
     <AdvancedOptions showAdvancedStats={showAdvancedStats} handleCheckboxChange={handleCheckboxChange}/>
      <Divider style={{ marginBottom: "5px" }} />
       */}
      <FilterComponentModal
        stats={stats}
        visibleStats={visibleStats}
        handleStatCheckboxChange={handleStatCheckboxChange}
        showAdvancedStats={showAdvancedStats}
        handleCheckboxChange={handleCheckboxChange}
        homeOnly={homeOnly}
        awayOnly={awayOnly}
        // handleHomeOnlyChange={handleHomeOnlyChange}
        // handleAwayOnlyChange={handleAwayOnlyChange}
      />
      <GroupByName onNamesChange={handleNamesChange} />{" "}
      {/* Componente GroupByName */}
      <HelpIconWithModal
        title="Ayuda sobre la tabla"
        content={tableHelpContent}
      />
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
                  {/* <TableSortLabel
                    active={orderBy === "teamName"}
                    direction={orderBy === "teamName" ? order : "asc"}
                    onClick={() => handleSortRequest("teamCountry")}
                  > */}
                  País
                  {/* </TableSortLabel> */}
                </TableCell>
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
              {loadingStats ?  <LoadingSpinner/>: null}
              {filteredTeams?.map((team, rowIndex) => (
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
                    {team.country}
                  </TableCell>
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
        <ExportExcelButton onClick={() => exportToExcel(filteredTeams)} />
      </Paper>
    </Box>
  );
};
