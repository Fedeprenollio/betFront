import axios from "axios"
import { BACKEND_URL_BASE } from "./url_base";

// const API_URL ="http://localhost:1234/match"
const URL_API = `${BACKEND_URL_BASE}/match`


const createMatchesStore = ((set, get) => ({
  matches: [],
  matchDetail :{},
  loading: false,
  error: null,

  clearMatches: ()=>{
      set({matches: []})
  } ,

  setMatches: async ({ league, round, isFinished = "all", country, seasonId, date }) => {
    set({ loading: true, error: null });

    try {
      // Construir la URL base
      let url = `${URL_API}?`;
  
      // Agregar los parámetros de consulta solo si están definidos
      if (isFinished !== undefined) {
        url += `isFinished=${isFinished}&`;
      }
      if (country !== undefined) {
        url += `country=${country}&`;
      }
      if (league !== undefined) {
        url += `league=${league}&`;
      }
      if (seasonId !== undefined) {
        url += `seasonYear=${seasonId}&`;
      }
      if (round !== undefined) {
        url += `round=${round}&`;
      }
      if(date !== undefined){
        url += `date=${date}`
      }
  
      // Eliminar el último carácter '&' si está presente
      url = url.replace(/&$/, '');
      const res = await fetch(url);
      const matches = await res.json();
      set({ matches });
    } catch (error) {
      console.log(error);
      set({ error: error.message });

    }finally{
      set({ loading: false });

    }
  },
  
  getAllMatches: async () => {

    // try {
    //   const res = await fetch(URL_API);
    //   const matches = await res.json();
    //   set({ matches });
    // } catch (error) {
    //   console.log(error)
    // }
    try {
      set({ loading: true, error: null });
      const { data: matches } = await axios.get(URL_API);
      set({ matches });
    } catch (error) {
      set({ error: error.message });
      console.error(error);
    } finally {
      set({ loading: false });
    }
  },
  getMatchDetail: async ({idMatch}) => {
    // set({ loading: true, error: null });

    try {
      const res = await fetch(`${URL_API}/`+ idMatch);
      const matchDetail = await res.json();
      set({ matchDetail });
    } catch (error) {
      console.log(error)
    }
  },
  newMatch: async ({ homeTeamName, awayTeamName, date, league, seasonYear, round }) => {
    console.log("INFO", homeTeamName, awayTeamName, date, league, seasonYear, round)
    set({ loading: true, error: null });
    try {
       await fetch(URL_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ homeTeamName, awayTeamName, date, league, seasonYear, round })
      });
      // if (response.ok) {
      //   console.log("Partido creado exitosamente");
      //   // Realizar alguna acción adicional aquí, si es necesario
      // } else {
      //   console.error("Error al crear partido:", response.statusText);
      //   // Manejar el error de alguna manera, como mostrando un mensaje al usuario
      // }
    } catch (error) {
      console.error("Error al realizar la solicitud:", error);
      // Manejar el error de alguna manera, como mostrando un mensaje al usuario
    }
  },
  addMatchResult: async (matchId, resultData) => {
    // set({ loading: true, error: null });
    console.log("resultData",resultData)
    const token = get().token;
    const config = {
      headers: {
        Authorization: token
      }
    };
  
    try {
      const response = await axios.put(`${URL_API}/${matchId}/result`, resultData, config);
      const match = response.data;
      set((state) => ({
        matches: state.matches.map((m) =>
          m.id === matchId ? { ...m, ...match } : m
        ),
      }));
    } catch (error) {
      console.error('Error adding match result:', error);
    }
  },

  onDeleteMatch: async (idMatch)=>{
    set({ loading: true, error: null });

    try {
     await fetch(`${URL_API}/${idMatch}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },       
      });
      get().setMatches()

      // if (response.ok) {
      //   console.log("Partido eliminado exitosamente");
      //   // Realizar alguna acción adicional aquí, si es necesario
      //   get().setMatches()
        
      // } else {
      //   console.error("Error al eliminar partido:", response.statusText);
      //   // Manejar el error de alguna manera, como mostrando un mensaje al usuario
      // }
    } catch (error) {
      console.error("Error al realizar la solicitud:", error);
      // Manejar el error de alguna manera, como mostrando un mensaje al usuario
    }
  },
  updateMatchById: async ({matchId, updateFields}) => {
    // set({ loading: true, error: null });

    try {
      // Realiza una solicitud a tu API para actualizar el partido
      const response = await fetch(`${URL_API}/${matchId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateFields),
      });

      await  get().setMatches()

      // if (!response.ok) {
      //   throw new Error('Error al actualizar el partido');
      // }

      // // Actualiza el estado con el partido actualizado
      // const updatedMatch = await response.json();
      // set((state) => ({
      //   matches: state.matches.map((match) =>
      //     match._id === updatedMatch._id ? updatedMatch : match
      //   ),
      // }));
    } catch (error) {
      console.error('Error al actualizar el partido:', error.message);
    }
  },
}));

export default createMatchesStore;
