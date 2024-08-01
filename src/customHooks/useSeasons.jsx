import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL_BASE } from "../stores/url_base";

export const useSeasons = () => {
    const [seasons, setSeasons] = useState([]);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      fetchSeasons();
    }, []);
  
    const fetchSeasons = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL_BASE}/season`);
        setSeasons(response.data);
      } catch (err) {
        setError(err);
      }
    };
  
    const deleteSeason = async (seasonId) => {
      try {
        await axios.delete(`${BACKEND_URL_BASE}/season/${seasonId}`);
        setSeasons(seasons.filter(season => season._id !== seasonId));
      } catch (err) {
        setError(err);
      }
    };
  
    return { seasons, error, fetchSeasons, deleteSeason };
  };
  