import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { ButtonCafecito } from '../../componts/socialNetworks/ButtonCafecito';
import { ButtonInstagram, ButtonTwitter } from '../../componts/socialNetworks/ButtoSocialNetworks';


const Footer = () => {
  return (
    <footer style={{ textAlign: 'center', padding: '20px', backgroundColor: '#f8f8f8' }}>
      <Grid container justifyContent="center" alignItems="center" spacing={2}>
        <Grid item xs={12}>
          <Typography variant="body2" color="textSecondary">
            © 2024 Mi Sitio Web
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Box mt={2} mb={1}>
            <ButtonCafecito />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box display="flex" justifyContent="center">
            <ButtonInstagram />
            <ButtonTwitter />
          </Box>
        </Grid>
      </Grid>
    </footer>
  );
};

export default Footer;
