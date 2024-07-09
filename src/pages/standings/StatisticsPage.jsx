import React, { useState, useEffect } from "react";
import { Tabs, Tab, Box, Typography } from "@mui/material";
import { useNavigate, useLocation, Outlet, useParams } from "react-router-dom";
import { useBoundStore } from "../../stores";
import CarouselLogos from "../../componts/caroulselLogos/CaroulselLogos";

const StatisticsPageTab = () => {
  const navigate = useNavigate();
  const {seasonId} = useParams()
  const location = useLocation();
  const { matchesByRound, setMatchesByRound, getSeasonById, seasonById } = useBoundStore((state) => state)
  const [activeTab, setActiveTab] = useState(0);
  
  useEffect(() => {
    getSeasonById(seasonId.toString())
    
    
    }, [seasonId,getSeasonById])
    
    console.log("seasonId",seasonById)

  // Map paths to tab indexes
  const pathToTabIndex = {
    "showResults": 0,
    "positions": 1,
    "tableSeason": 2,
    "tableRange": 3,
  };

  const tabIndexToPath = [
    "showResults",
    "positions",
    "tableSeason",
    "tableRange"
  ];

  useEffect(() => {
    // Extract the last part of the pathname to determine the active tab
    const currentPath = location.pathname.split("/").pop();
    setActiveTab(pathToTabIndex[currentPath] || 0);
  }, [location.pathname]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    navigate(tabIndexToPath[newValue]);
  };

  return (
    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
      <CarouselLogos seasonId={seasonId}/>
      <Typography variant="h4"> {`Central de estadísticas: ${seasonById?.season?.league?.name}, ${seasonById?.season?.year} `} </Typography>

      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        aria-label="Tabs"
        variant="scrollable"
        scrollButtons
        allowScrollButtonsMobile
      >
        <Tab label="Fechas" />
        <Tab label="Posiciones" />
        <Tab label="Estadísticas" />
        <Tab label="Estadísticas %" />
      </Tabs>
      <Outlet />
    </Box>
  );
};

export default StatisticsPageTab;
