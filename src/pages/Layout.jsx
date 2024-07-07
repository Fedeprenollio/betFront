import Navbar from "./Navbar";
import RoutesComponent from "../router/RoutesComponents";
import TemporaryDrawer from "./drawer/TemporaryDrawer";


const Layout = () => {
  return (
    <>
      <Navbar />
      {/* Quiero tener fijo el menu de Drawer */}
      {/* <TemporaryDrawer/> */}
      <RoutesComponent />
    </>
  );
};

export default Layout;
