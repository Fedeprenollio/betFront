import Navbar from "./Navbar";
import RoutesComponent from "../router/RoutesComponents";
import GoogleAd from "../componts/googleAd/GoogleAd";
import { ButtonCafecito } from "../componts/socialNetworks/ButtonCafecito";
import Footer from "./footer/Footer";


const Layout = () => {
  return (
    <>
      <Navbar />
     {/* <G oogleAd/> */}
      <RoutesComponent />
      <Footer/>
    </>
  );
};

export default Layout;
