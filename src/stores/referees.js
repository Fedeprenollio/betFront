import axios from "axios";
import { BACKEND_URL_BASE } from "./url_base";

const URL_API = `${BACKEND_URL_BASE}`;

const createRefereeStore = (set, get) => ({
  referees: [],
  error: null,
 

  getReferees: async () => {
    try {
      const response = await axios.get(`${URL_API}/referees`);
      const allReferees = response.data;
      set({ referees: allReferees });
    } catch (error) {
      console.error("Error al realizar la solicitud:", error.message);
    }
  },


});

export default createRefereeStore;
