// import React, { useState, useEffect } from "react";
// import { Tabs, Tab, Box, Typography } from "@mui/material";
// import { useNavigate, useLocation, Outlet, useParams } from "react-router-dom";
// import { useBoundStore } from "../../stores";
// import CarouselLogos from "../../componts/caroulselLogos/CaroulselLogos";
// import { StatisticsPage } from "../Statistics/StatisticsPage";

// const StatisticsPageTab = () => {
//   const navigate = useNavigate();
//   const {seasonId} = useParams()
//   const location = useLocation();
//   const { matchesByRound, setMatchesByRound, getSeasonById, seasonById } = useBoundStore((state) => state)
//   const [activeTab, setActiveTab] = useState(0);
//   const [season, setSeasom] = useState("")
//   useEffect(() => {
//     getSeasonById(seasonId.toString())

//     }, [seasonId,getSeasonById])

//   // Map paths to tab indexes
//   const pathToTabIndex = {
//     "showResults": 0,
//     "positions": 1,
//     "statistics":2
//     // "tableSeason": 2,
//     // "tableRange": 3,
//   };

//   const tabIndexToPath = [
//     "showResults",
//     "positions",
//     "statistics"
//     // "tableSeason",
//     // "tableRange"
//   ];

//   useEffect(() => {
//     // Extract the last part of the pathname to determine the active tab
//     if(activeTab === 2) return
//     const currentPath = location.pathname.split("/").pop();
//     const season = location.pathname.split("/")
//     console.log("currentPath",season[2])
//     setSeasom(season)
//     setActiveTab(pathToTabIndex[currentPath] || 0);
//   }, [location.pathname,activeTab]);

//   const handleTabChange = (event, newValue) => {
//     setActiveTab(newValue);
//     navigate(tabIndexToPath[newValue]);
//   };

//   return (
//     <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
//       {/* <Typography variant="h6"> {`Central de estadísticas: ${seasonById?.season?.league?.name}, ${seasonById?.season?.year} `} </Typography> */}

//       <Tabs
//         value={activeTab}
//         onChange={handleTabChange}
//         aria-label="Tabs"
//         variant="scrollable"
//         scrollButtons
//         allowScrollButtonsMobile
//       >
//         <Tab label="Fechas" />
//         <Tab label="Posiciones" />
//         <Tab label="Estadísticas" />

//         {/* <Tab label="Estadísticas" />
//         <Tab label="Estadísticas %" /> */}
//         {activeTab === 2 && (
//         <StatisticsPage listCurrentSeason={season}   />
//       )}
//       </Tabs>
//       {   <Outlet />}

//     </Box>
//   );
// };

// export default StatisticsPageTab;
import React, { useState, useEffect } from "react";
import { Tabs, Tab, Box, Typography } from "@mui/material";
import { useNavigate, useLocation, Outlet, useParams } from "react-router-dom";
import { useBoundStore } from "../../stores";

const StatisticsPageTab = () => {
  const navigate = useNavigate();
  const { seasonId } = useParams();
  const location = useLocation();
  const { getSeasonById, seasonById } = useBoundStore((state) => state);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    getSeasonById(seasonId.toString());
  }, [seasonId, getSeasonById]);

  // Map paths to tab indexes
  const pathToTabIndex = {
    showResults: 0,
    positions: 1,
    statistics: 2,
  };

  useEffect(() => {
    // Extract the last part of the pathname to determine the active tab
    const currentPath = location.pathname.split("/").pop();
    setActiveTab(pathToTabIndex[currentPath] || 0);
  }, [location.pathname]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    navigate(
      newValue === 0
        ? "showResults"
        : newValue === 1
        ? "positions"
        : "statistics"
    );
  };

  return (
    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          color: "#3f51b5",
          textAlign: "center",
          marginBottom: 2,
        }}
      >
        {seasonById?.season?.league.name}
      </Typography>

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
      <Box sx={{ padding: 2 }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default StatisticsPageTab;
