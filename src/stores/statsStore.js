import { BACKEND_URL_BASE } from "./url_base";
import axios from "axios";
const URL_API = `${BACKEND_URL_BASE}/match/statsAc`;
const URL_API_STATS_SEASON = `${BACKEND_URL_BASE}/match/team-stats`;


// Definir el store
const createTeamStatsStore = (set) => ({
  homeStatYellowCard: {},
  homeStatCorners: {},
  homeStatGoals: {},
  homeStatShots: {},
  homeStatShotsOnTarget: {},
  homeStatPossession: {},
  homeStatFouls: {},
  homeStatOffsides: {},

  awayStatYellowCard: {},
  awayStatCorners: {},
  awayStatGoals: {},
  awayStatShots: {},
  awayStatShotsOnTarget: {},
  awayStatPossession: {},
  awayStatFouls: {},
  awayStatOffsides: {},

  homeTeam: "",
  awayTeam: "",
  localMatches: [],
  visitorMatches: [],
  teamStatsForSeason: [],
  statsLessThan: false, // Valor inicial para statsLessThan
  setStatsLessThan: (newValue) => set({ statsLessThan: newValue }), // Función para actualizar statsLessThan
 
  setHomeStatYellowCard: async ({
    idHomeTeam,
    homeMatchesLocalTeam,
    visitingmathgesLocalTeam,
    statsLessThan,numberOfMatches,
    currentSeason,
    position
  }) => {
    console.log("QUE LLEGA?", idHomeTeam,
    homeMatchesLocalTeam,
    visitingmathgesLocalTeam,
    statsLessThan,numberOfMatches,
    currentSeason,
    position)
    const data = await fetch(
      `${URL_API}/${idHomeTeam}?statistic=yellowCards&lowerLimit=0.5&upperLimit=12.5&matchesCount=${numberOfMatches}&homeOnly=${homeMatchesLocalTeam}&awayOnly=${visitingmathgesLocalTeam}&lessThan=${statsLessThan}&currentSeason=${currentSeason}&position=${position}`
    );

    const homeYc = await data.json();
    set({ homeStatYellowCard: homeYc });
    set({ localMatches: homeYc?.matches });
  },
  setAwayStatYellowCard: async ({
    idAwayTeam,
    homeMateshAwayTeam,
    visitingMatchesAwayTeam,
    statsLessThan,
    numberOfMatches,
    currentSeason,
    position
  }) => {
    const data = await fetch(
      `${URL_API}/${idAwayTeam}?statistic=yellowCards&lowerLimit=0.5&upperLimit=12.5&matchesCount=${numberOfMatches}&homeOnly=${homeMateshAwayTeam}&awayOnly=${visitingMatchesAwayTeam}&lessThan=${statsLessThan}&currentSeason=${currentSeason}&position=${position}`
    );
    const awayYc = await data.json();

    set({ awayStatYellowCard: awayYc });
  },
  setHomeStatGoals: async ({
    idHomeTeam,
    homeMatchesLocalTeam,
    visitingmathgesLocalTeam,
    statsLessThan,numberOfMatches,
    currentSeason,
    position
  }) => {
    const data = await fetch(
      `${URL_API}/${idHomeTeam}?statistic=goals&lowerLimit=0.5&upperLimit=12.5&matchesCount=${numberOfMatches}&homeOnly=${homeMatchesLocalTeam}&awayOnly=${visitingmathgesLocalTeam}&lessThan=${statsLessThan}&currentSeason=${currentSeason}&position=${position}`
    );
    const info = await data.json();
    console.log("STATS GOLES LOCAL", info)
    set({ homeStatGoals: info.goals });
  },

  setHomeStatCorners: async ({
    idHomeTeam,
    homeMatchesLocalTeam,
    visitingmathgesLocalTeam,
    statsLessThan,numberOfMatches,
    currentSeason,
    position
  }) => {
    const data = await fetch(
      `${URL_API}/${idHomeTeam}?statistic=corners&lowerLimit=0.5&upperLimit=12.5&matchesCount=${numberOfMatches}&homeOnly=${homeMatchesLocalTeam}&awayOnly=${visitingmathgesLocalTeam}&lessThan=${statsLessThan}&currentSeason=${currentSeason}&position=${position}`
    );
    const homeCorners = await data.json();
    set({ homeStatCorners: homeCorners.corners });
  },
  setAwayStatCorners: async ({
    idAwayTeam,
    homeMateshAwayTeam,
    visitingMatchesAwayTeam,
    statsLessThan,numberOfMatches,
    currentSeason,
    position
  }) => {
    const data = await fetch(
      `${URL_API}/${idAwayTeam}?statistic=corners&lowerLimit=0.5&upperLimit=12.5&matchesCount=${numberOfMatches}&homeOnly=${homeMateshAwayTeam}&awayOnly=${visitingMatchesAwayTeam}&lessThan=${statsLessThan}&currentSeason=${currentSeason}&position=${position}`
    );
    const awayCorners = await data.json();

    set({ awayStatCorners: awayCorners.corners });
    set({ visitorMatches: awayCorners?.matches });
  },
  setAwayStatGoals: async ({
    idAwayTeam,
    homeMateshAwayTeam,
    visitingMatchesAwayTeam,
    statsLessThan,numberOfMatches,
    currentSeason,
    position
  }) => {
    const data = await fetch(
      `${URL_API}/${idAwayTeam}?statistic=goals&lowerLimit=0.5&upperLimit=12.5&matchesCount=${numberOfMatches}&homeOnly=${homeMateshAwayTeam}&awayOnly=${visitingMatchesAwayTeam}&lessThan=${statsLessThan}&currentSeason=${currentSeason}&position=${position}`
    );
    const awayGoals = await data.json();
    console.log("STATS GOLES VISI", awayGoals)

    set({ awayStatGoals: awayGoals.goals });
  },


  setHomeStatShots: async ({
    idHomeTeam,
    homeMatchesLocalTeam,
    visitingmathgesLocalTeam,
    statsLessThan,numberOfMatches,
    currentSeason,
    position
  }) => {
    // Llamada a la API para obtener estadísticas de tiros del equipo local
    const data = await fetch(
      `${URL_API}/${idHomeTeam}?statistic=shots&lowerLimit=0.5&upperLimit=22.5&matchesCount=${numberOfMatches}&homeOnly=${homeMatchesLocalTeam}&awayOnly=${visitingmathgesLocalTeam}&lessThan=${statsLessThan}&currentSeason=${currentSeason}&position=${position}`
    );
    const homeShots = await data.json();
console.log("STATS", homeShots)
    set({ homeStatShots: homeShots.shots });
  },

  setHomeStatShotsOnTarget: async ({
    idHomeTeam,
    homeMatchesLocalTeam,
    visitingmathgesLocalTeam,
    statsLessThan,numberOfMatches,
    currentSeason,
    position
  }) => {
    // Llamada a la API para obtener estadísticas de tiros al arco del equipo local
    const data = await fetch(
      `${URL_API}/${idHomeTeam}?statistic=shotsOnTarget&lowerLimit=0.5&upperLimit=22.5&matchesCount=${numberOfMatches}&homeOnly=${homeMatchesLocalTeam}&awayOnly=${visitingmathgesLocalTeam}&lessThan=${statsLessThan}&currentSeason=${currentSeason}&position=${position}`
    );
    const stats = await data.json();
    

    set({ homeStatShotsOnTarget: stats.shotsOnTarget });
  },

  setHomeStatPossession: async ({
    idHomeTeam,
    homeMatchesLocalTeam,
    visitingmathgesLocalTeam,
    statsLessThan,numberOfMatches,
    currentSeason,
    position
  }) => {
    // Llamada a la API para obtener estadísticas de posesión del equipo local
    const data = await fetch(
      `${URL_API}/${idHomeTeam}?statistic=possession&lowerLimit=30.5&upperLimit=85.5&matchesCount=${numberOfMatches}&homeOnly=${homeMatchesLocalTeam}&awayOnly=${visitingmathgesLocalTeam}&lessThan=${statsLessThan}&currentSeason=${currentSeason}&position=${position}`
    );
    const stats = await data.json();

    set({ homeStatPossession: stats.possession });
  },

  setHomeStatFouls: async ({
    idHomeTeam,
    homeMatchesLocalTeam,
    visitingmathgesLocalTeam,
    statsLessThan,numberOfMatches,
    currentSeason,
    position
  }) => {
    // Llamada a la API para obtener estadísticas de faltas del equipo local
    const data = await fetch(
      `${URL_API}/${idHomeTeam}?statistic=foults&lowerLimit=0.5&upperLimit=20.5&matchesCount=${numberOfMatches}&homeOnly=${homeMatchesLocalTeam}&awayOnly=${visitingmathgesLocalTeam}&lessThan=${statsLessThan}&currentSeason=${currentSeason}&position=${position}`
    );
    const stats = await data.json();

    set({ homeStatFouls: stats.foults });
  },

  setHomeStatOffsides: async ({
    idHomeTeam,
    homeMatchesLocalTeam,
    visitingmathgesLocalTeam,
    statsLessThan,numberOfMatches,
    currentSeason,
    position
  }) => {
    // Llamada a la API para obtener estadísticas de offsides del equipo local
    const data = await fetch(
      `${URL_API}/${idHomeTeam}?statistic=offsides&lowerLimit=0.5&upperLimit=20.5&matchesCount=${numberOfMatches}&homeOnly=${homeMatchesLocalTeam}&awayOnly=${visitingmathgesLocalTeam}&lessThan=${statsLessThan}&currentSeason=${currentSeason}&position=${position}`
    );
    const stats = await data.json();

    set({ homeStatOffsides: stats.offsides });
  },

  setAwayStatShots: async ({
    idAwayTeam,
    homeMateshAwayTeam,
    visitingMatchesAwayTeam,
    statsLessThan,numberOfMatches,
    currentSeason,
    position
  }) => {
    // Llamada a la API para obtener estadísticas de tiros del equipo vivistante
    const data = await fetch(
      `${URL_API}/${idAwayTeam}?statistic=shots&lowerLimit=0.5&upperLimit=22.5&matchesCount=${numberOfMatches}&homeOnly=${homeMateshAwayTeam}&awayOnly=${visitingMatchesAwayTeam}&lessThan=${statsLessThan}&currentSeason=${currentSeason}&position=${position}`
    );
    const stats = await data.json();

    set({ awayStatShots: stats.shots });
  },

  setAwayStatShotsOnTarget: async ({
    idAwayTeam,
    homeMateshAwayTeam,
    visitingMatchesAwayTeam,
    statsLessThan,numberOfMatches,
    currentSeason,
    position
  }) => {
    // Llamada a la API para obtener estadísticas de tiros al arco del equipo local
    const data = await fetch(
      `${URL_API}/${idAwayTeam}?statistic=shotsOnTarget&lowerLimit=0.5&upperLimit=22.5&matchesCount=${numberOfMatches}&homeOnly=${homeMateshAwayTeam}&awayOnly=${visitingMatchesAwayTeam}&lessThan=${statsLessThan}&currentSeason=${currentSeason}&position=${position}`
    );
    const stats = await data.json();

    set({ awayStatShotsOnTarget: stats.shotsOnTarget });
  },

  setAwayStatPossession: async ({
    idAwayTeam,
    homeMateshAwayTeam,
    visitingMatchesAwayTeam,
    statsLessThan,numberOfMatches,
    currentSeason,
    position
  }) => {
    // Llamada a la API para obtener estadísticas de posesión del equipo local
    const data = await fetch(
      `${URL_API}/${idAwayTeam}?statistic=possession&lowerLimit=30.5&upperLimit=85.5&matchesCount=${numberOfMatches}&homeOnly=${homeMateshAwayTeam}&awayOnly=${visitingMatchesAwayTeam}&lessThan=${statsLessThan}&currentSeason=${currentSeason}&position=${position}`
    );
    const stats = await data.json();

    set({ awayStatPossession: stats.possession });
  },

  setAwayStatFouls: async ({
    idAwayTeam,
    homeMateshAwayTeam,
    visitingMatchesAwayTeam,
    statsLessThan,numberOfMatches,
    currentSeason,
    position
  }) => {
    // Llamada a la API para obtener estadísticas de faltas del equipo local
    const data = await fetch(
      `${URL_API}/${idAwayTeam}?statistic=foults&lowerLimit=0.5&upperLimit=20.5&matchesCount=${numberOfMatches}&homeOnly=${homeMateshAwayTeam}&awayOnly=${visitingMatchesAwayTeam}&lessThan=${statsLessThan}&currentSeason=${currentSeason}&position=${position}`
    );
    const stats = await data.json();

    set({ awayStatFouls: stats.foults });
  },

  setAwayStatOffsides: async ({
    idAwayTeam,
    homeMateshAwayTeam,
    visitingMatchesAwayTeam,
    statsLessThan,numberOfMatches,
    currentSeason,
    position
  }) => {
    // Llamada a la API para obtener estadísticas de offsides del equipo local
    const data = await fetch(
      `${URL_API}/${idAwayTeam}?statistic=offsides&lowerLimit=0.5&upperLimit=20.5&matchesCount=${numberOfMatches}&homeOnly=${homeMateshAwayTeam}&awayOnly=${visitingMatchesAwayTeam}&lessThan=${statsLessThan}&currentSeason=${currentSeason}&position=${position}`
    );
    const stats = await data.json();

    set({ awayStatOffsides: stats.offsides });
  },


  
  getTeamStatsForSeason: async ({ seasonId }) => {
    const response = await axios(`${URL_API_STATS_SEASON}/${seasonId}`);
    console.log("RESPONSE", response)
    const teamStats = response.data

    set({ teamStatsForSeason: teamStats });
  },
});

export default createTeamStatsStore;
// setHomeStatCorners
