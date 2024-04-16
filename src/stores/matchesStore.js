import { create } from 'zustand';

const API_URL ="http://localhost:1234/match"

const useMatchesStore = create((set, get) => ({
  matches: [],
  matchDetail :{},

  setMatches: async ({ league, round, isFinished = "all", country, seasonId, date }) => {
    try {
      // Construir la URL base
      let url = `http://localhost:1234/match?`;
  
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
      console.log("QUERYS STORE", url)
      const res = await fetch(url);
      const matches = await res.json();
      console.log("Datos recibidos:", matches);
      set({ matches });
    } catch (error) {
      console.log(error);
    }
  },
  
  getAllMatches: async () => {
    try {
      const res = await fetch(`http://localhost:1234/match`);
      const matches = await res.json();
      console.log("Datos recibidos:", matches);
      set({ matches });
    } catch (error) {
      console.log(error)
    }
  },
  getMatchDetail: async ({idMatch}) => {
    try {
      const res = await fetch(`http://localhost:1234/match/`+ idMatch);
      const matchDetail = await res.json();
      console.log("PARTIDO DETALLE:", matchDetail);
      set({ matchDetail });
    } catch (error) {
      console.log(error)
    }
  },
  newMatch: async ({ homeTeamName, awayTeamName, date, league, seasonYear, round }) => {
    console.log(homeTeamName, awayTeamName, date, league, seasonYear, round)
    try {
      const response = await fetch("http://localhost:1234/match", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ homeTeamName, awayTeamName, date, league, seasonYear, round })
      });
      if (response.ok) {
        console.log("Partido creado exitosamente");
        // Realizar alguna acción adicional aquí, si es necesario
      } else {
        console.error("Error al crear partido:", response.statusText);
        // Manejar el error de alguna manera, como mostrando un mensaje al usuario
      }
    } catch (error) {
      console.error("Error al realizar la solicitud:", error);
      // Manejar el error de alguna manera, como mostrando un mensaje al usuario
    }
  },
  addMatchResult: async (matchId, resultData) => {
    console.log("ID PARTIDO,", matchId)
    console.log("BODY,", resultData)
    try {
      const response = await fetch(`${API_URL}/${matchId}/result`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(resultData),
      });
      const match = await response.json();
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
    try {
      const response = await fetch(`http://localhost:1234/match/${idMatch}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },       
      });
      if (response.ok) {
        console.log("Partido eliminado exitosamente");
        // Realizar alguna acción adicional aquí, si es necesario
        get().setMatches()
        
      } else {
        console.error("Error al eliminar partido:", response.statusText);
        // Manejar el error de alguna manera, como mostrando un mensaje al usuario
      }
    } catch (error) {
      console.error("Error al realizar la solicitud:", error);
      // Manejar el error de alguna manera, como mostrando un mensaje al usuario
    }
  }
}));

export default useMatchesStore;
