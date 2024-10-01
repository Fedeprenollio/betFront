/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BACKEND_URL_BASE } from '../../stores/url_base';
import { Box, Button, CircularProgress, Container, TextField } from '@mui/material';

export const ScrapeURLForm = ({ setFieldValue,matchDetail }) => {
  const [url, setUrl] = useState(matchDetail.urlScrape || '');
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    // If matchDetail.urlScrape changes, update the state
    if (matchDetail.urlScrape) {
      setUrl(matchDetail.urlScrape);
    }
  }, [matchDetail.urlScrape]);
  const handleScrape = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${BACKEND_URL_BASE}/scrape`, { url });
      const data = response.data;

      console.log("DATA SCRAPING,", data);

       // Populate form fields with scraped data
      //  setFieldValue('goalsHome', data.homeScore || 0);
      //  setFieldValue('goalsAway', data.awayScore || 0);
      //  setFieldValue('shotsOnTargetHome', data.homeShotsToGoal || 0);
      //  setFieldValue('shotsOnTargetAway', data.awayShotsToGoal || 0);
      //  setFieldValue('totalShotsHome', data.homeTotalShots || 0);
      //  setFieldValue('totalShotsAway', data.awayTotalShots || 0);
      //  setFieldValue('cornersHome', data.homeCorners || 0);
      //  setFieldValue('cornersAway', data.awayCorners || 0);
      //  setFieldValue('foultsHome', data.homeFaults || 0);
      //  setFieldValue('foultsAway', data.awayFaults || 0);
      //  setFieldValue('yellowCardsHome', data.homeYellowCard || 0);
      //  setFieldValue('yellowCardsAway', data.awayYellowCard || 0);
      //  setFieldValue('offsidesHome', data.homeOffsides || 0);
      //  setFieldValue('offsidesAway', data.awayOffsides || 0);
      //  setFieldValue('possessionHome', data.homePossession || 0);
      //  setFieldValue('possessionAway', data.awayPossession || 0);
      //  setFieldValue('penaltiesHome', data.homePenalties || 0);
      //  setFieldValue('penaltiesAway', data.awayPenalties || 0);setFieldValue('goalsHome', data.homeScore !== undefined ? data.homeScore : 0);
      setFieldValue('goalsAway', data.awayScore !== undefined ? data.awayScore : 0);
      setFieldValue('shotsOnTargetHome', data.homeShotsToGoal !== undefined ? data.homeShotsToGoal : 0);
      setFieldValue('shotsOnTargetAway', data.awayShotsToGoal !== undefined ? data.awayShotsToGoal : 0);
      setFieldValue('totalShotsHome', data.homeTotalShots !== undefined ? data.homeTotalShots : 0);
      setFieldValue('totalShotsAway', data.awayTotalShots !== undefined ? data.awayTotalShots : 0);
      setFieldValue('cornersHome', data.homeCorners !== undefined ? data.homeCorners : 0);
      setFieldValue('cornersAway', data.awayCorners !== undefined ? data.awayCorners : 0);
      setFieldValue('foultsHome', data.homeFaults !== undefined ? data.homeFaults : 0);
      setFieldValue('foultsAway', data.awayFaults !== undefined ? data.awayFaults : 0);
      setFieldValue('yellowCardsHome', data.homeYellowCard !== undefined ? data.homeYellowCard : 0);
      setFieldValue('yellowCardsAway', data.awayYellowCard !== undefined ? data.awayYellowCard : 0);
      setFieldValue('offsidesHome', data.homeOffsides !== undefined ? data.homeOffsides : 0);
      setFieldValue('offsidesAway', data.awayOffsides !== undefined ? data.awayOffsides : 0);
      setFieldValue('possessionHome', data.homePossession !== undefined ? data.homePossession : 0);
      setFieldValue('possessionAway', data.awayPossession !== undefined ? data.awayPossession : 0);
      setFieldValue('penaltiesHome', data.homePenalties !== undefined ? data.homePenalties : 0);
      setFieldValue('penaltiesAway', data.awayPenalties !== undefined ? data.awayPenalties : 0);


    } catch (error) {
      console.error('Failed to scrape:', error);
    }finally {
        setLoading(false); // Ocultar el indicador de carga
      }
  };
console.log("urlScrape",matchDetail.urlScrape )
  return (
    <Container maxWidth="sm" sx={{ marginTop: 4 }}>
      <TextField
        fullWidth
        label="Enter URL to scrape"
        variant="outlined"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        sx={{ marginBottom: 2 }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleScrape}
        disabled={loading}
        fullWidth
      >
        Scrape & Load Data
      </Button>
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
          <CircularProgress />
        </Box>
      )}
    </Container>
  );
};
