import { useEffect, useState } from "react";
import { useBoundStore } from "../../stores";
import {
  Collapse,
  Container,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import { FilterLeague } from "../../componts/Filters/FilterLeague";

export const ListLeagues = () => {
  const { fetchLeagues, leagues } = useBoundStore((state) => state);
  useEffect(() => {
    fetchLeagues();
  }, []);

  const [leagueSelected, setLeagueSelected] = useState(null);
  const [openCollapseIndex, setOpenCollapseIndex] = useState(-1);
  const [filteredLeagues, setFilteredLeagues] = useState([]);

  useEffect(() => {
    // Ordenar las ligas por país por defecto
    const sortedLeagues = [...leagues].sort((a, b) => {
      if (a.country < b.country) return -1;
      if (a.country > b.country) return 1;
      return 0;
    });
    setFilteredLeagues(sortedLeagues);
  }, [leagues]);

  const handleClick = (index) => {
    setOpenCollapseIndex(openCollapseIndex === index ? -1 : index);
  };

  const handleLeagueChange = (selectedLeagueId) => {
    const selectedLeague = leagues.find((league) => league._id === selectedLeagueId);
    setLeagueSelected(selectedLeague);
    setFilteredLeagues(selectedLeague ? [selectedLeague] : []);
  };

  return (
    <Container>
      <FilterLeague setLeagueSelected={handleLeagueChange} setFilteredLeagues={setFilteredLeagues } />
      <h3>Aca la lista</h3>
      <List>
        {filteredLeagues.map((league, index) => (
          <div key={league._id}>
            <ListItemButton onClick={() => handleClick(index)}>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={`${league.country} - ${league.name}`} />
              {openCollapseIndex === index ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse
              in={openCollapseIndex === index}
              timeout="auto"
              unmountOnExit
            >
              <List component="div" disablePadding>
                {league.season.map((season) => (
                  <ListItemButton sx={{ pl: 4 }} key={season._id}>
                    <ListItemIcon>
                      <StarBorder />
                    </ListItemIcon>
                    <ListItemText primary={season.year} />
                  </ListItemButton>
                ))}
              </List>
            </Collapse>
          </div>
        ))}
      </List>
    </Container>
  );
};
