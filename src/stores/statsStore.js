import create from "zustand";

// Definir el store
const useTeamStatsStore = create((set) => ({
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
      `http://localhost:1234/match/statsAc/${idHomeTeam}?statistic=yellowCards&lowerLimit=0.5&upperLimit=12.5&matchesCount=10&homeOnly=${homeMatchesLocalTeam}&awayOnly=${visitingmathgesLocalTeam}&lessThan=${statsLessThan}`
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
      `http://localhost:1234/match/statsAc/${idAwayTeam}?statistic=yellowCards&lowerLimit=0.5&upperLimit=12.5&matchesCount=10&homeOnly=${homeMateshAwayTeam}&awayOnly=${visitingMatchesAwayTeam}&lessThan=${statsLessThan}`    );
    const awayYc = await data.json();
    console.log("QUE HABRA", awayYc);

    set({ awayStatYellowCard: awayYc });
  },
  setHomeStatGoals: async ({
    idHomeTeam,
    homeMatchesLocalTeam,
    visitingmathgesLocalTeam,
    statsLessThan,
  }) => {
    const data = await fetch(
      `http://localhost:1234/match/statsAc/${idHomeTeam}?statistic=goals&lowerLimit=0.5&upperLimit=12.5&matchesCount=10&homeOnly=${homeMatchesLocalTeam}&awayOnly=${visitingmathgesLocalTeam}&lessThan=${statsLessThan}`
    );
    const info = await data.json();
    console.log(info)
    set({ homeStatGoals: info.goals });
  },

  setHomeStatCorners: async ({
    idHomeTeam,
    homeMatchesLocalTeam,
    visitingmathgesLocalTeam,
    statsLessThan,
  }) => {
    const data = await fetch(
      `http://localhost:1234/match/statsAc/${idHomeTeam}?statistic=corners&lowerLimit=0.5&upperLimit=12.5&matchesCount=10&homeOnly=${homeMatchesLocalTeam}&awayOnly=${visitingmathgesLocalTeam}&lessThan=${statsLessThan}`
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
      `http://localhost:1234/match/statsAc/${idAwayTeam}?statistic=corners&lowerLimit=0.5&upperLimit=12.5&matchesCount=10&homeOnly=${homeMateshAwayTeam}&awayOnly=${visitingMatchesAwayTeam}&lessThan=${statsLessThan}`
    );
    const awayCorners = await data.json();
    console.log("QUE HABRA", awayCorners.corners);

    set({ awayStatCorners: awayCorners.corners });
  },
  setAwayStatGoals: async ({
    idAwayTeam,
    homeMateshAwayTeam,
    visitingMatchesAwayTeam,
    statsLessThan,
  }) => {
    const data = await fetch(
      `http://localhost:1234/match/statsAc/${idAwayTeam}?statistic=goals&lowerLimit=0.5&upperLimit=5.5&matchesCount=10&homeOnly=${homeMateshAwayTeam}&awayOnly=${visitingMatchesAwayTeam}&lessThan=${statsLessThan}`
    );
    const awayGoals = await data.json();
    console.log("QUE HABRA", awayGoals);

    set({ awayStatGoals: awayGoals.goals });
  },
}));

export default useTeamStatsStore;
// setHomeStatCorners
