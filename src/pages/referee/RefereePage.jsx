import React, { useEffect, useState } from 'react';
import { Container, Box, Tabs, Tab, TextField, MenuItem, CircularProgress, Grid, Button, Avatar, Typography } from '@mui/material';
import { List, ListItem, ListItemText } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BACKEND_URL_BASE } from '../../stores/url_base';
import RefereeStatisticsGrid from './RefereeStatisticsGrid';

export const RefereePage = () => {
  const [referees, setReferees] = useState([]);
  const [filteredReferees, setFilteredReferees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tabIndex, setTabIndex] = useState(0);
  const [searchName, setSearchName] = useState('');
  const [selectedNationality, setSelectedNationality] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReferees = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL_BASE}/referees`);
        setReferees(response.data);
        setFilteredReferees(response.data);
      } catch (error) {
        console.error('Error fetching referees:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReferees();
  }, []);

  useEffect(() => {
    filterReferees();
  }, [searchName, selectedNationality]);

  const handleTabChange = (event, newIndex) => {
    setTabIndex(newIndex);
  };

  const handleRefereeClick = (refereeId) => {
    navigate(`/referee/${refereeId}/statistics`);
  };

  const handleSearchNameChange = (e) => {
    setSearchName(e.target.value);
  };

  const handleNationalityChange = (e) => {
    setSelectedNationality(e.target.value);
  };

  const filterReferees = () => {
    let filtered = referees;

    if (searchName) {
      filtered = filtered.filter(referee =>
        referee.name.toLowerCase().includes(searchName.toLowerCase())
      );
    }

    if (selectedNationality) {
      filtered = filtered.filter(referee =>
        referee.nationality === selectedNationality
      );
    }

    setFilteredReferees(filtered);
  };

  const nationalities = [...new Set(referees.map(referee => referee.nationality || 'Sin definir'))];

  return (
    <Container>
      <Tabs value={tabIndex} onChange={handleTabChange}>
        <Tab label="Lista de Árbitros" />
        <Tab label="Estadísticas Generales" />
      </Tabs>

      {tabIndex === 0 && (
        <Box marginY={2}>
          <TextField
            label="Buscar por nombre"
            variant="outlined"
            value={searchName}
            onChange={handleSearchNameChange}
            style={{ marginRight: 16 }}
          />
          <TextField
            select
            label="Nacionalidad"
            value={selectedNationality}
            onChange={handleNationalityChange}
            variant="outlined"
            style={{ minWidth: 200 }}
          >
            <MenuItem value="">
              <em>Todos</em>
            </MenuItem>
            {nationalities.map(nationality => (
              <MenuItem key={nationality} value={nationality}>
                {nationality}
              </MenuItem>
            ))}
          </TextField>

          {loading ? (
            <CircularProgress />
          ) : (
            <Grid container spacing={2} marginTop={2}>
              {filteredReferees.map(referee => (
                <Grid item xs={12} key={referee._id}>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    padding={2}
                    border={1}
                    borderRadius={2}
                    borderColor="grey.300"
                  >
                    <Box>
                      <Typography variant="h6">{referee.name}</Typography>
                      <Typography variant="body2" color="textSecondary">{referee.nationality || 'Sin definir'}</Typography>
                      <Box marginTop={1}>
                        <Button variant="contained" onClick={() => handleRefereeClick(referee._id)} size="small" style={{ marginRight: 8 }}>
                          Ver Estadísticas
                        </Button>
                      </Box>
                    </Box>
                    <Avatar alt={`Imagen de ${referee.name}`} src={referee.image} style={{ width: 64, height: 64 }} />
                  </Box>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      )}

      {tabIndex === 1 && (
        <Box padding={2}>
          <Typography variant="h5">Estadísticas Generales</Typography>
        <RefereeStatisticsGrid/>
        </Box>
      )}
    </Container>
  );
};
