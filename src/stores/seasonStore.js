import create from 'zustand';
const URL_API = "http://localhost:1234/season"


// Definir el store para manejar las temporadas
const useSeasonStore = create((set) => ({
  seasons: [],
  seasonById: {},
  loading: false,
  error: null,
  // Función para cargar las temporadas desde el servidor
  fetchSeasons: async () => {
    set({ loading: true, error: null });
    try {
      const response = await fetch('/api/season');
      if (!response.ok) {
        throw new Error('Failed to fetch seasons');
      }
      const seasons = await response.json();
      set({ seasons, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
  //Función para cargar una temporada por id
  getSeasonById : async (seasonId)=>{
    console.log("ESOTT BUSCANDO ID", seasonId)
    try {
      const response = await fetch(URL_API +"/" + seasonId);
      if (!response.ok) {
        throw new Error('Failed to fetch seasons by Id');
      }
      const seasonById = await response.json();
      set({ seasonById, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  }  ,
  // Función para crear una nueva temporada
  createSeason: async ({league, year}) => {
    const leagueId = league
    console.log(leagueId, year)
    try {
      const response = await fetch(URL_API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({leagueId, year}),
      });
      console.log(response)
      // if (!response.ok) {
      //   throw new Error('Failed to create season');
      // }
      // Aquí podrías manejar la respuesta si es necesario
    } catch (error) {
      console.error('Error creating season:', error);
    }
  },
  // Función para eliminar una temporada
  deleteSeason: async (seasonId) => {
    try {
      const response = await fetch(`/api/season/${seasonId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete season');
      }
      // Aquí podrías manejar la respuesta si es necesario
    } catch (error) {
      console.error('Error deleting season:', error.message);
    }
  },


   // Función para agregar equipos a una temporada
   addTeamsToSeason: async (seasonId, teams) => {
    try {
      const response = await fetch(`${URL_API}/${seasonId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ teams }),
      });
      if (!response.ok) {
        throw new Error('Failed to add teams to season');
      }
      // Aquí podrías manejar la respuesta si es necesario
    } catch (error) {
      console.error('Error adding teams to season:', error);
    }
  },

   // Función para agregar partidos a una temporada
   addMatchesToSeason: async ({seasonId, matches}) => {
    console.log(seasonId, matches)
    try {
      const response = await fetch(`${URL_API}/${seasonId}/matches` , {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ matches }),
      });
      console.log(response)
      // if (!response.ok) {
      //   throw new Error('Failed to add matches to season');
      // }
      // Aquí podrías manejar la respuesta si es necesario
    } catch (error) {
      console.error('Error adding matches to season:', error);
    }
  },
}));

export default useSeasonStore;
