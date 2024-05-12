import Navbar from "./Navbar";
import RoutesComponent from "../router/RoutesComponents";
import Container from "@mui/material/Container";
import { Standings } from "./standings/Standings";


const Layout = () => {
  return (
    <Container maxWidth="xl">
      <Navbar />

      <RoutesComponent />
      <Standings/>
    </Container>
  );
};

export default Layout;
