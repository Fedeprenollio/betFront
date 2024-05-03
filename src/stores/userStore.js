import axios from "axios";
import {jwtDecode} from "jwt-decode";
import { BACKEND_URL_BASE } from "./url_base";

const URL_API = `${BACKEND_URL_BASE}/user`;

const createUserStore = (set, get) => ({
  user: {},
  isAuthenticated: false,
  error: null,


  registerUser: async ({ values }) => {
    const { username, password } = values;
    try {
      const response = await axios.post(`${URL_API}/register`, {
        username,
        password,
      });
      const infoUser = response.data;
      console.log(infoUser);
    } catch (error) {
      console.error("Error al realizar la solicitud:", error.message);
    }
  },

  loginUser: async ({ values }) => {
    const { username, password } = values;
    try {
      const response = await axios.post(
        `${URL_API}/login`,
        {
          username,
          password,
        },
        { withCredentials: true }
      );
      const infoUser = response.data;
      console.log("repuesta login",response);
      if (infoUser.status === "ok") {
        // Configura el estado isAuthenticated en true si el inicio de sesión es exitoso
        set({ isAuthenticated: true });
      }
      // Devuelve la información del usuario en caso de éxito
      return infoUser;
    } catch (error) {
      console.error("Error al realizar la solicitud----:", error.message);
      // Configura el estado de error para que el componente pueda mostrar un mensaje de error al usuario
      set({ error: error.message });
      // Devuelve el mensaje de error para que el componente pueda manejarlo adecuadamente
      return error.message;
    }
  },
  
  decodeTokenFromCookie: (cookieToken) => {
    const tokenCookie = cookieToken
      ?.split("; ")
      .find((cookie) => cookie.startsWith("jwt="));
    if (tokenCookie) {
      try {
        const token = tokenCookie.split("=")[1];
        const decodedToken = jwtDecode(token);
        set({ user: decodedToken });
        set({ isAuthenticated: true });
      } catch (error) {
        console.error("Error al decodificar el token:", error.message);
      }
    }
  },

  logout: async () => {
    try {
      await axios.get(`${URL_API}/logout`, { withCredentials: true });
      set({ user: {}, isAuthenticated: false });
    } catch (error) {
      console.error("Error al realizar logout:", error.message);
    }
  },
});

export default createUserStore;
