import Navbar from "./Navbar";
import RoutesComponent from "../router/RoutesComponents";
import GoogleAd from "../componts/googleAd/GoogleAd";
import { ButtonCafecito } from "../componts/socialNetworks/ButtonCafecito";
import Footer from "./footer/Footer";
import { Box } from "@mui/material";


const Layout = () => {
  return (
    <>
      <Box display="flex" flexDirection="column" minHeight="100vh">
        <Box component="main" className="main-content">
          <Navbar />

          <RoutesComponent />
        </Box>
        <Footer />
      </Box>
    </>
  );
};

export default Layout;
