import { BACKEND_URL_BASE } from "./url_base";

const URL_API = `${BACKEND_URL_BASE}/match/statsAc`


// Definir el store
const createTeamStatsStore = ((set) => ({
  homeStatYellowCard: {},
  homeStatCorners: {},
  homeStatGoals: {},
  awayStatYellowCard: {},
  awayStatCorners: {},
  awayStatGoals: {},
  homeTeam: "",
  awayTeam:"",
  statsLessThan: false, // Valor inicial para statsLessThan
  setStatsLessThan: (newValue) => set({ statsLessThan: newValue }), // Función para actualizar statsLessThan

  setHomeStatYellowCard: async ({
    idHomeTeam,
    homeMatchesLocalTeam,
    visitingmathgesLocalTeam,
    statsLessThan,
  }) => {
    const data = await fetch(
      `${URL_API}/${idHomeTeam}?statistic=yellowCards&lowerLimit=0.5&upperLimit=12.5&matchesCount=10&homeOnly=${homeMatchesLocalTeam}&awayOnly=${visitingmathgesLocalTeam}&lessThan=${statsLessThan}`
    );

    const homeYc = await data.json();

    set({ homeStatYellowCard: homeYc  });
  },
  setAwayStatYellowCard: async ({
    idAwayTeam,
    homeMateshAwayTeam,
    visitingMatchesAwayTeam,
    statsLessThan,
  }) => {
    const data = await fetch(
      `${URL_API}/${idAwayTeam}?statistic=yellowCards&lowerLimit=0.5&upperLimit=12.5&matchesCount=10&homeOnly=${homeMateshAwayTeam}&awayOnly=${visitingMatchesAwayTeam}&lessThan=${statsLessThan}`    );
    const awayYc = await data.json();

    set({ awayStatYellowCard: awayYc });
  },
  setHomeStatGoals: async ({
    idHomeTeam,
    homeMatchesLocalTeam,
    visitingmathgesLocalTeam,
    statsLessThan,
  }) => {
    const data = await fetch(
      `${URL_API}/${idHomeTeam}?statistic=goals&lowerLimit=0.5&upperLimit=12.5&matchesCount=10&homeOnly=${homeMatchesLocalTeam}&awayOnly=${visitingmathgesLocalTeam}&lessThan=${statsLessThan}`
    );
    const info = await data.json();
    set({ homeStatGoals: info.goals });
  },

  setHomeStatCorners: async ({
    idHomeTeam,
    homeMatchesLocalTeam,
    visitingmathgesLocalTeam,
    statsLessThan,
  }) => {
    const data = await fetch(
      `${URL_API}/${idHomeTeam}?statistic=corners&lowerLimit=0.5&upperLimit=12.5&matchesCount=10&homeOnly=${homeMatchesLocalTeam}&awayOnly=${visitingmathgesLocalTeam}&lessThan=${statsLessThan}`
    );
    const homeCorners = await data.json();
    set({ homeStatCorners: homeCorners.corners });
  },
  setAwayStatCorners: async ({
    idAwayTeam,
    homeMateshAwayTeam,
    visitingMatchesAwayTeam,
    statsLessThan,
  }) => {
    const data = await fetch(
      `${URL_API}/${idAwayTeam}?statistic=corners&lowerLimit=0.5&upperLimit=12.5&matchesCount=10&homeOnly=${homeMateshAwayTeam}&awayOnly=${visitingMatchesAwayTeam}&lessThan=${statsLessThan}`
    );
    const awayCorners = await data.json();

    set({ awayStatCorners: awayCorners.corners });
  },
  setAwayStatGoals: async ({
    idAwayTeam,
    homeMateshAwayTeam,
    visitingMatchesAwayTeam,
    statsLessThan,
  }) => {
    const data = await fetch(
      `${URL_API}/${idAwayTeam}?statistic=goals&lowerLimit=0.5&upperLimit=12.5&matchesCount=10&homeOnly=${homeMateshAwayTeam}&awayOnly=${visitingMatchesAwayTeam}&lessThan=${statsLessThan}`
    );
    const awayGoals = await data.json();

    set({ awayStatGoals: awayGoals.goals });
  },
}));

export default createTeamStatsStore;
// setHomeStatCorners
