/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Select, MenuItem, InputLabel } from '@mui/material';
import { useBoundStore } from '../stores';

export const FilterStatsSeasonAndPosition = ({ setPosition, position, idHomeTeam,setCurrentSeason }) => {
  const { getTeamSeasons, teamSeason } = useBoundStore((state) => state);
  
  const [selectedLeague, setSelectedLeague] = useState('');
  const [selectedSeason, setSelectedSeason] = useState('');
  
  useEffect(() => {
    getTeamSeasons(idHomeTeam);
  }, [idHomeTeam, getTeamSeasons]);

  useEffect(() => {
    if (teamSeason.currentSeason) {
      setSelectedSeason(teamSeason.currentSeason._id);
      setCurrentSeason(teamSeason.currentSeason._id)
      setSelectedLeague(teamSeason.currentSeason.league._id);
    }
  }, [teamSeason,setCurrentSeason]);

  const handlePositionChange = (event) => {
    setPosition(event.target.value);
  };

  const handleLeagueChange = (event) => {
    setSelectedLeague(event.target.value);
    const league = teamSeason.leaguesSeasons[event.target.value];
    if (league && league.seasons.length > 0) {
      setSelectedSeason(league.seasons[0]._id);
      setCurrentSeason(league.seasons[0]._id)
    }
  };

  const handleSeasonChange = (event) => {
    setSelectedSeason(event.target.value);
    setCurrentSeason(event.target.value)
  };

  console.log("selectedSeason", selectedSeason);

  return (
    <div>
      <FormControl component="fieldset">
        <FormLabel component="legend">Filta por puesto del rival</FormLabel>
        <RadioGroup
          aria-label="position-range"
          name="position-range"
          value={position}
          onChange={handlePositionChange}
        >
          <FormControlLabel value={false}control={<Radio />} label="No filtrar por puesto" />
          <FormControlLabel value="1-6" control={<Radio />} label="1ro - 6to" />
          <FormControlLabel value="7-12" control={<Radio />} label="7mo - 12mo" />
          <FormControlLabel value="13-50" control={<Radio />} label="13ro -último" />
          <FormControlLabel value="1-50" control={<Radio />} label="Toda la temporada" />
        </RadioGroup>
      </FormControl>

      {teamSeason && teamSeason.leaguesSeasons && (
        <FormControl disabled={position ===false}>
          <InputLabel id="league-select-label">Selecciona una liga</InputLabel>
          <Select
            labelId="league-select-label"
            id="league-select"
            value={selectedLeague}
            onChange={handleLeagueChange}
            label="Select League"
          >
            {Object.keys(teamSeason.leaguesSeasons).map((leagueId) => (
              <MenuItem key={leagueId} value={leagueId}>
                {teamSeason.leaguesSeasons[leagueId].league.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}

      {selectedLeague && teamSeason.leaguesSeasons[selectedLeague] && (
        <FormControl disabled={position === false}>
          <InputLabel id="season-select-label">Selecciona una temporada</InputLabel>
          <Select
            labelId="season-select-label"
            id="season-select"
            value={selectedSeason}
            onChange={handleSeasonChange}
            label="Select Season"
          >
            {teamSeason.leaguesSeasons[selectedLeague].seasons.map((season) => (
              <MenuItem key={season._id} value={season._id}>
                {season.year}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    </div>
  );
};
