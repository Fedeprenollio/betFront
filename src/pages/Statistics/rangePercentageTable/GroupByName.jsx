/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { TextField, CircularProgress, Autocomplete, Chip } from '@mui/material';
import axios from 'axios';
import { BACKEND_URL_BASE } from '../../../stores/url_base';

export const GroupByName = ({ onNamesChange }) => {
  const [query, setQuery] = useState('');
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedTeams, setSelectedTeams] = useState([]);

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
    if (newValue && !selectedTeams.some(team => team._id === newValue._id)) {
      const updatedTeams = [...selectedTeams, newValue];
      setSelectedTeams(updatedTeams);
      onNamesChange(updatedTeams.map(team => team.name)); // Llamar a onNamesChange con los nombres de los equipos seleccionados
      setQuery('');
    }
  };

  const handleTeamRemove = (teamToRemove) => {
    const updatedTeams = selectedTeams.filter(team => team._id !== teamToRemove._id);
    setSelectedTeams(updatedTeams);
    onNamesChange(updatedTeams.map(team => team.name)); // Llamar a onNamesChange con los nombres de los equipos seleccionados
  };

  const filteredOptions = options.filter(option => 
    !selectedTeams.some(team => team._id === option._id)
  );

  return (
    <>
      <Autocomplete
        options={filteredOptions}
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
      <>
        {selectedTeams.map(team => (
          <Chip
            key={team._id}
            label={team.name}
            onDelete={() => handleTeamRemove(team)}
            style={{ margin: '5px' }}
          />
        ))}
      </>
    </>
  );
};
