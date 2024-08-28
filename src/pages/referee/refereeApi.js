import axios from 'axios';
import { BACKEND_URL_BASE } from '../../stores/url_base';

const API_URL = `${BACKEND_URL_BASE}/referees`

export const fetchReferees = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createReferee = async (data) => {
  const response = await axios.post(API_URL, data);
  return response.data;
};

export const updateReferee = async (id, data) => {
  const response = await axios.put(`${API_URL}/${id}`, data);
  return response.data;
};

export const deleteReferee = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};

