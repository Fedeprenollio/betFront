import axios from "axios";
import { BACKEND_URL_BASE } from "./url_base";

const URL_API = `${BACKEND_URL_BASE}/league`;

const crateLeagueStore = (set, get) => ({
  leagues: [],
  leagueDetail: {},
  

  createLeague: async (newLeague) => {
    const token = get().token; 
    const config = {
      headers:{
        Authorization: token
      }
    }
    try {
      const response = await axios.post(URL_API, newLeague, config);
      const data = response.data;
  
      // Actualizar el estado local con la nueva liga
      set((state) => ({
        leagues: [...state.leagues, data],
      }));
  
      return data;
    } catch (error) {
      console.error("Error creating league:", error);
      throw error.response.data.error;
    }
  },

  fetchLeagues: async () => {
    try {
      const response = await axios.get(URL_API);
      const data = response.data;
      set({ leagues: data });
    } catch (error) {
      console.error("Error fetching leagues:", error);
    }
  },

  updateLeague: async ({idLeague, newValues}) => {
    const token = get().token; 
    const config = {
      headers:{
        Authorization: token
      }
    }
    try {
      const response = await axios.put(`${URL_API}/${idLeague}`, newValues, config);
      const data = response.data;
      set((state) => ({
        leagues: state.leagues.map((league) =>
          league.id === newValues.id ? data : league
        ),
      }));
    } catch (error) {
      console.error("Error updating league:", error);
    }
  },

  deleteLeague: async (leagueId) => {
    const token = get().token; 
    const config = {
      headers:{
        Authorization: token
      }
    }
    console.log("CONFIG----",config)
    try {
      const infoDelete = await axios.delete(`${URL_API}/${leagueId}`, config);
      await get().fetchLeagues();
      return infoDelete
    } catch (error) {
      console.error("Error deleting league:", error);
    }
  },

  getLeagueDetail: async ({ idLeague }) => {
    if (idLeague === null) {
      set({ leagueDetail: {} });
      return;
    }
    try {
      const response = await axios.get(`${URL_API}/${idLeague}`);
      const league = response.data;
      set({ leagueDetail: league });
    } catch (error) {
      console.error("Error fetching league detail:", error);
    }
  },
});

export default crateLeagueStore;
