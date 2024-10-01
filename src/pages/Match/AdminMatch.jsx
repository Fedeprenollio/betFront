import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Tab, Tabs, Typography } from '@mui/material';
import FormMatch from '../FormMatch';
import CreateMatchScraping from './CreateMatchScraping';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export const AdminMatch = () => {
  const { matchId } = useParams();
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Administra Partidos
      </Typography>

      <Tabs value={selectedTab} onChange={handleTabChange} aria-label="tabs for match creation">
        <Tab label="Formulario" />
        <Tab label="Scraping" />
      </Tabs>

      {/* TabPanel for FormMatch */}
      <TabPanel value={selectedTab} index={0}>
        <FormMatch matchId={matchId} />
      </TabPanel>

      {/* TabPanel for CreateMatchScraping */}
      <TabPanel value={selectedTab} index={1}>
        <CreateMatchScraping />
      </TabPanel>
    </>
  );
};
