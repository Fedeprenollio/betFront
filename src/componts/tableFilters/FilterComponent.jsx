/* eslint-disable react/prop-types */
import  { useState } from 'react';
import { Box, Drawer, IconButton, Divider, Accordion, AccordionSummary, AccordionDetails, Typography, Container } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { CheckboxLocalVisitor } from '../../pages/Statistics/rangePercentageTable/CheckboxLocalVisitor';
import { MatchesCountInput } from '../../pages/Statistics/rangePercentageTable/MatchesCountInput';
import { SelectListCurrentSeasons } from '../../pages/Statistics/rangePercentageTable/SelectListCurrentSeasons';

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
    listCurrentSeason,
    selectedSeasons,
    handleSeasonChange,
    filterName,
    idTeam,
    positionFilter,
    handlePositionFilterChange,
    pathPage
}) => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [expanded, setExpanded] = useState(false);

    const handleDrawerToggle = () => {
        setDrawerOpen(!drawerOpen);
    };

    const handleAccordionToggle = () => {
        setExpanded(!expanded);
    };
    const filterContent = (
        <div>
            <Box sx={{ width: '100%' }}>
                {
                    filterName.includes("local/visitor") && <CheckboxLocalVisitor
                        homeOnly={homeOnly}
                        awayOnly={awayOnly}
                        handleHomeOnlyChange={handleHomeOnlyChange}
                        handleAwayOnlyChange={handleAwayOnlyChange}
                    />
                }


                <Divider />
                {filterName.includes("MatchesCountInput")  && <MatchesCountInput
                    inputMatchesCount={inputMatchesCount}
                    handleInputMatchesCountChange={handleInputMatchesCountChange}
                    handleIncludeAllSeasonMatches={handleIncludeAllSeasonMatches}
                    updateMatchesCount={updateMatchesCount}
                    updateIncludeOtherSeasons={updateIncludeOtherSeasons}
                    inputChekBoxIncludeAllSeason={inputChekBoxIncludeAllSeason}
                    onFilterChange={handleFilterChange}
                />

                }


                <Divider />
                {pathPage !== "league" && (
                    <Accordion expanded={expanded} onChange={handleAccordionToggle}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="span" gutterBottom sx={{
                                fontFamily: 'Roboto, Helvetica, Arial, sans-serif'
                            }}>
                                Seleccionar temporadas actuales (No seleccionar ninguna incluirá temporadas pasadas)
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <SelectListCurrentSeasons
                                selectedSeasons={selectedSeasons}
                                onSeasonChange={handleSeasonChange}
                                idTeam={idTeam}
                                listCurrentSeason={listCurrentSeason}
                                handlePositionFilterChange={handlePositionFilterChange}
                                positionFilter={positionFilter}
                            />
                        </AccordionDetails>
                    </Accordion>
                )}
            </Box>
        </div>
    );

    return (
        <div>
            {true ? (
                <>
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
                                    fontSize: "0.85rem"
                                }}>
                                    Filtrar
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
                </>
            ) : (
                filterContent
            )}
        </div>
    );
};
