import React, { useState } from 'react';

const CookieConsentBanner = () => {
  const [consent, setConsent] = useState(false);

  const handleAccept = () => {
    setConsent(true);
    // Aquí puedes guardar el consentimiento del usuario en cookies o localStorage
  };

  return (
    !consent && (
      <div style={{ position: 'fixed', bottom: 0, width: '100%', backgroundColor: 'white', borderTop: '1px solid #ddd', padding: '10px', textAlign: 'center' }}>
        <p>
          Utilizamos cookies para mejorar su experiencia. Al utilizar nuestro sitio, usted acepta nuestra política de cookies.
        </p>
        <button onClick={handleAccept}>Aceptar</button>
      </div>
    )
  );
};

export default CookieConsentBanner;
