import React from 'react';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';
export const ButtonInstagram = () => {
  return (
    <a href="https://www.instagram.com/tu_perfil" target="_blank" rel="noopener noreferrer">
      <InstagramIcon fontSize="large" style={{ color: '#E4405F', margin: '0 10px' }} />
    </a>
  );
};

export const ButtonTwitter = () => {
  return (
    <a href="https://twitter.com/tu_perfil" target="_blank" rel="noopener noreferrer">
      <XIcon fontSize="large" style={{ color: '#1DA1F2', margin: '0 10px' }} />
    </a>
  );
};
