// CaroulselCurrentSeason.jsx
import { Link } from 'react-router-dom';
import { useBoundStore } from '../../stores';
import { useEffect, useRef } from 'react';
import { Box, Typography, List, ListItem, ListItemText, ListItemIcon, IconButton } from '@mui/material';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export const CaroulselCurrentSeason = () => {
    const { allCurrentSeasons, getAllCurrentSeasons } = useBoundStore((state) => state);

    useEffect(() => {
        getAllCurrentSeasons();
    }, []);

    const carouselRef = useRef(null);

    const handleScroll = (direction) => {
        const scrollAmount = carouselRef.current.clientWidth;
        if (direction === 'left') {
            carouselRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        } else {
            carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <Box position="relative" sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
                onClick={() => handleScroll('left')}
                sx={{
                    position: 'absolute',
                    left: 0,
                    zIndex: 1,
                    backgroundColor: 'white',
                    '&:hover': {
                        backgroundColor: 'grey.300',
                    },
                }}
            >
                <ArrowBackIosIcon />
            </IconButton>
            <Box
                ref={carouselRef}
                display="flex"
                flexDirection="row"
                flexWrap="nowrap"
                overflow="hidden"
                sx={{ width: '100%', scrollBehavior: 'smooth', padding: '0 40px' }}
            >
                <List sx={{ display: 'flex', flexDirection: 'row', padding: 0 }}>
                    {allCurrentSeasons?.map(season => (
                        <ListItem
                            key={season.id}
                            component={Link}
                            to={`/league/${season._id}/positions`}
                            sx={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                marginRight: '16px',
                                paddingX:" 8px" ,
                                textDecoration: 'none',
                                color: 'inherit',
                                '&:hover': {
                                    color: 'primary.main',
                                },
                            }}
                        >
                         
                            <ListItemText primary={`${season.league.name}`} />
                        </ListItem>
                    ))}
                </List>
            </Box>
            <IconButton
                onClick={() => handleScroll('right')}
                sx={{
                    position: 'absolute',
                    right: 0,
                    zIndex: 1,
                    backgroundColor: 'white',
                    '&:hover': {
                        backgroundColor: 'grey.300',
                    },
                }}
            >
                <ArrowForwardIosIcon />
            </IconButton>
        </Box>
    );
};
