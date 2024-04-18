import { BACKEND_URL_BASE } from "./url_base";
const URL_API = `${BACKEND_URL_BASE}/team`;
console.log(URL_API);
// const API_URL = `http://localhost:1234/team`;
const createTeamStore = (set, get) => ({
  teams: [],
  teamDetails: {},
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
console.log("response", response)
    set((state) => ({
      teamDetails: {
        ...state.teamDetails,
        [teamId]: teamDetails,
      },
    }));
  },
  // Nuevo selector para obtener los detalles de un equipo específico
  teamDetailsSelector: (teamId) => (state) => state.teamDetails[teamId],
  newTeam: async ({ values }) => {
    const { name, city, league, country } = values;
    console.log(values);
    try {
      const response = await fetch(URL_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, city, league, country }),
      });
      console.log(response);
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
    console.log("q pasa");
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
});

export default createTeamStore;
