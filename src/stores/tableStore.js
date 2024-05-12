import axios from "axios";
import {jwtDecode} from "jwt-decode";
import { BACKEND_URL_BASE } from "./url_base";

const URL_API = `${BACKEND_URL_BASE}`;

const createTableStore = (set) => ({
  tableSeason: {},
  
  

  getTableSeason: async ({ seasonId }) => {
    try {
      const response = await axios.get(`${URL_API}/standings/season/${seasonId}`);
      const infoTable = response.data;
      set({tableSeason: infoTable})
    } catch (error) {
      console.error("Error al realizar la solicitud:", error.message);
    }
  }})

export default createTableStore;
