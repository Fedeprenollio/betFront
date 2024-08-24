import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { BACKEND_URL_BASE } from "./url_base";

const URL_API = `${BACKEND_URL_BASE}/user`;

const createUserStore = (set, get) => ({
  user: "",
  isAuthenticated: false,
  setIsAuthenticated: (boolean) => set({ isAuthenticated: boolean }),
  error: null,
  token:
    `Bearer ${JSON.parse(window.localStorage.getItem("loggedUser"))?.token}` ||
    "",
  setToken: (newToken) => {
    set({ token: `Bearer ${newToken}` });
  },

  registerUser: async ({ values }) => {
    const { username, password } = values;
    try {
      const response = await axios.post(`${URL_API}/register`, {
        username,
        password,
      });
      const infoUser = response.data;
      set({ user: infoUser });
    } catch (error) {
      console.error("Error al realizar la solicitud:", error.message);
    }
  },

  loginUser: async ({ values }) => {
    try {
      const { username, password } = values;
      const response = await axios.post(
        `${URL_API}/login`,
        {
          username,
          password,
        },
        { withCredentials: true }
      );

      const infoUser = response?.data;

      console.log("repuesta login", response);
      if (infoUser?.status === "ok") {
        // Configura el estado isAuthenticated en true si el inicio de sesión es exitoso
        set({ isAuthenticated: true });
        set({ user: infoUser.user });
        return infoUser;
      } else {
        set({ isAuthenticated: false });
      }
      // Devuelve la información del usuario en caso de éxito
    } catch (error) {
      console.log("Error al realizar la solicitud:", error);
      // Si el error proviene del servidor y tiene un mensaje, captúralo y devuélvelo
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        const errorMessage = error.response.data.message;
        console.log("Mensaje de error:", errorMessage);
        set({ error: errorMessage });
        // Aquí puedes manejar el mensaje de error como desees
        return errorMessage;
      }
      // Si no se pudo obtener un mensaje de error del servidor, devuelve un mensaje genérico
      return "Ha ocurrido un error al iniciar sesión.";
    }
  },

  decodeTokenFromLocalStorage: (token) => {
    const tokenCookie = JSON.parse(token);

    if (tokenCookie) {
      try {
        const decodedToken = jwtDecode(token.token);
        console.log("QUE HAY", decodedToken);
        return decodedToken;
        // set({ user: decodedToken });
        // set({ isAuthenticated: true });
      } catch (error) {
        console.error("Error al decodificar el token:", error.message);
      }
    }
  },

  logout: async () => {
    try {
      await axios.get(`${URL_API}/logout`, { withCredentials: true });
      set({ token: null });
      set({ user: {}, isAuthenticated: false });
      window.localStorage.removeItem("loggedUser");
    } catch (error) {
      console.error("Error al realizar logout:", error.message);
    }
  },
  initializeAuthState: () => {
    const loggedUser = window.localStorage.getItem("loggedUser");
  
    // Verificamos si loggedUser no es null
    if (loggedUser) {
      const { token, user } = JSON.parse(loggedUser);
  
      if (token) {
        console.log("TOKEN", token, user);
        // Aquí podrías agregar una verificación del token si es necesario
        set({ isAuthenticated: true });
        set({ user: user });
      }
    } else {
      console.warn("No hay usuario logueado");
      set({ isAuthenticated: false });
      set({ user: null });
    }
  },
  

});

export default createUserStore;
