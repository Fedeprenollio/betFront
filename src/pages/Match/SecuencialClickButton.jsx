import React from 'react';
import { Button } from '@mui/material';

export default function SecuencialClickButton() {
  // Función que ejecuta los clics secuenciales
  const clickSecuencialmente = (index = 0) => {
    const botones = document.querySelectorAll('button[id="actualizar"]');
    
    if (index < botones.length) {
      botones[index].click();
      console.log(`Click en el botón ${index + 1}`);
      setTimeout(() => {
        clickSecuencialmente(index + 1);
      }, 10000); // 10 segundos
    }
  };

  return (
    <Button
      variant="contained"
      color="primary"
      onClick={() => clickSecuencialmente(0)}
    >
      Iniciar Secuencia de Clicks
    </Button>
  );
}
