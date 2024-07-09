import  { useEffect } from 'react';

const GoogleAd = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
    script.async = true;
    script.setAttribute('data-ad-client', '1031386387'); // Reemplaza con tu ID de cliente de AdSense
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <ins className="adsbygoogle"
         style={{ display: 'block' }}
         data-ad-client="ca-pub-1235260714133990" // Reemplaza con tu ID de cliente de AdSense
         data-ad-slot="5326574488" // Reemplaza con tu ID de bloque de anuncios
         data-ad-format="auto"
         data-full-width-responsive="true"></ins>
  );
};

export default GoogleAd;
