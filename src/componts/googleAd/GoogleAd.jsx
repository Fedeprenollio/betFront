import React, { useEffect } from 'react';

const GoogleAd = () => {
   useEffect(() => {
    if (window.adsbygoogle) {
      window.adsbygoogle.push({});
      console.log("window.adsbygoogle",window.adsbygoogle)
    }
  }, []);

  return (
    <div>
      <ins className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-1235260714133990"
        data-ad-slot="5326574488"
        data-ad-format="auto"
        data-full-width-responsive="true"></ins>
    </div>
  );
};

export default GoogleAd;
