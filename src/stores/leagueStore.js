import { BACKEND_URL_BASE } from "./url_base";

// const URL_API = "http://localhost:1234/league"
const URL_API = `${BACKEND_URL_BASE}/league`

// Definimos el store de League
const crateLeagueStore = ((set, get) => ({
  leagues: [],
  leagueDetail:{},

  // Función para crear una nueva liga
  createLeague: async (newLeague) => {
    console.log(newLeague, "En el store")
    // Lógica para crear la liga utilizando la API
    try {
      // Hacer una solicitud POST a la API con la nueva liga
      const response = await fetch(URL_API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newLeague),
      });
      const data = await response.json();
        set((state) => ({
          leagues: [...state.leagues, data],
        }));
      // Verificar si la solicitud fue exitosa
      // if (response.ok) {
      //   // Actualizar el estado local con la nueva liga
      //   const data = await response.json();
      //   set((state) => ({
      //     leagues: [...state.leagues, data],
      //   }));
      //   return data;
      // } else {
      //   // Manejar errores si la solicitud falla
      //   console.error('Error creating league:', response.statusText);
      //   return null;
      // }
    } catch (error) {
      console.error('Error creating league:', error);
      return null;
    }
  },

  // Función para leer todas las ligas
  fetchLeagues: async () => {
    // Lógica para obtener todas las ligas utilizando la API
    try {
      // Hacer una solicitud GET a la API para obtener todas las ligas
      const response = await fetch(URL_API);
      console.log(response)
      const data = await response.json();
        set({ leagues: data });
      // Verificar si la solicitud fue exitosa
      // if (response.ok) {
      //   const data = await response.json();
      //   set({ leagues: data });
      // } else {
      //   // Manejar errores si la solicitud falla
      //   console.error('Error fetching leagues:', response.statusText);
      // }
    } catch (error) {
      console.error('Error fetching leagues:', error);
    }
  },

  // Función para actualizar una liga existente
  updateLeague: async (updatedLeague) => {
    // Lógica para actualizar la liga utilizando la API
    try {
      // Hacer una solicitud PUT a la API con la liga actualizada
      const response = await fetch(`URL_DE_LA_API/${updatedLeague.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedLeague),
      });
      const data = await response.json();
      set((state) => ({
        leagues: state.leagues.map((league) =>
          league.id === updatedLeague.id ? data : league
        ),
      }));
      // Verificar si la solicitud fue exitosa
      // if (response.ok) {
      //   // Actualizar el estado local con la liga actualizada
      //   const data = await response.json();
      //   set((state) => ({
      //     leagues: state.leagues.map((league) =>
      //       league.id === updatedLeague.id ? data : league
      //     ),
      //   }));
      //   return data;
      // } else {
      //   // Manejar errores si la solicitud falla
      //   console.error('Error updating league:', response.statusText);
      //   return null;
      // }
    } catch (error) {
      console.error('Error updating league:', error);
      return null;
    }
  },

  // Función para eliminar una liga existente
  deleteLeague: async (leagueId) => {
    // Lógica para eliminar la liga utilizando la API
    try {
      // Hacer una solicitud DELETE a la API para eliminar la liga
   await fetch(`${URL_API}/${leagueId}`, {
        method: 'DELETE',
      });
     
      // Verificar si la solicitud fue exitosa
      // if (response.ok) {
      //   // Actualizar el estado local eliminando la liga
      //   set((state) => ({
      //     leagues: state.leagues.filter((league) => league.id !== leagueId),
      //   }));
      // } else {
      //   // Manejar errores si la solicitud falla
      //   console.error('Error deleting league:', response.statusText);
      // }
    } catch (error) {
      console.error('Error deleting league:', error);
    }
  },
    // Función para leer todas las ligas
    getLeagueDetail: async ({idLeague}) => {
      if(idLeague === null){
        console.log("VOY A LKIMPIAR EL ESTADO")
        set({leagueDetail: {}})
        return
      }
      // Lógica para obtener todas las ligas utilizando la API
      try {
        // Hacer una solicitud GET a la API para obtener todas las ligas
        const response = await fetch(URL_API +"/" +idLeague);
        console.log(response)
        const league = await response.json();
          set({ leagueDetail: league });
        // Verificar si la solicitud fue exitosa
        // if (response.ok) {
        //   const data = await response.json();
        //   set({ leagues: data });
        // } else {
        //   // Manejar errores si la solicitud falla
        //   console.error('Error fetching leagues:', response.statusText);
        // }
      } catch (error) {
        console.error('Error fetching leagues:', error);
      }
    },
}));

export default crateLeagueStore;
