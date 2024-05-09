import { Navigate, Outlet } from 'react-router-dom';
import { useBoundStore } from '../stores';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { BACKEND_URL_BASE } from '../stores/url_base';

const URL_API = `${BACKEND_URL_BASE}`;

function PrivateRoute() {
    const { isAuthenticated , setIsAuthenticated} = useBoundStore((state) => state);
    const [isTokenValid, setIsTokenValid] = useState(false);
    const [isVerificationInProgress, setIsVerificationInProgress] = useState(true);

    useEffect(() => {
      const verifyToken = async () => {
        const token = JSON.parse(window.localStorage.getItem("loggedUser")).token
        console.log("TOOOOKEN", token)
        try {
          const config = {
            headers: {
              Authorization: `Bearer ${token}` // Aquí se agrega el prefijo 'Bearer ' al token
            }
          }
          const response = await axios.post( URL_API + '/verify-token',null,  config);
          setIsTokenValid(response.data.valid);
          if(response.data.valid){
            setIsAuthenticated(true)
          }

        } catch (error) {
          console.error('Error verifying token:', error.message);
          setIsTokenValid(false);
        } finally {
          setIsVerificationInProgress(false);
        }
      };
  
      verifyToken();
    }, []);

  // Si la verificación del token está en progreso, mostrar un componente de carga o simplemente nada
  if (isVerificationInProgress) {
    return null; // Puedes devolver un spinner o cualquier indicador de carga
  }
  console.log(isTokenValid,isAuthenticated)
  // Si la verificación del token ha finalizado, mostrar el contenido protegido si el token es válido
  return  isTokenValid ? <Outlet /> : <Navigate to="/user/login" />;
}

export default PrivateRoute;
