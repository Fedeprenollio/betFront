// /* eslint-disable react/prop-types */
// import { useEffect, useState, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Avatar, Box, IconButton, Tooltip } from '@mui/material';
// import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
// import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
// import { useBoundStore } from '../../stores';

// const CarouselLogos = ({ seasonId }) => {
//     const { getSeasonById, seasonById } = useBoundStore((state) => state);

//     const [teams, setTeams] = useState([]);
//     const navigate = useNavigate();
//     const carouselRef = useRef(null);

//     useEffect(() => {
//         if (seasonId) {
//             getSeasonById(seasonId);
//         }
//     }, [seasonId, getSeasonById]);

//     useEffect(() => {
//         setTeams(seasonById?.season?.teams || []);
//     }, [seasonById]);

//     const handleTeamClick = (teamId) => {
//         navigate(`/teams/${teamId}/statistics`);
//     };

//     const handleScroll = (direction) => {
//         const scrollAmount = carouselRef.current.clientWidth;
//         if (direction === 'left') {
//             carouselRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
//         } else {
//             carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
//         }
//     };

//     return (
//       <>
//       {teams.length >0 &&
//              (<Box position="relative" sx={{ display: 'flex', alignItems: 'center' }}>
//             <IconButton
//                 onClick={() => handleScroll('left')}
//                 sx={{
//                     position: 'absolute',
//                     left: 0,
//                     zIndex: 1,
//                     backgroundColor: 'white',
//                     '&:hover': {
//                         backgroundColor: 'grey.300',
//                     },
//                 }}
//             >
//                 <ArrowBackIosIcon />
//             </IconButton>
//             <Box
//                 ref={carouselRef}
//                 display="flex"
//                 flexDirection="row"
//                 flexWrap="nowrap"
//                 overflow="hidden"
//                 sx={{ width: '100%', scrollBehavior: 'smooth', padding: '0 40px' }}
//             >
//                 {teams?.map((team) => (
//                     <Box
//                         key={team._id}
//                         m={1} // Margin to add some space between avatars
//                         onClick={() => handleTeamClick(team._id)}
//                         sx={{
//                             cursor: 'pointer',
//                             transition: 'transform 0.3s',
//                             '&:hover': {
//                                 transform: 'scale(1.1)',
//                             },
//                         }}
//                     >
//                       <Tooltip title={`${team.name}`}>

//                         <Avatar
//                             alt={team.name}
//                             src={team.logo}
//                             // title={team.name}
//                             sx={{ width: 36, height: 36 }}
//                         />
//                         </Tooltip>
//                     </Box>
//                 ))}
//             </Box>
//             <IconButton
//                 onClick={() => handleScroll('right')}
//                 sx={{
//                     position: 'absolute',
//                     right: 0,
//                     zIndex: 1,
//                     backgroundColor: 'white',
//                     '&:hover': {
//                         backgroundColor: 'grey.300',
//                     },
//                 }}
//             >
//                 <ArrowForwardIosIcon />
//             </IconButton>
//         </Box>
//       ) }
//         </>
//     );
// };

// export default CarouselLogos;

/* eslint-disable react/prop-types */
import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, Box, IconButton, Tooltip } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useBoundStore } from '../../stores';

const CarouselLogos = ({ seasonId }) => {
    const { getSeasonById, seasonById } = useBoundStore((state) => state);
    const [teams, setTeams] = useState([]);
    const navigate = useNavigate();
    const carouselRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startPosition, setStartPosition] = useState(0);
    const [scrollPosition, setScrollPosition] = useState(0);

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

    // Eventos para arrastrar con el mouse (desktop)
    const handleMouseDown = (e) => {
        setIsDragging(true);
        setStartPosition(e.pageX - carouselRef.current.offsetLeft);
        setScrollPosition(carouselRef.current.scrollLeft);
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        const currentPosition = e.pageX - carouselRef.current.offsetLeft;
        const distanceMoved = currentPosition - startPosition;
        carouselRef.current.scrollLeft = scrollPosition - distanceMoved;
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    // Eventos para arrastrar con el dedo (touch)
    const handleTouchStart = (e) => {
        setIsDragging(true);
        setStartPosition(e.touches[0].pageX - carouselRef.current.offsetLeft);
        setScrollPosition(carouselRef.current.scrollLeft);
    };

    const handleTouchMove = (e) => {
        if (!isDragging) return;
        const currentPosition = e.touches[0].pageX - carouselRef.current.offsetLeft;
        const distanceMoved = currentPosition - startPosition;
        carouselRef.current.scrollLeft = scrollPosition - distanceMoved;
    };

    const handleTouchEnd = () => {
        setIsDragging(false);
    };

    return (
        <>
            {teams.length > 0 && (
                <Box
                    position="relative"
                    sx={{ display: 'flex', alignItems: 'center',padding: '0 60px' }}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp} // Por si el usuario suelta el mouse fuera del contenedor
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                >
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
                        sx={{ width: '100%', scrollBehavior: 'smooth', padding: '0 40px', cursor: isDragging ? 'grabbing' : 'grab' }}
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
                                <Tooltip title={`${team.name}`}>
                                    <Avatar
                                        alt={team.name}
                                        src={team.logo}
                                        sx={{ width: 36, height: 36 }}
                                    />
                                </Tooltip>
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
            )}
        </>
    );
};

export default CarouselLogos;

