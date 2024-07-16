import React from 'react';
import { Card, CardContent, Typography, Button, Box, Avatar, List, ListItem, ListItemAvatar, ListItemText, Divider } from '@mui/material';
import { CloudUpload } from '@mui/icons-material';
import { ButtonCafecito } from '../../componts/socialNetworks/ButtonCafecito';

const Cafecito = () => {
  const firstDonor = {
    name: 'John Doe',
    amount: 100,
  };

  const monthlyTopDonors = [
    { name: 'Alice', amount: 50 },
    { name: 'Bob', amount: 45 },
    { name: 'Charlie', amount: 40 },
    { name: 'David', amount: 35 },
    { name: 'Eva', amount: 30 },
  ];

  return (
    <Card sx={{ maxWidth: 600, mx: 'auto', mt: 4, p: 2 }}>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          Apóyanos con un Cafecito
        </Typography>
        <Typography variant="body1" color="text.secondary" gutterBottom>
          Ayúdanos a cubrir los gastos de servidores y base de datos para mantener este proyecto en funcionamiento.
        </Typography>
            <ButtonCafecito/>
        <Divider sx={{ my: 2 }} />
        <Typography variant="h6" component="div" gutterBottom>
          Primer Donante
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar>{firstDonor.name.charAt(0)}</Avatar>
          <Box sx={{ ml: 2 }}>
            <Typography variant="body1">{firstDonor.name}</Typography>
            <Typography variant="body2" color="text.secondary">
              ${firstDonor.amount}
            </Typography>
          </Box>
        </Box>
        <Divider sx={{ my: 2 }} />
        <Typography variant="h6" component="div" gutterBottom>
          Top 5 Donantes del Mes
        </Typography>
        <List>
          {monthlyTopDonors.map((donor, index) => (
            <ListItem key={index}>
              <ListItemAvatar>
                <Avatar>{donor.name.charAt(0)}</Avatar>
              </ListItemAvatar>
              <ListItemText primary={donor.name} secondary={`$${donor.amount}`} />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default Cafecito;
