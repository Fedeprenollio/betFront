// // CaroulselCurrentSeason.jsx
// import { Link } from 'react-router-dom';
// import { useBoundStore } from '../../stores';
// import { useEffect, useRef } from 'react';
// import { Box, Typography, List, ListItem, ListItemText, ListItemIcon, IconButton, Avatar, Tooltip } from '@mui/material';
// import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
// import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
// import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

// export const CaroulselCurrentSeason = () => {
//     const { allCurrentSeasons, getAllCurrentSeasons } = useBoundStore((state) => state);
//     useEffect(() => {
//         getAllCurrentSeasons();
//     }, [getAllCurrentSeasons]);

//     const carouselRef = useRef(null);

//     const handleScroll = (direction) => {
//         const scrollAmount = carouselRef.current.clientWidth;
//         if (direction === 'left') {
//             carouselRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
//         } else {
//             carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
//         }
//     };

//     return (
//         <Box position="relative" sx={{ display: 'flex', alignItems: 'center' }}>
//          {allCurrentSeasons.length > 0 &&  
//          <>
//           <IconButton
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
//                 <List sx={{ display: 'flex', flexDirection: 'row', padding: 0 }}>
//                     {allCurrentSeasons?.map(season => (
//                         <ListItem
//                             key={season._id}
//                             component={Link}
//                             to={`/league/${season._id}/positions`}
//                             sx={{
//                                 display: 'inline-flex',
//                                 alignItems: 'center',
//                                 marginRight: '16px',
//                                 paddingX:" 8px" ,
//                                 textDecoration: 'none',
//                                 color: 'inherit',
//                                 '&:hover': {
//                                     color: 'primary.main',
//                                 },
//                             }}
//                         >
                         
//                             {season.league.logo ? 
//                             <Tooltip title={`${season.league.name}`}>

                           
//                                 <Avatar
//                                 alt={season.league.name}
//                                 src={season.league.logo}
//                                 // title={season.league.name}
//                                 sx={{ width: 36, height: 36 }}
//                             /> 
//                              </Tooltip>:
//                             <ListItemText primary={`${season.league.name}`} />
                                
//                         }

//                         </ListItem>
//                     ))}
//                 </List>
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
//          </>
//             }
//         </Box>
//     );
// };

import { Link } from 'react-router-dom';
import { useBoundStore } from '../../stores';
import { useEffect, useRef, useState } from 'react';
import { Box, List, ListItem, Avatar, Tooltip, IconButton, ListItemText } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export const CaroulselCurrentSeason = () => {
    const { allCurrentSeasons, getAllCurrentSeasons } = useBoundStore((state) => state);
    useEffect(() => {
        getAllCurrentSeasons();
    }, [getAllCurrentSeasons]);

    const carouselRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startPosition, setStartPosition] = useState(0);
    const [scrollPosition, setScrollPosition] = useState(0);

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
        <Box
            position="relative"
            sx={{ display: 'flex', alignItems: 'center',padding: '0 30px' }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp} // Por si el usuario suelta el mouse fuera del contenedor
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            { (allCurrentSeasons && allCurrentSeasons.length > 0) ?
                <>
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
                        <List sx={{ display: 'flex', flexDirection: 'row', padding: 0 }}>
                            {allCurrentSeasons?.map((season) => (
                                <ListItem
                                    key={season._id}
                                    component={Link}
                                    to={`/league/${season._id}/positions`}
                                    sx={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        marginRight: '16px',
                                        paddingX: "8px",
                                        textDecoration: 'none',
                                        color: 'inherit',
                                        '&:hover': {
                                            color: 'primary.main',
                                        },
                                    }}
                                >
                                    {season.league.logo ?
                                        <Tooltip title={`${season.league.name}`}>
                                            <Avatar
                                                alt={season.league.name}
                                                src={season.league.logo}
                                                sx={{ width: 36, height: 36 }}
                                            />
                                        </Tooltip>
                                        :
                                        <ListItemText primary={`${season.league.name}`} />
                                    }
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
                </>
             : <h2>Cargando...</h2> }
        </Box>
    );
};

