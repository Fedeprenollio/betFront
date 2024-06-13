import React, { useState, useEffect } from "react";
import { Tabs, Tab, Box } from "@mui/material";
import { useNavigate, useLocation, Outlet } from "react-router-dom";

const StatisticsPageTab = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(0);

  // Map paths to tab indexes
  const pathToTabIndex = {
    "showResults": 0,
    "positions": 1,
    "tableSeason": 2,
  };

  const tabIndexToPath = [
    "showResults",
    "positions",
    "tableSeason",
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
      </Tabs>
      <Outlet />
    </Box>
  );
};

export default StatisticsPageTab;
