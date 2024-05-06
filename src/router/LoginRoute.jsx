
import { Navigate, Outlet } from 'react-router-dom';
import { useBoundStore } from '../stores';
// import { useAuth } from './useAuth'; // Suponiendo que tienes un hook de autenticación

function PrivateRoute() {
    const { isAuthenticated} = useBoundStore((state) => state);
    console.log("ISAUTH",isAuthenticated)
//   const { isAuthenticated } = useAuth(); // Obtener el estado de autenticación

  return isAuthenticated ? <Outlet /> : <Navigate to="/user/login" />;
}




export const LoginRoute = () => {
    const { isAuthenticated} = useBoundStore((state) => state);

    return !isAuthenticated && <Navigate to="/user/login" />;

}
