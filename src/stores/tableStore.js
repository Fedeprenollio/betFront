import axios from "axios";
import {jwtDecode} from "jwt-decode";
import { BACKEND_URL_BASE } from "./url_base";

const URL_API = `${BACKEND_URL_BASE}`;

const createTableStore = (set) => ({
  tableSeason: {},
  loading: false,
  
  

  getTableSeason: async ({ seasonId }) => {
    try {
      set({ loading: true });  // Inicia el estado de carga
      const response = await axios.get(`${URL_API}/standings/season/${seasonId}`);
      const infoTable = response.data;
      set({tableSeason: infoTable})
    } catch (error) {
      console.error("Error al realizar la solicitud:", error.message);
    }finally {
      set({ loading: false });  // Finaliza el estado de carga
    }
  },
  // Función para limpiar la tabla de posiciones
  clearTableSeason: () => {
    set({ tableSeason: {} });
  }})

export default createTableStore;
