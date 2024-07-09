// CaroulselCurrentSeason.jsx
import { Link } from 'react-router-dom';
import { useBoundStore } from '../../stores';
import { useEffect } from 'react';
import { Box, Typography, List, ListItem, ListItemText, ListItemIcon, useMediaQuery, useTheme } from '@mui/material';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';


export const CaroulselCurrentSeason = () => {
    const { allCurrentSeasons, getAllCurrentSeasons } = useBoundStore((state) => state);

    useEffect(() => {
        getAllCurrentSeasons();
    }, []);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const flexContainer = {
        display: 'flex',
        flexDirection: 'row',
        padding: 0,
      };
      
    return (
        <Box>
            <Typography variant="h5" gutterBottom>
                Temporadas Actuales
            </Typography>
            <List style={flexContainer}>
                {allCurrentSeasons?.map(season => (
                    <ListItem
                        key={season.id}
                        component={Link}
                        to={`/league/${season._id}/positions`}
                    >
                        <ListItemIcon>
                            <SportsSoccerIcon />
                        </ListItemIcon>
                        <ListItemText primary={`${season.league.name} (${season.year})`} />
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};
