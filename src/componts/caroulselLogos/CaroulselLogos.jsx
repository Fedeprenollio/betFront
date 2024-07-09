/* eslint-disable react/prop-types */
import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, Box, IconButton } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useBoundStore } from '../../stores';

const CarouselLogos = ({ seasonId }) => {
    const { getSeasonById, seasonById } = useBoundStore((state) => state);

    const [teams, setTeams] = useState([]);
    const navigate = useNavigate();
    const carouselRef = useRef(null);

    useEffect(() => {
        if (seasonId) {
            getSeasonById(seasonId);
        }
    }, [seasonId, getSeasonById]);

    useEffect(() => {
        setTeams(seasonById?.season?.teams || []);
    }, [seasonById]);

    const handleTeamClick = (teamId) => {
        navigate(`/teams/${teamId}/statistics`);
    };

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
                {teams?.map((team) => (
                    <Box
                        key={team._id}
                        m={1} // Margin to add some space between avatars
                        onClick={() => handleTeamClick(team._id)}
                        sx={{
                            cursor: 'pointer',
                            transition: 'transform 0.3s',
                            '&:hover': {
                                transform: 'scale(1.1)',
                            },
                        }}
                    >
                        <Avatar
                            alt={team.name}
                            src={team.logo}
                            title={team.name}
                            sx={{ width: 36, height: 36 }}
                        />
                    </Box>
                ))}
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

export default CarouselLogos;
