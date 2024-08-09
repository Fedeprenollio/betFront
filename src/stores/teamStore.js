import axios from "axios";
import { BACKEND_URL_BASE } from "./url_base";
const URL_API = `${BACKEND_URL_BASE}/team`;
// const API_URL = `http://localhost:1234/team`;
const createTeamStore = (set, get) => ({
  teams: [],
  teamDetails: {},
  teamSeason: {},
  setTeams: async () => {
    const res = await fetch(URL_API);
    const teams = await res.json();
    console.log("Datos recibidos:", teams);
    set({ teams });
  },
  getTeamDetails: async (teamId) => {
    if (teamId === null) {
      set({ teamDetails: {} });
    }
    // Aquí realizarías la llamada a la API para obtener los detalles del equipo
    const response = await fetch(`${URL_API}/${teamId}`);
    const teamDetails = await response.json();
    set((state) => ({
      teamDetails: {
        ...state.teamDetails,
        [teamId]: teamDetails,
      },
    }));
    return teamDetails
  },
  // Nuevo selector para obtener los detalles de un equipo específico
  teamDetailsSelector: (teamId) => (state) => state.teamDetails[teamId],
  newTeam: async ({ values }) => {
    console.log("values", values)
    const { name, city, league, country } = values;
    const token = get().token; 
    const config = {
      headers:{
        Authorization: token
      }
    }
    console.log(values);
    try {
      const response = await axios.post(URL_API,{ name, city, league, country }, config
     );
      // if (response.ok) {
      //   console.log("Equipo creado exitosamente");
      //   // Podrías realizar alguna acción adicional aquí, como actualizar la lista de equipos
      // } else {
      //   console.error("Error al crear equipo:", response.statusText);
      //   // Podrías manejar el error de alguna manera, como mostrando un mensaje al usuario
      // }
    } catch (error) {
      console.error("Error al realizar la solicitud:", error.message);
      // Podrías manejar el error de alguna manera, como mostrando un mensaje al usuario
    }
  },
  // deleteTeam: async (idTeam) => {
  //   try {
  //      await fetch(`${URL_API}/${idTeam}`, {
  //       method: "DELETE",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });
  //     await get().setTeams();
  //           // if (response.ok) {
  //     //   console.log("Equipo eliminado exitosamente");
  //     //   // Actualizar el estado después de eliminar el equipo
  //     //   get().setTeams();
  //     //   // const currentTeams = get().teams;
  //     //   // const updatedTeams = currentTeams.filter(team => team.id !== idTeam);
  //     //   // console.log(updatedTeams)
  //     //   // set({ teams: updatedTeams });
  //     // } else {
  //     //   console.error("Error al eliminar equipo:", response.statusText);
  //     // }
  //   } catch (error) {
  //     console.error("Error al realizar la solicitud:", error);
  //   }
  // },
  deleteTeam: async (teamId) => {
    try {
      const res = await fetch(`${URL_API}/${teamId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(res);
      if(res.status === 400){
        console.log("No se puede eliminar, probablemente equipo en uso en algun partido")
        return 
      }
      await get().setTeams();
      console.log("Equipo eliminado exitosamente");
    } catch (error) {
      console.error("Error al eliminar equipo:", error);
    }
  },
  getTeamSeasons: async (teamId) => {
    
    // Aquí realizarías la llamada a la API para obtener los detalles del equipo
    const response = await fetch(`${URL_API}/${teamId}/leagues-seasons`);
    const infoLeague = await response.json();
    set({teamSeason: infoLeague});
  },
  updateTeam: async (id, teamData) => {
    try {
      const response = await axios.put(`${URL_API}/${id}`, teamData);
      set((state) => ({
        teams: state.teams.map((team) =>
          team._id === id ? response.data : team
        ),
      }));
    } catch (error) {
      console.error('Error updating team:', error);
    }
  },
});

export default createTeamStore;
