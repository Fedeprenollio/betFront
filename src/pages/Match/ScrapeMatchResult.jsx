/* eslint-disable react/prop-types */
import { Box, Button, TextField } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { BACKEND_URL_BASE } from "../../stores/url_base";
 
export const ScrapeMatchResult = ({ matchId, onSuccess ,urlScrape}) => {
    const [url, setUrl] = useState(urlScrape);
  
    const handleScrape = async () => {
      if (url) {
        const token = JSON.parse(window.localStorage.getItem("loggedUser")).token
        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };
        try {
          const response = await axios.put(`${BACKEND_URL_BASE}/match/${matchId}/result`, { url },config);
          console.log("response.data scrap",response.data)
          onSuccess(response.data); // Trigger callback to update the match in the parent
        } catch (error) {
          console.error('Error scraping match result:', error);
        }
      }
    };
  
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 2 }}>
        <TextField
          label="URL para scraping"
          variant="outlined"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          fullWidth
          sx={{ marginRight: 2 }}
        />
        <Button id="actualizar" variant="contained" color="primary" onClick={handleScrape}>
          Scrape & Actualizar
        </Button>
      </Box>
    );
  };
  