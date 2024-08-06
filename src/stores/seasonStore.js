import axios from "axios";
import { BACKEND_URL_BASE } from "./url_base";

// const URL_API = "http://localhost:1234/season"
const URL_API = `${BACKEND_URL_BASE}/season`;

// Definir el store para manejar las temporadas
const createSeasonStore = (set) => ({
  seasons: [],
  seasonById: {},
  loading: false,
  error: null,
  matchesByRound:[],
  allCurrentSeasons:[],
  listAllCurrentSeason:"",

  // Función para cargar las temporadas desde el servidor
  fetchSeasons: async () => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`${URL_API}`);
      // if (!response.ok) {
      //   throw new Error("Failed to fetch seasons");
      // }
      const seasons = await response.json();
      set({ seasons, loading: false });
      return seasons
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
  //Función para cargar una temporada por id
  getSeasonById: async (seasonId) => {
    try {
      const response = await fetch(URL_API + "/" + seasonId);
      // if (!response.ok) {
      //   throw new Error('Failed to fetch seasons by Id');
      // }
      const seasonById = await response.json();
      set({ seasonById, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
  setMatchesByRound: async ({seasonId, round}) => {
    
    if(seasonId=== null && round=== null){
      return set({ matchesByRound: {} });
    }
  
    try {
      // Obtener los partidos filtrados por ronda desde la API
      const response = await fetch(`${URL_API}/${seasonId}/matches?round=${round}`);
      const matches = await response.json();

      // Actualizar el estado del store con los partidos filtrados por ronda
      set({ matchesByRound: matches });
    } catch (error) {
      console.error('Error al obtener los partidos por ronda:', error);
    }
  },
  // Función para crear una nueva temporada
  createSeason: async ({ league, year, numberOfRounds }) => {
    const leagueId = league;
    console.log(leagueId, year, numberOfRounds);
    try {
      const response = await fetch(URL_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ leagueId, year, numberOfRounds }),
      });
     const data = await response.json()
      console.log(data);
      return data
      // if (!response.ok) {
      //   throw new Error('Failed to create season');
      // }
      // Aquí podrías manejar la respuesta si es necesario
    } catch (error) {
      console.error("Error creating season:", error);
    }
  },
  // Función para eliminar una temporada
  deleteSeason: async (seasonId) => {
    try {
      await fetch(`${URL_API}/${seasonId}/full`, {
        method: "DELETE",
      });
      // if (!response.ok) {
      //   throw new Error("Failed to delete season");
      // }
      // Aquí podrías manejar la respuesta si es necesario
    } catch (error) {
      console.error("Error deleting season:", error.message);
    }
  },

  // Función para agregar equipos a una temporada
  addTeamsToSeason: async (seasonId, teams) => {
    try {
   const response =  await fetch(`${URL_API}/${seasonId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ teams }),
      });
      const data = await response.json()
      console.log("STORE EQUIPOS AGREGADOS",data)
      return data
      // if (!response.ok) {
      //   throw new Error("Failed to add teams to season");
      // }
      // Aquí podrías manejar la respuesta si es necesario
    } catch (error) {
      console.error("Error adding teams to season:", error);
    }
  },

  // Función para agregar partidos a una temporada
  addMatchesToSeason: async ({ seasonId, matches }) => {
    try {
      const response = await fetch(`${URL_API}/${seasonId}/matches`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ matches }),
      });
      const data = await response.json()
      console.log(data);
      return data
      // if (!response.ok) {
      //   throw new Error('Failed to add matches to season');
      // }
      // Aquí podrías manejar la respuesta si es necesario
    } catch (error) {
      console.error("Error adding matches to season:", error);
      return error
    }
  },
  getAllCurrentSeasons: async ()=>{
    try {
      const response = await axios.get(`${URL_API}/currentSeasons`);
      // if (!response.ok) {
        //   throw new Error("Failed to fetch seasons");
        // }
        const allCurrentSeasons = await response.data;
        set({ allCurrentSeasons, loading: false });
        set({ listAllCurrentSeason:allCurrentSeasons.map(el=> el._id), loading: false });

        
      console.log("HOLITA",allCurrentSeasons.map(el=> el._id))
        } catch (error) {
      set({ error: error.message, loading: false });
    }
  }
});

export default createSeasonStore;
