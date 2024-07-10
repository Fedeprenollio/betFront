/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Box, Drawer, IconButton, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import { CheckboxLocalVisitor } from '../../pages/Statistics/rangePercentageTable/CheckboxLocalVisitor';
import { MatchesCountInput } from '../../pages/Statistics/rangePercentageTable/MatchesCountInput';


export const FilterComponent = ({ 
  homeOnly,
  awayOnly,
  handleHomeOnlyChange,
  handleAwayOnlyChange,
  inputMatchesCount,
  handleInputMatchesCountChange,
  handleIncludeAllSeasonMatches,
  updateMatchesCount,
  updateIncludeOtherSeasons,
  inputChekBoxIncludeAllSeason,
  handleFilterChange,
}) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const filterContent = (
    <div>
      <Box
        sx={{
          border: "1px solid #ddd",
          padding: 2,
          marginBottom: 2,
          borderRadius: 2,
          boxShadow: 1,
          backgroundColor: "#f9f9f9",
        }}
      >
        <CheckboxLocalVisitor
          homeOnly={homeOnly}
          awayOnly={awayOnly}
          handleHomeOnlyChange={handleHomeOnlyChange}
          handleAwayOnlyChange={handleAwayOnlyChange}
        />
      </Box>
      <Box
        sx={{
          border: "1px solid #ddd",
          padding: 2,
          marginBottom: 2,
          borderRadius: 2,
          boxShadow: 1,
          backgroundColor: "#f9f9f9",
        }}
      >
        <MatchesCountInput
          inputMatchesCount={inputMatchesCount}
          handleInputMatchesCountChange={handleInputMatchesCountChange}
          handleIncludeAllSeasonMatches={handleIncludeAllSeasonMatches}
          updateMatchesCount={updateMatchesCount}
          updateIncludeOtherSeasons={updateIncludeOtherSeasons}
          inputChekBoxIncludeAllSeason={inputChekBoxIncludeAllSeason}
          onFilterChange={handleFilterChange}
        />
      </Box>
    </div>
  );

  return (
    <div>
      {isSmallScreen ? (
        <>
          <IconButton
            edge="end"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
          >
            <MenuIcon /> <span>Filtrar</span>
          </IconButton>
          <Drawer
            anchor="right"
            open={drawerOpen}
            onClose={handleDrawerToggle}
            sx={{
              '& .MuiDrawer-paper': { width: '66%' },
            }}
          >
            {filterContent}
          </Drawer>
        </>
      ) : (
        filterContent
      )}
    </div>
  );
};

