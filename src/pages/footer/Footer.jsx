import { ButtonCafecito } from "../../componts/socialNetworks/ButtonCafecito";
import { ButtonInstagram, ButtonTwitter } from "../../componts/socialNetworks/ButtoSocialNetworks";


const Footer = () => {
  return (
    <footer style={{ textAlign: 'center', padding: '20px', backgroundColor: '#f8f8f8' }}>
      <p>© 2024 Mi Sitio Web</p>
      <div style={{ marginBottom: '10px' }}>
        <ButtonCafecito />
      </div>
      <div>
        <ButtonInstagram />
        <ButtonTwitter />
      </div>
    </footer>
  );
};

export default Footer;
