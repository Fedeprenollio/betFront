import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import { Container, Paper } from '@mui/material';
import { ButtonCafecito } from '../../componts/socialNetworks/ButtonCafecito';
import { ButtonInstagram, ButtonTwitter } from '../../componts/socialNetworks/ButtoSocialNetworks';

const Footer = () => {
  return (
    <Paper 
      sx={{ 
        width: '100%', 
        mb: 'auto', 
        py: 2,
        position: 'relative',
      }} 
      component="footer" 
      square 
      variant="outlined"
    >
      <Container maxWidth="lg">
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
      </Container>
    </Paper>
  );
};

export default Footer;
