/* eslint-disable react/prop-types */
import  { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, Box } from '@mui/material';
import { useBoundStore } from '../../stores';

const CarouselLogos = ({ seasonId }) => {
    const { getSeasonById ,seasonById} = useBoundStore((state) => state);

  const [teams, setTeams] = useState([]);
  const navigate = useNavigate();
console.log("IDSEASON", seasonId)
  useEffect(() => {
    if(seasonId){
        getSeasonById(seasonId)

    }
  }, [seasonId,getSeasonById]);

  useEffect(() => {
    setTeams(seasonById?.season?.teams)
  }, [seasonById])
  
  console.log("teams",teams)
  const handleTeamClick = (teamId) => {
    navigate(`/teams/${teamId}/statistics`);
  };

  return (
    <Box display="flex" flexDirection="row" flexWrap="wrap" justifyContent="center">
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
  );
};

export default CarouselLogos;
