/* eslint-disable react/prop-types */
import axios from 'axios';
import Checkbox from '@mui/material/Checkbox';
import { BACKEND_URL_BASE } from '../../stores/url_base';
import { useBoundStore } from '../../stores';
import CheckIcon from '@mui/icons-material/Check';
const URL_API = `${BACKEND_URL_BASE}/season`;
const URL_API2 = `${BACKEND_URL_BASE}/season/league`;


export const SelectedCurrentSeason = ({ seasonId, leagueId, isCurrent, setCurrentSeasonId }) => {
  const {  isAuthenticated } = useBoundStore((state) => state);
  const handleSeasonSelection = async (event) => {
    const isChecked = event.target.checked;

    try {
      // Marcar la temporada como la actual si el checkbox está marcado
      if (isChecked) {
        await axios.put(`${URL_API}/${leagueId}/${seasonId}/isCurrent`);


        const response = await axios.get(`${URL_API2}/${leagueId}`);
        
        setCurrentSeasonId(response.data.currentSeason._id);
      }
    } catch (error) {
      console.error('Error al marcar la temporada como actual:', error);
    }
  };

  return (
    <>
        { isAuthenticated ? 
        <Checkbox checked={isCurrent} onChange={handleSeasonSelection} /> :
        isCurrent ?  <CheckIcon  /> : <null></null>
        
      }

    </>
  );
};


