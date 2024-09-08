import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL_BASE } from "../../stores/url_base";
import { Container, Typography } from "@mui/material";
import { green, red, blue } from "@mui/material/colors";
import { ConsideredMatches } from "./ConsideredMatches";
import { RefereeStatistics } from "./RefereeStatistics";
import { StatisticsOfRefereeTeams } from "./StatisticsOfRefereeTeams";
import { FilterComponent } from "../../componts/tableFilters/FilterComponent";
export const RefereeStatisticsPage = () => {
  const { idReferee } = useParams(); // Obtener el idReferee de los parámetros de la URL
  const [statistics, setStatistics] = useState(null);
  const [matchesLimit, setMatchesLimit] = useState(""); // Estado para la cantidad de partidos

  useEffect(() => {
    // Llamada a la API para obtener las estadísticas del árbitro
    const fetchStatistics = async () => {
      try {
        const response = await axios.get(
          `${BACKEND_URL_BASE}/referees/statistics?limit=${matchesLimit}`,
          {
            params: {
              refereeId: idReferee,
            },
          }
        );
        setStatistics(response.data);
      } catch (error) {
        console.error("Error al obtener las estadísticas del árbitro:", error);
      }
    };

    fetchStatistics();
  }, [idReferee,matchesLimit]);
  const handleMatchesLimitChange = (event) => {
    const value = event.target.value;
    setMatchesLimit(value);
    // Si quieres hacer algo con el valor (e.g., enviarlo al backend), puedes hacerlo aquí
  };
  return (
    <Container>
      <FilterComponent
        matchesLimit={matchesLimit}
        handleMatchesLimitChange={handleMatchesLimitChange}
        />
      <Typography variant="h4" gutterBottom>
        Estadísticas del Árbitro
      </Typography>
      {statistics ? (
        <div>
          <RefereeStatistics statistics={statistics} />
          <StatisticsOfRefereeTeams statistics={statistics} />
          <ConsideredMatches statistics={statistics} />
        </div>
      ) : (
        <Typography>Cargando...</Typography>
      )}
    </Container>
  );
};
