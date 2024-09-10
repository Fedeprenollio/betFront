import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL_BASE } from "../../stores/url_base";
import {
  CircularProgress,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { green, red, blue } from "@mui/material/colors";
import { ConsideredMatches } from "./ConsideredMatches";
import { RefereeStatistics } from "./RefereeStatistics";
import { StatisticsOfRefereeTeams } from "./StatisticsOfRefereeTeams";
import { FilterComponent } from "../../componts/tableFilters/FilterComponent";

export const RefereeStatisticsPage = () => {
  const { idReferee } = useParams(); // Obtener el idReferee de los parámetros de la URL
  const [statistics, setStatistics] = useState(null);
  const [matchesLimit, setMatchesLimit] = useState(""); // Estado para la cantidad de partidos
  const [seasons, setSeasons] = useState([]); // Lista de temporadas
  const [availableSeasons, setAvailableSeasons] = useState([]); // Temporadas disponibles

  const [selectedSeasons, setSelectedSeasons] = useState([]); // Temporadas seleccionadas
  const [loadingSeasons, setLoadingSeasons] = useState(false); // Estado de carga para las temporadas
  useEffect(() => {
    // Llamada a la API para obtener las estadísticas del árbitro
    const fetchStatistics = async () => {
      const season = selectedSeasons.join(",");
      try {
        const response = await axios.get(
          `${BACKEND_URL_BASE}/referees/statistics?limit=${matchesLimit}&season=${season}`,
          {
            params: {
              refereeId: idReferee,
            },
          }
        );
        const stats = response.data;

        setStatistics(stats);
        console.log(" stats.consideredMatches", stats.consideredMatches);
        // Solo actualiza availableSeasons si está vacío
        if (availableSeasons.length === 0 && stats.consideredMatches) {
          const uniqueSeasons = new Set();
          stats.consideredMatches.forEach((match) => {
            if (match.season && match.season.id) {
              uniqueSeasons.add(
                JSON.stringify({
                  seasonId: match.season.id,
                  year: match.season.year,
                  leagueName: match.leagueName, // Asegúrate de que leagueName esté en match
                })
              );
            }
          });
          const seasonsArray = Array.from(uniqueSeasons).map((seasonStr) =>
            JSON.parse(seasonStr)
          );
          setAvailableSeasons(seasonsArray);
        }
      } catch (error) {
        console.error("Error al obtener las estadísticas del árbitro:", error);
      }
    };

    fetchStatistics();
  }, [idReferee, matchesLimit, selectedSeasons]);
  const handleMatchesLimitChange = (event) => {
    const value = event.target.value;
    setMatchesLimit(value);
    // Si quieres hacer algo con el valor (e.g., enviarlo al backend), puedes hacerlo aquí
  };
  const handleSeasonChange = (event) => {
    setSelectedSeasons(event.target.value); // Actualizar las temporadas seleccionadas
  };
  console.log("SelectedSeasons", selectedSeasons);

  return (
    <Container>
      <FilterComponent
        filterName="filter-referee"
        matchesLimit={matchesLimit}
        handleMatchesLimitChange={handleMatchesLimitChange}
        availableSeasons={availableSeasons}
        handleSeasonChange={handleSeasonChange}
        selectedSeasons={selectedSeasons}
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
