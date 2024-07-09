import Navbar from "./Navbar";
import RoutesComponent from "../router/RoutesComponents";
import GoogleAd from "../componts/googleAd/GoogleAd";


const Layout = () => {
  return (
    <>
      <Navbar />
     <GoogleAd/>
      <RoutesComponent />
     
    </>
  );
};

export default Layout;
