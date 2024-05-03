import { Navigate, Outlet } from 'react-router-dom';
import { useBoundStore } from '../stores';
// import { useAuth } from './useAuth'; // Suponiendo que tienes un hook de autenticación

function PrivateRoute() {
    const { isAuthenticated} = useBoundStore((state) => state);
//   const { isAuthenticated } = useAuth(); // Obtener el estado de autenticación

  return isAuthenticated ? <Outlet /> : <Navigate to="/user/login" />;
}

export default PrivateRoute;
