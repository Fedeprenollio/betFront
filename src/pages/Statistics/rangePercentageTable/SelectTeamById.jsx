/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { TextField, CircularProgress, Autocomplete } from '@mui/material';
import axios from 'axios';
import { BACKEND_URL_BASE } from '../../../stores/url_base';

export const SelectTeamById = ({ onTeamSelect }) => {
  const [query, setQuery] = useState('');
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query.length < 3) {
      setOptions([]);
      return;
    }

    const fetchTeams = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${BACKEND_URL_BASE}/team/search/${query}`);
        setOptions(response.data);
      } catch (error) {
        console.error('Error fetching teams:', error);
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(() => {
      fetchTeams();
    }, 500); // Esperar 500ms antes de hacer la solicitud

    return () => clearTimeout(timeoutId);
  }, [query]);

  const handleTeamSelect = (event, newValue) => {
    if (newValue) {
      onTeamSelect(newValue._id); // Llamar a onTeamSelect con el ID del equipo seleccionado
      setQuery('');
    }
  };

  return (
    <>
      <Autocomplete
        options={options}
        getOptionLabel={(option) => option.name}
        onChange={handleTeamSelect}
        renderInput={(params) => (
          <TextField
          sx={{ maxWidth: '300px' }}
            {...params}
            label="Buscar equipo"
            variant="outlined"
            onChange={(event) => setQuery(event.target.value)}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {loading ? <CircularProgress color="inherit" size={20} /> : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
      />
    </>
  );
};
