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
  Checkbox,
  FormControlLabel,
  Box,
} from "@mui/material";

export const TableAllTeamSeason = () => {
  const { seasonId } = useParams();
  const { getTeamStatsForSeason, teamStatsForSeason } = useBoundStore(
    (state) => state
  );

  useEffect(() => {
    getTeamStatsForSeason({ seasonId });
  }, [seasonId, getTeamStatsForSeason]);

  const [orderBy, setOrderBy] = useState("teamName");
  const [order, setOrder] = useState("asc");
  const [showAdvancedStats, setShowAdvancedStats] = useState({
    promedio: false,
    mediana: false,
    desviacion: false,
  });

  const handleSortRequest = (property) => {
    let newOrderBy = property;
    let newOrder = "desc";

    if (orderBy === property && order === "desc") {
      newOrder = "asc";
    }

    switch (property) {
      case "teamName":
        // Ordenar por nombre del equipo
        newOrderBy = "teamName";
        break;
      case "goals":
      case "offsides":
      case "yellowCards":
      case "corners":
      case "shots":
      case "shotsOnTarget":
      case "possession":
      case "fouls":
        // Ordenar por estadísticas individuales
        newOrderBy = `statistics.${property}.total`;
        break;
      default:
        break;
    }

    setOrder(newOrder);
    setOrderBy(newOrderBy);
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

  const renderAdvancedStats = (team, statKey, index, rowIndex) => {
    const { promedio, mediana, desviacion } = team.statistics[statKey];
    const {
      promedio: receivedPromedio,
      mediana: receivedMediana,
      desviacion: receivedDesviacion,
    } = team.received[statKey];
    const backgroundColor = rowIndex % 2 === 0 ? "#f0f0f0" : "#ffffff";
    const borderStyle = { borderRight: "1px solid grey" };

    return (
      <>
        {showAdvancedStats.promedio && (
          <>
            <TableCell
              style={{ width: "50px", backgroundColor, ...borderStyle }}
            >
              {promedio}
            </TableCell>
            <TableCell
              style={{ width: "50px", backgroundColor, ...borderStyle }}
            >
              {receivedPromedio}
            </TableCell>
          </>
        )}
        {showAdvancedStats.mediana && (
          <>
            <TableCell
              style={{ width: "50px", backgroundColor, ...borderStyle }}
            >
              {mediana}
            </TableCell>
            <TableCell
              style={{ width: "50px", backgroundColor, ...borderStyle }}
            >
              {receivedMediana}
            </TableCell>
          </>
        )}
        {showAdvancedStats.desviacion && (
          <>
            <TableCell
              style={{ width: "50px", backgroundColor, ...borderStyle }}
            >
              {desviacion}
            </TableCell>
            <TableCell
              style={{ width: "50px", backgroundColor, ...borderStyle }}
            >
              {receivedDesviacion}
            </TableCell>
          </>
        )}
      </>
    );
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-around" mb={2}>
        <FormControlLabel
          control={
            <Checkbox
              checked={showAdvancedStats.promedio}
              onChange={() => handleCheckboxChange("promedio")}
            />
          }
          label="Promedio"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={showAdvancedStats.mediana}
              onChange={() => handleCheckboxChange("mediana")}
            />
          }
          label="Mediana"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={showAdvancedStats.desviacion}
              onChange={() => handleCheckboxChange("desviacion")}
            />
          }
          label="Desviación Estándar"
        />
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ width: "100px" }}>
                <TableSortLabel
                  active={orderBy === "teamName"}
                  direction={orderBy === "teamName" ? order : "asc"}
                  onClick={() => handleSortRequest("teamName")}
                >
                  Equipo
                </TableSortLabel>
              </TableCell>
              {stats.map((stat) => (
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
                  }}
                >
                  <TableSortLabel
                    active={orderBy === `statistics.${stat.key}.total`}
                    direction={
                      orderBy === `statistics.${stat.key}.total` ? order : "asc"
                    }
                    onClick={() =>
                      handleSortRequest(`statistics.${stat.key}.total`)
                    }
                  >
                    {stat.label}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell></TableCell>
              {stats.map((stat, index) => (
                <React.Fragment key={stat.key}>
                  <TableCell
                    style={{ width: "50px", borderRight: "1px solid grey" }}
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
                  <TableCell
                    style={{ width: "50px", borderRight: "1px solid grey" }}
                  >
                    <TableSortLabel
                      active={orderBy === `received.${stat.key}.total`}
                      direction={
                        orderBy === `received.${stat.key}.total` ? order : "asc"
                      }
                      onClick={() =>
                        handleSortRequest(`received.${stat.key}.total`)
                      }
                    >
                      Recibidos
                    </TableSortLabel>
                  </TableCell>
                  {showAdvancedStats.promedio && (
                    <>
                      <TableCell
                        style={{ width: "50px", borderRight: "1px solid grey" }}
                      >
                        <TableSortLabel
                          active={orderBy === `statistics.${stat.key}.promedio`}
                          direction={
                            orderBy === `statistics.${stat.key}.promedio`
                              ? order
                              : "asc"
                          }
                          onClick={() =>
                            handleSortRequest(`statistics.${stat.key}.promedio`)
                          }
                        >
                          Promedio
                        </TableSortLabel>
                      </TableCell>
                      <TableCell
                        style={{ width: "50px", borderRight: "1px solid grey" }}
                      >
                        <TableSortLabel
                          active={orderBy === `received.${stat.key}.promedio`}
                          direction={
                            orderBy === `received.${stat.key}.promedio`
                              ? order
                              : "asc"
                          }
                          onClick={() =>
                            handleSortRequest(`received.${stat.key}.promedio`)
                          }
                        >
                          Promedio Rec.
                        </TableSortLabel>
                      </TableCell>
                    </>
                  )}
                  {showAdvancedStats.mediana && (
                    <>
                      <TableCell
                        style={{ width: "50px", borderRight: "1px solid grey" }}
                      >
                        <TableSortLabel
                          active={orderBy === `statistics.${stat.key}.mediana`}
                          direction={
                            orderBy === `statistics.${stat.key}.mediana`
                              ? order
                              : "asc"
                          }
                          onClick={() =>
                            handleSortRequest(`statistics.${stat.key}.mediana`)
                          }
                        >
                          Mediana
                        </TableSortLabel>
                      </TableCell>
                      <TableCell
                        style={{ width: "50px", borderRight: "1px solid grey" }}
                      >
                        <TableSortLabel
                          active={orderBy === `received.${stat.key}.mediana`}
                          direction={
                            orderBy === `received.${stat.key}.mediana`
                              ? order
                              : "asc"
                          }
                          onClick={() =>
                            handleSortRequest(`received.${stat.key}.mediana`)
                          }
                        >
                          Mediana Rec.
                        </TableSortLabel>
                      </TableCell>
                    </>
                  )}
                  {showAdvancedStats.desviacion && (
                    <>
                      <TableCell
                        style={{ width: "50px", borderRight: "1px solid grey" }}
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
                      <TableCell
                        style={{ width: "50px", borderRight: "1px solid grey" }}
                      >
                        <TableSortLabel
                          active={orderBy === `received.${stat.key}.desviacion`}
                          direction={
                            orderBy === `received.${stat.key}.desviacion`
                              ? order
                              : "asc"
                          }
                          onClick={() =>
                            handleSortRequest(`received.${stat.key}.desviacion`)
                          }
                        >
                          Desviación Rec.
                        </TableSortLabel>
                      </TableCell>
                    </>
                  )}
                </React.Fragment>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {teamStatsForSeason.map((team, rowIndex) => (
              <TableRow key={team.teamId}>
                <TableCell
                  style={{
                    backgroundColor: rowIndex % 2 === 0 ? "#f0f0f0" : "#ffffff",
                  }}
                >
                  {team.teamName}
                </TableCell>
                {stats.map((stat, index) => (
                  <React.Fragment key={stat.key}>
                    <TableCell
                      style={{
                        backgroundColor:
                          rowIndex % 2 === 0 ? "#f0f0f0" : "#ffffff",
                        borderRight: "1px solid grey",
                      }}
                    >
                      {team.statistics[stat.key]?.total}
                    </TableCell>
                    {showAdvancedStats.promedio && (
                      <>
                        <TableCell
                          style={{
                            backgroundColor:
                              rowIndex % 2 === 0 ? "#f0f0f0" : "#ffffff",
                            borderRight: "1px solid grey",
                          }}
                        >
                          {team.statistics[stat.key]?.promedio}
                        </TableCell>
                      </>
                    )}
                    <TableCell
                      style={{
                        backgroundColor:
                          rowIndex % 2 === 0 ? "#f0f0f0" : "#ffffff",
                        borderRight: "1px solid grey",
                      }}
                    >
                      {team.received[stat.key]?.total}
                    </TableCell>
                    {showAdvancedStats.promedio && (
                      <>
                        <TableCell
                          style={{
                            backgroundColor:
                              rowIndex % 2 === 0 ? "#f0f0f0" : "#ffffff",
                            borderRight: "1px solid grey",
                          }}
                        >
                          {team.received[stat.key]?.promedio}
                        </TableCell>
                      </>
                    )}
                    {showAdvancedStats.mediana && (
                      <>
                        <TableCell
                          style={{
                            backgroundColor:
                              rowIndex % 2 === 0 ? "#f0f0f0" : "#ffffff",
                            borderRight: "1px solid grey",
                          }}
                        >
                          {team.statistics[stat.key]?.mediana}
                        </TableCell>
                        <TableCell
                          style={{
                            backgroundColor:
                              rowIndex % 2 === 0 ? "#f0f0f0" : "#ffffff",
                            borderRight: "1px solid grey",
                          }}
                        >
                          {team.received[stat.key]?.mediana}
                        </TableCell>
                      </>
                    )}
                    {showAdvancedStats.desviacion && (
                      <>
                        <TableCell
                          style={{
                            backgroundColor:
                              rowIndex % 2 === 0 ? "#f0f0f0" : "#ffffff",
                            borderRight: "1px solid grey",
                          }}
                        >
                          {team.statistics[stat.key]?.desviacion}
                        </TableCell>
                        <TableCell
                          style={{
                            backgroundColor:
                              rowIndex % 2 === 0 ? "#f0f0f0" : "#ffffff",
                            borderRight: "1px solid grey",
                          }}
                        >
                          {team.received[stat.key]?.desviacion}
                        </TableCell>
                      </>
                    )}
                  </React.Fragment>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
