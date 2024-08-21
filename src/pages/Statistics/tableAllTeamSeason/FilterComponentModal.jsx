/* eslint-disable react/prop-types */
import  { useState } from 'react';
import { Box, Drawer, IconButton, Divider, Typography,   Container } from '@mui/material';
import { SelectStatistics } from './SelectStatistics';
import { AdvancedOptions } from './AdvancedOptions';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export const FilterComponentModal = ({
    stats,
    visibleStats,
    handleStatCheckboxChange,
    showAdvancedStats,
    handleCheckboxChange,
}) => {
    const [drawerOpen, setDrawerOpen] = useState(false);

    const handleDrawerToggle = () => {
        setDrawerOpen(!drawerOpen);
    };


    const filterContent = (
        <Box sx={{ padding: 2 }}>
            <Divider style={{ marginTop: "10px" }} />
            <SelectStatistics
                stats={stats}
                visibleStats={visibleStats}
                handleStatCheckboxChange={handleStatCheckboxChange}
            />
            <Divider />
            <AdvancedOptions
                showAdvancedStats={showAdvancedStats}
                handleCheckboxChange={handleCheckboxChange}
            />
            <Divider style={{ marginBottom: "5px" }} />
            {/* <CheckboxLocalVisitor 
             homeOnly={homeOnly}
             awayOnly={awayOnly}
             handleHomeOnlyChange={handleHomeOnlyChange}
             handleAwayOnlyChange={handleAwayOnlyChange}
            /> */}
        </Box>
    );

    return (
        <div>
             <Container>
                        <IconButton
                            edge="end"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerToggle}
                        >
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Typography variant="span" sx={{
                                    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
                                    color: "#0069c2",
                                    fontSize:"0.85rem"
                                }}>
                                    Filtrar estadísticas
                                </Typography>
                                <ExpandMoreIcon sx={{ marginLeft: 1 }} />
                            </Box>
                        </IconButton>
                    </Container>
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
        </div>
    );
};
