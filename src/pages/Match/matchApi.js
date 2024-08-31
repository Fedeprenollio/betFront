import axios from 'axios';
import { BACKEND_URL_BASE } from '../../stores/url_base';

const API_URL = `${BACKEND_URL_BASE}/match`


export const updateMach = async ({matchId, updatedData, token}) => {
    console.log("TOKEN", token)
  const response = await axios.put(`${API_URL}/${matchId}`, updatedData, {
    headers: {
      Authorization: `Bearer ${token.token}`, // Enviando el token
    },
  });
  return response.data;
};
