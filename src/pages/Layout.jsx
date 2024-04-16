import Navbar from "./Navbar";
import RoutesComponent from "../router/RoutesComponents";
import Container from "@mui/material/Container";


const Layout = () => {
  return (
    <Container maxWidth="xl">
      <Navbar />

      <RoutesComponent />
    </Container>
  );
};

export default Layout;
